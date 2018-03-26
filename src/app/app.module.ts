import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { HttpModule } from '@angular/http';
import { ServiceService } from './service.service';
import { QuestionComponent } from './question/question.component';
import { LoadingModule } from 'ngx-loading';
import { ViewsingleComponent } from './viewsingle/viewsingle.component';
import { SlamComponent } from './slam/slam.component';
import {MatSnackBarModule,MatCardModule,MatButtonModule,MatExpansionModule,MatMenuModule} from '@angular/material'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddcustomqusComponent } from './addcustomqus/addcustomqus.component';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    QuestionComponent,
    ViewsingleComponent,
    SlamComponent,
    AddcustomqusComponent
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LoadingModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSnackBarModule,
    ClipboardModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
