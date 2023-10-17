import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;
//  định nghĩa một kiểu CompanyDocument, là một loại dữ liệu (type) tương tự với kiểu Document của Mongoose.
// đại diện cho một bản ghi (document) của model "Company" trong cơ sở dữ liệu MongoDB.

@Schema({ timestamps: true })
export class Company {
    @Prop()
    name: string;

    @Prop()
    address: string;

    @Prop()
    description: string;

    @Prop()
    logo: string;

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string
    }

    @Prop()
    createAt: Date;

    @Prop()
    updateAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deleteAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
// Tạo một schema thực tế từ class "Company". 