# Task Management System

This is a task management system assessment

---

## Installation

### Clone the repository
```bash
git clone https://github.com/jhumer-apus/task-management.git
```

### Frontend Setup

#### Requirements
- Node Version 24+

1. Go to the frontend directory
```bash
cd frontend
```

2. Install Dependencies
```bash
npm install
```

3. Run the frontend
```bash
npm run dev
```

4. Open the link to the browser
```bash
localhost:3000
```

### Backend Setup

#### Requirements
- PHP Version 8+
- MySQL Version 8+
- Composer Version 2.8+

1. Go to the backend directory
```bash
cd backend
```

2. Install Dependencies
```bash
composer install
```

3. copy .env.example
```bash
cp .env.example .env
```

4. Migrate Tables
```bash
php artisan migrate:fresh
```

5. Seed Data
```bash
php artisan db:seed --class=TaskSeeder
```

6. Serve Laravel App
```bash
php artisan serve
```
