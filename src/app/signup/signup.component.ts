import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule , HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.http.post<any>("http://localhost:8080/api/auth/register", this.signUpForm.value )
        .subscribe(
          res => {
            console.log("Response:", res);
            alert("Signup successful");
            this.signUpForm.reset();
            this.router.navigate(['login']);
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
