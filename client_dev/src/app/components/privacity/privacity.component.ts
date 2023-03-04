import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacity',
  templateUrl: './privacity.component.html',
  styleUrls: ['./privacity.component.css']
})
export class PrivacityComponent implements OnInit{

  public title: string;
  
  constructor(){
    this.title="Políticas de Privacidad"
  }

  ngOnInit(): void {
    
  }

}
