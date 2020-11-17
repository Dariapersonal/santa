import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl'],
})
export class MainComponent implements OnInit {
  firstTry

  loginСheck() {
    localStorage.getItem('loginIn') ? this.firstTry = false : this.firstTry = true;
  }

  ngOnInit(): void {
    this.loginСheck();
  }

  constructor() {}
  
}
