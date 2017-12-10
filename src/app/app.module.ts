import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PanelComponent} from './panel/panel.component';
import {WidgetComponent} from './widget/widget.component';
import {CallService} from './call.service';
import {RingingComponent} from './ringing/ringing.component';
import {CallStatus} from './call-status';
import {Routes, RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    WidgetComponent,
    RingingComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [CallService, CallStatus],
  bootstrap: [AppComponent]
})
export class AppModule {
}
