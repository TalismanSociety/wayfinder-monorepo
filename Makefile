dev:
	@cd apps/squid && $(MAKE) -s $@
process:
	@cd apps/squid && $(MAKE) -s $@
serve:
	@cd apps/squid && $(MAKE) -s $@
build:
	@cd apps/squid && $(MAKE) -s $@
create-migration:
	@cd apps/squid && $(MAKE) -s $@
migrate:
	@cd apps/squid && $(MAKE) -s $@
codegen:
	@cd apps/squid && $(MAKE) -s $@
typegen:
	@cd apps/squid && $(MAKE) -s $@
up:
	@cd apps/squid && $(MAKE) -s $@
down:
	@cd apps/squid && $(MAKE) -s $@
