import { useNavigate } from 'react-router-dom';
import { demoMetrics } from '../data/fixtures';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, PageHeader, Panel } from '../components/UI';

export function Overview() {
  const navigate = useNavigate();
  const { data } = useAppStore();
  const open = data.vacancies.filter(vacancy => vacancy.status !== 'Черновик');
  const awaiting = data.candidates.filter(candidate => !data.candidateDecisions[candidate.id]?.action).length;

  return <>
    <PageHeader title="Обзор" subtitle="Основные показатели рекрутинга и адаптации"
      actions={<Button onClick={() => navigate('/vacancies/new')}>Создать вакансию</Button>} />
    <DemoNote />
    <div className="metrics">
      <Panel><span className="muted">Time-to-hire</span><strong>{demoMetrics.timeToHire} дн.</strong>
        <Badge tone="green">−27% к базовому</Badge></Panel>
      <Panel><span className="muted">Открытые вакансии</span><strong>{open.length}</strong>
        <Badge>{open.filter(vacancy => vacancy.status === 'Срочно').length} срочных</Badge></Panel>
      <Panel><span className="muted">Кандидаты в списке</span><strong>{data.candidates.length}</strong>
        <Badge tone="orange">{awaiting} ждут решения</Badge></Panel>
      <Panel><span className="muted">Согласие AI и HR</span><strong>{demoMetrics.aiHrAgreement}%</strong>
        <Badge tone="green">цель ≥85%</Badge></Panel>
    </div>
    <div className="two-cols">
      <Panel>
        <h2>Вакансии в работе</h2>
        {open.slice(0, 3).map(vacancy => <button type="button" className="table-row vacancy-row"
          key={vacancy.id} onClick={() => navigate(`/vacancies/${vacancy.id}/edit`)}>
          <b>{vacancy.title}</b><span className="muted">{vacancy.responses} откликов</span>
          <Badge tone={vacancy.status === 'Срочно' ? 'orange' : 'green'}>{vacancy.status}</Badge>
        </button>)}
        {!open.length && <p className="muted">Пока нет открытых вакансий.</p>}
      </Panel>
      <Panel>
        <h2>Ближайшие действия</h2>
        <div className="table-row action-row"><b>14:00</b><span>Интервью: Анна Соколова</span>
          <Button variant="secondary" onClick={() => navigate('/candidates/anna')}>Открыть</Button></div>
        <div className="table-row action-row"><b>16:30</b><span>Интервью: Максим Орлов</span>
          <Button variant="secondary" onClick={() => navigate('/candidates/maxim')}>Открыть</Button></div>
        <div className="table-row action-row"><b>План</b><span>Адаптация: Илья Громов</span>
          <Button variant="secondary" onClick={() => navigate('/adaptation')}>Задачи</Button></div>
      </Panel>
    </div>
  </>;
}
