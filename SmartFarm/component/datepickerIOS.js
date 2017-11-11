import React,{Component} from 'react';
import {Text,View,DatePickerIOS, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {width,height} from '../helperScreen'
import {connect} from 'react-redux';
import * as action from '../reducer/action'
class ComponentDatePickerIOS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date:new Date()
        }
    }
    onDateChange(date) {
        this.setState({date})
    }
    render() {
        const {date,visible} = this.state
        const {kind,kindOfData} = this.props
        return(
            <View style={{position:'absolute',width,height,justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style = {{position:'absolute',width,height,justifyContent:'center',alignItems:'center'}} onPress = {()=>{this.props.loadDatePickerIOS(false)}}>            
                    <View style = {{position:'absolute',backgroundColor:'rgba(0,0,0,0.5)',width,height,justifyContent:'center',alignItems:'center'}}>
                    <TouchableWithoutFeedback>
                    <View style = {{width:width-40,marginLeft:10,marginRight:10,backgroundColor:'white',paddingBottom:20,borderRadius:10}}>
                        <DatePickerIOS
                            style = {{height:height/2,width:width-20}}
                            date={date}
                            mode={this.props.kind}
                            timeZoneOffsetInMinutes={(-1) * ((new Date()).getTimezoneOffset() / 60)* 60}
                            onDateChange={this.onDateChange.bind(this)}
                            minuteInterval={5}/>
                        <View style = {{justifyContent:'space-between',flexDirection:'row',height:40,width:width-40,backgroundColor:'transparent',paddingLeft:10,paddingRight:10}}>
                            <TouchableOpacity onPress = {()=>{
                                if (kindOfData == 0) {
                                    this.props.setTimeData('setFullData','','','',date.getDate().toString(),(date.getMonth()+1).toString()
                                    ,date.getFullYear().toString(),'','','','','','')                                    
                                    this.props.loadDatePickerIOS(false)
                                } else if (kindOfData == 1) {
                                    this.props.setTimeData('setFullData','','','','','','','',
                                    date.getHours().toString(),date.getMinutes().toString(),'','','')                                                                        
                                    this.props.loadDatePickerIOS(false)
                                } else if (kindOfData == 2) {
                                    this.props.setTimeData('setFullData','','','','','','','','','',
                                    date.getHours().toString(),date.getMinutes().toString(),'')                                                                        
                                    this.props.loadDatePickerIOS(false)
                                }
                            }}>
                            <View style = {{justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)',alignItems:'center',height:40,width:width/2 - 40}}>
                                <Text style = {{fontSize:17,color:'blue'}}>Đồng ý</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {()=>{this.props.loadDatePickerIOS(false)}}>
                            <View style = {{justifyContent:'center',backgroundColor:'rgba(0,0,0,0.3)',alignItems:'center',height:40,width:width/2 - 40}}>
                                <Text style = {{fontSize:17,color:'red'}}>Hủy</Text>
                            </View>
                            </TouchableOpacity>

                            
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </View>)

    }
}
const mapStateToProps = (state) => {
    return {
        animationMain:state.animationMainScreen,
        visible:state.getDeviceConfig.visible,
        jsonListDevice:state.device,
        visibleListDevice:state.visibleListDevice,
        stateAllData : state.stateAllData,
        visibleDatePickerIOS: state.visibleDatePickerIOS
    }
}
export default connect(mapStateToProps,action)(ComponentDatePickerIOS);