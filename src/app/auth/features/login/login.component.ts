import {Component, inject, signal} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {SupabaseService} from '../../../shared/services/supabase.service';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    FormsModule,
    ButtonDirective,
    RouterLink,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _supabaseService = inject(SupabaseService);
  private _router = inject(Router);

  isLoading = signal(false);

  value: any;
  email: FormControl = new FormControl('', Validators.compose([Validators.email, Validators.required]));
  password: FormControl = new FormControl('', Validators.required);

  login() {
    this.isLoading.set(true);
    this._supabaseService.login(this.email.value, this.password.value).subscribe((result) => {
      if (result.error) {
        // some error here
      } else {
        this._router.navigateByUrl('/');
      }
      this.isLoading.set(false);
    })
  }
}
