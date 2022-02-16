import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { LoginResponse } from '../models/LoginResponse';
import { SearchhistoryComponent } from '../searchhistory/searchhistory.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUserName?:string
  loggedUserEmail:string=""
  csvUrl = 'assets/Weather_Radar_Stations.csv';
  searchBtnClicked:boolean=false
  searchForm!:FormGroup
  airports?:AirportLocations[]
  selectedAirport:string="KABR"
  currentDate=new Date()
  airMap=new Map<string,string>()
  searches?:Array<UserHistoryResponse>




  constructor(private sanitizer: DomSanitizer,private http:HttpClient,private fb:FormBuilder,private auth:AuthenticationService,public router:Router) {
    this.createSearchForm()
   }


   showImage:boolean=false
   updateSelection(event:Event){
    this.selectedAirport=(event.target as HTMLSelectElement).value
  }


  validateResponse(response:any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }


  
  


  imageToShow:any="../assets/loading.gif";
  isImageLoading?:boolean
  


  submitSearch(event:Event){
    const d=this.searchForm.get('searchDate')?.value
    const t=this.searchForm.get('time')?.value
    const btn=(document.getElementById("weatherSubmit") as HTMLInputElement).disabled=true
    //const airport = this.searchForm.get('airport')?.value
    const airport=this.selectedAirport
    console.log(airport)
    
    this.searchBtnClicked=true   
    
    //console.log(d,t,airport)
    this.auth.addSearch(1,d,t,airport,this.loggedUserEmail,null).subscribe(data=>{
      console.log(data)
    })
    
    this.auth.search(d,t,airport).subscribe(value=>{
      const mediaType='image/png'
      //console.log(typeof(data))
      const blob = new Blob([value], { type: mediaType })
    
      //const imb64String=this.createImageFromBlob(data)
      //this.imageToShow=this.sanitizer.bypassSecurityTrustUrl(imb64String)
      const objectURL = URL.createObjectURL(blob);       
      this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      
    }, error=>{
     
      console.log(error)
    })
    
   
    /*
    fetch(api,{
            credentials: 'include'
        }).then(this.validateResponse).then(response => response.blob())
          .then( (blob:Blob) =>{
            let ourl=URL.createObjectURL(blob)
            this.image= this.sanitizer.bypassSecurityTrustUrl(ourl)
            this.showImage=true
            })
*/
    
  }




  createSearchForm(){
    this.searchForm=this.fb.group({
      searchDate:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required]),
      airport:new FormControl('')
    })
  }

  readCsvData (): AirportLocations[] {
      const airport:AirportLocations[]=[];
      this.http.get(this.csvUrl,{responseType:'text'}).subscribe(
          data => {
          //console.log(data)
          var rows=data.split('\n')
          rows.splice(0,1)
          //console.log(rows)
          for(var row of rows){
            var temp=row.split(",")
            var al=new AirportLocations(Number(temp[0]),temp[1],Number(temp[2]),Number(temp[3]),temp[4],temp[5],temp[6])
            this.airMap.set(temp[1],temp[4])
            airport.push(al)

          }
          },
          err => {
            console.log(err)
          });
  return airport 
  }
  
  
  
 total:any
  ngOnInit(): void {
    
    this.auth.getProfile().subscribe(
      data=>{
        var resp=JSON.stringify(data)
        var resp2=JSON.parse(resp)
        console.log(resp2)
        this.loggedUserName=resp2.body['name']
        this.loggedUserEmail=resp2.body['email']
        this.auth.getSearchHistory(this.loggedUserEmail).subscribe(data=>{
          var resp=JSON.stringify(data)
          var resp2=JSON.parse(resp)
          this.searches=resp2
          this.total=this.searches?.length
        })
      },
      err=>{
          console.log(err)
          
          this.router.navigate(['/login'])
          
      })
      this.airports=this.readCsvData()


 


    }
    

}
export class UserHistoryResponse{
      
  constructor(searchId:number,userId:string,airport:string,createDate:Date,dateSearched:Date,hour:number,plotted_image:any){
    this.airport=airport
    this.searchId=searchId
    this.userId=userId
    this.createDate=createDate
    this.dateSearched=dateSearched
    this.hour=hour
    this.plotted_image=plotted_image
  }
      searchId:number
      userId:string
      airport:string
      createDate:Date
      dateSearched:Date
      hour:number
      plotted_image:any
}



export class AirportLocations{
  
  constructor(objectID:number,siteId:string,longitude:number,latitude:number,siteName:string,radarType:string,antennaElevation:string) {
    this.objectID=objectID
    this.siteId=siteId
    this.longitude=longitude,
    this.latitude=latitude,
    this.siteName=siteName
    this.radarType=radarType
    this.antennaElevation=antennaElevation
   }
  objectID:number
  siteId:string
  longitude:number
  latitude:number
  siteName:string
  radarType:string
  antennaElevation:string
} 