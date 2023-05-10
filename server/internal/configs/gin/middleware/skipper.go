package gin_middleware

import (
	"strings"

	"github.com/gin-gonic/gin"
)

//used to skip authentication middleware
func DefaultAuthSkipper(c *gin.Context) bool {
	currentURL := c.Request.URL.Path
	//Only expose login API without request jwt
	if strings.Contains(currentURL, "/auth") && currentURL != "/auth/password" {
		return true
	}

	if strings.Contains(currentURL, "/api-document") {
		return true
	}

	return false
}
