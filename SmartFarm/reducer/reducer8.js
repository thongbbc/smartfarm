const date = new Date()
const defaultValue = {
    MACID:'',
    ACC:'default',
    DATEBEGIN:date.getDate().toString(),
    MONTHBEGIN:(date.getMonth()+1).toString(),
    YEARBEGIN:date.getFullYear().toString(),
    KIND:'0',
    DATA:'',
    HOURTIME:'0',
    MINUTESTIME:'0',
    HOURDU:'0',
    MINUTESDU:'0',
    STATE:'0',
    ADDR:'DQH',
    DELAYDATE:'0',
}
export default (state = defaultValue,actions) => {
    switch (actions.type) {
        case 'setFullData': {
            const {DELAYDATE,ADDR,KIND,DATA,MACID,ACC,DATEBEGIN,MONTHBEGIN,YEARBEGIN,HOURTIME,MINUTESTIME,HOURDU,MINUTESDU,STATE} = actions
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
                STATE:state.STATE,
                ADDR:state.ADDR,
                DELAYDATE:state.DELAYDATE
            }
            if (actions.DELAYDATE!='') {
                if (actions.DELAYDATE == '0')
                json.DELAYDATE = (parseInt(state.DELAYDATE) + 1).toString()
                else
                json.DELAYDATE = (parseInt(state.DELAYDATE) - 1).toString()
            } 
            if (actions.ADDR!='') {
                json.ADDR = actions.ADDR 
            } 
            if (actions.MACID!='') {
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