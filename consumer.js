const stompit = require('stompit')


async function main() {

  const connectionManager = new stompit.ConnectFailover()

  connectionManager.addServer({
    'host': 'localhost',
    'port': 61613,
    'connectHeaders': {
      'host': '/',
      'login': 'admin',
      'passcode': 'admin',
      'heart-beat': '5000,5000'
    }
  })

  // prefect count might not work.
  const channel = new stompit.Channel(connectionManager,{prefetchSize:10})

  const subscribeHeaders = {
    'destination': '/queue/test1',
    'ack': 'client-individual',
  }

  channel.subscribe(subscribeHeaders, function (error, message) {

    if (error) {
      console.log('subscribe error ' + error.message)
      return
    }

    message.readString('utf-8', function (error, body) {

      if (error) {
        console.log('read message error ' + error.message)
        return
      }

      console.log('received message: ' + body)

      channel.ack(message)

      // client.disconnect()
    })
  })


  // const connectOptions = {
  //   'host': 'localhost',
  //   'port': 61613,
  //   alwaysConnected: false,
  //   'connectHeaders': {
  //     'host': '/',
  //     'login': 'admin',
  //     'passcode': 'admin',
  //     'heart-beat': '5000,5000'
  //   }
  // }
  //
  // stompit.connect(connectOptions, function (error, client) {
  //
  //   if (error) {
  //     console.log('connect error ' + error.message)
  //     return
  //   }
  //
  //   // const sendHeaders = {
  //   //   'destination': '/queue/test1',
  //   //   'content-type': 'text/plain'
  //   // }
  //   //
  //   // const frame = client.send(sendHeaders)
  //   // frame.write('hello')
  //   // frame.end()
  //
  //   const subscribeHeaders = {
  //     'destination': '/queue/test1',
  //     'ack': 'client-individual',
  //   }
  //
  //   client.subscribe(subscribeHeaders, function (error, message) {
  //
  //     if (error) {
  //       console.log('subscribe error ' + error.message)
  //       return
  //     }
  //
  //     message.readString('utf-8', function (error, body) {
  //
  //       if (error) {
  //         console.log('read message error ' + error.message)
  //         return
  //       }
  //
  //       console.log('received message: ' + body)
  //
  //       client.ack(message)
  //
  //       // client.disconnect()
  //     })
  //   })
  // })

}

main()


