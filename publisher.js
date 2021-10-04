const stompit = require('stompit')


async function main() {


  const connectOptions = {
    'host': 'localhost',
    'port': 61613,
    'connectHeaders': {
      'host': '/',
      'login': 'admin',
      'passcode': 'admin',
      'heart-beat': '5000,5000'
    }
  }

  stompit.connect(connectOptions, function (error, client) {

    if (error) {
      console.log('connect error ' + error.message)
      return
    }

    for (let i = 0; i < 2000; i++) {

      const sendHeaders = {
        'destination': '/queue/test1',
        'content-type': 'text/plain',
        'JMSXGroupID':'t1',
        /**
         * In order to reset, 'JMSXGroupSeq':-1. So if another message is sent in the future with the same message group ID it will be reassigned to a new consumer.
         * @see https://activemq.apache.org/message-groups
         */
        // 'JMSXGroupSeq':-1
      }

      const frame = client.send(sendHeaders)
      frame.write('t1 hello'+i.toString())
      frame.end()
    }

    for (let i = 2000; i < 5000; i++) {

      const sendHeaders = {
        'destination': '/queue/test1',
        'content-type': 'text/plain',
        'JMSXGroupID':'t2'
      }

      const frame = client.send(sendHeaders)
      frame.write('t2 hello'+i.toString())
      frame.end()
    }




    client.disconnect()

    // const subscribeHeaders = {
    //   'destination': '/queue/test1',
    //   'ack': 'client-individual',
    // }
    //
    // client.subscribe(subscribeHeaders, function (error, message) {
    //
    //   if (error) {
    //     console.log('subscribe error ' + error.message)
    //     return
    //   }
    //
    //   message.readString('utf-8', function (error, body) {
    //
    //     if (error) {
    //       console.log('read message error ' + error.message)
    //       return
    //     }
    //
    //     console.log('received message: ' + body)
    //
    //     client.ack(message)
    //
    //     // client.disconnect()
    //   })
    //
    // })
  })

}

main()


