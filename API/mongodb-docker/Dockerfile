# Use the official MongoDB image
FROM mongo:latest

# Copy initialization scripts (JS or Shell) into the standard init directory

# Création du répertoire pour les scripts
WORKDIR /docker-entrypoint-initdb.d

# These run automatically on the first container startup
COPY mongo-init/ /docker-entrypoint-initdb.d/

# Expose the default MongoDB port
EXPOSE 27017

# Healthcheck using the modern 'mongosh' (replaces deprecated 'mongo' shell)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD mongosh --eval "db.adminCommand('ping')" || exit 1

# Default command to start MongoDB with auth and bind all IPs
# The base image ENTRYPOINT will automatically receive these as arguments
CMD ["mongod", "--bind_ip_all", "--auth"]
