import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { StudentListComponent } from './student-list/student-list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login',  pathMatch: 'full'},
  {path: 'login', component: LoginComponent  },
  {path: 'logout', component: LogoutComponent , canActivate: [AuthGuard]  },
  {path: 'signup', component: SignupComponent  },
  {path: 'student', component: StudentListComponent },
  {path: 'create', component: CreateComponent ,  canActivate: [AuthGuard]},
  {path: 'edit/:id', component: UpdateComponent  ,  canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
