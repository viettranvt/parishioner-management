package token_const

import "time"

const (
	ExpiredAccessToken      = time.Hour * 72
	ExpiredTimeRefreshToken = (time.Hour * 24) * 15
	ExpirationTimeKey       = "exp"
	Schema                  = "Bearer"
	AuthHeaderKey           = "authorization"
	UserIDKey               = "user_id"
	ExpiredTokenKey         = "exp"
	BasicAccountInfoKey     = "basic_account_info"
)
