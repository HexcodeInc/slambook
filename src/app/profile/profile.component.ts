import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public loading= true;
  constructor(public snackBar: MatSnackBar,private router: Router, private route: ActivatedRoute,private service: ServiceService) { }
  userRes=[];
  noData=false;
  userid;
  public text;
  isCopied1: boolean = false;
  ngOnInit() {
    this.service.getUserData().subscribe(res=>{
      this.userid=localStorage.getItem('userid');
      this.text = 'http://hexcodeinc.com/slam/'+this.userid;
      this.loading=false;
      if(res.code==400){
        this.noData=true;
      }else{
        this.noData=false;
        this.userRes=res;
      }
      console.log(this.userRes);
      console.log(this.noData);
    });
  }
  viewSingle(data){
    this.router.navigate(['/viewsingle', this.userRes[data].who]);
  }
  logout(){
    localStorage.removeItem('userid');
    this.router.navigate(['/login']);
  }
  openSnackBar() {
    this.snackBar.open('Copied', 'Success!', {
      duration: 2000,
    });
  }
}
