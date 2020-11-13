import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WaterorderTestModule } from '../../../test.module';
import { FarmComponent } from 'app/entities/farm/farm.component';
import { FarmService } from 'app/entities/farm/farm.service';
import { Farm } from 'app/shared/model/farm.model';

describe('Component Tests', () => {
  describe('Farm Management Component', () => {
    let comp: FarmComponent;
    let fixture: ComponentFixture<FarmComponent>;
    let service: FarmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WaterorderTestModule],
        declarations: [FarmComponent],
      })
        .overrideTemplate(FarmComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FarmComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FarmService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Farm(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.farms && comp.farms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
