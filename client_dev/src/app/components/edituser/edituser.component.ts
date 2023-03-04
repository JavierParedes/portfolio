import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service'; 
import { UploadService } from 'src/app/services/uploadservice';
import { Global } from 'src/app/services/global';
import {Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-edituser',
  templateUrl: 'edituser.component.html',
  styleUrls: ['./edituser.component.css'],
  providers: [UserService, UploadService]
})

export class EdituserComponent {

    public title: string;
    public user: User;
    public status: string = "";
    public save_user: any;
    public filesToUpload: Array<File> = [];
    public url: string;

    constructor(
      private _userService: UserService,
      private _uploadService: UploadService,
      private _router: Router,
      private _route: ActivatedRoute
    ){
      this.title= "Editar Usuario";
      this.url= Global.url;
      this.user = new User('','','','','','User','','');
    }

    ngOnInit(){
      this._route.params.subscribe(params => {
        let id = params['id'];
        this.getUser(id);
      });
    }

    getUser(id:any){
      this._userService.getUser(id).subscribe(
        response =>{
          this.user = response.user;
        },
        error => {
          console.log(<any>error);
        }
      )
    }

    onSubmit(form:any){
      this._userService.updateUser(this.user).subscribe(
        response =>{
          console.log(response.userdata);
          if(response.userdata){
            this.status='success';
            //Subir Imagen
            if(this.filesToUpload.length > 0)
            {
              this._uploadService.makeFileRequest(Global.url+"upload-image-user/"+response.userdata._id,[],this.filesToUpload,'image')
              .then((result:any)=>{
                  this.save_user = result.userdata._id;
                  this.status='success';
            });
            }else{
                this.save_user = response.userdata.id;

                this.status='success';
            }

          
          }else{
            this.status='failed';
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }

    fileChangeEvent(fileInput:any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
     }


}
