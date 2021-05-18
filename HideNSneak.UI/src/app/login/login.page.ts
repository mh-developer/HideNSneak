import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pepperoni: string;
  email: string;
  pass: string;
  dataa:any;
  
  constructor(public router: Router,public modalController: ModalController,public alertController:AlertController) { }


  ngOnInit() {
  
  }
signup(){
	this.router.navigateByUrl('/signup');
}
forget(){
	this.router.navigateByUrl('/forget');
}
home(){
  this.router.navigateByUrl('/tabs');
//   this.dataa= {EmailAddress:this.email,Password:this.pass,PlayerID :""};
  
//   this.http.post('https://webapi.now-open.co.uk/api/userlogin',this.dataa, this.httpOptions).subscribe( async (data:any) => {
//    console.log(data);
//   var mydata= data;
//   if(mydata.ID > 0){
//     this.http.get('https://webapi.now-open.co.uk/api/userprofile?uid='+mydata.ID,this.httpOptions).subscribe(async data => {
//    console.log(mydata.ImageURL);
//    console.log(mydata.Name);
   
//     const modal = await this.modalController.create({
//     component: TestPage,
//     componentProps: { user: data }
//     });
//     return await modal.present();
   
//   });
// }
// if(mydata.ID == 0){
//   let alert =   await this.alertController.create({
//     header: 'User Detail',
//     message: 'No user found',
//     buttons: ['Dismiss']
//   });
//   await alert.present();
// }
//  });
  
 }
 

  

}

