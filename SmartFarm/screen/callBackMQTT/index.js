import {Client, Message} from 'react-native-paho-mqtt';
import {nameTopicSub,nameTopicSend} from '../../helperScreen'
function initMQTT () {
    const myStorage = {
        setItem: (key, item) => {
            myStorage[key] = item;
        },
        getItem: (key) => myStorage[key],
        removeItem: (key) => {
            delete myStorage[key];
        },
    };
    //ws://cretacam.ddns.net:1889/ws
    client = new Client({uri: 'ws://iot.eclipse.org:80/ws', clientId: 'clientId', storage: myStorage});
    return client;
}
function analyzeData (data,control) {
    var parseData = JSON.parse(data)
    if (parseData.FUNC != 'Error') {
        if (parseData.FUNC == 'Data') {
            if (parseData.ADDR == 1) {
                if (parseData.DATA == 'On') {
                    control.setStateButton(true)
                } else {
                    control.setStateButton(false)
                }
            } else if (parseData.ADDR == 2) {
                if (parseData.DATA == 'On') {
                    control.setStateFan(true)                
                } else {
                    control.setStateFan(false)
                }
            } else if (parseData.ADDR == 3) {
                if (parseData.DATA == 'Upper') {
                    control.setStateWater(true)                
                } else {
                    control.setStateWater(false)                
                }
            } else if (parseData.ADDR == 4 ) {
                if (parseData.DATA != '') {
                    control.setStateTemperature(parseData.DATA)                
                }
            }
        } else if (parseData.FUNC == 'Ctrl') {
            if (parseData.ADDR == 1) {
                if (parseData.DATA == 'On') {
                    control.setStateButton(true)
                } else {
                    control.setStateButton(false)
                }
            } else if (parseData.ADDR == 2) {
                if (parseData.DATA == 'On') {
                    control.setStateFan(true)                
                } else {
                    control.setStateFan(false)
                }
            } else if (parseData.ADDR == 3) {
                if (parseData.DATA == 'Upper') {
                    control.setStateWater(true)                
                } else {
                    control.setStateWater(false)                
                }
            }
        }
      } else {
        alert("ERROR CAN NOT CONTROL")
      }
}
function sendGetAllData(client,selectedDevice) {
    if (selectedDevice != undefined) {
        const jsonUpdateState1 = {
            ID: 'ESP' + selectedDevice.macId,
            FUNC: "Data",
            ADDR: "1",
            DATA: "OFF"
          }
          const jsonUpdateState2 = {
            ID: 'ESP' + selectedDevice.macId,
            FUNC: "Data",
            ADDR: "2",
            DATA: "OFF"
          }
          const jsonUpdateState3 = {
            ID: 'ESP' + selectedDevice.macId,
            FUNC: "Data",
            ADDR: "3",
            DATA: "OFF"
          }
          const jsonUpdateState4 = {
            ID: 'ESP' + selectedDevice.macId,
            FUNC: "Data",
            ADDR: "4",
            DATA: "OFF"
          }
          const message1 = new Message(JSON.stringify(jsonUpdateState1));
          const message2 = new Message(JSON.stringify(jsonUpdateState2));
          const message3 = new Message(JSON.stringify(jsonUpdateState3));
          const message4 = new Message(JSON.stringify(jsonUpdateState4));
          message1.destinationName = nameTopicSend(selectedDevice.macId)
          message2.destinationName = nameTopicSend(selectedDevice.macId)
          message3.destinationName = nameTopicSend(selectedDevice.macId)
          message4.destinationName = nameTopicSend(selectedDevice.macId)
          setTimeout(()=>{this.client.send(message1);
            setTimeout(()=>{this.client.send(message2);
              setTimeout(()=>{this.client.send(message3);
                setTimeout(()=>{this.client.send(message4);
                },300)
              },300)
            },300)
          },300)
    }
}
export {initMQTT,sendGetAllData,analyzeData};