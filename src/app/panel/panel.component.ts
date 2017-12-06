import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports:      [FormsModule],
  declarations: [
    SignupComponent,
    LoginComponent
  ]
})
