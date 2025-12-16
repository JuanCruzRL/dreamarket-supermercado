.PHONY: front start stop back build

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

