import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PanelComponent} from './panel/panel.component';
import {WidgetComponent} from './widget/widget.component';
import {CallService} from './call.service';
import {RingingComponent} from './ringing/ringing.component';
import {CallComponent} from './call/call.component';
import {FinishedComponent} from './finished/finished.component';

import {Routes, RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    WidgetComponent,
    RingingComponent,
    CallComponent,
    FinishedComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule,
    AppRoutes
  ],
  providers: [CallService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
