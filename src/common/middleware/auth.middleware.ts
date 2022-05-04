import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  NotFoundException,
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

    const user = await this.userService.findOne(token as string);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    req.user = user;

    next();
  }
}
