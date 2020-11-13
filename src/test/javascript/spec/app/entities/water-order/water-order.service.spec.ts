import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { WaterOrderService } from 'app/entities/water-order/water-order.service';
import { IWaterOrder, WaterOrder } from 'app/shared/model/water-order.model';
import { Status } from 'app/shared/model/enumerations/status.model';

describe('Service Tests', () => {
  describe('WaterOrder Service', () => {
    let injector: TestBed;
    let service: WaterOrderService;
    let httpMock: HttpTestingController;
    let elemDefault: IWaterOrder;
    let expectedResult: IWaterOrder | IWaterOrder[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(WaterOrderService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new WaterOrder(0, currentDate, 0, Status.REQUESTED);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startTimestamp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a WaterOrder', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startTimestamp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTimestamp: currentDate,
          },
          returnedFromService
        );

        service.create(new WaterOrder()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WaterOrder', () => {
        const returnedFromService = Object.assign(
          {
            startTimestamp: currentDate.format(DATE_TIME_FORMAT),
            duration: 1,
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTimestamp: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of WaterOrder', () => {
        const returnedFromService = Object.assign(
          {
            startTimestamp: currentDate.format(DATE_TIME_FORMAT),
            duration: 1,
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startTimestamp: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a WaterOrder', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
