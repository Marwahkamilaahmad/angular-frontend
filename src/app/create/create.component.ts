import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  public createForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}



  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      id : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      namaDepan: ['', Validators.required],
      namaBelakang: ['', Validators.required],
      tanggalLahir: ['', Validators.required]
    });
  }

  create(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
      'Accept': 'application/json'
    });

    if (this.createForm.valid) {
      this.http.post<any>("http://localhost:8080/api/students",this.createForm.value, { headers } )
        .subscribe(
          res => {
            console.log("Response:", res);
            this.createForm.reset();
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
