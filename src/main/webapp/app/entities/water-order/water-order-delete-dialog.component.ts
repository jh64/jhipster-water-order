import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWaterOrder } from 'app/shared/model/water-order.model';
import { WaterOrderService } from './water-order.service';

@Component({
  templateUrl: './water-order-delete-dialog.component.html',
})
export class WaterOrderDeleteDialogComponent {
  waterOrder?: IWaterOrder;

  constructor(
    protected waterOrderService: WaterOrderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.waterOrderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('waterOrderListModification');
      this.activeModal.close();
    });
  }
}
