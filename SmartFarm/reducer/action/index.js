import React from 'react';
import {AsyncStorage} from 'react-native';
changeAppState = (appState) => {
    return {
        type:'ChangeAppState',
        value:appState
    }
}
setTimeData =  (type,KIND='',MACID='',ACC='',DATEBEGIN='',MONTHBEGIN='',YEARBEGIN='',DATA='',
HOURTIME='',MINUTESTIME='',HOURDU='',MINUTESDU='',STATE='',ADDR='',DELAYDATE ='') => {
    if (type)
        return {
            type:'setFullData',
            KIND,MACID,ACC,DATEBEGIN,MONTHBEGIN,YEARBEGIN,DATA,
            MINUTESTIME,HOURDU,MINUTESDU,HOURTIME,STATE,ADDR,DELAYDATE
        }
    else {
       return {
            type:'clearData'
        } 
    }
}
loadDatePickerIOS =  (check) => {
    if (check)
        return {
            type:'loadDatePickerIOS'
        }
    else {
       return {
            type:'unLoadDatePickerIOS'
        } 
    }
}
loadSide =  (check) => {
    if (check)
        return {
            type:'LoadSlide'
        }
    else {
       return {
            type:'UnLoadSlide'
        } 
    }
}
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
removeDevice = (macId,nameDevice,data) => {
    return  {
            type:'remove',
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
export {removeDevice,changeAppState,
    setTimeData,loadDatePickerIOS,loadSide,select,setStateButton,setStateFan,setStateWater,setStateTemperature,
    load,visibleConfig,startConfig,loading,saveDevice,getListDevice,loadingListDevice}