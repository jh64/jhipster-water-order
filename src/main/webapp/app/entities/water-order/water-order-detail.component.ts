import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWaterOrder } from 'app/shared/model/water-order.model';

@Component({
  selector: 'jhi-water-order-detail',
  templateUrl: './water-order-detail.component.html',
})
export class WaterOrderDetailComponent implements OnInit {
  waterOrder: IWaterOrder | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ waterOrder }) => (this.waterOrder = waterOrder));
  }

  previousState(): void {
    window.history.back();
  }
}
