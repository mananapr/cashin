# Cashin

Source for Cashin

## Tech Stack
- Pocketbase
- Vue3
- TailwindCSS + Flowbite

## Directory Structure
- `cashin_pb`: Directory for Pocketbase data and hooks
- `cashin_vue`: Directory for Pocketbase frontend written in Vue3

## Setup
1. Place `pocketbase` binary in the `cashin_pb` directory
2. Modify `Makefile.inc.example` and save as `Makefile.inc`
3. Use `make` to setup the dev environment

### Run Pocketbase
```sh
make pb
```

### Run Frontend Dev Server
```sh
make ui
```

### Run Linter
```sh
make lint
```

### Run Formatter
```sh
make fmt
```

### Build Frontend
```sh
make build
```

### Deploy Hooks and Migrations
```sh
make deploy/srv
```

### Deploy Frontend
```sh
make deploy/ui
```
