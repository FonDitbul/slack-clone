import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UsersEntity } from '../entities/Users.entity';
import * as bcrypt from 'bcrypt';
import { WorkspaceMembersEntity } from '../entities/WorkspaceMembers.entity';
import { ChannelMembersEntity } from '../entities/ChannelMembers.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @InjectRepository(WorkspaceMembersEntity)
    private workspaceMembersRepository: Repository<WorkspaceMembersEntity>,
    @InjectRepository(ChannelMembersEntity)
    private channelMembersRepository: Repository<ChannelMembersEntity>,
    private connection: Connection,
  ) {}

  async join(email: string, nickname: string, password: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(UsersEntity)
      .findOne({ where: { email } });
    if (user) {
      // 이미 존재하는 유저 에러
      throw new ForbiddenException('이미 존재하는 사용자 입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const returned = await this.usersRepository.save({
        email,
        nickname,
        password: hashedPassword,
      });
      const workspaceMember = queryRunner.manager
        .getRepository(WorkspaceMembersEntity)
        .create();
      workspaceMember.UserId = returned.id;
      workspaceMember.WorkspaceId = 1;
      await queryRunner.manager
        .getRepository(WorkspaceMembersEntity)
        .save(workspaceMember);
      await queryRunner.manager.getRepository(ChannelMembersEntity).save({
        UserId: returned.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
