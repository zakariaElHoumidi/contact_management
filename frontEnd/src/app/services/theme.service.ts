import { Injectable } from '@angular/core';
import { TThemeMode } from '../types/TThemeMode';
import { IThemeColors } from '../interfaces/IThemeColors';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  private themeColors: Record<TThemeMode, IThemeColors> = {
    light: {
      background: '#FFFFFF',
      foreground: '#0E7490',
      foreground_hover: '#0b8aadff',
      text: '#333',
      text_muted: '#828893',
      border: '#e6e9ec',
      card: '#eee',
      spinner: '#0EA5E9'
    },
    dark: {
      background: '#090E1A',
      foreground: '#15A8D1',
      foreground_hover: '#00c8ffff',
      text: '#fff',
      text_muted: '#94B3D1',
      border: '#12244fff',
      card: '#0C1322',
      spinner: '#3B82F6'
    },
  };

  getThemeColor(mode: TThemeMode, role: keyof IThemeColors): string {
    return this.themeColors[mode][role];
  };

  getCurrentThemeColors(mode: TThemeMode): IThemeColors {
    return { ...this.themeColors[mode] }
  }
}
