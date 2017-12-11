import { Component, OnInit } from '@angular/core';
import {Globals} from "../app.globals";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(private globals: Globals) { }

  ngOnInit() {
    // Ugly as hell, but...
    setTimeout(() => {
      this.globals.phone = true;
    }, 800)
  }

}
