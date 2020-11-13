import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFarm } from 'app/shared/model/farm.model';

type EntityResponseType = HttpResponse<IFarm>;
type EntityArrayResponseType = HttpResponse<IFarm[]>;

@Injectable({ providedIn: 'root' })
export class FarmService {
  public resourceUrl = SERVER_API_URL + 'api/farms';

  constructor(protected http: HttpClient) {}

  create(farm: IFarm): Observable<EntityResponseType> {
    return this.http.post<IFarm>(this.resourceUrl, farm, { observe: 'response' });
  }

  update(farm: IFarm): Observable<EntityResponseType> {
    return this.http.put<IFarm>(this.resourceUrl, farm, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFarm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFarm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
