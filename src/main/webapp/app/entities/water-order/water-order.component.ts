import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWaterOrder } from 'app/shared/model/water-order.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { WaterOrderService } from './water-order.service';
import { WaterOrderDeleteDialogComponent } from './water-order-delete-dialog.component';

@Component({
  selector: 'jhi-water-order',
  templateUrl: './water-order.component.html',
})
export class WaterOrderComponent implements OnInit, OnDestroy {
  waterOrders: IWaterOrder[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected waterOrderService: WaterOrderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.waterOrders = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.waterOrderService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IWaterOrder[]>) => this.paginateWaterOrders(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.waterOrders = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWaterOrders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWaterOrder): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWaterOrders(): void {
    this.eventSubscriber = this.eventManager.subscribe('waterOrderListModification', () => this.reset());
  }

  delete(waterOrder: IWaterOrder): void {
    const modalRef = this.modalService.open(WaterOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.waterOrder = waterOrder;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateWaterOrders(data: IWaterOrder[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.waterOrders.push(data[i]);
      }
    }
  }
}
