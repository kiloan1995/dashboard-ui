import { ApplicationStatusType } from './Application';

export function mapStatus(sfStatus: string): ApplicationStatusType {
  switch (sfStatus) {
    default:
    case 'Default':
    case 'RequestCandidateInfo':
      return ApplicationStatusType.STATUS_APPLIED;
    case 'Screening':
    case 'Phone_Interview':
    case '1st_Interview':
    case '2nd_Interview':
      return ApplicationStatusType.STATUS_INTERVIEW;
    case 'RejectedAfterScreening':
    case 'Requisition Closed':
    case 'ToBeRejected':
      return ApplicationStatusType.STATUS_REJECTED;
  }
}
