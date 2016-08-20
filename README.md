# sensate [![Build][travis-image]][travis-url] [![Coverage][cov-image]][cov-url] [![NPM][npm-image]][npm-url]

> The no tears extensible bot framework.

## Features

### Gateways

Gateways are objects that manage the connection and communication with an online service. They're used to send, receive and handle messages.

#### Example Gateways

Our current roadmap for gateways is as follows:

- [ ] IRC
- [ ] Slack
- [ ] Discord
- [ ] Facebook Messenger
- [ ] Telegram
- [ ] Twilio

### Agents

Agents are objects that namespace one or more command listeners for a Sensate. You can think of them as plugins, but they're more like collections of plugins.

#### Example Agents

- Toggl: Providing a variety of commands for creating, listing and tracking time entries.
- Dictionary: Providing synonyms, antonyms, definitions etc. for given words.
- IMDB: Providing information about actors, movies, directors etc.
- Random: Providing dice rolls, random generated names, colors, etc.

## Contributing

Please open any issues or pull requests and I will look through them once I have the time. I'm open to most contributions but can be a bit picky about coding styles.

[npm-url]: https://npmjs.org/package/sensate
[npm-image]: http://img.shields.io/npm/v/sensate.svg
[travis-url]: http://travis-ci.org/clooth/sensate
[travis-image]: http://travis-ci.org/clooth/sensate.svg?branch=master
[cov-url]: https://codecov.io/gh/clooth/sensate
[cov-image]: https://codecov.io/gh/clooth/sensate/branch/master/graph/badge.svg
