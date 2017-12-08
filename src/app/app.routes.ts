import { RingingComponent } from './ringing/ringing.component';
import { CallComponent } from './call/call.component';
import { FinishedComponent } from './finished/finished.component';
import {WidgetComponent} from './widget/widget.component';


const AppRoutes = [
  { path: '', component: WidgetComponent },
  { path: 'ringing/:numer', component: RingingComponent },
  { path: 'finished/:numer', component: FinishedComponent },
  { path: 'call', component: CallComponent }
];

export {AppRoutes};

