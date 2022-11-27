import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionSchema } from './schemas/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Permission',
        schema: PermissionSchema,
      },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports:[PermissionService]
})
export class PermissionModule {}
