# Makefile for BestChallenges project

.PHONY: up down logs backend-test frontend-test e2e-test

up:
	docker-compose up --build backend frontend db

down:
	docker-compose down

logs:
	docker-compose logs -f

backend-test:
	docker-compose run --rm backend pytest

frontend-test:
	docker-compose run --rm frontend npm test -- --watchAll=false

e2e-test:
	docker-compose up --build -d backend frontend db
	docker-compose run --rm e2e npx playwright test
	docker-compose down
