# BestChallenges

Our first vibe coding app to create our own BestCycling challenges

## Project Overview

BestChallenges is a web application inspired by BestCycling (www.bestcycling.com) that allows users to create 
cycling challenges and track their progress. The application follows a monorepo structure with separate frontend 
and backend services, both running in isolated Docker containers.

## Documentation

The project documentation is organized into several files:

- **Functional Requirements**:
  - [Functional Requirements](docs/functional_requirements.md): Detailed requirements for the application

- **Feature Documentation**:
  - [User Authentication](docs/user_authentication.md): Implementation details for user login and authentication

- **Development Setup**:
  - [PyCharm Setup Instructions](docs/pycharm_setup.md): Guide for setting up the project in PyCharm IDE

These documents are regularly updated as new features are requested and implemented.

## Architecture

The project follows Clean Architecture principles and SOLID design patterns:

- **Clean Architecture**: The codebase is organized in layers (entities, use cases, interfaces, frameworks) 
- with dependencies pointing inward.
- **SOLID Principles**: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, 
- and Dependency Inversion principles are applied throughout the codebase.

### Repository Structure

```
bestchallenges/
├── README.md
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── dev-requirements.txt
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── core/
│   │   ├── api/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── services/
│   └── tests/
│       ├── unit/
│       └── integration/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── public/
│   ├── src/
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   └── tests/
│       ├── unit/
│       └── integration/
└── e2e/
    ├── package.json
    ├── playwright.config.ts
    └── tests/
```

## Backend Service

### Technology Stack

- **Language**: Python 3.11+
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Testing**: pytest
- **Documentation**: Swagger/OpenAPI

### Clean Architecture Implementation

The backend follows a layered architecture:

1. **Domain Layer**: Contains business entities and logic
   - `domain/entities/`: Business objects
   - `domain/repositories/`: Repository interfaces
   - `domain/use_cases/`: Business logic

2. **Application Layer**: Orchestrates the flow of data
   - `api/`: API endpoints and controllers
   - `services/`: Application services

3. **Infrastructure Layer**: External interfaces
   - `infrastructure/repositories/`: Repository implementations
   - `infrastructure/database/`: Database configuration
   - `infrastructure/external_services/`: External API clients

### Testing Strategy

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test interactions between components
- **API Tests**: Test API endpoints

## Frontend Service

### Technology Stack

- **Language**: TypeScript
- **Framework**: React
- **State Management**: Redux Toolkit or React Query
- **Styling**: Tailwind CSS
- **Testing**: Jest and React Testing Library
- **Build Tool**: Vite

### Clean Architecture Implementation

The frontend follows a component-based architecture with clear separation of concerns:

1. **Presentation Layer**: UI components
   - `components/`: Reusable UI components
   - `pages/`: Page components

2. **Application Layer**: Business logic
   - `services/`: API clients and business logic
   - `hooks/`: Custom React hooks

3. **Domain Layer**: Business entities
   - `types/`: TypeScript interfaces and types

4. **Infrastructure Layer**: External interfaces
   - `utils/`: Utility functions
   - `api/`: API client configuration

### Testing Strategy

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **Snapshot Tests**: Ensure UI consistency

## E2E Testing

End-to-end tests are implemented using Playwright to test the entire application flow from the user's perspective.

### Technology Stack

- **Framework**: Playwright
- **Language**: TypeScript

### Running E2E Tests with Docker

You can run the end-to-end tests using Docker Compose without installing anything locally:

```bash
# Run the e2e tests in Docker
docker-compose run e2e

# View the test results
open e2e/playwright-report/index.html
```

The e2e service in Docker Compose:
- Automatically waits for the frontend and backend services to be ready
- Runs the tests against the containerized services
- Saves the test results and reports to your local machine

## Docker Configuration

Both services are containerized using Docker and orchestrated with docker-compose.

### Backend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/bestchallenges
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000

  db:
    image: postgres:14
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=bestchallenges
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Development Workflow

1. **Setup**:
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/bestchallenges.git
   cd bestchallenges

   # Start the services
   docker-compose up -d
   ```

2. **Backend Development**:
   - API endpoints are available at http://localhost:8000
   - Swagger documentation at http://localhost:8000/docs
   - Run tests: `docker-compose exec backend pytest`

3. **Frontend Development**:
   - UI is available at http://localhost:3000
   - Run tests: `docker-compose exec frontend npm test`

4. **E2E Testing**:
   ```bash
   cd e2e
   npm install
   npx playwright test
   ```

## Best Practices

### Code Quality

- **Linting**: 
  - Backend: flake8, black, isort
  - Frontend: ESLint, Prettier

- **Type Checking**:
  - Backend: mypy
  - Frontend: TypeScript

- **Pre-commit Hooks**: Enforce code quality before commits

### CI/CD

- GitHub Actions for continuous integration
- Automated testing on pull requests
- Deployment to staging/production environments

## Additional Setup Recommendations

1. **Environment Management**:
   - Use `.env` files for environment-specific configurations
   - Implement environment validation

2. **Authentication and Authorization**:
   - JWT-based authentication
   - Role-based access control

3. **API Documentation**:
   - OpenAPI/Swagger for backend API
   - Storybook for frontend components

4. **Monitoring and Logging**:
   - Implement structured logging
   - Set up monitoring with Prometheus/Grafana

5. **Database Migrations**:
   - Use Alembic for database migrations
   - Version control database schema changes

6. **Security**:
   - Implement CORS protection
   - Set up rate limiting
   - Use HTTPS in production
   - Implement input validation

7. **Performance**:
   - Implement caching strategies
   - Optimize database queries
   - Use pagination for large datasets

8. **Accessibility**:
   - Follow WCAG guidelines
   - Implement keyboard navigation
   - Use semantic HTML

9. **Internationalization**:
   - Set up i18n framework
   - Support multiple languages

10. **Error Handling**:
    - Implement global error handling
    - Provide meaningful error messages
