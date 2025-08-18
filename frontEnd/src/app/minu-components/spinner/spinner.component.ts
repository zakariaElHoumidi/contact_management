import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { IThemeColors } from '../../interfaces/IThemeColors';
import { TClass } from '../../types/TClass';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  private readonly _themeService: ThemeService = inject(ThemeService);
  isDark: boolean = true;

  themeColors: IThemeColors = this._themeService.getCurrentThemeColors(this.isDark ? 'dark' : 'light');

  useClass(type: TClass, classes: string): string {
    return this._themeService.useClasses(type, classes);
  }
}
