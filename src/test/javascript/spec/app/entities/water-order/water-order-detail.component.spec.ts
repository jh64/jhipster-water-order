import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WaterorderTestModule } from '../../../test.module';
import { WaterOrderDetailComponent } from 'app/entities/water-order/water-order-detail.component';
import { WaterOrder } from 'app/shared/model/water-order.model';

describe('Component Tests', () => {
  describe('WaterOrder Management Detail Component', () => {
    let comp: WaterOrderDetailComponent;
    let fixture: ComponentFixture<WaterOrderDetailComponent>;
    const route = ({ data: of({ waterOrder: new WaterOrder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WaterorderTestModule],
        declarations: [WaterOrderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WaterOrderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WaterOrderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load waterOrder on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.waterOrder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
