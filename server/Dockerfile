FROM golang:1.22-alpine AS server-builder

WORKDIR /app/server

COPY go.mod go.sum
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
