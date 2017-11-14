import React,{Component} from 'react';
import {Text,View,TouchableHighlight,Switch,Animated,AsyncStorage,TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as action from '../reducer/action'
import HeaderBackView from '../component/headerBackView'
import {width,height} from '../helperScreen'
import LoadingView from '../component/loadingView'

var axios = require('axios');
class ListHistoryScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleListDevice:false,
            selected:{macId:'',nameDevice:'Chon thiet bi'},
            dataSource:[],            loadingVisible:false,
            
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
        if (responseData.DATA.length != 0) {
            
            this.setState({dataSource:responseData.DATA,loadingVisible:false})
        } else {
            alert ("Không có lịch sử hẹn giờ nào được ghi nhận")
            this.setState({loadingVisible:false})            
          }
        })
    }
    _analyzeData(item) {
        this.props.select(item)
        const json = 
        {MACID:this.props.jsonListDevice.selectedDevice.macId}
        const jsonString = JSON.stringify(json)
        
        this.setState({loadingVisible:true})
        this.postForm("http://cretacam.ddns.net/hien123/getRules",
        {'data':jsonString})


        this.setState({visibleListDevice:false,selected:this.props.jsonListDevice.selectedDevice})                
    }
    _renderItem2(index, item) {
        const color = index % 2 == 0
          ? 'rgba(0,0,0,0.02)'
          : 'rgba(255,255,255,0.5)'
        return (
          <View style = {{width:width - 60}}>
            <TouchableHighlight onPress = {this._analyzeData.bind(this,item)}>
              <View style={{
                height: height / 9 - 5,
                width:width - 60,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text allowFontScaling={false} style={{
                  fontSize: 20,
                  width:width - 60,
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
    
    listDevice() {
        const {container,superContainer,container2,superContainer1
        ,textInput,titleText,button,clickAbleButton} = style
        return (
            <View style = {superContainer1}>
            <View style = {superContainer1}>
                <TouchableWithoutFeedback onPress={()=>{this.setState({visibleListDevice:false})}}>
                    <View style = {superContainer}>
                        <View style = {container}>
                            <TouchableWithoutFeedback onPress={()=>{}}>
                                <View style = {container2}> 
                                    <FlatList style = {{width:width - 60,height:height/2,borderRadius:10,}} data={this.props.jsonListDevice.listDevice} keyExtractor= {(x,i) => i} renderItem={({index, item}) => this._renderItem2(index, item)}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            </View>
        )
    }
    componentDidMount() {
        AsyncStorage.getItem('devices').then((data)=>{            
            if (data == undefined)
            data = '[]'
            this.props.getListDevice(data)
        })
           
    }
    render() {
        const {container} = style
        const {loadingVisible} = this.state
        return (
            <View style = {container}>
                <LinearGradient style ={{flex:1,paddingTop:25}} colors = {['#43C6AC','#F8FFAE']}>
                    <HeaderBackView navigation = {this.props.navigation} nameHeader = 'Danh Sách Lịch Sử Hẹn Giờ'/>
                    <View style = {{
                        flexDirection:'row',justifyContent:'center',alignItems:'center',width:-40,
                        padding:20,height:35
                    }}>
                        <Text allowFontScaling={false} style = {{
                            backgroundColor:'transparent',color:'white',fontSize:15
                        }}>Thiết Bị:</Text>
                        <View style = {{left:10,flexDirection:'row',height:35,backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}>
                            <View style = {{paddingLeft:20,flex:1,alignItems:'flex-start'}}><Text allowFontScaling={false} style = {{
                                backgroundColor:'transparent'
                            }}>
                                {this.state.selected.nameDevice}
                            </Text>
                            </View>
                            <TouchableOpacity 
                                onPress = {()=>{this.setState({visibleListDevice:true})}}
                            style = {{position:'absolute',right:0,backgroundColor:'white',justifyContent:'center'
                            ,alignItems:'center',width:35,height:35}}>
                            <Icon style = {{backgroundColor:'transparent'}} name={'chevron-down'} size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList style = {{flex:1,}} data={this.state.dataSource} keyExtractor= {(x,i) => i} renderItem={({index, item}) => this._renderItem(index, item)}/>
                    {this.state.visibleListDevice?this.listDevice():null}
                    {loadingVisible?<LoadingView visible = {loadingVisible}/>:null}
                    </LinearGradient>
            </View>
        )
    }
    
    _renderItem(index, item) {
        const {client,control} = this.props
        const {itemStyle} = style
        console.log(item)
        const stringBegin = item.BEGIN
        const stringMode = item.MODE
        const stringTime = item.TIME
        const stringDu = item.DU
        
        const begin = JSON.parse(stringBegin)
        const mode = JSON.parse(stringMode)
        const time = JSON.parse(stringTime)
        const du = JSON.parse(stringDu)
        
        const color = index % 2 == 0
          ? 'rgba(0,0,0,0.01)'
          : 'rgba(255,255,255,0.1)'
        return (
          <View>
            <TouchableHighlight onPress = {()=>{
            }}>
              <View style={{padding:10,backgroundColor:'rgba(0,0,0,0.1)',marginBottom:5,marginTop:5}}>
                <Text allowFontScaling={false} style={itemStyle}>Thiết bị:{item.ADDR=='1'?'Đèn quang hợp':'Máy bơm'}</Text>
                 <Text allowFontScaling={false} style={itemStyle}>Ngày bắt đầu:{`${begin.DATE}/${begin.MONTH}/${begin.YEAR}`}</Text>
                 <Text allowFontScaling={false} style={itemStyle}>Cách ngày:{`${mode.DATA}`}</Text>
                <Text allowFontScaling={false} style={itemStyle}>Trạng thái:{item.STATE=='100'?'Bật':'Tắt'}</Text>
                <Text allowFontScaling={false} style={itemStyle}>Thời gian bắt đầu:{`${time.HOUR}:${time.MINUTES}`}</Text>
                <Text allowFontScaling={false} style={itemStyle}>Thời gian duy trì:{`${du.HOUR}:${du.MINUTES}`}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
}
const style = {
    itemStyle : {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '200',
        color: 'black',
        backgroundColor: 'transparent'
    },
    container: {
        flex:1
    },superContainer1: {
        position:'absolute',height,width,backgroundColor:'transparent',justifyContent:'center',alignItems:'center'        
    },
    superContainer: {
        position:'absolute',height,width,backgroundColor:'rgba(0,0,0,0.3)',justifyContent:'center',alignItems:'center'
    },
    container3:{
        width:width - 60,
        height:height/2,borderRadius:10,
        backgroundColor:'white'
    },
    container2:{
        width:width - 60,
        height:height/2,borderRadius:10,
        backgroundColor:'white',
        marginTop:height-height/2-(height/2)/2,
        paddingLeft:40,paddingRight:40,
        alignItems:'center',
        justifyContent:'center'
    },
}
const mapStateToProps = (state) => {
    return {
        animationMain:state.animationMainScreen,
        visible:state.getDeviceConfig.visible,
        jsonListDevice:state.device,
        stateAllData : state.stateAllData,
    }
}
export default connect(mapStateToProps,action)(ListHistoryScreen);
