import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button, ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-register',
  imports: [
    ButtonDirective,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    Button,
    ToggleButtonModule,
    RadioButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private _supabaseService = inject(SupabaseService);
  private _router = inject(Router);

  isLoading = signal(false);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      accountType: new FormControl('Personal', Validators.required),
      orgName: new FormControl(''),
    });

    // Update the validator based on accountType value
    this.registerForm
      .get('accountType')
      ?.valueChanges.subscribe((accountType) => {
        this.updateOrgNameValidator(accountType);
      });
  }

  get isOrganization(): boolean {
    return (
      this.registerForm.get('accountType')?.value.toLowerCase() ===
      'organisation'
    );
  }

  updateOrgNameValidator(accountType: string) {
    const orgNameControl = this.registerForm.get('orgName');
    if (accountType.toLowerCase() === 'organisation') {
      orgNameControl?.setValidators([Validators.required]);
    } else {
      orgNameControl?.clearValidators();
    }
    orgNameControl?.updateValueAndValidity();
  }

  register() {
    this.isLoading.set(true);

    const { username, email, password, accountType, orgName } =
      this.registerForm.value;

    this._supabaseService
      .register(username, email, password, accountType.toLowerCase(), orgName) // provide values to the register method
      .subscribe((result) => {
        if (result.error) {
          // handle error
        } else {
          if (accountType === 'Organisation' && orgName) {
            // handle organisation specific logic if necessary
          }
          this._router.navigateByUrl('/');
        }
        this.isLoading.set(false);
      });
  }
}
