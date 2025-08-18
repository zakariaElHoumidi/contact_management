import { Component } from '@angular/core';
import { classes } from '../../config';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  duration = classes.duration
  padding = classes.padding
}
