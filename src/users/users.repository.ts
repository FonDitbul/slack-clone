import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from '../entities/Users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {}
