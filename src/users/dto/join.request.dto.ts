import { ApiProperty } from '@nestjs/swagger';

export class joinRequestDto {
  @ApiProperty({
    example: 'gweongi@gmail.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: 'gweongi',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'node',
    description: '비밀번호',
    required: true,
  })
  public password: string;
}
