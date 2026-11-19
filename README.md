# HR·Ассистент — frontend для интеграции

## Запуск

Node.js LTS, затем из папки с `package.json`:

```bash
npm install
npm run dev
```

Windows PowerShell при блокировке npm.ps1: `npm.cmd install`, `npm.cmd run dev`.

Для проверки: `npm run typecheck` и `npm run build`.

## Страницы

- `/` — обзор;
- `/vacancies` — список вакансий;
- `/vacancies/new`, `/vacancies/:id/edit` — создание/редактирование вакансии;
- `/candidates`, `/candidates/:id` — список и карточка кандидата;
- `/adaptation` — план 30–60–90;
- `/analytics` — показатели и воронка;
- `/settings` — персональные данные, аудит, интеграции.

## Граница frontend / backend

- `src/types/index.ts` — доменные типы данных, используемые UI.
- `src/repository/contracts.ts` — **асинхронный интерфейс `HrRepository`**, точка интеграции. Это не описание REST-эндпоинтов и не API-клиент.
- `src/repository/demoRepository.ts` — временная реализация для просмотра и тестирования экранов, только в памяти, без localStorage и без сети; данные сбрасываются при обновлении страницы.
- `src/repository/index.ts` — единая точка выбора реализации, сюда реализацию `HrRepository` от бэкенда
- `src/state/AppStore.tsx` — состояние интерфейса, загрузка, обработка ошибок и действий через интерфейс репозитория; React-страницы не знают, откуда приходят данные.
- `src/data/fixtures.ts` — тестовые данные, не использовать как источник настоящих HR-данных.