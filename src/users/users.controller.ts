import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { joinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { User } from '../common/decorators/user.decorator';

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @ApiResponse({
    type: UserDto,
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Post()
  postUsers(@Body() data: joinRequestDto) {
    this.usersService.postUsers(data);
    return;
  }

  @ApiOkResponse({
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
