dev: build migrate
	@bash -c 'yarn workspace @talismn/wayfinder-datasource query-node:start & node --inspect -r dotenv/config apps/squid/lib/processor.js & wait'


process: migrate
	@yarn workspace @talismn/wayfinder-datasource processor:start

serve: build
	@yarn workspace @talismn/wayfinder-datasource query-node:start


build: codegen
	@yarn workspace @talismn/wayfinder-datasource build


create-migration: build
	@cd apps/squid && npx squid-typeorm-migration generate

migrate: build
	@yarn workspace @talismn/wayfinder-datasource db:migrate


codegen:
	@cd apps/squid && npx squid-typeorm-codegen

typegen:
	@cd apps/squid && npx squid-substrate-typegen typegen.json


up:
	@docker-compose up -d

down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down
