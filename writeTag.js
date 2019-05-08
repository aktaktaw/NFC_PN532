var pn532 = require('pn532')
var SerialPort = require('serialport')
var ndef = require('ndef')

var serialport = new SerialPort('/dev/tty.wchusbserial1410',{
    baudRate: 115200
})

var nfc = new pn532.PN532(serialport)

console.log('Waiting for nfc ready event...')

nfc.on('ready', function(){
    console.log('Waiting for a tag')
    nfc.scanTag().then(function(tag){
        console.log('Tag found: ',tag)

        var message=[
            //ndef.uriRecord('http://www.xfero.io'),
            ndef.textRecord("Ayam Ayam")
        ]
        var data = ndef.encodeMessage(message)
        console.log('Writing data...')
        nfc.writeNdefData(data).then(function(response){
            console.log('Write Successful.')
        })
    })
})