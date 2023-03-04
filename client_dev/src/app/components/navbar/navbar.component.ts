import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  public identity: any;
  public url: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.identity="";
    this.url= Global.url;

  }

  ngOnInit(){
      this.identity = this._userService.getIdentity();
  
  }

  logout(){
    localStorage.clear();
    this.identity="";
    this._router.navigate(['/home']);
  }

}
