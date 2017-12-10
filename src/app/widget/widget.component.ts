import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  numer: string;
  validator = /^[0-9]{9}$/;

  constructor() { }
  isValidNumber() {
    return this.validator.test(this.numer);
  }
  ngOnInit() {
  }

}
