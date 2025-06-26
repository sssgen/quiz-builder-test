# Quiz Builder

## Backend Setup

### 1. Set up the Database

1. Ensure you have a running PostgreSQL instance.
2. Create a `.env` file in `quiz-builder/backend/` with the following content:
    ```env
    DATABASE_URL=your_postgres_connection_string
    FRONTEND_ORIGIN=http://localhost:3000
    APP_PORT=3001
    ```
3. Run Prisma migrations and generate the Prisma client:
    ```sh
    cd quiz-builder/backend
    npx prisma migrate dev --name init
    npx prisma generate
    ```

### 2. Install and Run the Backend

1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the backend in development mode:
    ```sh
    npm run dev
    ```
    By default, the backend runs at [http://localhost:3001](http://localhost:3001)

---

## Frontend Setup

### 1. Configure Environment Variables

1. Create a `.env` file in `quiz-builder/frontend/` with the following:
    ```env
    NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
    ```

### 2. Install and Run the Frontend

1. Install dependencies:
    ```sh
    cd quiz-builder/frontend
    npm install
    ```
2. Start the frontend:
    ```sh
    npm run dev
    ```
    By default, the frontend runs at [http://localhost:3000](http://localhost:3000)

---

## Creating a Sample Quiz

1. Start both the **frontend** and **backend** as described above.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Navigate to the **Create Quiz** page.
4. Fill out the quiz form and add questions.
5. Submit to save your quiz to the database.
