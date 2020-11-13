import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFarm, Farm } from 'app/shared/model/farm.model';
import { FarmService } from './farm.service';
import { FarmComponent } from './farm.component';
import { FarmDetailComponent } from './farm-detail.component';
import { FarmUpdateComponent } from './farm-update.component';

@Injectable({ providedIn: 'root' })
export class FarmResolve implements Resolve<IFarm> {
  constructor(private service: FarmService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFarm> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((farm: HttpResponse<Farm>) => {
          if (farm.body) {
            return of(farm.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Farm());
  }
}

export const farmRoute: Routes = [
  {
    path: '',
    component: FarmComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Farms',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FarmDetailComponent,
    resolve: {
      farm: FarmResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Farms',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FarmUpdateComponent,
    resolve: {
      farm: FarmResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Farms',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FarmUpdateComponent,
    resolve: {
      farm: FarmResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Farms',
    },
    canActivate: [UserRouteAccessService],
  },
];
