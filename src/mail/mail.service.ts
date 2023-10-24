import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from 'src/jobs/schemas/job.schemas';
import { SubcriberDocument, Subscriber } from 'src/subscribers/schema/subscriber.schema';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
    ) { }
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubcriberDocument>

    @InjectModel(Job.name)
    private jobModel: SoftDeleteModel<JobDocument>

    async autoSendEmail() {
        const subscribers = await this.subscriberModel.find({});
        for (const subs of subscribers) {
            const subsSkills = subs.skills;
            const jobWithMatchingSkills = await this.jobModel.find({ skills: { $in: subsSkills } });
            if (jobWithMatchingSkills?.length) {
                const jobs = jobWithMatchingSkills.map(item => {
                    return {
                        name: item.name,
                        company: item.company,
                        salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " đ",
                        skills: item.skills
                    }
                })

                await this.mailerService.sendMail({
                    to: "tuanthanh00200@gmail.com",
                    from: '"TuanThanhDev" <tuanthanhdev00200@gmail.com>', // override default from
                    subject: 'Welcome to Nice App! Confirm your Email',
                    template: "new_job",
                    context: {
                        receiver: subs.name,
                        jobs: jobs
                    }
                });
            }
        }
    }
}
