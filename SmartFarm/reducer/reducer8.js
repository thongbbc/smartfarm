const defaultValue = {
    MACID:'',
    ACC:'',
    DATEBEGIN:'',
    MONTHBEGIN:'',
    YEARBEGIN:'',
    KIND:'0',
    DATA:'',
    HOURTIME:'',
    MINUTESTIME:'',
    HOURDU:'',
    MINUTESDU:'',
    STATE:'0'
}
export default (state = defaultValue,actions) => {
    switch (actions.type) {
        case 'setFullData': {
            const {KIND,DATA,MACID,ACC,DATEBEGIN,MONTHBEGIN,YEARBEGIN,HOURTIME,MINUTESTIME,HOURDU,MINUTESDU,STATE} = actions
            var json = {
                MACID:state.MACID,
                ACC:state.ACC,
                DATEBEGIN:state.DATEBEGIN,
                MONTHBEGIN:state.MONTHBEGIN,
                YEARBEGIN:state.YEARBEGIN,
                KIND:state.KIND,
                DATA:state.DATA,
                HOURTIME:state.HOURTIME,
                MINUTESTIME:state.MINUTESTIME,
                HOURDU:state.HOURDU,
                MINUTESDU:state.MINUTESDU,
                STATE:state.STATE
            }
            if (actions.MACID) {
                json.MACID = actions.MACID 
            } 
            if (actions.ACC != '') {
                json.ACC = actions.ACC
            }
            if (actions.DATEBEGIN != '') {
                json.DATEBEGIN = actions.DATEBEGIN                
            }
            if (actions.MONTHBEGIN != '') {
                json.MONTHBEGIN = actions.MONTHBEGIN                
            }
            if (actions.YEARBEGIN != '') {
                json.YEARBEGIN = actions.YEARBEGIN                
            }
            if (actions.HOURTIME != '') {
                json.HOURTIME = actions.HOURTIME                                
            }
            if (actions.MINUTESTIME != '') {
                json.MINUTESTIME = actions.MINUTESTIME                                
            }
            if (actions.HOURDU != '') {
                json.HOURDU = actions.HOURDU                                
            }
            if (actions.MINUTESDU != '') {
                json.MINUTESDU = actions.MINUTESDU                                
            }
            if (actions.STATE != '') {
                json.STATE = actions.STATE                                                                
            }
            if (actions.KIND != '') {
                json.KIND = actions.KIND                                                                                
            }
            if (actions.DATA != '') {
                json.DATA = actions.DATA                                                                                                
            }
            return json;
        }
        case 'clearDATA': {
            return defaultValue
        }            
        default:return state;
    }
}    