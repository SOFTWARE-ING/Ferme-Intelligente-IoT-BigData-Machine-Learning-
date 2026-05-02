.PHONY: help start stop restart logs shell backup restore reset status

help:
	@echo "📋 Commandes disponibles:"
	@echo "  make start    - Démarrer les conteneurs"
	@echo "  make stop     - Arrêter les conteneurs"
	@echo "  make restart  - Redémarrer les conteneurs"
	@echo "  make logs     - Afficher les logs"
	@echo "  make shell    - Accéder à MongoDB"
	@echo "  make backup   - Sauvegarder la base"
	@echo "  make restore  - Restaurer la base (make restore FILE=backup.gz)"
	@echo "  make reset    - Réinitialiser"
	@echo "  make status   - Statut des conteneurs"

start:
	docker compose up -d
	@echo "✅ MongoDB démarré"

stop:
	docker compose stop
	@echo "✅ Conteneurs arrêtés"

restart:
	docker compose restart
	@echo "✅ Conteneurs redémarrés"

logs:
	docker compose logs -f mongodb

shell:
	docker exec -it manichicks-mongodb mongosh -u admin -p password2026! --authenticationDatabase admin

backup:
	@docker exec manichicks-mongodb mongodump --username admin --password password2026! --authenticationDatabase admin --db iot_db --archive --gzip > backup_$$(date +%Y%m%d_%H%M%S).gz
	@echo "✅ Backup créé"

restore:
	@if [ -z "$(FILE)" ]; then \
		echo "❌ Usage: make restore FILE=backup.gz"; \
		exit 1; \
	fi
	@cat $(FILE) | docker exec -i manichicks-mongodb mongorestore --username admin --password password2026! --authenticationDatabase admin --archive --gzip --nsInclude "iot_db.*" --drop
	@echo "✅ Base restaurée depuis $(FILE)"

reset:
	@echo "⚠️  Suppression des données..."
	docker compose down -v
	docker compose up -d
	@echo "✅ Base réinitialisée"

status:
	docker compose ps