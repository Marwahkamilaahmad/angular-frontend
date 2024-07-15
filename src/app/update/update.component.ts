import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentListComponent } from '../student-list/student-list.component';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  public updateForm!: FormGroup;
  public studentId: string | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group({
      id: [''],
      namaDepan: [''],
      namaBelakang: [''],
      tanggalLahir: ['']
    });

    this.route.paramMap.subscribe(params => {
     this.studentId = params.get('id');
     if (this.studentId) {
      this.loadStudentData(this.studentId);
    }
    });
  }



  loadStudentData(id: string): void {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
      'Accept': 'application/json'
    });

    this.http.get<any>(`http://localhost:8080/api/students/${id}`, { headers })
      .subscribe(
        data => {
          this.updateForm.patchValue(data);
        },
        err => {
          console.error('Error fetching student data', err);
        }
      );
  }

  update(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')),
      'Accept': 'application/json'
    });

    if (this.updateForm.valid) {
      this.http.post<any>("http://localhost:8080/api/students", this.updateForm.value, { headers })
        .subscribe(
          res => {
            console.log('Response:', res);
            this.updateForm.reset();
            this.router.navigate(['dashboard']);
          },
          err => {
            console.error('Error:', err);
            alert('Something went wrong');
          }
        );
    } else {
      alert('Please fill out the form correctly');
    }
  }
}
