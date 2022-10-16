FROM golang:1.19-alpine as builder

WORKDIR /usr/src/app

COPY full_cycle.go .

RUN go mod init github.com/alvesandersonr/curso_full_cycle_3.0

RUN GOOS=linux go build -o full_cycle_rocks

FROM scratch
WORKDIR /app
COPY --from=builder /usr/src/app/full_cycle_rocks .
CMD ["./full_cycle_rocks"]