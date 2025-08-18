import { ThemeService } from './services/theme.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IThemeColors } from './interfaces/IThemeColors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly _themeService: ThemeService = inject(ThemeService);

  isDark = true;
  title = 'frontEnd';
  themeColors: IThemeColors = this._themeService.getCurrentThemeColors(this.isDark ? 'dark' : 'light');
}
