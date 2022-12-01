dev: build migrate
	@bash -c 'yarn query-node:start & node --inspect -r dotenv/config lib/processor.js & wait'


process: migrate
	@yarn processor:start

serve: build
	@yarn query-node:start


build: codegen
	@yarn build


create-migration: build
	@npx squid-typeorm-migration generate

migrate: build
	@yarn db:migrate


codegen:
	@npx squid-typeorm-codegen

typegen:
	@npx squid-substrate-typegen typegen.json


up:
	@docker-compose up -d

down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down
