# sensate [![Build][travis-image]][travis-url] [![Coverage][cov-image]][cov-url] [![NPM][npm-image]][npm-url]

> The no tears extensible bot framework.

## Features

### Gateways

Gateways are objects that manage the connection and communication with an online service. They're used to send, receive and handle messages.

#### Example Gateways

Our current roadmap for gateways is as follows:

- [x] Discord
- [ ] IRC
- [ ] Slack
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

Please open any issues or send pull requests and I will look through them.

[npm-url]: https://npmjs.org/package/@sensate/sensate
[npm-image]: http://img.shields.io/npm/v/@sensate/sensate.svg
[travis-url]: http://travis-ci.org/sensate-framework/sensate
[travis-image]: http://travis-ci.org/sensate-framework/sensate.svg?branch=master
[cov-url]: https://coveralls.io/github/sensate-framework/sensate?branch=master
[cov-image]: https://coveralls.io/repos/github/sensate-framework/sensate/badge.svg?branch=master
