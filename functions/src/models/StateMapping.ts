import { ApplicationStateType } from './Application';

export function mapState(sfState: string): ApplicationStateType {
  switch (sfState) {
    default:
    case 'Default':
    case 'RequestCandidateInfo':
      return ApplicationStateType.STATE_APPLIED;
    case 'Screening':
    case 'Phone_Interview':
    case '1st_Interview':
    case '2nd_Interview':
      return ApplicationStateType.STATE_INTERVIEW;
    case 'RejectedAfterScreening':
    case 'Requisition Closed':
    case 'ToBeRejected':
      return ApplicationStateType.STATE_REJECTED;
  }
}
