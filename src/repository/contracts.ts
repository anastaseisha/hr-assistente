import type { AppData, CandidateDecision, Platform, Vacancy } from '../types';

/** Frontend data port. A future integration implements this interface outside the UI. */
export interface HrRepository {
  load(): Promise<AppData>;
  saveVacancy(vacancy: Vacancy): Promise<void>;
  saveCandidateDecision(id: string, changes: Partial<CandidateDecision>): Promise<void>;
  toggleAdaptationTask(taskId: string): Promise<void>;
  approveAdaptation(): Promise<void>;
  resetAdaptation(): Promise<void>;
  toggleIntegration(platform: Platform): Promise<void>;
  addDeletionRequest(candidateId: string): Promise<void>;
  resetDemo(): Promise<void>;
}
