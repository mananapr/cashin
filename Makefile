include Makefile.inc

RSYNC_TO = $(SSH_USER)@$(SSH_HOST):/home/$(SSH_USER)/cashin

.PHONY: lint
lint:
	@cd cashin_vue && npm run lint && cd ..

.PHONY: fmt
fmt:
	@cd cashin_vue && npm run format && cd ..

.PHONY: pb
pb:
	@./cashin_pb/pocketbase serve

.PHONY: ui
ui:
	@cd cashin_vue && npm run dev

.PHONY: build
build:
	@cd cashin_vue && npm run build && cd .. && cp -r ./cashin_vue/dist/* ./cashin_pb/pb_public/

.PHONY: deploy/srv
deploy/srv:
	@rsync -r --delete ./cashin_pb/pb_migrations/ $(RSYNC_TO)/pb_migrations/
	@rsync -r --delete ./cashin_pb/pb_hooks/ $(RSYNC_TO)/pb_hooks/
	@echo "🚀 Server Deployed"

.PHONY: deploy/ui
deploy/ui:
	@rsync -r --delete ./cashin_pb/pb_public/ $(RSYNC_TO)/pb_public/
	@echo "🚀 UI Deployed"
