import { ApiProperty } from '@nestjs/swagger';
import { joinRequestDto } from '../../users/dto/join.request.dto';

export class UserDto extends joinRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}
