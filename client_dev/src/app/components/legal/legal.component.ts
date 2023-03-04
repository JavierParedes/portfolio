import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit{
  
  public title: string;
  
  constructor(){
    this.title="Aviso Legal"
  }

  ngOnInit(): void {
    
  }

}
