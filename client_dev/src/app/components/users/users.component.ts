import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Global } from 'src/app/services/global';
import {Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent {

  public users: User[] = [];
  public url: string = "";
  public confirm: boolean;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.url = Global.url;
    this.confirm =false;
  }

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      response => {
        if(response.users){
          this.users = response.users
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  deleteUser(id:any){
    this._userService.deleteUser(id).subscribe(
      response =>{
        if(response.userdata){
          this._router.navigate(['/administrador']);
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
