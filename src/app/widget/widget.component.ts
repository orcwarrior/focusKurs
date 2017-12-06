import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CallService} from "../call.service";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  numer: string;
  validator = /^[0-9]{9}$/

  constructor(private callService: CallService) { }
  call() {
    if (this.isValidNumber()) {
      this.callService.placeCall(this.numer);
    }
  }
  isValidNumber() {
    return this.validator.test(this.numer);
  }
  ngOnInit() {
  }

}
