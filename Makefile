# Prints messages giving details on sub-commands
MAKEFLAGS = -j1

# Paths
BIN = node_modules/.bin

# Commands
ISTANBUL_CMD = $(BIN)/istanbul
MOCHA_CMD = node_modules/mocha/bin/_mocha
STANDARD_CMD = $(BIN)/standard
BABEL_CMD = $(BIN)/babel

# Make commands
.PHONY: test test-cov test-cov-level lint build

# Run all tests
test:
	node $(MOCHA_CMD) test

# Generate coverage information
test-cov:
	rm -rf coverage
	$(ISTANBUL_CMD) cover $(MOCHA_CMD)

# Check overall code coverage percent
test-cov-level:
	make test-cov
	$(ISTANBUL_CMD) check-coverage --statements 100 --functions 100 --lines 100 --branches 100

# Lint current source code
lint:
	$(STANDARD_CMD)

# Build the library with babel
build:
	$(BABEL_CMD) lib --out-dir build
