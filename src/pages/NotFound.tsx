import { Link } from 'react-router-dom';
import { PageHeader, Panel } from '../components/UI';

export function NotFound() {
  return <><PageHeader title="Страница не найдена" />
    <Panel><p>Проверь адрес страницы.</p><Link to="/">Вернуться к обзору</Link></Panel></>;
}
