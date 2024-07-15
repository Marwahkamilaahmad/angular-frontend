import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports:[
    HttpClientModule,
    MatTable, MatTableModule, FontAwesomeModule, FaIconComponent
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  faPlus = faPlus;
   username = sessionStorage.getItem('username');
   password = sessionStorage.getItem('password');
  displayedColumns: string[] = ['id', 'namaLengkap', 'usia', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
      'Accept': 'application/json'
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        if (error.status === 401) {
          console.log('Unauthorized access. Please check your credentials.');
        } else {
          console.error('Error fetching students', error);
        }
      }
    );
  }

  editStudent(student: any) {
    this.router.navigate(['/edit', student.id]);
  }

  deleteStudent(student: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
      'Accept': 'application/json'
    });
    this.http.delete<any>(`${this.apiUrl}/${student.id}`, { headers }).subscribe(
      (response) => {
        console.log('Student deleted:', student);
        this.fetchStudents(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting student', error);
      }
    )
  }
}
