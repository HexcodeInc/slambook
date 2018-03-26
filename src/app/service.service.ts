import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class ServiceService {
  isUserLoggedIn;
  signup=false;
  baseUrl='http://18.188.159.14:8081/';
  constructor(private http:Http,private router: Router, private route: ActivatedRoute,) {
    this.isUserLoggedIn = false;
   }
   checkLoginFront(userid){
    if(!userid){
      this.router.navigate(['../login']);
    }
   }
   SignupUser(prod) {
     this.signup=true;
    console.log(prod);
      return this.http.post(this.baseUrl+"signup",prod) .map(result => result.json());
    }
    getQuestions(){
      return this.http.get(this.baseUrl+'questions').map(result => result.json());
    }
    questionAdd(qid){
      var userid=localStorage.getItem("userid");
      this.checkLoginFront(userid);
      var data={
        userid:userid,
        qid:qid
      }
      return this.http.post(this.baseUrl+"questionadd",data) .map(result => result.json());
    }
    getUserData(){
      var userid=localStorage.getItem("userid");
      this.checkLoginFront(userid);
      var data={
        userid:userid
      }
      return this.http.post(this.baseUrl+"dashboard",data) .map(result => result.json());
    }
    viewsingleuser(who){
      var userid=localStorage.getItem("userid");
      this.checkLoginFront(userid);
      var data={
        userid:userid,
        who:who
      }
      return this.http.post(this.baseUrl+"viewsingle",data) .map(result => result.json());
    }
    checkLogin(data){
      return this.http.post(this.baseUrl+'checklogin',data).map(result => result.json());
    }
    getquestion(userid){
     var data={
        userid:userid
      }
      return this.http.post(this.baseUrl+'getquestion',data).map(result => result.json());
    }
    addanswers(data){
      return this.http.post(this.baseUrl+'addanswers',data).map(result => result.json());
    }
    customquestion(question){
      var userid=localStorage.getItem("userid");
      this.checkLoginFront(userid);
      var data={
        userid:userid,
        question:question
      }
      return this.http.post(this.baseUrl+'customquestion',data).map(result => result.json());
    }
    getUserName(userid){
      var data={
        userid:userid,
      }
      return this.http.post(this.baseUrl+'username',data).map(result => result.json());
    }
}
