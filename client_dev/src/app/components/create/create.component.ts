import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/uploadservice';
import { Global } from 'src/app/services/global';
import { from } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit{

    public title: string;
    public project: Project;
    public status: string = "";
    public save_project: any;
    public filesToUpload: Array<File> = [];
    public url: string;

    constructor(
      private _projectService: ProjectService,
      private _uploadService: UploadService
    ){
      this.title= "Crear Projecto";
      this.project= new Project('','','','',2023,'','');
      this.url = Global.url;
    }

    ngOnInit(){
      
    }

    onSubmit(form:any){

      //Guardar datos
      this._projectService.saveProject(this.project).subscribe(
          response => {
            if(response.project){
              this.status='success';

              //Subir Imagen
              this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[],this.filesToUpload,'image')
              .then((result:any)=>{
                  this.save_project = result.project._id;

                  this.status='success';
                  form.reset();
              });

            
            }else{
              this.status='failed';
            }
          },
          error => {
            console.log(<any>error);
          }
      )
    }

    fileChangeEvent(fileInput:any){
       this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}
