import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  public loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      username : ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.http.post<any>("http://localhost:8080/api/auth/login", this.loginForm.value )
        .subscribe(
          res => {
            console.log("Response:", res);
            sessionStorage.setItem('username', this.username);
            sessionStorage.setItem('password', this.password);
            alert("Login successful");
            this.loginForm.reset();
            this.router.navigate(['dashboard']);
          },
          err => {
            console.error("Error:", err);
            alert('Something went wrong');
          }
        );
    } else {
      alert('Please fill out the form correctly');
    }
  }

}
