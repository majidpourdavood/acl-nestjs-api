import { Document } from 'mongoose';

export interface IPermission extends Document {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly _id: string;
}
