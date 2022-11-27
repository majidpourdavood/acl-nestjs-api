import { Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import {UserService} from 'src/user/user.service';
import {Helpers} from "../helpers/helpers";
import {RoleService} from "../role/role.service";
import {PermissionService} from "../permission/permission.service";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class RoleMiddleware implements NestMiddleware {

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private permissionService: PermissionService,
        private roleService: RoleService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            let response = Helpers.sendJson(0, [],
                [], "NotAuthenticated", {});
            res.status(401).json(response);
        }
        const token = authHeader.split(' ')[1];

        let username;
        try {

            let username = await this.authService.getUserName(token);
            let user = await this.userService.findByUserName(username);
            let permissionPath = await this.permissionService.getPermissionBySlug(req.route.path);

            if (!permissionPath) {
                let response = Helpers.sendJson(0, [],
                    "NotAuthenticated", "NotAuthenticated", {});
                res.status(401).json(response);
            }

            let roles = await this.roleService.getRoleForUser(user.roles);


            if (roles.length > 0) {
                for (let i = 0; i < roles.length; i++) {

                    const permissions = roles[i].permissions ? roles[i].permissions : [];

                    if (permissions.length > 0) {
                        const validate = permissions.filter(permission => permission.toString() == permissionPath._id);

                        if (validate.length > 0) {
                            next();
                        } else {
                            let response = Helpers.sendJson(0, [],
                                "NotAuthenticated", "NotAuthenticated", {});
                            res.status(401).json(response);
                        }

                    } else {
                        let response = Helpers.sendJson(0, [],
                            "NotAuthenticated", "NotAuthenticated", {});
                        res.status(401).json(response);
                    }
                }
            } else {
                let response = Helpers.sendJson(0, [],
                    "NotAuthenticated", "NotAuthenticated", {});
                res.status(401).json(response);
            }

        } catch (err) {
            let response = Helpers.sendJson(0, [],
                err.toString(), "ServerError", {});
            res.status(500).json(response);
        }

    }
}
