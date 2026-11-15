export type ProjectStatus = 
  | "REQUEST_RECEIVED" | "UNDER_REVIEW" | "AWAITING_INFO" | "IN_PRODUCTION" 
  | "READY_FOR_REVIEW" | "REVISION_REQUESTED" | "COMPLETED";
  
export type EnquiryStatus = "NEW" | "CONTACTED" | "IN_PROGRESS" | "RESOLVED";

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  REQUEST_RECEIVED: "Request received", UNDER_REVIEW: "Under review",
  AWAITING_INFO: "Awaiting info", IN_PRODUCTION: "In production",
  READY_FOR_REVIEW: "Ready for review", REVISION_REQUESTED: "Revision requested",
  COMPLETED: "Completed",
};
export const STATUS_COLOR: Record<ProjectStatus, string> = {
  REQUEST_RECEIVED: "bg-yellow text-ink", UNDER_REVIEW: "bg-sky text-ink",
  AWAITING_INFO: "bg-orange text-paper", IN_PRODUCTION: "bg-electric text-paper",
  READY_FOR_REVIEW: "bg-purple text-paper", REVISION_REQUESTED: "bg-coral text-paper",
  COMPLETED: "bg-lime text-ink",
};
export const STATUS_ORDER: ProjectStatus[] = [
  "REQUEST_RECEIVED","UNDER_REVIEW","AWAITING_INFO","IN_PRODUCTION",
  "READY_FOR_REVIEW","REVISION_REQUESTED","COMPLETED",
];
export const ENQUIRY_LABEL: Record<EnquiryStatus, string> = {
  NEW: "New", CONTACTED: "Contacted", IN_PROGRESS: "In progress", RESOLVED: "Resolved",
};