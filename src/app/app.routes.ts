import { RingingComponent } from './ringing/ringing.component';
import { CallComponent } from './call/call.component';
import { FinishedComponent } from './finished/finished.component';
import {WidgetComponent} from './widget/widget.component';

import {Routes, RouterModule} from '@angular/router';

const AppRoutes = RouterModule.forRoot([
  { path: '', component: WidgetComponent },
  { path: 'ringing/:number', component: RingingComponent },
  { path: 'finished/:number', component: FinishedComponent },
  { path: 'call', component: CallComponent }
]);

export {AppRoutes};

