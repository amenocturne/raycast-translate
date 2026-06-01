# Default: show available commands
default:
    @just --list

# Install dependencies
setup:
    npm install

# Start extension in Raycast dev mode (also installs it)
run:
    npx ray develop

# Build extension
build:
    npx ray build -e dist

# Lint extension manifest and source
lint:
    npx ray lint

# Type-check without emitting
check:
    npx tsc --noEmit

# Remove build artifacts
clean:
    rm -rf dist node_modules
