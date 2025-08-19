import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { IThemeColors } from '../../../interfaces/IThemeColors';
import { TClass } from '../../../types/TClass';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly _themeService: ThemeService = inject(ThemeService);
  private readonly _authService: AuthService = inject(AuthService);
  @Output() buttonClick = new EventEmitter<string>();

  onButtonClick() {
    this.buttonClick.emit('toggleSideBar')
  }

  isDark: boolean = true;
  themeColors: IThemeColors = this._themeService.getCurrentThemeColors(this.isDark ? 'dark' : 'light');

  useClass(type: TClass, classes: string): string {
    return this._themeService.useClasses(type, classes);
  }

  async testIsAuth() {
    this._authService.isAuth().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
