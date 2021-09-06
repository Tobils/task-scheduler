import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';


@Injectable()
export class AppService {
  constructor(
    private schedulerRegistry: SchedulerRegistry
  ){}
  getHello(){
    this.addCronJob('task-uuid-1', '5')
    return 'job added !'
  }

  private readonly logger = new Logger(AppService.name);


  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
      this.deleteCron(name)
    });
  
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    this.logger.debug(`job ${name} added`);
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.debug(`job ${name} deleted!`);
  }
}
