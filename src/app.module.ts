import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from "./app.controller";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {ProfileModule} from "./profile/profile.module";
import {ConfigModule} from "@nestjs/config";
import {RoleModule} from "./role/role.module";

import {Module, NestModule, RequestMethod, MiddlewareConsumer} from '@nestjs/common';
import {RoleMiddleware} from "./middleware/role.middleware";
import {PermissionModule} from "./permission/permission.module";
import {MulterModule} from "@nestjs/platform-express";
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({

    controllers: [AppController],
    imports: [
        MulterModule.register({
            dest: './files',
        }),

        // ServeStaticModule.forRoot({
        //   rootPath: join(__dirname, '..', 'files')
        // }),

        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            cache: true,
            expandVariables: true,

        }),
        MongooseModule.forRoot('mongodb://localhost/ACLNestjs', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }),
        RoleModule,
        UserModule,
        AuthModule,
        ProfileModule,
        PermissionModule,
        UploadFileModule
    ],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RoleMiddleware)
            .forRoutes({path: 'profile', method: RequestMethod.GET});
    }
}
