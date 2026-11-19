import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({
  children, variant = 'primary', ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}) {
  return <button type="button" className={`button ${variant}`} {...props}>{children}</button>;
}

export function Badge({ children, tone = 'blue' }: {
  children: ReactNode;
  tone?: 'blue' | 'green' | 'orange' | 'red';
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

export function PageHeader({ title, subtitle, actions }: {
  title: string; subtitle?: string; actions?: ReactNode;
}) {
  return <header className="page-header">
    <div><h1>{title}</h1>{subtitle && <p className="muted">{subtitle}</p>}</div>
    {actions && <div className="actions">{actions}</div>}
  </header>;
}

export function DemoNote() {
  return <p className="demo-note">Демо-версия · демонстрационные данные, сервер не подключён</p>;
}

export function Notice({ message, onClose }: { message: string; onClose: () => void }) {
  return <div className="notice" role="status">
    <span>{message}</span>
    <button type="button" aria-label="Закрыть уведомление" onClick={onClose}>×</button>
  </div>;
}

export function Progress({ value, label }: { value: number; label: string }) {
  return <div className="progress" role="progressbar" aria-label={label}
    aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)}>
    <div style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>;
}
