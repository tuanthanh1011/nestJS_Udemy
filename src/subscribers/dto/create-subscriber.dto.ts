import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriberDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    name: string;

    @IsEmail({}, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Email không được để trống'})
    email: string;

    @IsNotEmpty({ message: 'Skills không được để trống'})
    @IsArray({ message: 'Skills có định dạng là array'})
    @IsString({ each: true, message: 'Skills dịnh dạng là string'})
    skills: string[];

}
