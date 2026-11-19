import { useState } from 'react';
import { adaptationStages } from '../data/fixtures';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, Notice, PageHeader, Panel, Progress } from '../components/UI';

export function Adaptation() {
  const { data, toggleAdaptationTask, approveAdaptation, resetAdaptation } = useAppStore();
  const [message, setMessage] = useState('');
  const count = adaptationStages.reduce((sum, stage) => sum + stage.tasks.length, 0);
  const done = data.completedTaskIds.length;
  const reset = () => {
    if (done && !window.confirm('Сбросить все отмеченные задачи и утверждение плана?')) return;
    resetAdaptation();
    setMessage('Демонстрационный план сброшен.');
  };

  return <>
    <PageHeader title="План адаптации: Илья Громов"
      subtitle="Backend-разработчик · выход 26.10.2026 · план на 90 дней"
      actions={<>
        <Button variant="secondary" onClick={reset}>Пересоздать</Button>
        <Button disabled={data.adaptationApproved} onClick={() => {approveAdaptation(); setMessage('План утверждён локально.');}}>
          {data.adaptationApproved ? 'План утверждён ✓' : 'Утвердить план'}
        </Button>
      </>} />
    <DemoNote />
    {message && <Notice message={message} onClose={() => setMessage('')} />}
    <Panel className="overall-progress">
      <div className="progress-label"><span>Выполнено {done} из {count} задач</span><span>День 1</span></div>
      <Progress value={count ? done / count * 100 : 0} label="Прогресс адаптации" />
    </Panel>
    <div className="three-cols">
      {adaptationStages.map(stage => <Panel key={stage.id} className="stage">
        <Badge>{stage.label}</Badge><h2>{stage.title}</h2>
        {stage.tasks.map(task => <label key={task.id}
          className={`task ${data.completedTaskIds.includes(task.id) ? 'completed' : ''}`}>
          <input type="checkbox" checked={data.completedTaskIds.includes(task.id)}
            onChange={() => toggleAdaptationTask(task.id)} />
          <span>{task.text}</span>
        </label>)}
      </Panel>)}
    </div>
  </>;
}
