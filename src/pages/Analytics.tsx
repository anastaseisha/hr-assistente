import { useState } from 'react';
import { demoMetrics } from '../data/fixtures';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, Notice, PageHeader, Panel, Progress } from '../components/UI';
import { downloadJson } from '../utils/download';

export function Analytics() {
  const { data } = useAppStore();
  const [message, setMessage] = useState('');
  const change = Math.round((demoMetrics.timeToHire - demoMetrics.timeToHireBefore)
    / demoMetrics.timeToHireBefore * 100);

  const exportReport = () => {
    downloadJson('hr-analytics-demo.json', {
      generatedAt: new Date().toISOString(), demo: true, metrics: demoMetrics,
      currentVacancies: data.vacancies.length, currentCandidates: data.candidates.length,
      note: 'Демонстрационные показатели; не является аналитикой реального найма.'
    });
    setMessage('Демонстрационный отчёт скачан в формате JSON.');
  };

  return <>
    <PageHeader title="Аналитика" subtitle="Пилот · сравнение с показателями до внедрения"
      actions={<Button variant="secondary" onClick={exportReport}>Выгрузить отчёт</Button>} />
    <DemoNote />
    {message && <Notice message={message} onClose={() => setMessage('')} />}
    <div className="metrics">
      <Panel><span className="muted">Time-to-hire</span><strong>{demoMetrics.timeToHire} дн.</strong>
        <Badge tone="green">было {demoMetrics.timeToHireBefore} дн. · {change}%</Badge></Panel>
      <Panel><span className="muted">Совпадение с оценкой рекрутера</span>
        <strong>{demoMetrics.aiHrAgreement}%</strong><Badge tone="green">цель ≥85%</Badge></Panel>
      <Panel><span className="muted">Планы приняты без правок</span>
        <strong>{demoMetrics.plansAcceptedWithoutEdits}%</strong><Badge tone="green">цель ≥70%</Badge></Panel>
      <Panel><span className="muted">Время создания плана</span>
        <strong>{demoMetrics.planCreationSeconds} сек</strong><Badge tone="green">цель ≤30 сек</Badge></Panel>
    </div>
    <Panel className="funnel-panel">
      <h2>Воронка найма</h2>
      {demoMetrics.funnel.map(item => <div className="funnel-row" key={item.label}>
        <span>{item.label}</span>
        <Progress label={item.label} value={item.count / demoMetrics.funnel[0].count * 100} />
        <b>{item.count}</b>
      </div>)}
      <p className="footnote">Значения показателей приведены для иллюстрации макета и не пересчитываются
        по демонстрационному списку кандидатов.</p>
    </Panel>
  </>;
}
