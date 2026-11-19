import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppStoreProvider } from './state/AppStore';
import { Overview } from './pages/Overview';
import { Vacancies } from './pages/Vacancies';
import { VacancyEditor } from './pages/VacancyEditor';
import { Candidates } from './pages/Candidates';
import { CandidateDetail } from './pages/CandidateDetail';
import { Adaptation } from './pages/Adaptation';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="vacancies" element={<Vacancies />} />
            <Route path="vacancies/new" element={<VacancyEditor />} />
            <Route path="vacancies/:id/edit" element={<VacancyEditor />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="candidates/:id" element={<CandidateDetail />} />
            <Route path="adaptation" element={<Adaptation />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStoreProvider>
  </React.StrictMode>
);
