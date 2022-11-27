import { Document } from 'mongoose';

export interface IRole extends Document {
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly permissions: any;
}
