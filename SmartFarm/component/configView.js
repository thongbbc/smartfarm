import React,{Component} from 'react';
import {Keyboard,View,Text,TouchableWithoutFeedback,TextInput,TouchableHighlight,AsyncStorage} from 'react-native';
import {width,height,nameTopicSend,nameTopicSub} from '../helperScreen'
import * as action from '../reducer/action'
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Smartconfig from 'react-native-smartconfig';
import LoadingView from './loadingView'
import {Client, Message} from 'react-native-paho-mqtt';
import {sendGetAllData} from '../screen/callBackMQTT'

class ConfigView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nameWifi:'',
            passWifi:'',
            nameDevice:''
        }
    }
    componentDidMount() {
    }
    _configStart() {
        this.props.loading(true)
        const {nameWifi,passWifi,nameDevice} = this.state;
        const self= this
        Keyboard.dismiss()
        if (nameWifi != '' && passWifi != '' && nameDevice != '') {
            Smartconfig.start({
                type: 'esptouch',
                ssid: nameWifi,
                bssid: '',
                password: passWifi,
                timeout: 10000
            }).then(function(results){
                var macId = '';
                results.map((value) => {
                    macId = value.bssid
                    // this.props.startConfig(true,macId,nameDevice)
                })
                const {client} = self.props
                AsyncStorage.getItem('devices').then((data)=>{                        
                    if (data == undefined) {
                        data = '[]'
                        self.props.saveDevice(macId,nameDevice,data) 
                        client.subscribe(nameTopicSub(macId))        
                        sendGetAllData(client,{macId:macId,nameDevice:nameDevice})
                    } else {
                        self.props.saveDevice(macId,nameDevice,data) 
                        client.subscribe(nameTopicSub(macId))        
                        sendGetAllData(client,{macId:macId,nameDevice:nameDevice})
                    }
                })         
                Smartconfig.stop();
                self.props.loading(false)    
                self.props.visibleConfig(false)
            }).catch(function(error) {
                Smartconfig.stop();
                // self.props.startConfig(false)   
                self.props.loading(false)   
                alert('Thiết lập thất bại lỗi đường truyền hoặc sai thông tin')                                
            });
        } else {
          alert('PLEASE CHECK YOUR SSID OR PASSWORD,NAME DEVICE!')
        }
    }
    render() {
        const {container,superContainer,container2,superContainer1
        ,textInput,titleText,button,clickAbleButton} = style
        return (
            <View style = {superContainer1}>
            <View style = {superContainer1}>
                <TouchableWithoutFeedback onPress={()=>{this.props.visibleConfig(!this.props.visible)}}>
                    <View style = {superContainer}>
                        <View style = {container}>
                            <TouchableWithoutFeedback onPress={()=>{}}>
                            <View style = {container2}> 
                                <Icon name = {'wrench'} size={height/9} color={'gray'}/>
                                <Text style = {titleText}>Thiết lập thiết bị</Text>
                                <TextInput 
                                value = {this.state.nameWifi}
                                autoCorrect={false}
                                onChangeText = {(text)=>this.setState({nameWifi:text})}
                                style = {textInput} placeholder='Tên wifi'/>
                                <TextInput 
                                value = {this.state.passWifi}
                                autoCorrect={false}
                                onChangeText = {(text)=>this.setState({passWifi:text})}
                                style = {textInput} placeholder='Mật khẩu wifi'/>
                                <TextInput 
                                value = {this.state.nameDevice}
                                autoCorrect={false}
                                onChangeText = {(text)=>this.setState({nameDevice:text})}
                                style = {textInput} placeholder='Tên thiết bị'/>
                                <View style ={{justifyContent:'flex-end',flex:1}}>
                                    <TouchableHighlight style = {clickAbleButton} onPress={this._configStart.bind(this)}>
                                        <Text style = {button}>
                                            Thiết lập
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {this.props.stateLoading==true?<LoadingView visible={this.props.stateLoading}/>:null}
            </View>
        )
    }
}
const style = {
    superContainer1: {
        position:'absolute',height,width,backgroundColor:'transparent',justifyContent:'center',alignItems:'center'        
    },
    superContainer: {
        position:'absolute',height,width,backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'
    },
    container:{
        width:width - 60,
        height:height/2,borderRadius:10,
        backgroundColor:'white'
    },
    container2:{
        width:width - 60,
        height:height/2,borderRadius:10,
        backgroundColor:'rgba(0,0,0,0.05)',paddingTop:10,paddingBottom:10,
        paddingLeft:40,paddingRight:40,
        alignItems:'center',
        justifyContent:'center'
    },
    textInput: {
        backgroundColor:'white',
        width:width-60-20,
        height:height/15,
        padding:10
    },
    titleText: {
        fontSize:20,color:'gray',
        fontWeight:'600',
        padding:10
    },
    button: {
        backgroundColor:'gray',
        width:width-60-20,
        height:height/15,
        padding:10,
        fontSize:15,
        fontWeight:'500',
        textAlign:'center',
        color:'white'
    },
    clickAbleButton: {
        width:width-60-20,
        height:height/15,
    }
}
const mapStateToProps = (state) => {
    return {
        visible: state.getDeviceConfig.visible,
        stateLoading:state.stateLoading,
        jsonListDevice: state.listDevice,
    }
}
export default connect(mapStateToProps,action)(ConfigView);