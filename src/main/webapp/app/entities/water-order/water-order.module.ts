import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WaterorderSharedModule } from 'app/shared/shared.module';
import { WaterOrderComponent } from './water-order.component';
import { WaterOrderDetailComponent } from './water-order-detail.component';
import { WaterOrderUpdateComponent } from './water-order-update.component';
import { WaterOrderDeleteDialogComponent } from './water-order-delete-dialog.component';
import { waterOrderRoute } from './water-order.route';

@NgModule({
  imports: [WaterorderSharedModule, RouterModule.forChild(waterOrderRoute)],
  declarations: [WaterOrderComponent, WaterOrderDetailComponent, WaterOrderUpdateComponent, WaterOrderDeleteDialogComponent],
  entryComponents: [WaterOrderDeleteDialogComponent],
})
export class WaterorderWaterOrderModule {}
