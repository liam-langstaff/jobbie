import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {RouterLink} from '@angular/router';

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
  email: FormControl = new FormControl('', Validators.compose([Validators.email, Validators.required]));
  password: FormControl = new FormControl('', Validators.required);
}
