import React,{Component} from 'react';
import {AppState,Text,View,TouchableHighlight,Switch,Animated,Easing,AsyncStorage,TouchableWithoutFeedback, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import SquareView from '../component/squareView'
import DetailView from '../component/detailViewInfo'
import Header from '../component/header'
import {connect} from 'react-redux'
import * as action from '../reducer/action'
import {width,height} from '../helperScreen'
import ConfigView from '../component/configView'
import ListDevice from '../component/listDevice'
import {Client, Message} from 'react-native-paho-mqtt';
import {initMQTT,sendGetAllData,analyzeData} from './callBackMQTT'
import LoadingConnectView from '../component/loadingConnectView'
import {nameTopicSub,nameTopicSend} from '../helperScreen'

class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.client = null;       
        this.state = {
            listDevice:[],
            visibleConnectView : false,
        }
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.props.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            this.reconnect()
        }
        this.props.changeAppState(nextAppState);
    }
    controlDevice(address,stateCurrent) {
        if (this.props.jsonListDevice.selectedDevice!=undefined) {
            const {macId} = this.props.jsonListDevice.selectedDevice
            var stateControl = stateCurrent?'Off':'On'
            const jsonUpdateState = {
                ID: 'ESP' + macId,
                FUNC: "Ctrl",
                ADDR: address,
                DATA: stateControl
              }
              const message = new Message(JSON.stringify(jsonUpdateState));
              message.destinationName = nameTopicSend(macId)
              this.client.send(message);              
        } else {
            alert("Cảnh báo: Bạn chưa thiết lập thiết bị nào!")
        }
        
    }
    componentDidMount() {
        AsyncStorage.getItem('devices').then((data)=>{            
            if (data == undefined)
            data = '[]'
            this.props.getListDevice(data)
        })
        AppState.addEventListener('change', this._handleAppStateChange);
        this.reconnect();
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    reconnect() {
        if (!this.client)
        {
            this.client = initMQTT();
            this._callBackReceiver();
        } else {
            this.client = initMQTT();
            this._callBackReceiver();
        }
        this.setState({visibleConnectView: true})
    }

    _callBackReceiver() {
        this.client.on('connectionLost', (responseObject) => {
        if (responseObject.errorCode !== 0) {
            console.log(responseObject.errorMessage);
        }
        });
        this.client.on('messageReceived', (message) => {
            console.log(message.payloadString);
            analyzeData (message.payloadString,this.props)
        });

        // connect the client
        this.client.connect()
        .then(() => {
            // Once a connection has been made, make a subscription and send a message.
            console.log('onConnect');
            if (this.props.jsonListDevice.selectedDevice != undefined)
            return this.client.subscribe(nameTopicSub(this.props.jsonListDevice.selectedDevice.macId));
        })
        .then(() => {
            if (this.props.jsonListDevice.selectedDevice != undefined)
            sendGetAllData(this.client,this.props.jsonListDevice.selectedDevice)
            this.setState({visibleConnectView: false})
        })
        .catch((responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('onConnectionLost:' + responseObject.errorMessage);
                this.reconnect();
            }
        });
    }
    render() {
        const {animationMain2,animationMain3,animationMain1,animationMain4,animationMain5} = this.props.animationMain
        var animationMain33 = '0deg'
        var animationMain22 = 0
        if (animationMain2 && animationMain3) {
            animationMain33 = animationMain2.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '60deg']
            })
            animationMain22 = animationMain3.interpolate({
                inputRange: [0, 1],
                outputRange: [0, (width * 0.24)]
            })
        }

        const {container,subContainer,viewInformation,textInformation,
        subViewInformation1,subViewInformation2,viewControl,
        viewHeader,textInformation2,subContainer2} = style
        const {jsonListDevice} = this.props
        const {stateButton,stateFan,stateWater,stateTemperature} = this.props.stateAllData
        const {selectedDevice,listDevice,visibleConnectView} = this.state
        return(
            <View style = {container}>
                <LinearGradient style ={container} colors = {['#43C6AC','#F8FFAE']}>
                    <View style = {{justifyContent:'flex-start',marginTop:height/10,position:'absolute',height,width:width/2}}>
                        <TouchableOpacity onPress={()=>{    
                            this.props.load(!this.props.animationMain.animation)                                                                                                        
                    // this.props.navigation.navigate('History', {name: 'Lucy'})
                        }}>
                            <View style = {{flexDirection:'row',alignItems:'flex-start',backgroundColor:'rgba(0,0,0,0.1)',margin:10,alignItems:'center',height:50,justifyContent:'center'}}>
                                <Icon style = {{right:10}} name = {'cogs'} size={20} color={'white'}/>
                                <Text style = {{color:'white',fontSize:17,backgroundColor:'transparent',fontWeight:'600'}}>Thiết bị</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            this.props.load(!this.props.animationMain.animation)                                                
                            this.props.navigation.navigate('History', {navigation: this.props.navigation})}}>
                            <View style = {{flexDirection:'row',alignItems:'flex-start',backgroundColor:'rgba(0,0,0,0.1)',margin:10,alignItems:'center',height:50,justifyContent:'center'}}>
                                <Icon style = {{right:10}} name = {'history'} size={20} color={'white'}/>
                                <Text style = {{color:'white',fontSize:17,backgroundColor:'transparent',fontWeight:'600'}}>Lịch sử</Text>
                            </View>
                        </TouchableOpacity>                     
                        <TouchableOpacity onPress={()=>{
                            this.props.load(!this.props.animationMain.animation)
                            this.props.navigation.navigate('SetTime', {navigation: this.props.navigation})
                            }}>
                            <View style = {{flexDirection:'row',alignItems:'flex-start',backgroundColor:'rgba(0,0,0,0.1)',margin:10,alignItems:'center',height:50,justifyContent:'center'}}>
                                <Icon style = {{right:10}} name = {'clock-o'} size={20} color={'white'}/>
                                <Text style = {{color:'white',fontSize:17,backgroundColor:'transparent',fontWeight:'600'}}>Hẹn giờ</Text>
                            </View>
                        </TouchableOpacity>           
                    </View>


                    <Animated.View
                     style = {{
                         transform: [
                            { perspective: animationMain1?animationMain1:1 },
                            { translateX: animationMain22 },
                            { rotateY: animationMain33},
                        ],flex:1,
                     }}>
                        <LinearGradient style ={{height,width,paddingTop:25}} colors = {['#43C6AC','#F8FFAE']}>
                        <Header selectedDevice = {jsonListDevice.selectedDevice?jsonListDevice.selectedDevice:{macId:'nan',nameDevice:'nan'}}/>
                        <View style = {viewInformation}>
                            <View style = {subViewInformation2}>
                                <SquareView>
                                    <TouchableHighlight 
                                    style = {{borderWidth:0,borderRadius:width/2/4,height:width/4,width:width/4}}
                                    onPress={()=>{
                                        this.controlDevice('2',stateFan)
                                    }}>
                                    <LinearGradient  colors = {['#fdfcfb','#e2d1c3']}
                                    style = {{borderWidth:0,borderRadius:width/2/4,height:width/4,width:width/4}}>
                                        <View 
                                        style = {{
                                            borderWidth:3,borderColor:'rgba(0,0,0,0.1)',
                                            borderRadius:width/2/4,height:width/4,width:width/4,alignItems:'center',justifyContent:'center'}}>
                                            <Icon style = {{backgroundColor:'transparent'}} name={'bolt'} size={width/6} color={stateFan==true?'rgb(214, 206, 59)':'black'}/>
                                        </View>
                                    </LinearGradient>
                                    </TouchableHighlight> 
                                    <Text style = {textInformation}>Máy bơm</Text>  

                                </SquareView>
                            </View>
                            <View style = {subViewInformation1}>
                                <SquareView>
                                    <DetailView kind={true} value =  {stateTemperature?stateTemperature.toString():'0'} img='thermometer' title='Nhiệt độ'/>                
                                </SquareView>
                                <SquareView>
                                    <DetailView kind={false} value =  {stateWater?stateWater:false} img='tint' title='Độ ẩm'/>                
                                </SquareView>
                            </View>
                        </View>
                        
                        <View style = {viewControl}>
                            <TouchableHighlight 
                            style = {{marginTop:20,borderWidth:0,borderRadius:width/2/2,height:width/3,width:width/3}}
                            onPress={()=>{
                                this.controlDevice('1',stateButton)
                            }}>
                            <LinearGradient  colors = {['#fdfcfb','#e2d1c3']}
                            style = {{borderWidth:0,borderRadius:width/2/2,height:width/3,width:width/3}}>
                                <View 
                                style = {{
                                    borderWidth:3,borderColor:'rgba(0,0,0,0.1)',
                                    borderRadius:width/2/2,height:width/3,width:width/3,alignItems:'center',justifyContent:'center'}}>
                                    <Icon style = {{backgroundColor:'transparent'}} name={'lightbulb-o'} size={width/5} color={stateButton==true?'rgb(214, 206, 59)':'black'}/>
                                </View>
                            </LinearGradient>
                            </TouchableHighlight>
                            <Text style = {textInformation2}>Đèn quang hợp</Text>
                        </View>
                        {this.props.animationMain.animation?<TouchableWithoutFeedback onPress={()=>this.props.load(false)}><View style = {{height:height-10,width,position:'absolute',backgroundColor:'rgba(0,0,0,0.1)'}}/></TouchableWithoutFeedback>:null}
                        </LinearGradient>
                    </Animated.View>

                    {this.props.visible==true?<ConfigView client={this.client}/>:null}
                    {this.props.visibleListDevice==true?<ListDevice control={this.props} client={this.client} selectedDevice={this.props.jsonListDevice.selectedDevice} listDevice = {this.props.jsonListDevice.listDevice}/>:null}
                    {visibleConnectView==true?<LoadingConnectView visible={visibleConnectView}/>:null}
                </LinearGradient>
            </View>
        )
    }
}
const style = {
    container: {
        flex:1
    },
    subContainer: {
        flex:1,backgroundColor:'rgba(0,0,0,0.2)'
    },
    viewInformation: {
        flexDirection:'row',
        flex:1,
    },
    viewControl: {
        alignItems:'center',justifyContent:'center',
        flex:1,backgroundColor:'rgba(0,0,0,0.1)',marginTop:5,marginLeft:5,marginRight:5,marginBottom:10        
    },
    viewHeader: {
        flex:0.2,
    },
    textInformation : {
        fontSize:13,
        fontWeight:'500',
        color:'white',top:5
    },
    textInformation2 : {
        fontSize:13,
        fontWeight:'400',
        color:'white',top:5
    },
    subViewInformation1: {
        flexDirection:'column',
        flex:1,
    },
    subViewInformation2: {
        flex:1,
        flexDirection:'column',        
    }
}
const mapStateToProps = (state) => {
    return {
        animationMain:state.animationMainScreen,
        visible:state.getDeviceConfig.visible,
        jsonListDevice:state.device,
        visibleListDevice:state.visibleListDevice,
        stateAllData : state.stateAllData,
        appState: state.appState,        
    }
}
export default connect(mapStateToProps,action)(MainScreen);
