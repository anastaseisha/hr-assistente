export type CandidateStatus = 'Подходит' | 'Сомнительно' | 'Не подходит';
export type VacancyStatus = 'Активна' | 'Срочно' | 'Черновик';
export type Platform = 'hh.ru' | 'SuperJob';
export type Priority = 'required' | 'preferred';

export interface Criterion {
  id: string;
  label: string;
  priority: Priority;
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  city: string;
  platforms: Platform[];
  responses: number;
  funnelPercent: number;
  status: VacancyStatus;
  description: string;
  criteria: Criterion[];
}

export interface Evidence {
  title: string;
  description: string;
  match: boolean;
}

export interface Candidate {
  id: string;
  vacancyId: string;
  name: string;
  initials: string;
  skills: string;
  source: Platform;
  score: number;
  status: CandidateStatus;
  evidence: Evidence[];
  questions: string[];
}

export interface CandidateDecision {
  review: 'agree' | 'disagree' | null;
  action: 'invite' | 'reject' | null;
}

export interface AdaptationTask {
  id: string;
  text: string;
}

export interface AdaptationStage {
  id: string;
  label: string;
  title: string;
  tasks: AdaptationTask[];
}

export interface Integration {
  platform: Platform;
  enabled: boolean;
}

export interface DeletionRequest {
  id: string;
  candidateId: string;
  createdAt: string;
}

export interface AppData {
  vacancies: Vacancy[];
  candidates: Candidate[];
  candidateDecisions: Record<string, CandidateDecision>;
  completedTaskIds: string[];
  adaptationApproved: boolean;
  integrations: Integration[];
  deletionRequests: DeletionRequest[];
}
