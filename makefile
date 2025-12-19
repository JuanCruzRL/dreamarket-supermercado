.PHONY: front start stop back build db restart dev

front:
	docker compose up -d frontend

back:
	docker compose up -d backend

build:
	docker compose build

start:
	docker compose up -d

stop:
	docker compose down

db:
	docker compose up -d db

restart: stop start

dev:
	docker compose down
	docker compose up --build
