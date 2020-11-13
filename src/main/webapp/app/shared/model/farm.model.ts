import { IUser } from 'app/core/user/user.model';

export interface IFarm {
  id?: number;
  name?: string;
  user?: IUser;
}

export class Farm implements IFarm {
  constructor(public id?: number, public name?: string, public user?: IUser) {}
}
