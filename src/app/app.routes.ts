import { RingingComponent } from './ringing/ringing.component';
import {WidgetComponent} from './widget/widget.component';
import {IntroComponent} from "./intro/intro.component";


const AppRoutes = [
  { path: '', component: IntroComponent },
  { path: 'ringing/:numer', component: RingingComponent },
  { path: 'call', component: WidgetComponent },
];

export {AppRoutes};

