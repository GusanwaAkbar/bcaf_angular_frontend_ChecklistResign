import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize the login form with form controls
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Method called when the form is submitted
  onSubmit() {
    // Check if the form is valid
    console.log("on submitworkig")


    if (this.loginForm.valid) {

      console.log("checking formworking")
      const { username, password } = this.loginForm.value;
      // Call the AuthService login method
      this.authService.login(username, password).subscribe({
        next: () => {
          console.log('Login successful');
          this.router.navigate(['pengajuan-resign']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.error = err.error.message || 'Login failed. Please try again.';
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
