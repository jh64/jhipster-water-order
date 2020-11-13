import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IFarm } from 'app/shared/model/farm.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IWaterOrder {
  id?: number;
  startTimestamp?: Moment;
  duration?: number;
  status?: Status;
  user?: IUser;
  farm?: IFarm;
}

export class WaterOrder implements IWaterOrder {
  constructor(
    public id?: number,
    public startTimestamp?: Moment,
    public duration?: number,
    public status?: Status,
    public user?: IUser,
    public farm?: IFarm
  ) {}
}
