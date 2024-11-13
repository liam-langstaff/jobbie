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
  FormGroup,
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
import { DropdownModule } from 'primeng/dropdown';

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
    DropdownModule,
  ],
  templateUrl: './job-search-filter.component.html',
  styleUrl: './job-search-filter.component.scss',
})
export class JobSearchFilterComponent {
  @Output() filtersChanged = new EventEmitter<Filter>();
  @ViewChild('opSalary') opSalary: OverlayPanel | undefined;

  private _fb: FormBuilder = inject(FormBuilder);

  jobSearchForm = new FormGroup({
    selectedRoles: this._fb.control<string[]>([]),
    selectedLocation: this._fb.control<string[]>([]),
    selectedJobTypes: this._fb.control<string[]>([]),
    salaryRange: this._fb.control<number[]>([20000, 80000]),
  });

  jobTypes = fakeJobTypes;

  private readonly _locations: Option[] = fakeLocations;
  private readonly _roles: Option[] = fakeRoles;

  public resetActive$$ = new BehaviorSubject<boolean>(false);

  private readonly _resetFilters$$ = new Subject<void>();
  private readonly _resetFilters$ = this._resetFilters$$.pipe(
    tap(() => {
      this.jobSearchForm.reset({
        selectedRoles: [],
        selectedLocation: [],
        selectedJobTypes: [],
        salaryRange: [20000, 80000],
      });
    }),
    filter((res) => res !== undefined),
    tap(() => this.searchJobs()),
    startWith(undefined),
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

  private readonly _searchedLocation$ = this._searchLocation$$.pipe(
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
          return [];
        }
      }),
    );

  private readonly _filterSelectedOptions$ = combineLatest([
    this._selectedRole$,
    this._selectedLocation$,
    this._selectJobTypes$,
    this._salaryRange$,
    this._resetFilters$,
  ]).pipe(
    tap(([role, location, jobType, salary]) => {
      this.resetActive$$.next(true);
      console.log(role, location, jobType, salary);
    }),
    map(([role, location, jobType, salary]) =>
      this.mapToFilter(role, location, jobType, salary),
    ),
  );

  public readonly filters = toSignal(this._filterSelectedOptions$);

  public readonly searchedRole = toSignal(this._searchedRole$);
  public readonly searchedLocation = toSignal(this._searchedLocation$);

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
    return <Filter>{
      role: role,
      location: location,
      jobTypes: jobType,
      salaryRange:
        !salary || (salary[0] && salary[1])
          ? {
              low: salary ? salary[0] : null,
              high: salary ? salary[1] : null,
            }
          : null,
    };
  }

  searchJobs() {
    this.filtersChanged.next(<Filter>this.filters());
  }

  onJobTypeSelect($event: any) {
    this._selectJobTypes$$.next($event);
  }

  resetFilters() {
    // reset all filters
    // change this to be more reactive
    this._resetFilters$$.next();
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

  protected readonly fakeLocations = fakeLocations;
}
