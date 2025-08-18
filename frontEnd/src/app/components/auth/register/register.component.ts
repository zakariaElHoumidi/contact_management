import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordNotMatch } from '../../../validations/user.validation';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { IThemeColors } from '../../../interfaces/IThemeColors';
import { routes_paths } from '../../../app.routes_paths';
import { Router, RouterLink } from '@angular/router';
import { TClass } from '../../../types/TClass';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  // inject dependency
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _themeService: ThemeService = inject(ThemeService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  isDark: boolean = true;
  themeColors: IThemeColors = this._themeService.getCurrentThemeColors(this.isDark ? 'dark' : 'light');

  root_auth = routes_paths.auth.root;
  login_path = routes_paths.auth.children.login;

  steps: number = 2;
  currentStep: number = 1;
  loading: boolean = false;

  show_passwords = {
    password: false,
    confirm_password: false
  }
  user!: FormGroup;
  form_name: FormControl = new FormControl({
    value: '',
    disabled: true,
  }, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(55)
  ]);
  form_first_name: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]
  );
  form_last_name: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55)
    ]
  );
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
  form_confirm_password: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(8)
    ]
  );

  togglePasswords(input: 'password' | 'confirm_password') {
    this.show_passwords[input] = !this.show_passwords[input]
  }

  get name() {
    return this.user.get('name');
  }
  get first_name() {
    return this.user.get('first_name');
  }
  get last_name() {
    return this.user.get('last_name');
  }
  get email() {
    return this.user.get('email');
  }
  get password() {
    return this.user.get('password');
  }
  get confirm_password() {
    return this.user.get('confirm_password');
  }

  ngOnInit(): void {
    this.user = this._formBuilder.group({
      name: this.form_name,
      first_name: this.form_first_name,
      last_name: this.form_last_name,
      email: this.form_email,
      password: this.form_password,
      confirm_password: this.form_confirm_password,
    }, passwordNotMatch);

    this.form_first_name.valueChanges.subscribe(() => this.updateFullName())
    this.form_last_name.valueChanges.subscribe(() => this.updateFullName())
  }

  updateFullName() {
    this.form_name.setValue(`${this.form_first_name.value} ${this.form_last_name.value}`);
  }

  useClass(type: TClass, classes: string): string {
    return this._themeService.useClasses(type, classes);
  }

  handleSteps = (action: "previous" | "next") => {
    if (action === "previous" && this.currentStep > 1) {
      this.currentStep--
    } else if (action === "next") {
      const isValid = this.validateStep();

      if (!isValid) return;

      if (this.currentStep < this.steps) {
        this.currentStep++
      } else {
        this.submitForm();
      }
    }
  };

  validateStep = (): boolean => {
    if (this.currentStep === 1) {
      return (
        this.first_name?.value !== "" &&
        this.last_name?.value !== ""
      );
    }

    if (this.currentStep === 2) {
      return (
        this.email?.value !== "" &&
        this.password?.value !== "" &&
        this.confirm_password?.value !== "" &&
        this.password?.value === this.confirm_password?.value
      );
    }

    return false;
  };

  submitForm() {
    if (this.user.valid) {
      this.onRegister()
      this.user.reset();
      this.currentStep = 1;
    } else {
      this.user.markAllAsTouched()
      Object.keys(this.user.controls).forEach(control => this.user.controls[control].markAsDirty())
    }
  }

  async onRegister() {
    this.loading = true;
    this._authService.register(this.user.value).subscribe({
      next: (res) => {
        this.loading = false;
        console.log('✅ Registered:', res);
        this._router.navigate([`/${routes_paths.auth.root}/${routes_paths.auth.children.login}`]);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }
}
