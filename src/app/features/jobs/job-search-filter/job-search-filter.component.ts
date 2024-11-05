import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import {
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
import { CurrencyPipe } from '@angular/common';
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
  role: string;
  location: string;
  jobTypes: string[];
  salaryRange: {
    low: number;
    high: number;
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
  ],
  templateUrl: './job-search-filter.component.html',
  styleUrl: './job-search-filter.component.scss',
})
export class JobSearchFilterComponent {
  @Output() filtersChanged = new EventEmitter<Filter>();
  @ViewChild('opSalary') opSalary: OverlayPanel | undefined;

  selectedRoles: any[] | undefined;
  selectedLocation: any[] | undefined;
  selectedJobTypes: any[] | undefined;
  salaryRange: number[] = [20000, 80000]; // Default salary range

  jobTypes = fakeJobTypes;

  private readonly _locations: Option[] = fakeLocations;
  private readonly _roles: Option[] = fakeRoles;

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
    filter((event) => event.query.length > 2),
    map((event) =>
      this._locations.filter((location) =>
        location.label.toLowerCase().includes(event.query.toLowerCase()),
      ),
    ),
  );

  private readonly _salaryRange$$: Subject<SliderChangeEvent> =
    new Subject<SliderChangeEvent>();

  private readonly _salaryRange$ = this._salaryRange$$.pipe(
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
    startWith(this.salaryRange),
  );

  private readonly _selectRole$$: Subject<AutoCompleteSelectEvent> =
    new Subject<AutoCompleteSelectEvent>();

  private readonly _selectedRole$ = this._selectRole$$.pipe(
    debounceTime(150),
    filter((event) => event.value !== undefined),
    map((event) => event.value),
  );

  private readonly _selectLocation$$: Subject<AutoCompleteSelectEvent> =
    new Subject<AutoCompleteSelectEvent>();

  private readonly _selectedLocation$ = this._selectLocation$$.pipe(
    debounceTime(150),
    filter((event) => event.value !== undefined),
    map((event) => event.value),
  );

  private readonly _selectJobTypes$$: Subject<Option[]> = new Subject<
    Option[]
  >();

  private readonly _selectJobTypes$ = this._selectJobTypes$$.pipe(
    debounceTime(150),
    filter((event) => event !== undefined),
    map((event: Option[]) => event.map((jobType: Option) => jobType.value)),
  );

  public readonly filters = toSignal(
    combineLatest([
      this._selectedRole$,
      this._selectedLocation$,
      this._selectJobTypes$,
      this._salaryRange$,
    ]).pipe(
      map(([role, location, jobType, salary]) =>
        this.mapToFilter(role.value, location.value, jobType, salary),
      ),
    ),
  );

  public readonly searchedRole = toSignal(this._searchedRole$);
  public readonly searchedLocation = toSignal(this._searchedLocation$);

  searchRole($event: AutoCompleteCompleteEvent) {
    this._searchRole$$.next($event);
  }

  searchLocation($event: AutoCompleteCompleteEvent) {
    this._searchLocation$$.next($event);
  }

  getSalaryRangeLabel(): string {
    return this.salaryRange && this.salaryRange[0] !== 0
      ? `${this.salaryRange[0].toLocaleString('en-GB', {
          style: 'currency',
          currency: 'GBP',
        })} - ${this.salaryRange[1].toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}`
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
    role: string,
    location: string,
    jobType: string[],
    salary: number[],
  ): Filter {
    return {
      role: role,
      location: location,
      jobTypes: jobType,
      salaryRange: {
        low: salary[0],
        high: salary[1],
      },
    };
  }

  searchJobs() {
    this.filtersChanged.next(<Filter>this.filters());
  }

  onJobTypeSelect($event: any) {
    this._selectJobTypes$$.next($event);
  }
}
