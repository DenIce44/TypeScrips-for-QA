# TypeScript for QA

Учебный проект для изучения TypeScript перед переходом к автоматизации тестирования с Playwright.

## Изученные темы

- Переменные и типы
- Интерфейсы
- Объекты
- Массивы
- Функции
- Методы filter, find, some и reduce
- Асинхронные функции и Promise
- Последовательное и параллельное выполнение
- HTTP-запросы через Fetch API
- Обработка ошибок через try/catch
- Первые браузерные тесты Playwright
- Устойчивые локаторы Playwright
- Web-first assertions
- Позитивные и негативные UI-тесты
- Параметризация тестов
- Hooks beforeEach
- Изоляция browser context
- Фильтрация локаторов
- Page Object Model
- Типизация Page и Locator
- Переиспользуемые компоненты страниц
- Пользовательские Playwright fixtures
- Разделение тестовых данных и тестовой логики
- Рефакторинг UI-тестов
- Полные end-to-end пользовательские сценарии
- Типизированные данные оформления заказа
- Структурирование тестов с помощью test.step
- Позитивное и негативное тестирование checkout-формы

## Запуск примеров

```bash
npx tsx src/01-basics.ts
npx tsx src/02-products.ts
npx tsx src/03-async.ts
npx tsx src/04-http.ts
npx tsx src/05-posts.ts
```

## Проверка типов

```bash
npx tsc --noEmit
```

## Запуск Playwright-тестов

Все тесты:

```bash
npm test
```

Тесты только в Chromium:

```bash
npm run test:chromium
```

Запуск с видимым браузером:

```bash
npm run test:headed
```

UI Mode:

```bash
npm run test:ui
```

## Учебное приложение

UI-тесты выполняются на:

https://www.saucedemo.com/

## Наборы UI-тестов

Авторизация:

```bash
npm run test:login
```

Каталог и корзина:

```bash
npm run test:products
```

Оформление заказа:

````bash
npm run test:checkout

Debug Mode:

```bash
npm run test:debug
````

## Архитектура UI-тестов

```text
components/  — переиспользуемые элементы интерфейса
fixtures/    — подготовка объектов для тестов
pages/       — Page Objects
test-data/   — тестовые данные
tests/       — сценарии и assertions
```

Page Objects содержат локаторы и пользовательские действия.  
Assertions остаются в тестовых сценариях.

```md
Длинные end-to-end сценарии разделяются на бизнес-шаги с помощью `test.step()`, благодаря чему HTML-отчёт показывает точный этап выполнения или падения теста.
```
