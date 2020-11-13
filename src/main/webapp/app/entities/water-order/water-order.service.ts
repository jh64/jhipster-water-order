import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWaterOrder } from 'app/shared/model/water-order.model';

type EntityResponseType = HttpResponse<IWaterOrder>;
type EntityArrayResponseType = HttpResponse<IWaterOrder[]>;

@Injectable({ providedIn: 'root' })
export class WaterOrderService {
  public resourceUrl = SERVER_API_URL + 'api/water-orders';

  constructor(protected http: HttpClient) {}

  create(waterOrder: IWaterOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(waterOrder);
    return this.http
      .post<IWaterOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(waterOrder: IWaterOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(waterOrder);
    return this.http
      .put<IWaterOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IWaterOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWaterOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(waterOrder: IWaterOrder): IWaterOrder {
    const copy: IWaterOrder = Object.assign({}, waterOrder, {
      startTimestamp: waterOrder.startTimestamp && waterOrder.startTimestamp.isValid() ? waterOrder.startTimestamp.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startTimestamp = res.body.startTimestamp ? moment(res.body.startTimestamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((waterOrder: IWaterOrder) => {
        waterOrder.startTimestamp = waterOrder.startTimestamp ? moment(waterOrder.startTimestamp) : undefined;
      });
    }
    return res;
  }
}
