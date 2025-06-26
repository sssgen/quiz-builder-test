# Quiz Builder

## 1. Starting the Frontend and Backend

### Backend

1. **Install dependencies**
    ```sh
    cd quiz-builder/backend
    npm install
    ```
2. **Set up environment variables**
    - Create a `.env` file in `quiz-builder/backend` with:
        ```env
        DATABASE_URL=your_postgres_connection_string
        FRONTEND_ORIGIN=frontend_url
        APP_PORT=your_preferred_port
        ```
3. **Start the backend (development mode)**
    ```sh
    npm run dev
    ```
    The backend will run on the port specified in your `.env` (default: 3001).

### Frontend

1. **Install dependencies**
    ```sh
    cd quiz-builder/frontend
    npm install
    ```
2. **Start the frontend**
    ```sh
    npm run dev
    ```
    The frontend will be available at [http://localhost:3000](http://localhost:3000) by default.
3. **Set up environment variables**
    - Create a `.env` file in `quiz-builder/backend` with:
        ```env
        NEXT_PUBLIC_BACKEND_URL=backend_url
        ```

---

## 2. Setting Up the Database

1. **Ensure you have a running PostgreSQL instance.**
2. **Configure your database connection**
    - Set the `DATABASE_URL` in your backend `.env` file to point to your database.
3. **Run Prisma migrations and generate client**
    ```sh
    cd quiz-builder/backend
    npx prisma migrate dev --name some_name
    npx prisma generate
    ```
    This will apply the schema in `prisma/schema.prisma` and generate the Prisma client.

---

## 3. Creating a Sample Quiz

### Via the Frontend UI

1. Start both the frontend and backend as described above.
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. Navigate to the "Create Quiz" page.
4. Fill in the quiz details and add questions.
5. Submit the form to save your quiz.

---
