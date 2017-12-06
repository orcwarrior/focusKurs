import { Component, OnInit, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

@NgModule({
  imports:      [FormsModule],
  declarations: [
  ]
})

export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
