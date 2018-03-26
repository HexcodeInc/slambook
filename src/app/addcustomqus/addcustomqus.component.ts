import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcustomqus',
  templateUrl: './addcustomqus.component.html',
  styleUrls: ['./addcustomqus.component.css']
})
export class AddcustomqusComponent implements OnInit {

  constructor(private router: Router,private service: ServiceService,private fb: FormBuilder) { }
  public loading= false;
  userid;
  SForm: FormGroup;
  ngOnInit() {
    this.userid=localStorage.getItem('userid');
    this.buildForm();
  }
  buildForm(){
    this.SForm = this.fb.group({
      'question' : [null, Validators.required],
    });
  }
  customquestion(data){
    this.loading=true;
    this.service.customquestion(data.question).subscribe(res=>{
      this.SForm.reset();
      this.loading=false;
      if(res.code==200){
        this.router.navigate(['/profile']);
      }
    });
  }
}
