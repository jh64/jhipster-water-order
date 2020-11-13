import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WaterorderTestModule } from '../../../test.module';
import { FarmDetailComponent } from 'app/entities/farm/farm-detail.component';
import { Farm } from 'app/shared/model/farm.model';

describe('Component Tests', () => {
  describe('Farm Management Detail Component', () => {
    let comp: FarmDetailComponent;
    let fixture: ComponentFixture<FarmDetailComponent>;
    const route = ({ data: of({ farm: new Farm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WaterorderTestModule],
        declarations: [FarmDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FarmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FarmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load farm on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.farm).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
