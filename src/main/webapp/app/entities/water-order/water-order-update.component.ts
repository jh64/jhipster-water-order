import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWaterOrder, WaterOrder } from 'app/shared/model/water-order.model';
import { WaterOrderService } from './water-order.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IFarm } from 'app/shared/model/farm.model';
import { FarmService } from 'app/entities/farm/farm.service';

type SelectableEntity = IUser | IFarm;

@Component({
  selector: 'jhi-water-order-update',
  templateUrl: './water-order-update.component.html',
})
export class WaterOrderUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  farms: IFarm[] = [];

  editForm = this.fb.group({
    id: [],
    startTimestamp: [null, [Validators.required]],
    duration: [null, [Validators.required]],
    status: [],
    user: [],
    farm: [],
  });

  constructor(
    protected waterOrderService: WaterOrderService,
    protected userService: UserService,
    protected farmService: FarmService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ waterOrder }) => {
      if (!waterOrder.id) {
        const today = moment().startOf('day');
        waterOrder.startTimestamp = today;
      }

      this.updateForm(waterOrder);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.farmService.query().subscribe((res: HttpResponse<IFarm[]>) => (this.farms = res.body || []));
    });
  }

  updateForm(waterOrder: IWaterOrder): void {
    this.editForm.patchValue({
      id: waterOrder.id,
      startTimestamp: waterOrder.startTimestamp ? waterOrder.startTimestamp.format(DATE_TIME_FORMAT) : null,
      duration: waterOrder.duration,
      status: waterOrder.status,
      user: waterOrder.user,
      farm: waterOrder.farm,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const waterOrder = this.createFromForm();
    if (waterOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.waterOrderService.update(waterOrder));
    } else {
      this.subscribeToSaveResponse(this.waterOrderService.create(waterOrder));
    }
  }

  private createFromForm(): IWaterOrder {
    return {
      ...new WaterOrder(),
      id: this.editForm.get(['id'])!.value,
      startTimestamp: this.editForm.get(['startTimestamp'])!.value
        ? moment(this.editForm.get(['startTimestamp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      duration: this.editForm.get(['duration'])!.value,
      status: this.editForm.get(['status'])!.value,
      user: this.editForm.get(['user'])!.value,
      farm: this.editForm.get(['farm'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWaterOrder>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
