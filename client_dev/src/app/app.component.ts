import { Component, Output, EventEmitter, OnInit } from '@angular/core'; 
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CookieService]
})
export class AppComponent implements OnInit {
  public title = 'Portafolio Jparvel';
  public identity: any;

  cookieValue = 'UNKNOWN';
 
  constructor(
    private _userService: UserService,
    private _cookieService: CookieService
  ){

  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();

    this._cookieService.set( 'Cookie', 'GDPR' );
    this.cookieValue = this._cookieService.get('Cookie');
    
  }

  visible: boolean = true;
 
  @Output() close: EventEmitter<any> = new EventEmitter();
 
  onGRDP() {
    console.log("estoy haciendo click");
    this.visible = false;
      if (this.visible) {        
        this.close.emit(null);
      }
  }
}
