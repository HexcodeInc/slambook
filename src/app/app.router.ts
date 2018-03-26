import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewsingleComponent } from './viewsingle/viewsingle.component';
import { SlamComponent } from './slam/slam.component';
import { AddcustomqusComponent } from './addcustomqus/addcustomqus.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'signup', component: SignupComponent },
    { path:'questions', component: QuestionComponent },
    { path:'custom', component: AddcustomqusComponent },
    { path:'viewsingle/:name', component: ViewsingleComponent},
    { path: 'slam/:userid', component: SlamComponent},
    { path: '**', component: ProfileComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);