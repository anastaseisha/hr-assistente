import { useState } from 'react';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, Notice, PageHeader, Panel } from '../components/UI';
import { downloadJson } from '../utils/download';
import type { Platform } from '../types';

export function Settings() {
  const { data, toggleIntegration, addDeletionRequest, resetDemo } = useAppStore();
  const [message, setMessage] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const [showDeletion, setShowDeletion] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);

  const requestDeletion = () => {
    if (!candidateId) {setMessage('Выбери кандидата из списка.');return;}
    if (data.deletionRequests.some(request => request.candidateId === candidateId)) {
      setMessage('Для этого кандидата уже создан демонстрационный запрос.');return;
    }
    addDeletionRequest(candidateId);
    setCandidateId('');
    setShowDeletion(false);
    setMessage('Локальный запрос добавлен в список. Реальные данные не удаляются.');
  };

  const exportAudit = () => {
    downloadJson('hr-audit-demo.json', {
      generatedAt: new Date().toISOString(), demo: true,
      privacy: { storageInRussia: 'не проверено', retentionMonths: 12,
        pendingRequests: data.deletionRequests.length },
      integrations: data.integrations,
      note: 'Это макет отчёта. Реального аудита AI, инфраструктуры и выполнения 152-ФЗ нет.'
    });
    setMessage('Демонстрационный отчёт аудита скачан в формате JSON.');
  };

  const clear = () => {
    if (!window.confirm('Сбросить все демонстрационные изменения: вакансии, решения, задачи и настройки?')) return;
    resetDemo();
    setMessage('Демонстрационные данные восстановлены.');
  };

  return <>
    <PageHeader title="Настройки и соответствие" subtitle="Параметры интерфейса · подготовка процессов 152-ФЗ" />
    <DemoNote />
    {message && <Notice message={message} onClose={() => setMessage('')} />}
    <div className="two-cols settings-cols">
      <Panel>
        <h2>Персональные данные</h2>
        <div className="settings-row"><span>Хранение на серверах в РФ</span>
          <Badge tone="orange">Не проверено</Badge></div>
        <div className="settings-row"><span>Планируемый срок хранения резюме</span><b>12 месяцев</b></div>
        <div className="settings-row"><span>Запросов на удаление</span>
          <b>{data.deletionRequests.length} в демо-списке</b></div>
        <Button variant="secondary" onClick={() => setShowDeletion(previous => !previous)}>
          Запросить удаление данных
        </Button>
        {showDeletion && <div className="deletion-form">
          <label className="field-label">Кандидат
            <select value={candidateId} onChange={event => setCandidateId(event.target.value)}>
              <option value="">Выбери кандидата</option>
              {data.candidates.map(candidate => <option key={candidate.id} value={candidate.id}>
                {candidate.name} ({candidate.id})
              </option>)}
            </select>
          </label>
          <p className="muted">Заявка демонстрационная. Реального удаления не происходит.</p>
          <Button onClick={requestDeletion}>Добавить заявку</Button>
        </div>}
      </Panel>
      <Panel>
        <h2>Аудит AI-скрининга</h2>
        <div className="settings-row"><span>Исключение защищённых признаков</span>
          <Badge tone="orange">Требует проверки</Badge></div>
        <div className="settings-row"><span>Объяснение каждой оценки</span>
          <Badge tone="blue">Примеры в интерфейсе</Badge></div>
        <div className="settings-row"><span>Последняя проверка</span><b>Не проводилась</b></div>
        <Button variant="secondary" onClick={exportAudit}>Скачать макет отчёта аудита</Button>
      </Panel>
    </div>
    <Panel className="integrations-panel">
      <h2>Интеграции</h2>
      {data.integrations.map(integration => <div className="integration-row" key={integration.platform}>
        <b>{integration.platform}</b>
        <div className="actions"><Badge tone={integration.enabled ? 'green' : 'orange'}>
          Демо: {integration.enabled ? 'Включено' : 'Выключено'}</Badge>
          <Button variant="secondary" onClick={() => setEditingPlatform(previous =>
            previous === integration.platform ? null : integration.platform)}>Настроить</Button></div>
        {editingPlatform === integration.platform && <div className="integration-config">
          <p className="muted">Изменение переключателя не подключает реальную площадку.</p>
          <Button onClick={() => {
            toggleIntegration(integration.platform);
            setEditingPlatform(null);
            setMessage('Демонстрационный статус обновлён.');
          }}>{integration.enabled ? 'Выключить' : 'Включить'}</Button>
        </div>}
      </div>)}
    </Panel>
    <div className="reset-demo">
      <Button variant="danger" onClick={clear}>Сбросить демо-данные</Button>
    </div>
  </>;
}
