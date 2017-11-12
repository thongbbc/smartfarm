import React,{Component} from 'react';
import {Text,View,TouchableHighlight,Switch,Animated,AsyncStorage,TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as action from '../reducer/action'
import HeaderBackView from '../component/headerBackView'
import ComponentDatePickerIOS from '../component/datepickerIOS'
import {width,height} from '../helperScreen'
import SquareView from '../component/squareView'
import ListDeviceSetTime from '../component/listDeviceSetTime'
class SetTimeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time:new Date(),
            kind:'time',
            kindOfData:0,
            deviceOfSubdevice:true,
        }
    }
    async postForm(path, form) {
        const str = [];
        for (let p in form) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(form[p]));
        }
        const body = str.join("&");
        const req = {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        };
        fetch(path, req).then((response) => response.json()).then((responseData)=>{
          if (responseData.status == 'OK') {
            alert("Thiết lập thành công")
          } else {
            alert ("Thiết lập thất bại kiểm tra lại đường truyền")
          }
        })
      }
    render() {
        const {deviceOfSubdevice} = this.state
        const {container,textTitle,textTitle2} = style
        const {visibleDatePickerIOS,dataSetTime,visibleListDevice} = this.props
        
        const {ADDR,MACID,ACC,DATEBEGIN,DELAYDATE,MONTHBEGIN,YEARBEGIN,KIND,DATA,MINUTESTIME,HOURDU,MINUTESDU,STATE,HOURTIME} = dataSetTime
        return (
            <View style = {container}>
                <LinearGradient style ={{flex:1,paddingLeft:5,paddingRight:5,paddingTop:25}} colors = {['#43C6AC','#F8FFAE']}>
                    <HeaderBackView navigation = {this.props.navigation} nameHeader = 'Hẹn Giờ'/>
                    <SquareView>
                        {/* <View style = {{width:width-30,justifyContent:'center',flex:1,flexDirection:'row',alignItems:'center',marginBottom:5}}>
                            <Text style = {textTitle}>Theo ngày / Theo Thứ</Text>
                            <Switch
                                style = {{left:20}}
                                onValueChange={(value) => {
                                    const data = value?'1':'0'
                                    this.props.setTimeData(true,data)
                                }}
                                onTintColor="#fff"
                                thumbTintColor="gray"
                                tintColor="white"
                                value={KIND=='1'?true:false} />
                        </View> */}

                        <View style = {{width:width-30,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style = {textTitle2}>Thiết bị:</Text>
                            <Text style = {{textAlign:'center',left:10,height:35,backgroundColor:'white',fontSize:20,width:width/2-20,color:'gray'}}>{
                                (this.props.jsonListDevice.listDevice.find((value)=>value.macId==MACID))?(this.props.jsonListDevice.listDevice.find((value)=>value.macId==MACID)).nameDevice:'nan'}</Text>
                            <TouchableOpacity onPress={()=>{
                                this.setState({deviceOfSubdevice:true})
                                this.props.loadingListDevice(!this.props.visibleListDevice)}}>
                                <Icon style = {{width:35,height:35,textAlign:'center',left:10,backgroundColor:'rgba(0,0,0,0.7)'}} name={'cog'} color={'white'} size={35}/>
                            </TouchableOpacity>
                        </View>

                        <View style = {{width:width-30,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                            <Text style = {textTitle2}>Thiết bị Con</Text>
                            <Text style = {{textAlign:'center',left:10,height:35,backgroundColor:'white',fontSize:20,width:width/2-20,color:'gray'}}>{
                                ADDR=='DQH'?'Đèn quang hợp':'Máy bơm'}</Text>
                            <TouchableOpacity onPress={()=>{
                                this.setState({deviceOfSubdevice:false})                                                                
                                this.props.loadingListDevice(!this.props.visibleListDevice)}}>
                                <Icon style = {{width:35,height:35,textAlign:'center',left:10,backgroundColor:'rgba(0,0,0,0.7)'}} name={'cog'} color={'white'} size={35}/>
                            </TouchableOpacity>
                        </View>


                        <View style = {{width:width-30,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'flex-start',marginBottom:10}}>
                            <Text style = {textTitle2}>Bắt đầu: </Text>
                            <View style = {{left:10}}>
                                <View style = {{flexDirection:'row',bottom:10}}>
                                    <Text style = {{textAlign:'center',height:35,backgroundColor:'white',fontSize:20,color:'gray',width:width/2-20}}>
                                    {DATEBEGIN!=''?DATEBEGIN+'/'+MONTHBEGIN+'/'+YEARBEGIN:null}</Text>
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({kind:'date',kindOfData:0})
                                        this.props.loadDatePickerIOS(true)
                                    }}>
                                        <Icon style = {{width:35,height:35,textAlign:'center',backgroundColor:'rgba(0,0,0,0.7)'}} name={'calendar'} color={'white'} size={30}/>
                                    </TouchableOpacity>
                                </View>
                                <View style = {{flexDirection:'row'}}>
                                    <Text style = {{textAlign:'center',height:35,backgroundColor:'white',fontSize:20,color:'gray',width:width/2-20}}>
                                    {   
                                        HOURTIME!=''?parseInt(HOURTIME)<10?('0'+HOURTIME+':'):(HOURTIME+':'):null}{parseInt(MINUTESTIME)<10?'0'+MINUTESTIME:MINUTESTIME}</Text>
                                    <TouchableOpacity onPress={()=>{
                                        this.setState({kind:'time',kindOfData:1})
                                        this.props.loadDatePickerIOS(true)
                                    }}>
                                        <Icon style = {{width:35,height:35,textAlign:'center',backgroundColor:'rgba(0,0,0,0.7)'}} name={'clock-o'} color={'white'} size={30}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                        <View style = {{width:width-30,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style = {textTitle2}>Cách ngày:</Text>
                            <Text style = {{textAlign:'center',left:10,height:35,backgroundColor:'white',fontSize:20,color:'gray',width:width/2-20 -35}}>
                            {DELAYDATE!=''?parseInt(DELAYDATE)<10&&(DELAYDATE>=0)?('0'+DELAYDATE):(DELAYDATE):null}</Text>
                            <TouchableOpacity onPress={()=>{
                                if (parseInt(DELAYDATE) == 0) {
                                    alert("Lỗi! Giá trị tối thiểu là 0")
                                } else 
                                this.props.setTimeData(true,'','','','','','','',
                                '','','','','','','1')                    
                            }}>
                                <Icon style = {{width:35,height:35,textAlign:'center',left:10,backgroundColor:'rgba(0,0,0,0.7)'}} name={'arrow-down'} color={'red'} size={35}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                this.props.setTimeData(true,'','','','','','','',
                                '','','','','','','0')            
                            }}>
                                <Icon style = {{width:35,height:35,textAlign:'center',left:10,backgroundColor:'rgba(0,0,0,0.7)'}} name={'arrow-up'} color={'green'} size={35}/>
                            </TouchableOpacity>
                        </View>

                        <View style = {{width:width-30,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                            <Text style = {textTitle2}>Duy trì:</Text>
                            <Text style = {{textAlign:'center',left:10,height:35,backgroundColor:'white',fontSize:20,color:'gray',width:width/2-20}}>
                            {HOURDU!=''?parseInt(HOURDU)<10?('0'+HOURDU+':'):(HOURDU+':'):null}{parseInt(MINUTESDU)<10?'0'+MINUTESDU:MINUTESDU}</Text>
                            <TouchableOpacity onPress={()=>{
                                this.setState({kind:'time',kindOfData:2})
                                this.props.loadDatePickerIOS(true)
                            }}>
                                <Icon style = {{width:35,height:35,textAlign:'center',left:10,backgroundColor:'rgba(0,0,0,0.7)'}} name={'clock-o'} color={'white'} size={35}/>
                            </TouchableOpacity>
                        </View>

                        

                        <View style = {{width:width-30,flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:30}}>
                            <Text style = {{
                                backgroundColor:'transparent',
                                color:'white',
                                width:100,
                                fontSize:17,
                                fontWeight:'500'
                            }}>Trạng thái: </Text>
                            <TouchableOpacity onPress = {()=>{
                                const value = STATE == '100'?'0':'100'
                                this.props.setTimeData(true,'','','','','','','','','','','',value)}}>
                                <View style = {{justifyContent:'center',borderRadius:70/2,
                                    alignItems:'center',left:10,height:70,backgroundColor:'gray',width:70}}>
                                    <Icon style = {{
                                        width:35,height:35,textAlign:'center',backgroundColor:'gray'
                                    }} name={'lightbulb-o'} color={STATE=='100'?'yellow':'black'} size={35}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress = {()=>{

const addr = ADDR=='DQH'?'1':'2'
const begin = {
    DATE:DATEBEGIN,
    MONTH:MONTHBEGIN,
    YEAR:YEARBEGIN
}
const time = {
    HOUR:HOURTIME,
    MINUTES:MINUTESTIME
}
const du = {
    HOUR:HOURDU,
    MINUTES:MINUTESDU
}
const mode = {
    kind:'1',
    data:DELAYDATE
}
const json = 
{MACID:MACID,ACC:ACC,ADDR:addr,BEGIN:begin,MODE:mode
    ,STATE:STATE,TIME:time,DU:du}
const jsonString = JSON.stringify(json)
this.postForm("http://cretacam.ddns.net/hien123/setRules",
{'data':jsonString})


// var convertedJson = []
// convertedJson.push({macId:"hahahaha",nameDevice:'kakakakakakakak'})
// convertedJson.push({macId:"dsad",nameDevice:'adadadada'})

// convertedJson.push({macId:"dasd",nameDevice:'fsfsfsfs'})
// convertedJson.push({macId:"hahahadsadadha",nameDevice:'dhdhdhd'})

// try {
//     AsyncStorage.setItem('devices', JSON.stringify(convertedJson)); 
// } catch(err){

// }

                                }}
                                >
                                <View style = {{
                                    alignItems:'center',height:50,backgroundColor:'gray',width:width-20,justifyContent:'center'}}>
                                    <Icon style = {{
                                        width:35,height:35,textAlign:'center',backgroundColor:'gray'
                                    }} name={'paper-plane'} color={'white'} size={35}/>
                                </View>
                            </TouchableOpacity>


                    </SquareView>
                    {visibleDatePickerIOS?<ComponentDatePickerIOS kindOfData = {this.state.kindOfData} kind = {this.state.kind}/>:null}
                    {visibleListDevice?<ListDeviceSetTime deviceOfSubdevice={deviceOfSubdevice}/>:null}
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
export default connect(mapStateToProps,action)(SetTimeScreen);
