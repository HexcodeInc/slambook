import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder,private service: ServiceService) { }
  public loading = false;
  error=false;
  SForm: FormGroup;
  ngOnInit() {
    if(localStorage.getItem('userid')){
      this.router.navigate(['../profile']);
    }
    this.buildForm();
  }
  buildForm(){
    this.SForm = this.fb.group({
      'userid' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
  }
  Login(data){
    this.loading=true;
    console.log(data);
    this.service.checkLogin(data).subscribe(res=>{
      console.log(res);
      if(res.code==200){
        this.SForm.reset();
        this.error=false;
        localStorage.setItem('userid',data.userid);
        this.router.navigate(['../profile']);
      }else{
        this.error=true;
      }
      this.loading=false;
    });
  }
}
