import { Routes } from '@angular/router';
import { ExcuseComponent } from './components/excuse/excuse.component';
import { excuseResolver } from './service/excuse.service';

export const routes: Routes = [
    {
        path: 'e/:id',
        component: ExcuseComponent,
        pathMatch: 'full',
        resolve: {
          data: excuseResolver,
        },
      },
];
