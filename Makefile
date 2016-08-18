# Prints messages giving details on sub-commands
MAKEFLAGS = -j1

# Node's bin directory
BIN = node_modules/.bin

# The commands we use for testing and coverage information
ISTANBUL_CMD = $(BIN)/istanbul
MOCHA_CMD = node_modules/mocha/bin/_mocha
STANDARD_CMD = $(BIN)/standard

# Available commands
.PHONY: test test-cov test-cov-level lint

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
