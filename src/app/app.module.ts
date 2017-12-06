import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PanelComponent} from './panel/panel.component';
import {WidgetComponent} from './widget/widget.component';
import {CallService} from './call.service';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    WidgetComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule
  ],
  providers: [CallService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
