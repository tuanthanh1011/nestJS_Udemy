import { IsArray, IsEmail, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {
    @IsEmail({}, { message: "Email không đúng định dạng" })
    @IsNotEmpty({
        message: 'Email không được để trống?',
    })
    email: string; // Mặc định là public

    @IsMongoId({
        message: 'userId không hợp lệ?'
    })
    @IsNotEmpty({
        message: 'userId không được để trống?'
    })
    userId: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty({
        message: 'url không được để trống?'
    })
    url: string;

    @IsNotEmpty({
        message: 'status không được để trống?'
    })
    status: string;

    @IsMongoId({
        message: 'companyId không hợp lệ?'
    })
    @IsNotEmpty({
        message: 'companyId không được để trống?'
    })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsMongoId({
        message: 'jobId không hợp lệ?'
    })
    @IsNotEmpty({
        message: 'jobId không được để trống?'
    })
    jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
    @IsNotEmpty({
        message: 'url không được để trống?'
    })
    url: string;
    
    @IsMongoId({
        message: 'companyId không hợp lệ?'
    })
    @IsNotEmpty({
        message: 'companyId không được để trống?'
    })
    companyId: mongoose.Schema.Types.ObjectId;

    @IsMongoId({
        message: 'jobId không hợp lệ?'
    })
    @IsNotEmpty({
        message: 'jobId không được để trống?'
    })
    jobId: mongoose.Schema.Types.ObjectId;
}