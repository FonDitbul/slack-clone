import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/Users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {
    super();
  }

  serializeUser(user: UsersEntity, done: CallableFunction): any {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.usersRepository
      .findOneOrFail(
        { id: +userId },
        { select: ['id', 'email', 'nickname'], relations: ['Workspaces'] },
      )
      .then((user) => {
        // console.log('user', user);
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
