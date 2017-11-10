import React from 'react';
import {AsyncStorage} from 'react-native';
const defaultState = {
    selectedDevice:{macID:'nan',nameDevice:'nan'},
    listDevice:[],
}
selectDevice = (state,device) => {
    return {
        ...state,
        selectedDevice:device
    }
}

getData = (data) => {
    var json = [];
    if (data && data!= ''){
        json = JSON.parse(data)    
        return {
            listDevice:json,
            selectedDevice:json[0]
        }
    }
    return {
        listDevice:json,
        selectedDevice:{macID:'nan',nameDevice:'nan'}
    }
}
saveData = (macId,nameDevice,data) => {
    var jsonSave = {
        macId:macId,
        nameDevice:nameDevice
    }
    var convertedJson = []
    if (data && data !='')              
        convertedJson = JSON.parse(data)
    convertedJson.push(jsonSave)
    try {
        AsyncStorage.setItem('devices', JSON.stringify(convertedJson)); 
        if (convertedJson.length!=0)     
            return {
                listDevice:convertedJson,
                selectedDevice:convertedJson[convertedJson.length-1]
            }
        else {
            return {
                listDevice:convertedJson,
                selectedDevice:convertedJson[0]
            }
        }
    } catch (error) {
    }
    return {
        listDevice:convertedJson,
        selectedDevice:{macID:'nan',nameDevice:'nan'}
    }
}
export default  (state = defaultState,actions) => {
    switch (actions.type) {
        case 'get': {
            return getData(actions.data)
        }
        case 'save': {
            return saveData(actions.macId,actions.nameDevice,actions.data)
        }
        case 'select': {
            return selectDevice(state,actions.device);
        }
        default:return state;
    }
}    