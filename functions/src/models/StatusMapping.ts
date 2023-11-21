import { ApplicationStatusType } from './Application';

export function mapStatus(sfStatus: string): ApplicationStatusType {
  switch (sfStatus) {
    default:
    case 'Default':
    case 'Invited To Apply':
    case 'Notification pending':
    case 'Offer':
    case 'OfferSent':
    case 'On Hold':
    case "We couldn't reach you":
    case 'RequestCandidateInfo':
    case 'SendToSAP':
    case 'TransferredToSAP':
    case 'TransferredToSAPError':
      return ApplicationStatusType.STATUS_APPLIED;
    case '1st_Interview':
    case '2nd_Interview':
    case '3rd Additional Interview':
    case 'Phone_Interview':
    case 'Screening':
      return ApplicationStatusType.STATUS_INTERVIEW;
    case 'Forwarded':
      return ApplicationStatusType.STATUS_FORWARDED;
    case 'Auto Disqualified':
    case 'DataCompletion':
    case 'Declined DPCS':
    case 'Deleted On Demand By Admin':
    case 'RejectedAfter1st':
    case 'RejectedAfter2nd':
    case 'RejectedAfter3rd':
    case 'RejectedAfterClosed':
    case 'RejectedAfterInterviewAddit':
    case 'RejectedAfterInterviewMand':
    case 'RejectedAfterScreening':
    case 'RejectedManualEmail':
    case 'RejectedOffer':
    case 'Requisition Closed':
    case 'ToBeRejected':
    case 'ToBeRejectedScreening':
      return ApplicationStatusType.STATUS_REJECTED;
    case 'Deleted On Demand By Candidate':
    case 'Withdrawn By Candidate':
    case 'WithdrawnByCandidate2':
    case 'WithdrawnOnBehalfOfCandidate':
      return ApplicationStatusType.STATUS_WITHDRAWN;
    case 'Hired On Other Requisition':
    case 'Hired':
    case 'HiredAtSAP':
    case 'ToBeHired':
      return ApplicationStatusType.STATUS_HIRED;
  }
}
