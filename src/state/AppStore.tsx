import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { initialData } from '../data/fixtures';
import { repository as defaultRepository } from '../repository';
import type { HrRepository } from '../repository/contracts';
import type { AppData, CandidateDecision, Platform, Vacancy } from '../types';

type Operation = () => Promise<void>;
interface AppStoreValue {
  data: AppData;
  loading: boolean;
  busy: boolean;
  error: string | null;
  clearError: () => void;
  reload: () => Promise<void>;
  saveVacancy: (vacancy: Vacancy) => Promise<boolean>;
  saveCandidateDecision: (id: string, changes: Partial<CandidateDecision>) => Promise<void>;
  toggleAdaptationTask: (taskId: string) => Promise<void>;
  approveAdaptation: () => Promise<void>;
  resetAdaptation: () => Promise<void>;
  toggleIntegration: (platform: Platform) => Promise<void>;
  addDeletionRequest: (candidateId: string) => Promise<void>;
  resetDemo: () => Promise<void>;
}
const AppStore = createContext<AppStoreValue | null>(null);

/** UI state knows only the repository contract, never its implementation. */
export function AppStoreProvider({ children, repository = defaultRepository }: {
  children: ReactNode;
  repository?: HrRepository;
}) {
  const [data, setData] = useState<AppData>(() => structuredClone(initialData));
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setData(await repository.load()); }
    catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить данные.');
    } finally { setLoading(false); }
  }, [repository]);

  useEffect(() => { void reload(); }, [reload]);

  const run = useCallback(async (operation: Operation): Promise<boolean> => {
    setBusy(true);
    setError(null);
    try {
      await operation();
      setData(await repository.load());
      return true;
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Не удалось сохранить изменения.';
      setError(message);
      return false;
    } finally { setBusy(false); }
  }, [repository]);

  const value: AppStoreValue = {
    data, loading, busy, error,
    clearError: () => setError(null), reload,
    saveVacancy: vacancy => run(() => repository.saveVacancy(vacancy)),
    saveCandidateDecision: async (id, changes) => { await run(() => repository.saveCandidateDecision(id, changes)); },
    toggleAdaptationTask: async id => { await run(() => repository.toggleAdaptationTask(id)); },
    approveAdaptation: async () => { await run(() => repository.approveAdaptation()); },
    resetAdaptation: async () => { await run(() => repository.resetAdaptation()); },
    toggleIntegration: async platform => { await run(() => repository.toggleIntegration(platform)); },
    addDeletionRequest: async id => { await run(() => repository.addDeletionRequest(id)); },
    resetDemo: async () => { await run(() => repository.resetDemo()); }
  };
  return <AppStore.Provider value={value}>{children}</AppStore.Provider>;
}

export function useAppStore(): AppStoreValue {
  const value = useContext(AppStore);
  if (!value) throw new Error('AppStoreProvider is missing');
  return value;
}
