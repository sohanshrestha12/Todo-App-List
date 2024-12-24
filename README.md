# To-Do List Application

This is a basic To-Do List application built using the T3 stack: Next.js, TypeScript, tRPC, Prisma, and Tailwind CSS. The application allows users to manage tasks with features like adding, updating, deleting, and marking tasks as completed. The backend is powered by Prisma with a SQLite database.

## Features

- **Add Tasks**: Users can create new tasks.
- **Update Tasks**: Users can edit existing tasks.
- **Delete Tasks**: Users can delete tasks they no longer need.
- **Marked as Completed**: Users can mark tasks as completed or incomplete.

## Tech Stack

- **Next.js**: Frontend framework for building the user interface.
- **TypeScript**: Type-safe development.
- **tRPC**:  For building type-safe API routes.
- **Prisma**: ORM for interacting with the SQLite database.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (>= 16)
- npm or yarn  

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sohanshrestha12/Todo-App-List.git
cd todo-app
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables

Create a .env file in the root directory and add the following:

```bash
DATABASE_URL="file:./dev.db"
```

### 3. Migrate the Database

```bash
npx prisma db push
```

### 4. Prisma Studio
Last, you can always check the database with Prisma Studio:

```bash
npx prisma studio
```

### 5. Start the Development Server
Start the application in development mode:

```bash
npm run dev
```
The application will be available at http://localhost:3000.

### Deployment

**Deployment Issue**: I tried deploying the application on Vercel, but encountered an issue with SQLite. Unfortunately, SQLite is not compatible with serverless environments like Vercel due to its reliance on a persistent file system, which is not supported in serverless architectures.

In serverless environments, each function instance is isolated and does not share a central filesystem, making it impossible for SQLite to function correctly. As a result, the database state is lost between invocations, leading to errors or data loss.

**Next Steps**:

To make this work, I'll need to switch to a database solution that is compatible with serverless platforms, such as MySQL, PostgreSQL, 