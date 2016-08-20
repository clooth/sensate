import { expect } from 'chai'
import WebSocket from 'ws'
import { Event, Gateway } from '../../src'

describe('Gateway', () => {
  describe('Core', () => {
    it('should be initializable with options', () => {
      const gateway = new Gateway({
        optionOne: true,
        optionTwo: false,
        optionFoo: 123
      })

      expect(gateway.config.optionOne).to.be.equal(true)
    })
  })

  describe('Events', () => {
    it('should ensure event matching', () => {
      const ev1 = Event.CONNECTED
      const ev2 = Event.DISCONNECTED
      const ev3 = Event.CONNECTED

      expect(ev1).to.not.equal(ev2)
      expect(ev1).to.equal(ev3)
    })

    it('should return a promise of type GatewayType', () => {
      const gateway = new Gateway({
        value: true
      })

      return gateway.connect()
        .then(r => {
          expect(r).to.be.an.instanceof(Gateway)
        })
    })
  })

  describe('Networking', () => {
    describe('WebSockets', () => {
      it('connects', (done) => {
        const gateway = new Gateway()

        gateway.on(Event.WEBSOCKET_OPENED, data => {
          expect(gateway.webSocket.readyState).to.equal(WebSocket.OPEN)
          expect(gateway.webSocket).to.be.an.instanceof(WebSocket)
          gateway.closeWebSocket()
          done()
        })

        gateway.openWebSocket('ws://echo.websocket.org/')
      })

      it('disconnects', (done) => {
        const gateway = new Gateway()

        gateway.on(Event.WEBSOCKET_OPENED, _ => gateway.closeWebSocket())
        gateway.on(Event.WEBSOCKET_CLOSED, data => {
          expect(gateway.webSocket.readyState).to.equal(WebSocket.CLOSED)
          expect(gateway.webSocket).to.be.an.instanceof(WebSocket)
          done()
        })

        gateway.openWebSocket('ws://echo.websocket.org/')
      })

      it('sends and receives messages', (done) => {
        const gateway = new Gateway()

        gateway.on(Event.WEBSOCKET_OPENED, data => {
          gateway.sendWebSocketMessage('test')
        })

        gateway.on(Event.WEBSOCKET_MESSAGE, message => {
          expect(message).to.equal('test')
          gateway.closeWebSocket()

          // Connection not open
          expect(gateway.sendWebSocketMessage('foo')).to.equal(false)

          done()
        })

        gateway.openWebSocket('ws://echo.websocket.org/')
      })

      it('handles invalid connections', (done) => {
        const gateway = new Gateway()

        gateway.on(Event.WEBSOCKET_CLOSED, errorCode => {
          // Unsupported data
          expect(errorCode).to.be.above(1000)
          done()
        })

        gateway.on(Event.WEBSOCKET_ERROR, error => {
          expect(error.constructor.name).to.equal('Error')
        })

        gateway.openWebSocket('ws://echos.websocket.org/')
      })
    })

    describe('HTTP', () => {
      it('receives JSON data', () => {
        let gateway = new Gateway()

        return gateway.requestHTTP('https://jsonplaceholder.typicode.com/users', 'GET')
          .then(result => {
            expect(result.length).to.equal(10)
            expect(result[0].id).to.equal(1)
            expect(result[0].username).to.equal('Bret')
          })
      })

      it('falls back to raw data', () => {
        let gateway = new Gateway()

        return gateway.requestHTTP('https://google.com', 'GET')
          .then(result => {
            expect(result.length).to.be.above(0)
            expect(result).to.include('window.google')
          })
      })
    })
  })
})
