import React,{Component} from 'react';
import {AsyncStorage,Text,View,FlatList,TouchableWithoutFeedback,TouchableHighlight} from 'react-native';
import {width,height} from '../helperScreen'
import {connect} from 'react-redux'
import * as action from '../reducer/action'

class ListDeviceSetTime extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSubDevice: ['Đèn quang hợp','Máy bơm']
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('devices').then((data)=>{            
            if (data == undefined)
            data = '[]'
            this.props.getListDevice(data)
        })

    }
    _renderItem(index, item) {
        const {client,control,deviceOfSubdevice} = this.props
        const color = index % 2 == 0
          ? 'rgba(0,0,0,0.02)'
          : 'rgba(255,255,255,0.5)'

        return (
          <View style = {{width:width - 60}}>
            <TouchableHighlight onPress = {()=>{
                if (deviceOfSubdevice)
                {
                    this.props.setTimeData(true,'',item.macId,'','','','','','','','','','')
                    this.props.loadingListDevice(!this.props.visibleListDevice)
                }
                else{
                    this.props.setTimeData(true,'','','','','','','','','','','','',index==0?'DQH':'MB')                    
                    this.props.loadingListDevice(!this.props.visibleListDevice)
                }
            }}>
              <View style={{
                height: height / 9 - 5,
                width:width - 60,
                backgroundColor: color,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 20,
                  width:width - 60,
                  textAlign: 'center',
                  fontWeight: '200',
                  color: 'black',
                  backgroundColor: 'transparent'
                }}>{deviceOfSubdevice?item.nameDevice:item}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
    render() {
        const {container,superContainer,container2,superContainer1
        ,textInput,titleText,button,clickAbleButton} = style
        return (
            <View style = {superContainer1}>
            <View style = {superContainer1}>
                <TouchableWithoutFeedback onPress={()=>{this.props.loadingListDevice(!this.props.visibleListDevice)}}>
                    <View style = {superContainer}>
                        <View style = {container}>
                            <TouchableWithoutFeedback onPress={()=>{}}>
                                <View style = {container2}> 
                                    <FlatList style = {{width:width - 60,height:height/2,borderRadius:10,}} data={this.props.deviceOfSubdevice?this.props.jsonListDevice.listDevice:this.state.dataSubDevice} keyExtractor= {(x,i) => i} renderItem={({index, item}) => this._renderItem(index, item)}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
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
        backgroundColor:'rgba(0,0,0,0.05)',
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
mapStateToProps = (state) => {
    return {
        visible:state.getDeviceConfig.visible,
        visibleListDevice:state.visibleListDevice,        jsonListDevice:state.device,
        
    }
}
export default connect(mapStateToProps,action)(ListDeviceSetTime);
