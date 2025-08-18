import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { IThemeColors } from '../../../interfaces/IThemeColors';
import { routes_paths } from '../../../app.routes_paths';
import { TClass } from '../../../types/TClass';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../../minu-components/spinner/spinner.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  // inject dependency
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _themeService: ThemeService = inject(ThemeService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  isDark: boolean = true;
  root_auth = routes_paths.auth.root;
  register_path = routes_paths.auth.children.register;
  loading: boolean = false;
  show_password: boolean = false;
  errors: Record<string, string> | null = null

  themeColors: IThemeColors = this._themeService.getCurrentThemeColors(this.isDark ? 'dark' : 'light');

  user!: FormGroup;
  form_email: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.email
    ]
  );
  form_password: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(8)
    ]
  );
  form_remember_me: FormControl = new FormControl(false);

  togglePassword() {
    this.show_password = !this.show_password
  }

  get email() {
    return this.user.get('email');
  }
  get password() {
    return this.user.get('password');
  }
  get remember_me() {
    return this.user.get('remember_me');
  }

  ngOnInit(): void {
    this.user = this._formBuilder.group({
      email: this.form_email,
      password: this.form_password,
      remember_me: this.form_remember_me,
    });
  }

  useClass(type: TClass, classes: string): string {
    return this._themeService.useClasses(type, classes);
  }

  submitForm() {
    if (this.user.valid) {
      this.onLogin()
    } else {
      this.user.markAllAsTouched()
      Object.keys(this.user.controls).forEach(control => this.user.controls[control].markAsDirty())
    }
  }

  async onLogin() {
    this.loading = true;
    this._authService.login(this.user.value).subscribe({
      next: (res) => {
        this.loading = false;
        console.log('✅ Login:', res);
        this.user.reset();
        this._router.navigate([`/${routes_paths.user.root}/${routes_paths.user.children.home}`]);
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('user', JSON.stringify(res.user))
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errors = err.error;
      }
    })
  }
}
