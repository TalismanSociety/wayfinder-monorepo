dev: build migrate
	@bash -c 'yarn workspace @talismn/wayfinder-squid query-node:start & node --inspect -r dotenv/config apps/squid/lib/processor.js & wait'


process: migrate
	@yarn workspace @talismn/wayfinder-squid processor:start

serve: build
	@yarn workspace @talismn/wayfinder-squid query-node:start


build: codegen
	@yarn workspace @talismn/wayfinder-squid build


create-migration: build
	@cd apps/squid && npx squid-typeorm-migration generate

migrate: build
	@yarn workspace @talismn/wayfinder-squid db:migrate


codegen:
	@cd apps/squid && npx squid-typeorm-codegen

typegen:
	@cd apps/squid && npx squid-substrate-typegen typegen.json


up:
	@docker-compose up -d

down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down
