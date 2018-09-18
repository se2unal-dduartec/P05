import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: false,
    }
  }
  componentDidMount(){
    this.initGame();
  }

  renderIcon =(row,col)=>{
    var value= this.state.gameState[row][col];
    switch(value){
      case 1: return  <Text style={[styles.cross]}>X</Text>;
      case -1: return  <Text style={[styles.circle]}>O{this.state.currentPlayer}</Text>
      default: return <View></View>
    }
  }
  renderTitle =()=>{
    var value= this.state.currentPlayer;
    if(value){
      return <Text style={styles.title}>X plays</Text>;
    }else{
      return <Text style={styles.title}>O plays</Text>;
    }
  }
  initGame = () =>{
    this.setState({
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer:true,
    })
  }
  onTilePress =(row,col) =>{
    var currentPlayer = this.state.currentPlayer;
    var arr= this.state.gameState.slice();
    if (arr[row][col]!=0){
      return
    }
    if(currentPlayer){
      arr[row][col] = 1;
    }else{
      arr[row][col]= -1;
    }
    this.setState({
      gameState:arr,
      currentPlayer:!currentPlayer
    });  
    var winner = this.getWinner();
    if(winner==1){
      Alert.alert("X won!!!");
      this.initGame();
    }else if(winner==-1){
      Alert.alert("O won!!!");
      this.initGame();
    }else if(winner==0){
      Alert.alert("Draw :(");
      this.initGame();
    } 
    
  }
  getWinner = () =>{
    var arr = this.state.gameState.slice();
    var sum;
    for(var i=0;i<3;i++){
      sum= arr[i][0]+arr[i][1]+arr[i][2];
      if(sum==3){
        return 1;
      }else if(sum==-3){
        return -1;
      }
      sum= arr[0][i]+arr[1][i]+arr[2][i];
      if(sum==3){
        return 1;
      }else if(sum==-3){
        return -1;
      }
    }
    sum=arr[0][0]+arr[1][1]+arr[2][2];
    if(sum==3){
      return 1;
    }else if(sum==-3){
      return -1;
    }
    sum = arr[0][2]+arr[1][1]+ arr[2][0];
    if(sum==3){
      return 1;
    }else if(sum==-3){
      return -1;
    }
    sum=0;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(arr[i][j]==1||arr[i][j]==-1){
          sum+=1;
        }
      }
    }
    if(sum==9){
      return 0;
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe {this.state.currentPlayer}</Text>
        {this.renderTitle()}
        <View style={{flexDirection: "row"}}>

          <TouchableOpacity onPress={()=> this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth: 0}]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.onTilePress(0,2)} style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>

          <TouchableOpacity onPress={()=> this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth: 0}]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style={[styles.tile]}>
            {this.renderIcon(1,1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth: 0}]}>
            {this.renderIcon(1,2)}
          </TouchableOpacity>

        </View>
        <View style={{flexDirection: "row"}}>

          <TouchableOpacity onPress={()=> this.onTilePress(2,0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2,0)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth: 0}]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.onTilePress(2,2)} style={[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cross:{
    fontSize: 80,
    color: 'red',
  },
  circle:{
    fontSize: 80,
    color: 'blue',
  },
  title:{
    fontSize: 30,
    padding: 20,
  }
});
