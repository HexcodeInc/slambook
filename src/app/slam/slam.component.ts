import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-slam',
  templateUrl: './slam.component.html',
  styleUrls: ['./slam.component.css']
})
export class SlamComponent implements OnInit {
  sub;
  userid;
  success=false;
  questions = [];
  noData=true;
  ansquestions = [];
  SForm: FormGroup;;
  public loading = true;
  userName;
  constructor(private router: Router, private route: ActivatedRoute, private service: ServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userid = params['userid'];
      this.service.getUserName(this.userid).subscribe(res=>{
        this.userName = res.name;
      })
      this.service.getquestion(this.userid).subscribe(res => {
        this.questions = res;
        if(this.questions.length>0){
          this.noData=false;
        }
        this.loading = false;
        this.buildForm(this.questions.length);
      });
    });
  }

  buildForm(j) {
    this.SForm = this.fb.group({
      who: [null, Validators.required],
      relatedby: 'friend',
      Answers: this.fb.array([])
    });
    this.addAns(this.questions.length);
  }
  createAns(): FormGroup {
    return this.fb.group({
      ans: '',
    });
  }
  addAns(j): void {
    for (let i = 0; i < j; i++) {
      this.ansquestions.push(this.questions[i].qid);
      (this.SForm.get('Answers') as FormArray)
        .push(this.createAns());
    }
  }
  Answer(data) {
    // console.log(data);
    // console.log(this.ansquestions);
    this.loading = true;
    var resData = {
      who: data.who,
      relatedby: data.relatedby,
      questions: this.ansquestions,
      answers: data.Answers,
      userid:this.userid
    }
    console.log(resData);
    this.service.addanswers(resData).subscribe(res=>{
      console.log(res);
      if(res.code=='200'){
        this.success=true;
        this.SForm.reset();
      }
      this.loading = false;
    });
  }
}
