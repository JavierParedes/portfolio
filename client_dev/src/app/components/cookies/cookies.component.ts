import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  public title: string;
  
  constructor(){
    this.title="Políticas de Cookies"
  }

  ngOnInit(): void {
    
  }

}
