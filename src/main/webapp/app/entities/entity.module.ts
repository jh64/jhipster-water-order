import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'farm',
        loadChildren: () => import('./farm/farm.module').then(m => m.WaterorderFarmModule),
      },
      {
        path: 'water-order',
        loadChildren: () => import('./water-order/water-order.module').then(m => m.WaterorderWaterOrderModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class WaterorderEntityModule {}
