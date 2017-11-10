import React from 'react';
import {AsyncStorage} from 'react-native';
load =  (check) => {
    if (check)
        return {
            type:'Load'
        }
    else {
       return {
            type:'UnLoad'
        } 
    }
}
visibleConfig = (check) => {
    if (check) {
        return {
            type:'Visible'
        }
    } else {
        return {
            type: 'Invisible'
        }
    }
}
loading = (check) => {
    if (check) {
        return {
            type:'Loading'
        }
    } else {
        return {
            type:'UnLoading'
        }
    }
}
startConfig = (check,macId = null,nameDevice = null) => {
    if (check) {
        return {
            type:'OK',
            macId:macId,
            nameDevice:nameDevice
        }
    } else {
        return {
            type:'Fail',
            macId:macId,
            nameDevice:nameDevice
        }
    }
}
getListDevice = (data) => {
    return {
            type:'get',
            data:data
        }
}
saveDevice = (macId,nameDevice,data) => {
    return  {
            type:'save',
            macId:macId,
            data:data,
            nameDevice:nameDevice
        }
}
loadingListDevice = (check) => {
    if (check) 
        return {
            type:'showList'
        }
    else 
        return {
            type:'unShowList'
        }
}


setStateButton = (value) => {
    return {
        type:'setStateButton',
        value:value
    }
}
setStateFan = (value) => {
    return {
        type:'setStateFan',
        value:value
    }
}
setStateWater = (value) => {
    return {
        type:'setStateWater',
        value:value
    }
}
setStateTemperature = (value) => {
    return {
        type:'setStateTemperature',
        value:value
    }
}
select = (device) => {
    return {
        type:'select',
        device:device
    }
}
export {select,setStateButton,setStateFan,setStateWater,setStateTemperature,
    load,visibleConfig,startConfig,loading,saveDevice,getListDevice,loadingListDevice}