import { useAppStore } from '../state/AppStore';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { label: 'Обзор', to: '/' },
  { label: 'Вакансии', to: '/vacancies' },
  { label: 'Кандидаты', to: '/candidates' },
  { label: 'Адаптация', to: '/adaptation' },
  { label: 'Аналитика', to: '/analytics' },
  { label: 'Настройки', to: '/settings' }
];

export function Layout() {
  const { loading, busy, error, clearError, reload } = useAppStore();
  return <div className="app">
    <aside className="sidebar">
      <NavLink className="brand" to="/">HR·Ассистент</NavLink>
      <nav aria-label="Основная навигация">
        {links.map(link => <NavLink
          key={link.to} to={link.to} end={link.to === '/'}
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >{link.label}</NavLink>)}
      </nav>
    </aside>
    <main className="content">
      {error && <div role="alert" className="integration-error">{error} <button onClick={clearError}>Закрыть</button> <button onClick={() => void reload()}>Повторить</button></div>}
      {loading ? <p role="status">Загрузка данных…</p> : <Outlet />}
      {busy && <div className="integration-busy" role="status">Сохранение изменений…</div>}
    </main>
  </div>;
}
