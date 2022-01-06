import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/Users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async join(email: string, nickname: string, password: string) {
    if (!email) {
      //이메일이 없을 시 에러
      throw new HttpException('이메일이 존재하지 않습니다.', 400);
    }
    if (!nickname) {
      //닉네임이 없을 시 에러
      throw new HttpException('닉네임이 존재하지 않습니다.', 400);
    }
    3;
    if (!password) {
      // 비밀번호 없을 시 에러
      throw new HttpException('비밀번호이 존재하지 않습니다.', 400);
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // 이미 존재하는 유저 에러
      throw new HttpException('이미 존재하는 사용자 입니다.', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
