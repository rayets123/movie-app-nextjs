# Movie App - Приложение для просмотра популярных фильмов

Приложение на Next.js для просмотра популярных фильмов с использованием TMDb API (The Movie Database API).

## Возможности

- 📽️ Список самых популярных фильмов на главной странице
- 🔍 Фильтрация по жанрам
- 📄 Пагинация для навигации по страницам
- 🎬 Детальная страница фильма с описанием и галереей изображений
- 🖼️ Кадры из фильма и постеры
- ⭐ Рейтинги и информация о фильмах

## Настройка

### 1. Получение API ключа TMDb

1. Зарегистрируйтесь на [TMDb](https://www.themoviedb.org/)
2. Перейдите в [настройки API](https://www.themoviedb.org/settings/api)
3. Создайте новый API ключ (выберите "Developer" тип)
4. Скопируйте ваш API ключ

### 2. Установка зависимостей

```bash
npm install
# или
yarn install
# или
pnpm install
```

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```bash
cp .env.example .env.local
```

Откройте `.env.local` и замените `your_api_key_here` на ваш API ключ TMDb:

```
NEXT_PUBLIC_TMDB_API_KEY=ваш_api_ключ_здесь
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## Запуск проекта

Запустите сервер разработки:

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
movie-app/
├── app/
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx      # Страница детального просмотра фильма
│   ├── layout.tsx
│   ├── page.tsx               # Главная страница со списком фильмов
│   └── globals.css
├── components/
│   ├── MovieCard.tsx          # Карточка фильма
│   ├── GenreFilter.tsx        # Фильтр по жанрам
│   └── Pagination.tsx         # Компонент пагинации
├── lib/
│   └── tmdb.ts                # API клиент для TMDb
└── public/
```

## Технологии

- **Next.js 16** - React фреймворк
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация
- **TMDb API** - API для получения данных о фильмах

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TMDb API Documentation](https://developers.themoviedb.org/3)
