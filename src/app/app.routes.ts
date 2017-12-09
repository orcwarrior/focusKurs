import { RingingComponent } from './ringing/ringing.component';
import {WidgetComponent} from './widget/widget.component';


const AppRoutes = [
  { path: '', component: WidgetComponent },
  { path: 'ringing/:numer', component: RingingComponent },
];

export {AppRoutes};

