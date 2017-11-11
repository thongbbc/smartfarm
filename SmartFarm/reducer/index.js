import {combineReducers} from 'redux';
import reducer1 from './reducer1'
import reducer2 from './reducer2'
import reducer3 from './reducer3'
import reducer4 from './reducer4'
import reducer5 from './reducer5'
import reducer6 from './reducer6'
import reducer7 from './reducer7'
import reducer8 from './reducer8'

export default combineReducers({
    animationMainScreen:reducer1,
    getDeviceConfig:reducer2,
    stateLoading:reducer3,
    device:reducer4,
    visibleListDevice:reducer5,
    stateAllData:reducer6,
    visibleDatePickerIOS:reducer7,
    dataSetTime:reducer8
})