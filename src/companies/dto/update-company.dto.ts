import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    _id: string
}

// Khi sử dụng PartialType thì các option sẽ ko được extends: nghĩa là không bắt buộc truyền