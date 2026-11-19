import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../state/AppStore';
import { Badge, Button, DemoNote, Notice, PageHeader, Panel } from '../components/UI';
import type { Criterion, Platform, Priority, Vacancy } from '../types';

function blankVacancy(): Vacancy {
  return {
    id: crypto.randomUUID(), title: '', department: '', city: '', platforms: [],
    responses: 0, funnelPercent: 0, status: 'Черновик', description: '', criteria: []
  };
}

export function VacancyEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, saveVacancy } = useAppStore();
  const existing = id ? data.vacancies.find(vacancy => vacancy.id === id) : undefined;
  const [form, setForm] = useState<Vacancy>(() => structuredClone(existing ?? blankVacancy()));
  const [criterionText, setCriterionText] = useState('');
  const [priority, setPriority] = useState<Priority>('required');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(structuredClone(existing ?? blankVacancy()));
    // Change the working draft only when switching between editor routes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const change = (key: 'title' | 'department' | 'city' | 'description', value: string) => {
    setForm(previous => ({ ...previous, [key]: value }));
  };

  const togglePlatform = (platform: Platform) => {
    setForm(previous => ({
      ...previous,
      platforms: previous.platforms.includes(platform)
        ? previous.platforms.filter(item => item !== platform)
        : [...previous.platforms, platform]
    }));
  };

  const addCriterion = () => {
    const label = criterionText.trim();
    if (!label) return;
    const criterion: Criterion = { id: crypto.randomUUID(), label, priority };
    setForm(previous => ({ ...previous, criteria: [...previous.criteria, criterion] }));
    setCriterionText('');
  };

  const save = async (publish: boolean) => {
    if (!form.title.trim()) { setMessage('Укажи название вакансии.'); return; }
    if (publish && !form.description.trim()) {
      setMessage('Для публикации заполни описание вакансии.'); return;
    }
    try {
    const saved = await saveVacancy({
      ...form,
      title: form.title.trim(), description: form.description.trim(),
      status: publish ? 'Активна' : form.status
    });
    if (!saved) { setMessage('Не удалось сохранить вакансию.'); return; }
    navigate('/vacancies', { state: { notice: publish
      ? 'Вакансия отмечена опубликованной в демо-версии. На внешних площадках она не размещена.'
      : 'Изменения вакансии сохранены в демонстрационном состоянии.' } });
    } catch { setMessage('Не удалось сохранить вакансию. Попробуй ещё раз.'); }
  };

  if (id && !existing) return <>
    <PageHeader title="Вакансия не найдена" />
    <Link to="/vacancies">Вернуться к списку вакансий</Link>
  </>;

  return <>
    <PageHeader title={id ? 'Редактирование вакансии' : 'Новая вакансия'}
      subtitle="Настройка вакансии и критериев оценки кандидатов"
      actions={<>
        <Button variant="secondary" onClick={() => save(false)}>
          {form.status === 'Черновик' ? 'Сохранить черновик' : 'Сохранить изменения'}
        </Button>
        <Button onClick={() => save(true)}>Опубликовать</Button>
      </>} />
    <DemoNote />
    {message && <Notice message={message} onClose={() => setMessage('')} />}
    <div className="two-cols editor-cols">
      <Panel>
        <h2>Основное</h2>
        <label className="field-label">Название
          <input value={form.title} onChange={event => change('title', event.target.value)}
            placeholder="Backend-разработчик" maxLength={120} />
        </label>
        <div className="field-grid">
          <label className="field-label">Отдел
            <input value={form.department} onChange={event => change('department', event.target.value)} placeholder="ИТ" />
          </label>
          <label className="field-label">Город
            <input value={form.city} onChange={event => change('city', event.target.value)} placeholder="Екатеринбург" />
          </label>
        </div>
        <div className="field-label">Площадки публикации
          <div className="platform-choices">
            {(['hh.ru', 'SuperJob'] as Platform[]).map(platform =>
              <label key={platform} className="platform-check">
                <input type="checkbox" checked={form.platforms.includes(platform)}
                  onChange={() => togglePlatform(platform)} />{platform}
              </label>
            )}
          </div>
        </div>
        <label className="field-label">Описание
          <textarea rows={6} value={form.description}
            onChange={event => change('description', event.target.value)} />
        </label>
      </Panel>
      <Panel>
        <h2>Критерии оценки</h2>
        <div className="criteria-list">
          {form.criteria.map(criterion => <div className="criterion" key={criterion.id}>
            <span>{criterion.label}</span><div className="criterion-actions">
              <Badge tone={criterion.priority === 'required' ? 'red' : 'orange'}>
                {criterion.priority === 'required' ? 'Обязательно' : 'Желательно'}
              </Badge>
              <button type="button" className="remove" aria-label={`Удалить ${criterion.label}`}
                onClick={() => setForm(previous => ({...previous,
                  criteria: previous.criteria.filter(item => item.id !== criterion.id)}))}>×</button>
            </div>
          </div>)}
          {!form.criteria.length && <p className="muted">Критерии пока не добавлены.</p>}
        </div>
        <div className="criterion-form">
          <input value={criterionText} placeholder="Новый критерий" aria-label="Новый критерий"
            onChange={event => setCriterionText(event.target.value)}
            onKeyDown={event => {if (event.key === 'Enter') {event.preventDefault(); addCriterion();}}} />
          <select value={priority} aria-label="Важность критерия"
            onChange={event => setPriority(event.target.value as Priority)}>
            <option value="required">Обязательно</option>
            <option value="preferred">Желательно</option>
          </select>
          <Button variant="secondary" onClick={addCriterion}>Добавить критерий</Button>
        </div>
        <p className="large-muted">Возраст, пол, семейное положение и другие защищённые признаки
          не должны участвовать в оценке кандидата.</p>
      </Panel>
    </div>
  </>;
}
