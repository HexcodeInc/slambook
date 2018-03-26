import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public loading= true;
  userid;
  SForm: FormGroup;
  noData=true;
  questions:Array<any>=[];
  constructor(private router: Router,private service: ServiceService,private fb: FormBuilder) { }
  ngOnInit() {
    // if(this.service.signup==false){
    //   this.router.navigate(['../profile']);
    // }
    this.userid=localStorage.getItem('userid');
    this.service.getQuestions().subscribe(res=>{
      this.questions = res;
      if(this.questions.length>0){
        this.noData=false;
      }
      this.loading=false;
    });
    this.buildForm();
  }
  buildForm(){
    this.SForm = this.fb.group({
      'question' : [null, Validators.required],
    });
  }
addQuestions(i){
  this.loading=true;
this.service.questionAdd(this.questions[i].qid).subscribe(res=>{
this.loading=false;
console.log(res);
if(res.code==200){
this.questions.splice(i,1);
}
});
}
customquestion(data){
  this.loading=true;
  this.service.customquestion(data.question).subscribe(res=>{
    this.SForm.reset();
    this.loading=false;
  });
}
}
