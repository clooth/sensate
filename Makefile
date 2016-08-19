# Prints messages giving details on sub-commands
MAKEFLAGS = -j1

# Paths
BIN = node_modules/.bin

# Commands
MOCHA_CMD = node_modules/mocha/bin/_mocha
NYC_CMD = $(BIN)/nyc
STANDARD_CMD = $(BIN)/standard
BABEL_CMD = $(BIN)/babel
FLOW_CMD = $(BIN)/flow

# Make commands
.PHONY: test test-cov test-cov-level lint build

# Run all tests
test:
	node $(MOCHA_CMD) test

# Generate coverage information
test-cov:
	rm -rf coverage
	$(NYC_CMD) --reporter=lcov npm test

# Lint current source code
lint:
	$(STANDARD_CMD)

# Check flowtype
flow:
	$(FLOW_CMD)

# Build the library with babel
build:
	$(BABEL_CMD) lib --out-dir build
