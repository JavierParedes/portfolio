import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {
  public title:string;
  public user: User;
  public status:string;
  public identity: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.title="Login";
    this.user = new User('','','','','','User','','');
    this.status="";
    this.identity="";
  }

  ngOnInit(){
  
    
  }

  onSubmit(){
      this._userService.signup(this.user).subscribe(
        response => {
          console.log(response.UserLogin);
          this.identity = response.UserLogin;
          console.log(this.identity);
          if(!this.identity ){
            this.status='error';
            console.log("error");
          }else{
            this.status='success';
            localStorage.setItem('identity', JSON.stringify(this.identity));
            this._router.navigate(['/home']);
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);

          if (errorMessage != null){
            this.status = 'failed';
          }
        }
      )
  }
}
