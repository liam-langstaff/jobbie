import {Component, inject, signal} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {Router, RouterLink} from '@angular/router';
import {SupabaseService} from '../../../shared/services/supabase.service';

@Component({
  selector: 'app-register',
  imports: [
    ButtonDirective,
    FormsModule,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private _supabaseService = inject(SupabaseService);
  private _router = inject(Router);

  isLoading = signal(false);

  username: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', Validators.compose([Validators.email, Validators.required]));
  password: FormControl = new FormControl('', Validators.required);

  register() {
    this.isLoading.set(true);
    this._supabaseService.register(
      this.username.value,
      this.email.value,
      this.password.value).subscribe((result) => {
      if (result.error) {
        // some error here
      } else {
        this._router.navigateByUrl('/');
      }
      this.isLoading.set(false);
    });
  }
}
