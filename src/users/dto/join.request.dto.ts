import { PickType } from '@nestjs/swagger';
import { UsersEntity } from '../../entities/Users.entity';

export class joinRequestDto extends PickType(UsersEntity, [
  'email',
  'nickname',
  'password',
] as const) {}
