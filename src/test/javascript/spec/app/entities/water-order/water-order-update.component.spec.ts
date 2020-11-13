import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WaterorderTestModule } from '../../../test.module';
import { WaterOrderUpdateComponent } from 'app/entities/water-order/water-order-update.component';
import { WaterOrderService } from 'app/entities/water-order/water-order.service';
import { WaterOrder } from 'app/shared/model/water-order.model';

describe('Component Tests', () => {
  describe('WaterOrder Management Update Component', () => {
    let comp: WaterOrderUpdateComponent;
    let fixture: ComponentFixture<WaterOrderUpdateComponent>;
    let service: WaterOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WaterorderTestModule],
        declarations: [WaterOrderUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WaterOrderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WaterOrderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WaterOrderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WaterOrder(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new WaterOrder();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
