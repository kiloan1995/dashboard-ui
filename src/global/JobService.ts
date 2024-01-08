import { Job } from '../../functions/src/models/Job';
import { RequestService } from './RequestService';

export class JobService {
  static async getJobs(startDate: Date, endDate: Date): Promise<Job[] | undefined> {
    console.log(startDate, endDate);
    return (await RequestService.doRequest('job/json', { body: null }, 'getAllJobs', 'jobs')) as Job[];
  }
}
