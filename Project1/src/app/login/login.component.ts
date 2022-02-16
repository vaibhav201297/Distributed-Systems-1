import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators} from '@angular/forms'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginBtnClicked:boolean=false
  googleBtnClicked:boolean=false
  isValid:boolean=false
  loginForm!:FormGroup
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  constructor(private auth:AuthenticationService,public router:Router,private fb:FormBuilder ){
    this.createForm()
  }
  
  redirect(){
    this.googleBtnClicked=true
    location.href="http://localhost:7777/auth/google"
    this.auth.googleLogin().subscribe(data=>{
      console.log(data)
    },
    err=>{
      console.log(err)
    })
  }
  

  createForm(){
    this.loginForm=this.fb.group({
      email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(16)])
    })
  }

  fieldTextType: boolean=false;
  ngOnInit(): void {
   
  }
  email:any
  password:any

 

  submit(event:Event){
    this.loginBtnClicked=true
    const target=event.target
    const email=this.loginForm.get('email')?.value
    const pwd=this.loginForm.get('password')?.value
    if(this.loginForm.valid){
   
    this.auth.getUserDetails(email,pwd).subscribe(data=>{
      var resp=JSON.stringify(data)
      var resp2=JSON.parse(resp)
      console.log(resp2['message'])   
      if(resp2['message']==='Login Successful!'){
          this.router.navigate([''])
      }
    });
  }

  }
  
  showPassword(){
    
    this.fieldTextType=!this.fieldTextType
  }
}
