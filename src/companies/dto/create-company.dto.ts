// data transfer object
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty({
        message: 'Name không được để trống?',
    })
    name: string; // Mặc định là public

    @IsNotEmpty({
        message: 'Address chỉ không được để trống?',
    })
    address: string;

    @IsNotEmpty({
        message: 'Description không được để trống?',
    })
    description: string;

    @IsNotEmpty({
        message: 'Logo không được để trống?',
    })
    logo: string

}
