import { Link } from 'react-router-dom';
import { PageHeader, Panel } from '../components/UI';
export function Placeholder({title}:{title:string}){return <><PageHeader title={title} subtitle="Раздел запланирован для следующего этапа разработки"/><Panel><p>На текущем этапе реализованы четыре экрана из макетов: обзор, список кандидатов, карточка кандидата и план адаптации.</p><Link to="/">Вернуться к обзору</Link></Panel></>}
