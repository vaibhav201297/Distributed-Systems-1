import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth:AuthenticationService,public router:Router, public home:HomeComponent ) { }
  @Input() loggedUserName?:string
  ngOnInit(): void {
  
  
  }

  logout(){
    this.auth.logout().subscribe(data=>{
      alert("Logged Out")
      this.router.navigate(['/login'])
    })
  }
}
