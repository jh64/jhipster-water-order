import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFarm } from 'app/shared/model/farm.model';
import { FarmService } from './farm.service';

@Component({
  templateUrl: './farm-delete-dialog.component.html',
})
export class FarmDeleteDialogComponent {
  farm?: IFarm;

  constructor(protected farmService: FarmService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.farmService.delete(id).subscribe(() => {
      this.eventManager.broadcast('farmListModification');
      this.activeModal.close();
    });
  }
}
