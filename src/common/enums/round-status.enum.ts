export const ROUND_STATUS_ENUM = {
  AWAITING_START: 'awaitingStart',
  IN_PROGRESS: 'inProgress',
  FINISHED: 'finished',
  CANCELLED: 'cancelled',
} as const

export const ROUND_STATUS_ACCEPTED_TRANSPORTER_ENUM = {
  PARTIAL: 'partial',
  NOT_ACCEPT: 'notAccept',
  ACCEPTED: 'accepted',
} as const
