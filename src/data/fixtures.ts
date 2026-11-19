import type { AdaptationStage, AppData } from '../types';

export const adaptationStages: AdaptationStage[] = [
  {
    id: 'days-1-30', label: 'Первые 30 дней', title: 'Знакомство', tasks: [
      { id: 'workplace', text: 'Настроить рабочее место и доступы' },
      { id: 'team', text: 'Познакомиться с командой и наставником' },
      { id: 'architecture', text: 'Разобрать архитектуру продукта' },
      { id: 'first-task', text: 'Первая небольшая задача в проде' }
    ]
  },
  {
    id: 'days-31-60', label: '31–60 дней', title: 'Самостоятельность', tasks: [
      { id: 'feature', text: 'Вести фичу от задачи до релиза' },
      { id: 'review', text: 'Участвовать в код-ревью' },
      { id: 'one-to-one', text: 'Встреча 1:1 с руководителем' }
    ]
  },
  {
    id: 'days-61-90', label: '61–90 дней', title: 'Вклад в результат', tasks: [
      { id: 'improvement', text: 'Предложить улучшение процесса' },
      { id: 'probation', text: 'Оценка испытательного срока' },
      { id: 'feedback', text: 'Обратная связь по адаптации' }
    ]
  }
];

export const demoMetrics = {
  timeToHire: 21,
  timeToHireBefore: 29,
  aiHrAgreement: 88,
  plansAcceptedWithoutEdits: 73,
  planCreationSeconds: 18,
  funnel: [
    { label: 'Отклики', count: 184 },
    { label: 'Прошли скрининг', count: 88 },
    { label: 'Интервью', count: 40 },
    { label: 'Офферы', count: 13 }
  ]
};

export const initialData: AppData = {
  vacancies: [
    {
      id: 'backend', title: 'Backend-разработчик', department: 'ИТ', city: 'Екатеринбург',
      platforms: ['hh.ru', 'SuperJob'], responses: 48, funnelPercent: 25, status: 'Активна',
      description: 'Разработка серверной части сервиса, работа с PostgreSQL и API.',
      criteria: [
        { id: 'python', label: 'Опыт Python 5+ лет', priority: 'required' },
        { id: 'postgres', label: 'PostgreSQL и оптимизация запросов', priority: 'required' },
        { id: 'lead', label: 'Опыт руководства командой', priority: 'preferred' }
      ]
    },
    {
      id: 'sales', title: 'Менеджер по продажам', department: 'Продажи', city: 'Москва',
      platforms: ['hh.ru'], responses: 76, funnelPercent: 40, status: 'Активна',
      description: 'Работа с B2B-клиентами.', criteria: []
    },
    {
      id: 'accountant', title: 'Бухгалтер', department: 'Финансы', city: 'Казань',
      platforms: ['SuperJob'], responses: 31, funnelPercent: 60, status: 'Срочно',
      description: 'Ведение бухгалтерского учёта.', criteria: []
    },
    {
      id: 'designer', title: 'Дизайнер интерфейсов', department: 'Продукт', city: 'Удалённо',
      platforms: ['hh.ru'], responses: 19, funnelPercent: 15, status: 'Черновик',
      description: 'Проектирование пользовательских интерфейсов.', criteria: []
    }
  ],
  candidates: [
    {
      id: 'anna', vacancyId: 'backend', name: 'Анна Соколова', initials: 'АС', skills: 'Python, 6 лет',
      source: 'hh.ru', score: 91, status: 'Подходит',
      evidence: [
        { title: 'Опыт Python 5+ лет', description: 'Резюме: «Python, 6 лет, Django, FastAPI»', match: true },
        { title: 'PostgreSQL и оптимизация запросов', description: 'Резюме: проект с миграцией БД', match: true },
        { title: 'Опыт руководства командой', description: 'В резюме не найдено', match: false }
      ],
      questions: ['Расскажите о самой сложной миграции данных в вашем опыте.', 'Как вы принимаете технические решения в команде?']
    },
    {
      id: 'maxim', vacancyId: 'backend', name: 'Максим Орлов', initials: 'МО', skills: 'Java, 4 года',
      source: 'SuperJob', score: 74, status: 'Сомнительно',
      evidence: [
        { title: 'Опыт серверной разработки', description: 'Java, Spring, 4 года', match: true },
        { title: 'Требуемый Python', description: 'Опыт Python не указан', match: false }
      ],
      questions: ['Работали ли вы с Python в рабочих проектах?', 'Какие подходы используете для оптимизации запросов?']
    },
    {
      id: 'elena', vacancyId: 'backend', name: 'Елена Климова', initials: 'ЕК', skills: 'Python, 3 года',
      source: 'hh.ru', score: 82, status: 'Подходит',
      evidence: [
        { title: 'Python и Django', description: 'Резюме: «Python, Django, 3 года»', match: true },
        { title: 'Опыт Python 5+ лет', description: 'Заявлено 3 года вместо 5', match: false }
      ],
      questions: ['Расскажите о вашем опыте с Django.', 'Какие задачи решали с PostgreSQL?']
    },
    {
      id: 'dmitry', vacancyId: 'backend', name: 'Дмитрий Назаров', initials: 'ДН', skills: 'PHP, 2 года',
      source: 'hh.ru', score: 38, status: 'Не подходит',
      evidence: [
        { title: 'Опыт backend-разработки', description: 'Резюме: «PHP, 2 года»', match: true },
        { title: 'Опыт Python', description: 'Не указан', match: false }
      ],
      questions: ['Есть ли у вас опыт коммерческой разработки на Python?']
    }
  ],
  candidateDecisions: {},
  completedTaskIds: [],
  adaptationApproved: false,
  integrations: [
    { platform: 'hh.ru', enabled: true },
    { platform: 'SuperJob', enabled: true }
  ],
  deletionRequests: []
};
