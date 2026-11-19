import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, Notice, PageHeader, Panel, Progress } from '../components/UI';

export function CandidateDetail() {
  const { id } = useParams();
  const { data, saveCandidateDecision } = useAppStore();
  const [message, setMessage] = useState('');
  const candidate = data.candidates.find(item => item.id === id);
  if (!candidate) return <>
    <PageHeader title="Кандидат не найден" />
    <Link to="/candidates">Вернуться к списку кандидатов</Link>
  </>;

  const decision = data.candidateDecisions[candidate.id];
  const action = (type: 'invite' | 'reject') => {
    saveCandidateDecision(candidate.id, { action: type });
    setMessage(type === 'invite'
      ? 'Приглашение отмечено в интерфейсе. Сообщение кандидату не отправлялось.'
      : 'Отклонение отмечено в интерфейсе. Сообщение кандидату не отправлялось.');
  };
  const recommendation = candidate.score >= 80 ? 'пригласить'
    : candidate.score >= 60 ? 'дополнительно проверить' : 'отклонить';

  return <>
    <div className="detail-heading">
      <div className="person"><div className="avatar large">{candidate.initials}</div>
        <PageHeader title={candidate.name} subtitle={`Backend-разработчик · ${candidate.source}`} />
      </div>
      <div className="actions">
        <Button variant="secondary" onClick={() => action('reject')}>Отклонить</Button>
        <Button onClick={() => action('invite')}>Пригласить на интервью</Button>
      </div>
    </div>
    <DemoNote />
    {message && <Notice message={message} onClose={() => setMessage('')} />}
    {decision?.action && <p className="selection-note">Текущее решение: {decision.action === 'invite'
      ? 'приглашение на интервью' : 'отклонение'}</p>}
    <div className="two-cols">
      <Panel>
        <h2>Оценка AI</h2>
        <div className="big-score">{candidate.score}%</div>
        <Progress value={candidate.score} label="Демонстрационная оценка соответствия" />
        <p className="large-muted">Рекомендация: {recommendation}. Окончательное решение принимает рекрутер.</p>
        <h2>Ваша оценка</h2>
        <div className="inline-actions">
          <button type="button" className="plain" aria-pressed={decision?.review === 'agree'}
            onClick={() => saveCandidateDecision(candidate.id, { review: 'agree' })}>
            <Badge tone={decision?.review === 'agree' ? 'green' : 'blue'}>
              {decision?.review === 'agree' ? 'Согласен с AI ✓' : 'Согласиться с AI'}
            </Badge>
          </button>
          <button type="button" className="plain" aria-pressed={decision?.review === 'disagree'}
            onClick={() => saveCandidateDecision(candidate.id, { review: 'disagree' })}>
            <Badge tone={decision?.review === 'disagree' ? 'orange' : 'blue'}>
              {decision?.review === 'disagree' ? 'Оценка изменена ✓' : 'Изменить оценку'}
            </Badge>
          </button>
        </div>
      </Panel>
      <Panel>
        <h2>Почему такая оценка</h2>
        {candidate.evidence.map(item => <div className="reason" key={item.title}>
          <div><b>{item.title}</b><div className="muted">{item.description}</div></div>
          <Badge tone={item.match ? 'green' : 'orange'}>{item.match ? 'Совпало' : 'Нет данных'}</Badge>
        </div>)}
        <p className="large-muted">Это демонстрационное объяснение, а не результат обработки реального резюме.</p>
      </Panel>
    </div>
    <Panel className="questions">
      <h2>Вопросы для интервью (примеры)</h2>
      <ol>{candidate.questions.map(question => <li key={question}>{question}</li>)}</ol>
    </Panel>
  </>;
}
