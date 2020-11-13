import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WaterorderTestModule } from '../../../test.module';
import { FarmUpdateComponent } from 'app/entities/farm/farm-update.component';
import { FarmService } from 'app/entities/farm/farm.service';
import { Farm } from 'app/shared/model/farm.model';

describe('Component Tests', () => {
  describe('Farm Management Update Component', () => {
    let comp: FarmUpdateComponent;
    let fixture: ComponentFixture<FarmUpdateComponent>;
    let service: FarmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WaterorderTestModule],
        declarations: [FarmUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FarmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FarmUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FarmService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Farm(123);
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
        const entity = new Farm();
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
