import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWaterOrder, WaterOrder } from 'app/shared/model/water-order.model';
import { WaterOrderService } from './water-order.service';
import { WaterOrderComponent } from './water-order.component';
import { WaterOrderDetailComponent } from './water-order-detail.component';
import { WaterOrderUpdateComponent } from './water-order-update.component';

@Injectable({ providedIn: 'root' })
export class WaterOrderResolve implements Resolve<IWaterOrder> {
  constructor(private service: WaterOrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWaterOrder> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((waterOrder: HttpResponse<WaterOrder>) => {
          if (waterOrder.body) {
            return of(waterOrder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WaterOrder());
  }
}

export const waterOrderRoute: Routes = [
  {
    path: '',
    component: WaterOrderComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'WaterOrders',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WaterOrderDetailComponent,
    resolve: {
      waterOrder: WaterOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'WaterOrders',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WaterOrderUpdateComponent,
    resolve: {
      waterOrder: WaterOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'WaterOrders',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WaterOrderUpdateComponent,
    resolve: {
      waterOrder: WaterOrderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'WaterOrders',
    },
    canActivate: [UserRouteAccessService],
  },
];
