import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested, isNotEmpty } from "class-validator";
import mongoose from "mongoose";

class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    logo: string;
}

export class CreateJobDto {
    @IsNotEmpty({ message: 'Name không được để trống!' })
    name: string;

    @IsNotEmpty({ message: 'Skills không được để trống!' })
    @IsArray({ message: "Skills có định dạng là array!" })
    //"each" tells class-validator to run the validation on each item of the array
    @IsString({ each: true, message: "Skills có định dạng là string" })
    skills: string[];

    @IsNotEmpty({ message: 'Location không được để trống!' })
    location: string;

    @IsNotEmpty({ message: 'Salary không được để trống!' })
    salary: string;

    @IsNotEmpty({ message: 'Quantity không được để trống!' })
    quantity: string;

    @IsNotEmpty({ message: 'Level không được để trống!' })
    level: string;

    @IsNotEmpty({ message: 'Description không được để trống!' })
    description: string;

    @IsNotEmpty({ message: "Start date không được để trống!" })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'Start Date có định dạng là Date' })
    startDate: Date;

    @IsNotEmpty({ message: "End date không được để trống!" })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'End Date có định dạng là Date' })
    @IsNotEmpty({ message: "End date không được để trống!" })
    endDate: Date;

    @IsNotEmpty({ message: "Is active không được để trống!" })
    @IsBoolean({ message: "isActive có định dạng là boolean!" })
    isActive: boolean;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company
}

