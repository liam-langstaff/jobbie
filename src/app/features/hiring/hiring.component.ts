import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hiring',
  imports: [ButtonDirective, RouterLink],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.scss',
})
export class HiringComponent {}
