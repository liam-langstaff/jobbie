import { Component } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {RouterLink} from '@angular/router';

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
  value: any;
  email: FormControl = new FormControl('', Validators.compose([Validators.email, Validators.required]));
  password: FormControl = new FormControl('', Validators.required);

}
