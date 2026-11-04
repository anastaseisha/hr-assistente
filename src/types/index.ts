export type CandidateStatus = 'Подходит' | 'Сомнительно' | 'Не подходит';
export interface Candidate { id: string; name: string; initials: string; skills: string; source: string; score: number; status: CandidateStatus; }
export interface AdaptationStage { label: string; title: string; tasks: string[]; }
