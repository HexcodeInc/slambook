import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder,private service: ServiceService) {
    this.buildForm();
   }
   public loading = false;
   error=false;
   SForm: FormGroup;
  ngOnInit() {
    
  }

  buildForm(){
    this.SForm = this.fb.group({
      'name' : [null, Validators.required],
      'userid' : [null, Validators.required],
      'password' : [null, Validators.required],
      'email' : [null,[Validators.required,Validators.email]],
    });
  }

  Signup(data){
    this.loading=true;
    console.log(data);
    this.service.SignupUser(data).subscribe(res=>{
      console.log(res);
      if(res.code==200){
        this.SForm.reset();
        this.error=false;
        localStorage.setItem('userid',data.userid);
        this.router.navigate(['../questions']);
      }else{
        this.error=true;
      }
      this.loading=false;
    });
  }

}
