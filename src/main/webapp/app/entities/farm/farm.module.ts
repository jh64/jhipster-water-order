import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WaterorderSharedModule } from 'app/shared/shared.module';
import { FarmComponent } from './farm.component';
import { FarmDetailComponent } from './farm-detail.component';
import { FarmUpdateComponent } from './farm-update.component';
import { FarmDeleteDialogComponent } from './farm-delete-dialog.component';
import { farmRoute } from './farm.route';

@NgModule({
  imports: [WaterorderSharedModule, RouterModule.forChild(farmRoute)],
  declarations: [FarmComponent, FarmDetailComponent, FarmUpdateComponent, FarmDeleteDialogComponent],
  entryComponents: [FarmDeleteDialogComponent],
})
export class WaterorderFarmModule {}
