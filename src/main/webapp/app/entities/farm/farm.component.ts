import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFarm } from 'app/shared/model/farm.model';
import { FarmService } from './farm.service';
import { FarmDeleteDialogComponent } from './farm-delete-dialog.component';

@Component({
  selector: 'jhi-farm',
  templateUrl: './farm.component.html',
})
export class FarmComponent implements OnInit, OnDestroy {
  farms?: IFarm[];
  eventSubscriber?: Subscription;

  constructor(protected farmService: FarmService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.farmService.query().subscribe((res: HttpResponse<IFarm[]>) => (this.farms = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFarms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFarm): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFarms(): void {
    this.eventSubscriber = this.eventManager.subscribe('farmListModification', () => this.loadAll());
  }

  delete(farm: IFarm): void {
    const modalRef = this.modalService.open(FarmDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.farm = farm;
  }
}
