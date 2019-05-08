var pn532 = require('pn532')
var SerialPort = require('serialport')
var ndef = require('ndef')

var serialport = new SerialPort('/dev/tty.wchusbserial1410',{
    baudRate: 115200
})

var nfc = new pn532.PN532(serialport)
var scannedTag, scannedData
console.log('Waiting for nfc ready event..')
nfc.on('ready', function() {

    console.log('Listening for a tag scan...')
    nfc.on('tag', function(tag) {
        scannedTag=tag
        console.log('Tag', scannedTag)

        console.log('Reading tag data...')
        nfc.readNdefData().then(function(data) {
            var scannedData = data
            console.log('Tag data:', scannedData)

            var records = ndef.decodeMessage(Array.from(scannedData))
            console.log(records)
        }).catch(err=>{
            records='unable to read tag,maybe tag is empty'
            console.log(records)
        })
    })
})
