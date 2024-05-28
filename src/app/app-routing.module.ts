import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CompletedComponent } from './completed/completed.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TaskOperationsComponent } from './task-operations/task-operations.component';
import { WildcardComponent } from './wildcard/wildcard.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "addtask",
    canActivate: [AuthGuard],
    component: InputFieldComponent
  },
  {
    path: "tasklist",
    canActivate: [AuthGuard],
    component: TaskOperationsComponent
  },
  {
    path: "completed",
    canActivate: [AuthGuard],
    component: CompletedComponent
  },
  {
    path: "info",
    component: InfoComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "**",
    component: WildcardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
