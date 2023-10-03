import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
// kế thừa lại tất cả thuộc tinh của createUserDto

// Bỏ thuộc tính password (Không cho cập nhật pass)
export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    _id: string; // cho biết khi gửi request thì sẽ có _id trong body
}

