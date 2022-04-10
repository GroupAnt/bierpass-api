import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
  acessToken: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const { token } = req.headers;
    if (!token) {
      throw new UnauthorizedException();
    }

    req.user = await this.userService.findOne(token as string);

    next();
  }
}
