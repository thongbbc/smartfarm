import React,{Component} from 'react';
import {Text,View,TouchableHighlight,Switch,Animated,AsyncStorage,TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as action from '../reducer/action'
import HeaderBackView from '../component/headerBackView'
import {width,height} from '../helperScreen'

class ManageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time:new Date(),
            kind:'time',
            kindOfData:0,
            deviceOfSubdevice:true,
            visibleCustomPicker:false,
            visibleManageView:false,
            selected:'',text:''
        }
    }
    _renderItem2(index, item) {
        const color = index % 2 == 0
          ? 'rgba(0,0,0,0.02)'
          : 'rgba(255,255,255,0.02)'
        return (
          <View style = {{width:width - 60}}>
            <TouchableHighlight onPress = {()=>{
                this.setState({selected:item,visibleManageView:true})
            }}>
              <View style={{
                height: height / 9 - 5,
                width:width,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text allowFontScaling={false} style={{
                  fontSize: 20,
                  width:width,
                  textAlign: 'center',
                  fontWeight: '200',
                  color: 'black',
                  backgroundColor: 'transparent'
                }}>{item.nameDevice}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
    }
    renderManageView() {
        return (
            <View style = {{justifyContent:'center',alignItems:'center',width,height,position:'absolute',flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
                <TouchableOpacity
                style = {{justifyContent:'center',alignItems:'center',height,width,position:'absolute'}}
                onPress={()=>{this.setState({visibleManageView:false})}}>
                <View style = {{height:height/2,width:width-60,borderRadius:10,backgroundColor:'white'}}>
                    
                <View style = {{top:10,backgroundColor:'transparent',height:50,width:width-60}}>
                    
                </View>
                    <TextInput allowFontScaling={false} onChangeText={(text)=>{
                        this.setState({text:text})
                    }} placeholder='Tên cần đổi' style = {{textAlign:'center',width:width-60,height:40}}/>
                    <View style = {{backgroundColor:'red',height:50,width:width-60}}>
                    <TouchableOpacity style = {{alignItems:'center',justifyContent:'center',height:50,width:width-60}} onPress={()=>{
                                                this.setState({text:''})
                        const self = this
                        const {selected} = this.state
                        AsyncStorage.getItem('devices').then((data)=>{                        
                            self.props.removeDevice(selected.macId,selected.nameDevice,data) 
                        })             
                        this.setState({visibleManageView:false})
                    }}>
                        <Text allowFontScaling={false} style = {{fontSize:20,color:'white'}}>Xóa</Text>
                    </TouchableOpacity>
                    </View>

                    <View style = {{backgroundColor:'blue',height:50,width:width-60}}>
                    <TouchableOpacity style = {{alignItems:'center',justifyContent:'center',height:50,width:width-60}} onPress={()=>{
                        this.setState({text:''})
                        AsyncStorage.getItem('devices').then((data)=>{                        
                            if (data == undefined) {
                                data = '[]'
                                self.props.saveDevice(selected.macId,selected.nameDevice,data) 
                            } else {
                                self.props.saveDevice(selected.macId,selected.nameDevice,data) 
                            }
                        })         
                    }}>
                    <Text allowFontScaling={false} style = {{fontSize:20,color:'white'}}>Sửa</Text>
                    </TouchableOpacity>
                    </View>

                    <View style = {{backgroundColor:'red',height:50,width:width-60}}>
                    <TouchableOpacity style = {{alignItems:'center',justifyContent:'center',height:50,width:width-60}} onPress={()=>{
                        this.setState({visibleManageView:false,text:''})}}>
                    <Text allowFontScaling={false} style = {{fontSize:20,color:'white'}}>Thoát</Text>
                    </TouchableOpacity>
                    </View>

                </View>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        const {deviceOfSubdevice,visibleCustomPicker} = this.state
        const {container,textTitle,textTitle2} = style
        const {visibleDatePickerIOS,dataSetTime,visibleListDevice} = this.props
        const {ADDR,MACID,ACC,DATEBEGIN,DELAYDATE,MONTHBEGIN,YEARBEGIN,KIND,DATA,MINUTESTIME,HOURDU,MINUTESDU,STATE,HOURTIME} = dataSetTime
        return (
            <View style = {container}>
                <LinearGradient style ={{flex:1,paddingLeft:5,paddingRight:5,paddingTop:25}} 
                colors = {['#43C6AC','#F8FFAE']}>
                    <HeaderBackView navigation = {this.props.navigation} nameHeader = 'Quản lý thiết bị'/>
                    <FlatList style = {{width,flex:1}} data={this.props.jsonListDevice.listDevice} keyExtractor= {(x,i) => i} renderItem={({index, item}) => this._renderItem2(index, item)}/>
                    {this.state.visibleManageView?this.renderManageView():null}
                </LinearGradient>
            </View>
        )
    }
}
const style = {
    container: {
        flex:1
    },
    textTitle: {
        backgroundColor:'transparent',
        color:'white',
        fontSize:17,
        fontWeight:'600'
    },
    textTitle2: {
        backgroundColor:'transparent',
        color:'white',
        width:70,
        fontSize:17,
        fontWeight:'600'
    }
}
const mapStateToProps = (state) => {
    return {
        animationMain:state.animationMainScreen,
        visible:state.getDeviceConfig.visible,
        jsonListDevice:state.device,
        visibleListDevice:state.visibleListDevice,
        stateAllData : state.stateAllData,
        visibleDatePickerIOS: state.visibleDatePickerIOS,
        dataSetTime:state.dataSetTime,

    }
}
export default connect(mapStateToProps,action)(ManageScreen);
