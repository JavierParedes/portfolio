import { Component , OnInit} from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import {Router, ActivatedRoute, Params } from '@angular/router'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService, UserService]
})
export class DetailComponent implements OnInit{
  public url: string;
  public project: Project;
  public confirm: boolean;
  public identity: string;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ){
    this.url = Global.url;
    this.project = new Project('', '', '', '', 2019, '', '');
    this.confirm=false;
    this.identity="";
  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProject(id);
      this.identity = this._userService.getIdentity();
    });
  }

  getProject(id:any){
    this._projectService.getProject(id).subscribe(
      response =>{
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteProject(id:any){
    this._projectService.deleteProject(id).subscribe(
      response =>{
        if(response.project){
          this._router.navigate(['/proyectos']);
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
