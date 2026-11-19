import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, Notice, PageHeader, Panel, Progress } from '../components/UI';
import type { CandidateStatus } from '../types';

const statusTone: Record<CandidateStatus, 'green' | 'orange' | 'red'> = {
  'Подходит': 'green', 'Сомнительно': 'orange', 'Не подходит': 'red'
};

export function Candidates() {
  const { data } = useAppStore();
  const [filter, setFilter] = useState('Все');
  const [message, setMessage] = useState('');
  const candidates = data.candidates.filter(candidate => candidate.vacancyId === 'backend');
  const shown = candidates.filter(candidate => filter === 'Все' || candidate.status === filter);
  const filters = ['Все', 'Подходит', 'Сомнительно', 'Не подходит'] as const;

  return <>
    <PageHeader title="Backend-разработчик" subtitle="Кандидаты из демонстрационной выборки"
      actions={<>
        <Button variant="secondary" onClick={() => setMessage('Импорт с hh.ru не работает без сервера.')}>Импорт с hh.ru</Button>
        <Button onClick={() => setMessage('AI-скрининг не выполняется: на экране показаны готовые демонстрационные оценки.')}>Запустить AI-скрининг</Button>
      </>} />
    <DemoNote />
    {message && <Notice message={message} onClose={() => setMessage('')} />}
    <Panel className="candidate-panel">
      <div className="filters" aria-label="Фильтр кандидатов">
        {filters.map((item, index) => <button type="button" key={item} onClick={() => setFilter(item)}
          className={`filter ${filter === item ? 'selected' : ''}`} aria-pressed={filter === item}>
          <Badge tone={(['blue','green','orange','red'] as const)[index]}>
            {item} {item === 'Все' ? candidates.length : candidates.filter(candidate => candidate.status === item).length}
          </Badge>
        </button>)}
      </div>
      <div className="table-scroll">
        <div className="candidate-head"><span>Кандидат</span><span>Источник</span>
          <span>Соответствие AI</span><span>Статус</span><span /></div>
        {shown.map(candidate => <div className="candidate-row" key={candidate.id}>
          <div className="person"><div className="avatar">{candidate.initials}</div>
            <div><b>{candidate.name}</b><div className="muted">{candidate.skills}</div></div>
          </div>
          <span>{candidate.source}</span>
          <div className="score"><Progress label={`Соответствие ${candidate.name}`} value={candidate.score} />
            <b>{candidate.score}%</b></div>
          <div><Badge tone={statusTone[candidate.status]}>{candidate.status}</Badge>
            {data.candidateDecisions[candidate.id]?.action && <div className="muted decision-label">
              {data.candidateDecisions[candidate.id].action === 'invite' ? 'Приглашение отмечено' : 'Отклонение отмечено'}
            </div>}</div>
          <Link className="button secondary" to={`/candidates/${candidate.id}`}>Разбор</Link>
        </div>)}
      </div>
      {!shown.length && <p className="empty">Кандидатов с таким статусом нет.</p>}
    </Panel>
  </>;
}
