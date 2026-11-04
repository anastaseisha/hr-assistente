import type { ReactNode } from 'react';
export function Button({children,onClick,secondary=false,disabled=false}:{children:ReactNode;onClick?:()=>void;secondary?:boolean;disabled?:boolean}){return <button className={`button ${secondary?'secondary':''}`} onClick={onClick} disabled={disabled}>{children}</button>}
export function Badge({children,tone='blue'}:{children:ReactNode;tone?:'blue'|'green'|'orange'|'red'}){return <span className={`badge ${tone}`}>{children}</span>}
export function Panel({children,className=''}:{children:ReactNode;className?:string}){return <section className={`panel ${className}`}>{children}</section>}
export function PageHeader({title,subtitle,actions}:{title:string;subtitle?:string;actions?:ReactNode}){return <header className="page-header"><div><h1>{title}</h1>{subtitle&&<p className="muted">{subtitle}</p>}</div>{actions&&<div className="actions">{actions}</div>}</header>}
