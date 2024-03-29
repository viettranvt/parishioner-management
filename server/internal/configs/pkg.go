package config

// Contains all configuration and variables
// for any environment, the configuration can also be retrieved from the environment
// constants for db connection
const (
	EnvAPIPrefix      = "API_PREFIX"
	EnvMongoDBUrl     = "MONGO_DB_URL"
	EnvPort           = "PORT"
	EnvJwtSecretKey   = "JWT_KEY"
	EnvCorsOrigin     = "CORS_ORIGIN"
	EnvMode           = "MODE"
	DefaultBcryptCost = 10
)
