const defaultValue = {
    stateButton:false,
    stateFan:false,
    stateWater:false,
    stateTemperature:0
}
export default (state = defaultValue,actions) => {
    switch (actions.type) {
        case 'setStateButton': {
            return {
                ...state,
                stateButton:actions.value
            };
        }
        case 'setStateFan': {
            return {
                ...state,
                stateFan:actions.value
            };
        }
        case 'setStateWater': {
            return {
                ...state,
                stateWater:actions.value
            };
        }
        case 'setStateTemperature': {
            return {
                ...state,
                stateTemperature:actions.value
            };
        }
        default:return state;
    }
}    