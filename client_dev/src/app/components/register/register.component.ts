import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/uploadservice';
import { Global } from 'src/app/services/global';
import { finalize, from, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, UploadService]
})
export class RegisterComponent implements OnInit{
  public title:string;
  public user: User;
  public status: string = "";
  public save_user: any;
  public filesToUpload: Array<File> = [];
  public url: string;

  constructor(
    private _userService: UserService,
    private _uploadService: UploadService
  ){
    this.title = 'Registrate';
    this.user = new User('','','','','','User','','');

    this.url = Global.url;
  }

  ngOnInit(){
      
  }

  onSubmit(form:any){

    //Guardar datos
    this._userService.saveUser(this.user).pipe(finalize(()=>{form.reset();}) ,switchMap((response)=>{
      if (!response || !response.userdata){
        return of(null);
      }
        return from( this._uploadService.makeFileRequest(Global.url+"upload-image-user/"+response.userdata._id,[],this.filesToUpload,'image'));

    })).subscribe(
      {next:(response:any)=>{
        if (!response || !response.userdata){
         this.status='failed';
         return;
        }

        this.save_user = response.userdata._id;
        this.status='success';
    
      }, error:(error)=>{
        console.log(<any>error);
        this.status='failed';
      }}
    )
  }

  fileChangeEvent(fileInput:any){
     this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
