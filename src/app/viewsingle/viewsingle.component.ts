import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-viewsingle',
  templateUrl: './viewsingle.component.html',
  styleUrls: ['./viewsingle.component.css']
})
export class ViewsingleComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private service: ServiceService) { }
  sub;
  who;
  viewAns=[];
  public loading=true;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.who = params['name']; 
      console.log(this.who);
      this.service.viewsingleuser(this.who).subscribe(res=>{
        // console.log(res);
        this.viewAns = res;
        this.loading=false;
      });
   });
  }
backProfile(){
  this.router.navigate(['../profile']);
}
}
