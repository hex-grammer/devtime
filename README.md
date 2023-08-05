# DevTime

Welcome to DevTime, a project management and time tracking tool for developers!

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage projects.
- Organize tasks and subtasks using a Kanban board.
- Track working hours for tasks and subtasks.
- User authentication and authorization with Clerk.

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- npm or yarn
- Prisma CLI (for database migrations)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hex-grammer/devtime.git
cd devtime
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up your MySQL database and update the `.env` file:

```
DATABASE_URL=mysql://user:password@host:port/database
```

Replace `user`, `password`, `host`, `port`, and `database` with your MySQL database credentials.

4. Set up Clerk authentication by adding the following environment variables to `.env.local`:

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Usage

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Environment Variables

- `DATABASE_URL`: URL of your MySQL database.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Publishable key from Clerk.
- `CLERK_SECRET_KEY`: Secret key from Clerk.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: URL for signing in with Clerk.
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: URL for signing up with Clerk.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: URL to redirect after signing in.
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: URL to redirect after signing up.

## Demo

Check out the live demo of DevTime at [devtime.rizaltsx.com](https://devtime.rizaltsx.com).

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).