import { Component, OnInit,  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, ProjectService]
})
export class HomeComponent implements OnInit{
  public projects: any;
  public identity: any;
  public title: string;
  public url: string;

  public nombre: string ="";
  public correo: string ="";
  public text_mensaje: string = "";
  public text_asunto: string ="";


  constructor(
    private _userService: UserService,
    private _projectService: ProjectService,
    private httpclien:HttpClient
  ){
    this.projects= _projectService;
    this.title="Javier Paredes Vela"
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getProjects();
    
  }

  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.projects){
          this.projects = response.projects
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form:any){
    Loading.standard('Cargando..'); 
    let params = {
      nombre: form.name,
      email: form.email,
      asunto: form.asunto,
      mensaje: form.mensaje
    }
    
    console.log(params)
    this.httpclien.post('http://localhost:3000/envio',params).subscribe(resp=>{
      Loading.remove();
      Notify.success('Enviado correctamente')
    })
    
  }

}
