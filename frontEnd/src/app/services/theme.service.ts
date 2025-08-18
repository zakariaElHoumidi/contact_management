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
      background: 'bg-[#E5E7EB]',
      primary_text: 'text-orange-700',
      primary_border: 'border-orange-700',
      primary_bg: 'bg-orange-700',
      normalText: 'text-gray-900',
      mutedText: 'text-gray-500',
      bgCard: 'bg-[#333333]'
    },
    dark: {
      background: 'bg-[#333333]',
      primary_text: 'text-orange-400',
      primary_border: 'border-orange-400',
      primary_bg: 'bg-orange-400',
      normalText: 'text-gray-100',
      mutedText: 'text-gray-400',
      bgCard: 'bg-[#E5E7EB]'
    },
  };

  getThemeColor(mode: TThemeMode, role: keyof IThemeColors): string {
    return this.themeColors[mode][role];
  };
}
