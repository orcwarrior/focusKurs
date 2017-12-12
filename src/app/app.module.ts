import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PanelComponent} from './panel/panel.component';
import {WidgetComponent} from './widget/widget.component';
import {RingingComponent} from './ringing/ringing.component';
import {Routes, RouterModule} from '@angular/router';
import {AppRoutes} from './app.routes';
import { IntroComponent } from './intro/intro.component';

// providers
import {CallStatus} from './call-status';
import {CallService} from './call.service';

import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import {BridgeStatus} from './bridge-status';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    WidgetComponent,
    RingingComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, HttpClientModule, InlineSVGModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [CallService, CallStatus, BridgeStatus],
  bootstrap: [AppComponent]
})
export class AppModule {
}
