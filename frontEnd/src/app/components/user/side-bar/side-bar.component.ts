import { Component, inject, Input, OnChanges } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { IThemeColors } from '../../../interfaces/IThemeColors';
import { TClass } from '../../../types/TClass';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnChanges {
  private readonly _themeService: ThemeService = inject(ThemeService);

  @Input() sidebarEvent: boolean = false;

  isDark: boolean = true;
  isOpen: boolean = false
  themeColors: IThemeColors = this._themeService.getCurrentThemeColors(this.isDark ? 'dark' : 'light');

  useClass(type: TClass, classes: string): string {
    return this._themeService.useClasses(type, classes);
  }

  navigations: Record<string, string | number>[] = [
    {
      path: 'contacts',
      label: 'All Contacts',
      length: 42,
      icon: "fa-solid fa-user-group"
    },
    {
      path: 'favorites',
      label: 'Favorites',
      length: 8,
      icon: "fa-solid fa-star"
    },
    {
      path: 'groups',
      label: 'Groups',
      length: 5,
      icon: "fa-solid fa-users"
    },
    {
      path: 'tags',
      label: 'Tags',
      length: 12,
      icon: "fa-solid fa-tag"
    },
    {
      path: 'reminders',
      label: 'Reminders',
      length: 3,
      icon: "fa-solid fa-bell"
    }
  ];

  tools: Record<string, string | number>[] = [
    {
      path: 'import',
      label: 'import',
      icon: "fa-solid fa-arrow-up-from-bracket"
    },
    {
      path: 'export',
      label: 'export',
      icon: "fa-solid fa-download"
    },
    {
      path: 'settings',
      label: 'settings',
      icon: "fa-solid fa-gear"
    },
  ];

  ngOnChanges() {
    this.toggleSideBar()
    // }
  }

  toggleSideBar() {
    this.isOpen = !this.isOpen;
  }
}
