import {
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import {
  fakeJobTypes,
  fakeLocations,
  fakeRoles,
} from '../../../shared/data/fake-data';

export interface Option {
  label: string;
  value: string;
}

export interface Filter {
  role: string | null;
  location: string | null;
  jobTypes: string[] | null;
  salaryRange: {
    low: number | null;
    high: number | null;
  };
}

@Component({
  selector: 'app-job-search-filter',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule,
    Button,
    ButtonDirective,
    Ripple,
    SliderModule,
    MultiSelectModule,
    CurrencyPipe,
    OverlayPanelModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './job-search-filter.component.html',
  styleUrl: './job-search-filter.component.scss',
})
export class JobSearchFilterComponent {
  @Output() filtersChanged = new EventEmitter<Filter>();
  @ViewChild('opSalary') opSalary: OverlayPanel | undefined;

  private _fb: FormBuilder = inject(FormBuilder);

  // selectedRoles: any[] | undefined;
  // selectedLocation: any[] | undefined;
  // selectedJobTypes: any[] | undefined;
  // salaryRange: number[] = [20000, 80000]; // Default salary range

  jobSearchForm = this._fb.group({
    selectedRoles: this._fb.control<string[]>(['']),
    selectedLocation: this._fb.control<string[]>(['']),
    selectedJobTypes: this._fb.control<string[]>(['']),
    salaryRange: this._fb.control<number[]>([20000, 80000]),
  });

  constructor() {
    this.jobSearchForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  jobTypes = fakeJobTypes;

  private readonly _locations: Option[] = fakeLocations;
  private readonly _roles: Option[] = fakeRoles;

  public resetActive$$ = new BehaviorSubject<boolean>(false);

  private readonly _resetFilters$$ = new Subject<void>();
  private readonly _resetFilters$ = this._resetFilters$$.pipe(
    tap(() => {
      this.filtersChanged.emit(this.mapToFilter(null, null, null, null));
    }),
  );

  private readonly _searchRole$$: Subject<AutoCompleteCompleteEvent> =
    new Subject<AutoCompleteCompleteEvent>();

  private readonly _searchedRole$ = this._searchRole$$.pipe(
    debounceTime(150),
    filter((event) => event.query.length > 2),
    map((event) =>
      this._roles.filter((role) =>
        role.label.toLowerCase().includes(event.query.toLowerCase()),
      ),
    ),
  );

  private readonly _searchLocation$$: Subject<AutoCompleteCompleteEvent> =
    new Subject<AutoCompleteCompleteEvent>();

  private readonly _searchedLocation$ =
    this.selectedLocationControl.valueChanges.pipe(
      debounceTime(150),
      filter((event) => event?.query?.length > 2),
      map((event) =>
        this._locations.filter((location) =>
          location.label.toLowerCase().includes(event.query.toLowerCase()),
        ),
      ),
    );

  private readonly _salaryRange$$: Subject<SliderChangeEvent> =
    new Subject<SliderChangeEvent>();

  private readonly _salaryRange$ = this.salaryRangeControl.valueChanges.pipe(
    debounceTime(500),
    filter(
      (event) =>
        event.values !== undefined &&
        (event.values[0] !== 0 || event.values[1] !== 0),
    ),
    map((event) => [
      event.values ? event.values[0] : 0,
      event.values ? event.values[1] : 0,
    ]),
    tap((salary) => console.log(salary)),
    startWith(this.salaryRangeControl.value),
  );

  private readonly _selectRole$$: Subject<AutoCompleteSelectEvent | null> =
    new Subject<AutoCompleteSelectEvent | null>();

  private readonly _selectedRole$ = this.selectedRolesControl.valueChanges.pipe(
    debounceTime(150),
    map((event) => event?.value),
  );

  private readonly _selectLocation$$: Subject<AutoCompleteSelectEvent> =
    new Subject<AutoCompleteSelectEvent>();

  private readonly _selectedLocation$ =
    this.selectedLocationControl.valueChanges.pipe(
      debounceTime(150),
      map((event) => event.value),
    );

  private readonly _selectJobTypes$$: Subject<Option[]> = new Subject<
    Option[]
  >();

  private readonly _selectJobTypes$ =
    this.selectedJobTypesControl.valueChanges.pipe(
      debounceTime(150),
      map((event: Option[]) => {
        console.log(event);
        if (Array.isArray(event)) {
          return event.map((jobType: Option) => jobType.value);
        } else {
          // If not an array, return null or an empty array based on required behavior
          return null;
        }
      }),
    );

  private readonly _filterSelectedOptions$ = combineLatest([
    this._selectedRole$,
    this._selectedLocation$,
    this._selectJobTypes$,
    this._salaryRange$,
  ]).pipe(
    tap(() => this.resetActive$$.next(true)),
    map(([role, location, jobType, salary]) =>
      this.mapToFilter(
        role?.value ?? null,
        location?.value ?? null,
        jobType?.length ? jobType : null,
        salary ?? null,
      ),
    ),
  );

  public readonly filters = toSignal(this._filterSelectedOptions$);

  public readonly searchedRole = toSignal(this._searchedRole$);
  public readonly searchedLocation = toSignal(this._searchedLocation$);

  resetFilterModels() {
    this._resetFilters$$.next();
    this.jobSearchForm.reset({
      selectedRoles: [''],
      selectedLocation: [''],
      selectedJobTypes: [],
      salaryRange: [20000, 100000],
    });
  }

  searchRole($event: AutoCompleteCompleteEvent) {
    this._searchRole$$.next($event);
  }

  searchLocation($event: AutoCompleteCompleteEvent) {
    this._searchLocation$$.next($event);
  }

  getSalaryRangeLabel(): string {
    return this.salaryRangeControl && this.salaryRangeControl.value[0] !== 0
      ? `${this.salaryRangeControl.value[0].toLocaleString('en-GB', {
          style: 'currency',
          currency: 'GBP',
        })} - ${this.salaryRangeControl.value[1].toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}`
      : 'Salary Range';
  }

  setSalaryRange($event: SliderChangeEvent) {
    this._salaryRange$$.next($event);
  }

  onRoleSelect($event: AutoCompleteSelectEvent) {
    this._selectRole$$.next($event);
  }

  onLocationSelect($event: AutoCompleteSelectEvent) {
    this._selectLocation$$.next($event);
  }

  mapToFilter(
    role: string | null,
    location: string | null,
    jobType: string[] | null,
    salary: number[] | null,
  ): Filter {
    return {
      role: role,
      location: location,
      jobTypes: jobType,
      salaryRange: {
        low: salary ? salary[0] : null,
        high: salary ? salary[1] : null,
      },
    };
  }

  searchJobs() {
    console.log(this.filters());
    this.filtersChanged.next(<Filter>this.filters());
  }

  onJobTypeSelect($event: any) {
    this._selectJobTypes$$.next($event);
  }

  resetFilters() {
    // reset all filters
    // change this to be more reactive
    // this._resetFilters$$.next();
    this.jobSearchForm.reset({
      selectedRoles: [''],
      selectedLocation: [''],
      selectedJobTypes: [],
      salaryRange: [20000, 100000],
    });
  }

  get selectedRolesControl(): FormControl {
    return this.jobSearchForm.get('selectedRoles') as FormControl;
  }

  get selectedLocationControl(): FormControl {
    return this.jobSearchForm.get('selectedLocation') as FormControl;
  }

  get selectedJobTypesControl(): FormControl {
    return this.jobSearchForm.get('selectedJobTypes') as FormControl;
  }

  get salaryRangeControl(): FormControl {
    return this.jobSearchForm.get('salaryRange') as FormControl;
  }
}
