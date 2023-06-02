# syntax=docker/dockerfile:1
# build stage
FROM golang:1.19 AS builder

# Set destination for COPY
WORKDIR /app


# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/engine/reference/builder/#copy
COPY . .

# Download Go modules
RUN go mod download
 
# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

#run stage
FROM alpine:3.18.0
WORKDIR /app
COPY --from=builder /app/server .
# copy env because go is not support read env
COPY ./.env .

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/engine/reference/builder/#expose
# EXPOSE 8080

# Run
CMD ["./server" ]