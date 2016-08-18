# Prints messages giving details on sub-commands
MAKEFLAGS = -j1

# Node's bin directory
BIN = node_modules/.bin

# The commands we use for testing and coverage information
ISPARTA_CMD = $(BIN)/isparta cover
MOCHA_CMD = node_modules/mocha/bin/_mocha
STANDARD_CMD = $(BIN)/standard

# Available commands
.PHONY: test test-cov lint

# Run all tests
test:
	node $(MOCHA_CMD) test

# Generate coverage information
test-cov:
	rm -rf coverage
	$(ISPARTA_CMD) --include-all-sources --report lcov --report html $(MOCHA_CMD) -- test

# Lint current source code
lint:
	$(STANDARD_CMD)
