import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, Notice, PageHeader, Panel, Progress } from '../components/UI';
import type { VacancyStatus } from '../types';

const tones: Record<VacancyStatus, 'green' | 'orange' | 'blue'> = {
  'Активна': 'green', 'Срочно': 'orange', 'Черновик': 'blue'
};

export function Vacancies() {
  const { data } = useAppStore();
  const location = useLocation();
  const [message, setMessage] = useState((location.state as { notice?: string } | null)?.notice ?? '');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Все');
  const shown = data.vacancies.filter(vacancy =>
    vacancy.title.toLowerCase().includes(search.trim().toLowerCase()) &&
    (status === 'Все' || vacancy.status === status)
  );

  return <>
    <PageHeader title="Вакансии"
      subtitle={`${data.vacancies.filter(item => item.status !== 'Черновик').length} открытых · управление вакансиями`}
      actions={<Link className="button primary" to="/vacancies/new">Создать вакансию</Link>} />
    <DemoNote />
    {message && <Notice message={message} onClose={() => setMessage('')} />}
    <Panel className="vacancies-panel">
      <div className="toolbar">
        <input aria-label="Поиск вакансий" placeholder="Поиск вакансий" value={search}
          onChange={event => setSearch(event.target.value)} />
        <select aria-label="Фильтр по статусу" value={status} onChange={event => setStatus(event.target.value)}>
          <option>Все</option><option>Активна</option><option>Срочно</option><option>Черновик</option>
        </select>
      </div>
      <div className="table-scroll">
        <div className="vacancies-head"><span>Вакансия</span><span>Площадка</span>
          <span>Отклики</span><span>Воронка</span><span>Статус</span></div>
        {shown.map(vacancy => <Link className="vacancies-row" key={vacancy.id}
          to={`/vacancies/${vacancy.id}/edit`} aria-label={`Редактировать вакансию ${vacancy.title}`}>
          <div><b>{vacancy.title}</b><div className="muted">{vacancy.department} · {vacancy.city}</div></div>
          <span>{vacancy.platforms.join(', ') || '—'}</span>
          <b>{vacancy.responses}</b>
          <Progress label={`Воронка ${vacancy.title}`} value={vacancy.funnelPercent} />
          <span><Badge tone={tones[vacancy.status]}>{vacancy.status}</Badge></span>
        </Link>)}
      </div>
      {!shown.length && <p className="empty">По вашему запросу вакансий не найдено.</p>}
    </Panel>
    <div className="after-table"><Button variant="secondary" onClick={() => {setSearch('');setStatus('Все');}}>
      Сбросить фильтры
    </Button></div>
  </>;
}
