import type { Candidate, AdaptationStage } from '../types';
export const candidates: Candidate[] = [
 {id:'anna',name:'Анна Соколова',initials:'АС',skills:'Python, 6 лет',source:'hh.ru',score:91,status:'Подходит'},
 {id:'maxim',name:'Максим Орлов',initials:'МО',skills:'Java, 4 года',source:'SuperJob',score:74,status:'Сомнительно'},
 {id:'elena',name:'Елена Климова',initials:'ЕК',skills:'Python, 3 года',source:'hh.ru',score:82,status:'Подходит'},
 {id:'dmitry',name:'Дмитрий Назаров',initials:'ДН',skills:'PHP, 2 года',source:'hh.ru',score:38,status:'Не подходит'},
];
export const stages: AdaptationStage[] = [
 {label:'Первые 30 дней',title:'Знакомство',tasks:['Настроить рабочее место и доступы','Познакомиться с командой и наставником','Разобрать архитектуру продукта','Первая небольшая задача в проде']},
 {label:'31–60 дней',title:'Самостоятельность',tasks:['Вести фичу от задачи до релиза','Участвовать в код-ревью','Встреча 1:1 с руководителем']},
 {label:'61–90 дней',title:'Вклад в результат',tasks:['Предложить улучшение процесса','Оценка испытательного срока','Обратная связь по адаптации']},
];
