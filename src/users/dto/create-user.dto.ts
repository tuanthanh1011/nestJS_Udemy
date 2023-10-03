// data transfer object
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: "Email không đúng định dạng" })
    @IsNotEmpty({
        message: 'Email không được để trống?',
    })
    email: string; // Mặc định là public

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;
}
