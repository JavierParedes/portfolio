import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  public title: string;
  public nombre: string ="";
  public correo: string ="";
  public text_mensaje: string = "";
  public text_asunto: string ="";

  constructor ( private httpclien:HttpClient){
    this.title="Contacto"
  }

  ngOnInit(): void {
    
    
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
