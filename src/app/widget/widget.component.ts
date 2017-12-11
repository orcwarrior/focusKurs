import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, Routes} from '@angular/router';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  numer = '';
  validator = /^[0-9]{9}$/;

  constructor(private router: Router) {
  }

  isValidNumber() {
    return this.validator.test(this.numer);
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.isValidNumber()) return;
    this.router.navigate(['/ringing/' + this.numer]);
  }
}
