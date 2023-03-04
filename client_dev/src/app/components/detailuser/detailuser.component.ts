import { Component , OnInit} from '@angular/core';
import { Global } from 'src/app/services/global';
import {Router, ActivatedRoute, Params } from '@angular/router'
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.css'],
  providers: [UserService]
})
export class DetailuserComponent {
  public url: string;
  public userdata: User;
  public confirm: boolean;
  public identity: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ){
    this.url = Global.url;
    this.userdata = new User('','','','','','User','','');
    this.confirm=false;
    this.identity="";
  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.identity = this._userService.getIdentity();
    });
  }

  getUser(id:any){
    this._userService.getUser(id).subscribe(
      response =>{
        this.userdata = response.user;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteUser(id:any){
    this._userService.deleteUser(id).subscribe(
      response =>{
        if(response.user){
          this._router.navigate(['/usuarios']);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setConfirm(confirmar:any){
    this.confirm  = confirmar;
  }

}
