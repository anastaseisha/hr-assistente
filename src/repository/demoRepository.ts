import { initialData } from '../data/fixtures';
import type { AppData, CandidateDecision, Platform, Vacancy } from '../types';
import type { HrRepository } from './contracts';

/** Preview-only implementation. No HTTP, credentials or persistent storage. */
export function createDemoRepository(): HrRepository {
  let data: AppData = structuredClone(initialData);
  return {
    async load() { return structuredClone(data); },
    async saveVacancy(vacancy: Vacancy) {
      data.vacancies = data.vacancies.some(item => item.id === vacancy.id)
        ? data.vacancies.map(item => item.id === vacancy.id ? vacancy : item)
        : [vacancy, ...data.vacancies];
    },
    async saveCandidateDecision(id: string, changes: Partial<CandidateDecision>) {
      data.candidateDecisions[id] = {
        review: data.candidateDecisions[id]?.review ?? null,
        action: data.candidateDecisions[id]?.action ?? null,
        ...changes
      };
    },
    async toggleAdaptationTask(taskId: string) {
      data.completedTaskIds = data.completedTaskIds.includes(taskId)
        ? data.completedTaskIds.filter(id => id !== taskId)
        : [...data.completedTaskIds, taskId];
    },
    async approveAdaptation() { data.adaptationApproved = true; },
    async resetAdaptation() { data.adaptationApproved = false; data.completedTaskIds = []; },
    async toggleIntegration(platform: Platform) {
      data.integrations = data.integrations.map(item => item.platform === platform
        ? { ...item, enabled: !item.enabled } : item);
    },
    async addDeletionRequest(candidateId: string) {
      data.deletionRequests.push({ id: crypto.randomUUID(), candidateId, createdAt: new Date().toISOString() });
    },
    async resetDemo() { data = structuredClone(initialData); }
  };
}
