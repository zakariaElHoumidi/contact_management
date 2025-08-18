import { ThemeService } from './services/theme.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IThemeColors } from './interfaces/IThemeColors';
import { TThemeMode } from './types/TThemeMode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  themeColors!: IThemeColors;
  isDark = true;
  title = 'frontEnd';

  constructor(private ThemeService: ThemeService) { }

  ngOnInit(): void {
    this.getCurrentThemeColors()
  }

  getCurrentThemeColors() {
    const mode: TThemeMode = this.isDark ? 'dark' : 'light';

    this.themeColors = {
      background: this.ThemeService.getThemeColor(mode, 'background'),
      primary_text: this.ThemeService.getThemeColor(mode, 'primary_text'),
      primary_border: this.ThemeService.getThemeColor(mode, 'primary_border'),
      primary_bg: this.ThemeService.getThemeColor(mode, 'primary_bg'),
      normalText: this.ThemeService.getThemeColor(mode, 'normalText'),
      mutedText: this.ThemeService.getThemeColor(mode, 'mutedText'),
      bgCard: this.ThemeService.getThemeColor(mode, 'bgCard'),
    }
  }

  toggleMode() {
    this.isDark = !this.isDark;
    this.getCurrentThemeColors()
  }
}
