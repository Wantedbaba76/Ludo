/* eslint-disable no-return-assign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PlayerBox from '../../components/PlayerBox/PlayerBox';
import { colors } from '../../util/Colors';
import VerticalCellsContainer from '../../components/VerticalCellsContainer/VerticalCellsContainer';
import { ONE, RED, THREE, TWO, FOUR, BLUE, GREEN, YELLOW, TOP_VERTICAL, BOTTOM_VERTICAL, HOME , undefined, FINISHED, Y2, Y1, G1, B1, R9, Y9, G9, B9, R1 } from '../../util/Constants';
import HorizontalCellsContainer from '../../components/HorizontalCellsContainer/HorizontalCellsContainer';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';

export default class Game extends Component {
  constructor(props) {
    super(props);
    const { red, blue, yellow, green } = colors;
    const {redName, blueName, yellowName,greenName} = props;
    this.state = {
      red: this.initPlayer(RED, red),
      blue: this.initPlayer(BLUE, blue),
      yellow: this.initPlayer(YELLOW, yellow),
      green: this.initPlayer(GREEN, green),
      isRolling: false,
      diceNumber: 5,
      moves: [],
      bonusCount: 0,
      animateForSelection:false,
      iswaitingForDiceRoll: true,
      turn: redName!==""? RED: yellowName!==""? YELLOW:greenName!==""? GREEN:blueName!==""? BLUE: undefined
      };
  }
  initPlayer(playerType, color) {
    return {
      pieces: this.initPieces(playerType),
      color:color,
      player:playerType,
    }; 
  }

  initPieces(playerColor) {
    let time = new Date().getTime();
    return {
    one:{position: HOME, name: ONE, color: playerColor, updateTime:time},
    two: {position: HOME, name: TWO, color: playerColor, updateTime:time},
    three: {position: HOME, name: THREE, color: playerColor, updateTime:time},
    four: {position: HOME, name: FOUR, color: playerColor, updateTime:time},
  };  
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameContainer}>
          <View style={styles.twoPlayersContainer}>
            {this.renderPlayerBox(this.state.red,{borderTopLefttRadius:20})}
            <VerticalCellsContainer position={TOP_VERTICAL}/>
            {this.renderPlayerBox(this.state.yellow,{borderTopRightRadious:20})}
            
            </View>
          <HorizontalCellsContainer  state={this.state}
              onDiceRoll={()=>{this.onDiceRoll();}}
          />
          <View style={styles.twoPlayersContainer}>
            {this.renderPlayerBox(this.state.blue,{borderBottomLeftRadious:20})}
            <VerticalCellsContainer position={BOTTOM_VERTICAL}/>
            {this.renderPlayerBox(this.state.green,{borderBottomRightRadious:20})}
          </View>
        </View>
      </View>
    );
  }

  onDiceRoll(){
    
    this.setState({isRolling:true, diceNumber:this.getRandomInt()});
    setTimeout(()=> {
      const  { moves, diceNumber, turn } = this.state;
      moves.push(diceNumber);
      if (diceNumber === 6){
        if (moves.length===3) {
          this.setState({isRolling:false,moves:[],turn:this.getNextTurn()});
        } else {
          this.setState({isRolling:false,moves:moves});
        }
      } else {
        this.setState({isRolling:false,moves:moves},()=>{
          this.updatePlayerPieces(this.state[turn]);
        });

      }
    },100);
  }
  isPlayerFinished(player){
    const {one, two,three,four} = player.pieces;
    return one.position === FINISHED && two.position === FINISHED && three.position === FINISHED && four.position === FINISHED;

  }
  
  getNextTurn() {
    const { turn, yellow,red,green,blue }= this.state;
    const { yellowName, blueName, greenName,redName} = this.props;
    let isYellowNext = yellowName!== ""&& !this.isPlayerFinished(yellow);
    let isGreenNext = greenName!== ""&& !this.isPlayerFinished(green);
    let isBlueNext = blueName!== ""&& !this.isPlayerFinished(blue);
    let isRedNext = redName!== ""&& !this.isPlayerFinished(red);
    if (this.state.bonusCount>0 ){
        this.setState({bonusCount:this.state.bonusCount-1});
        if (this.isPlayerFinished(this.state[turn])){
          return turn;
        }
    }

  switch (turn){
    case RED:
      return isYellowNext? YELLOW: isGreenNext? GREEN: isBlueNext? BLUE: undefined;
    case YELLOW:
      return isRedNext? RED: isGreenNext? GREEN: isBlueNext? BLUE: undefined;
    case GREEN:
      return isYellowNext? YELLOW: isRedNext? RED: isBlueNext? BLUE: undefined;
    case BLUE:
      return isYellowNext? YELLOW: isGreenNext? GREEN: isRedNext? RED: undefined;
    default:
      return turn;
    }
  }


  playerHasSingleUnfinishedPiece(player){
    const {one, two, three, four} = player.pieces;
    let countUnfinishedPieces = 0;
    one.position!==FINISHED? countUnfinishedPieces++ : undefined;
    two.position!==FINISHED? countUnfinishedPieces++ : undefined;
    three.position!==FINISHED? countUnfinishedPieces++ : undefined;
    four.position!==FINISHED? countUnfinishedPieces++ : undefined;
    return countUnfinishedPieces === 1;
  }
  playerHasOptionsForMoves(player){
    let countMoveOptions = this.getCountMoveOptions(player);
    return countMoveOptions>1;
  }
  playerHasSinglePossibleMove(player){
    let countMoveOptions = this.getCountMoveOptions(player);
    return countMoveOptions === 1;
  }

  getCountMoveOptions(player){
    const {one , two, three, four} = player.pieces;
    const { moves } = this.state;
    let hasSix = moves.filter(move=>move ===6).length>0;

    const isMovePossibleForPosition= (position) =>{
      if (position===FINISHED){
        return true;
      } if (position===HOME){
        if (hasSix){
          return true;
        }
        return false;
      }
      let isMovePossible = false;
      let positionTocheckFor = parseInt(position.substring(1,position.length));
      moves.ToEach((move)=>{
        if (!isMovePossible){
          let  possiblePosition= move===1?18: move===2?17: move===3?16: move===4? 15: move===5?14: undefined;
        if (possiblePosition){
          isMovePossible = positionTocheckFor <= possiblePosition;
        } else if (move ===6 && positionTocheckFor<14){
          isMovePossible = true;
        }
        }
      }
      );
      return isMovePossible;
    };
    let countOfOption = 0;
    isMovePossibleForPosition(one.position)? countOfOption++ : undefined;
    isMovePossibleForPosition(two.position)? countOfOption++ : undefined;
    isMovePossibleForPosition(three.position)? countOfOption++ : undefined;
    isMovePossibleForPosition(four.position)? countOfOption++ : undefined;
    return countOfOption;
  }
 
  getsinglePossibleMove(player){
    const {one , two, three, four} = player.pieces;
    const { moves } = this.state;
    let hasSix = moves.filter(move=>move ===6).length>0;

    let possibleMove = undefined;
    const isMovePossibleForPosition= (position) =>{
      if (position===FINISHED){
        return true;
      } if (position===HOME){
        if (hasSix){
          return true;
        }
        return false;
      }
      let isMovePossible = false;
      let positionTocheckFor = parseInt(position.substring(1,position.length));
      

      moves.ToEach((move)=>{
        if (!isMovePossible){
          let  possiblePosition= move===1?18: move===2?17: move===3?16: move===4? 15: move===5?14: undefined;
        if (possiblePosition){
          isMovePossible = positionTocheckFor <= possiblePosition;
          isMovePossible? possibleMove = move:undefined;
        } else if (move ===6 && positionTocheckFor<14){
          isMovePossible = true;
          possibleMove = moves;
        }
      }
    });
      return isMovePossible;
    };
    if (isMovePossibleForPosition(one.position)){
      return {
        move: possibleMove,
        piece: one
      };
    }
    if (isMovePossibleForPosition(two.position)){
      return {
        move: possibleMove,
        piece: two
      };
    }
    if (isMovePossibleForPosition(three.position)){
      return {
        move: possibleMove,
        piece: three
      };
    }
    if (isMovePossibleForPosition(four.position)){
      return {
        move: possibleMove,
        piece: four
      };
    }
    return undefined;
  }

  getPieceWithPossibleMove(player){
    const {one , two, three, four} = player.pieces;
    const { moves } = this.state;
    let hasSix = moves.filter(move=>move ===6).length>0;


    let possibleMove = false;
    const isMovePossibleForPosition= (position) =>{
      if (position===FINISHED){
        return true;
      } if (position===HOME){
        if (hasSix){
          return true;
        }
        return false;
      }
      let isMovePossible = false;
      let positionTocheckFor = parseInt(position.substring(1,position.length));
      

      moves.ToEach((move)=>{
        if (!isMovePossible){
          let  possiblePosition= move===1?18: move===2?17: move===3?16: move===4? 15: move===5?14: undefined;
        if (possiblePosition){
          isMovePossible = positionTocheckFor <= possiblePosition;
        } else if (move ===6 && positionTocheckFor<14){
          isMovePossible = true;
          possibleMove = moves;
        }
      }
    });
      return isMovePossible;
    };
    if (isMovePossibleForPosition(one.position)){
      return one;
    }
    if (isMovePossibleForPosition(two.position)){
      return two;
    }
    if (isMovePossibleForPosition(three.position)){
      return three;
    }
    if (isMovePossibleForPosition(four.position)){
      return four;
    }
    return undefined;

  }
  movePieceByPosition(piece, move){
    let newPosition = "";
    let position = parseInt(piece.position.substring(1,piece.position.length));
    let cellAreaIndicator = piece.position.substring(0,1);

    if (piece.position === Home && move === 6){
      newPosition = piece.color === RED?R1: piece.color=== YELLOW?Y1: piece.color === GREEN?G1: piece.color===BLUE? B1: undefined;
    } else if (position <=13){
      if ( (cellAreaIndicator === "B" && piece.color === RED) ||
      (cellAreaIndicator === "R" && piece.color === YELLOW) ||
      (cellAreaIndicator === "Y" && piece.color === GREEN) ||
      (cellAreaIndicator === "G" && piece.color === BLUE) 
      ){
        if (position + move<=12){
            newPosition = cellAreaIndicator + (position+move);
        }
        else {
          let updatedPosition = (position + move + 1);
          if (updatedPosition === 19){
            newPosition = FINISHED;
          } else {
            let updatedCellAreaIndicator = cellAreaIndicator === "R" ? "Y" : cellAreaIndicator === "Y"?  "G": cellAreaIndicator ==="G"?"B": cellAreaIndicator === "B"? "R": undefined;
            newPosition = updatedCellAreaIndicator + updatedPosition;
          }
        }
      } else {
        if (position + move<=13){
          newPosition = cellAreaIndicator + (position+move);
      } else {
        let nextPosition = (position + move) - 13;
        let updatedCellAreaIndicator = cellAreaIndicator === "R"? "Y" : cellAreaIndicator === "Y"?  "G": cellAreaIndicator ==="G"?"B": cellAreaIndicator === "B"? "R": undefined;
        newPosition = updatedCellAreaIndicator + nextPosition;
      }
      }
    } else {
      if (position+move<=19){
        if (position+move ===19){
          newPosition = FINISHED;
        } else {
          newPosition = cellAreaIndicator + (position + move);
        }
      }
    }
    if (newPosition !==""){
      piece.position= newPosition;
      piece.updateTime = new Date().getTime();
    }
    if (this.didGetBonusWithnewPosition(piece) && !this.isPlayerFinished(this.state[piece.color])){
        let count = this.state.bonusCount+1;
        this.setState({bonusCount:count},()=>{
          let player = this.state[piece.color];
          if (this.state.moves.length === 1){
            this.updatePlayerPieces(player);
          } else if (this.state.moves.length === 0 || this.isPlayerFinished(player)) {
                this.setState({animateForSelection:false,moves:[], turn: this.getNextTurn()});
          }
        });
    } else {
      this.setState(this.state,()=>{
        let player = this.state[piece.color];
        if (this.state.moves.length === 1){
          this.updatePlayerPieces(player);
        } else if (this.state.moves.length === 0 || this.isPlayerFinished(player)) {
              this.setState({animateForSelection:false,moves:[], turn: this.getNextTurn()});
        }
      });
    }
   
  }
  didGetBonusWithnewPosition(piece){
    if (piece.position===FINISHED){
      return true;
    }
    if (piece.position === R1 || piece.position === R9 || piece.position === Y1 || piece.position === Y9 || piece.position === G1 || piece.position === G9 || piece.position === B1 || piece.position === B9){
      return false;
    }

    const checkIfPositionMatchesExistingPiece = (piece, player) =>{
      const { one, two , three, four} = player.pieces;
      let positionMatched = false;
      if (piece.position===one.position){
        one.position = HOME;
        positionMatched = true;
      }
      if (piece.position===two.position){
        two.position = HOME;
        positionMatched = true;
      }
      if (piece.position===three.position){
        three.position = HOME;
        positionMatched = true;
      }
      if (piece.position===four.position){
        four.position = HOME;
        positionMatched = true;
      }
      return positionMatched;
    };
    const {red, blue, yellow, green} = this.state;

    if (checkIfPositionMatchesExistingPiece(piece, red) && piece.color !==red.player){
      return true;
    }

    if (checkIfPositionMatchesExistingPiece(piece, yellow) && piece.color !==yellow.player){
      return true;
    }

    if (checkIfPositionMatchesExistingPiece(piece, green) && piece.color !==green.player){
      return true;
    }

    if (checkIfPositionMatchesExistingPiece(piece, blue) && piece.color !==blue.player){
      return true;
    }
    return false;
  }
  updatePlayerPieces(player){
    const {moves}= this.state;
    if (moves.length>=1){
      if (this.isPlayerFinished(player)){
        if (this.playerHasOptionsForMoves(player)){
              this.setState({animateForSelection:true});
        } else if (this.playerHasSinglePossibleMove(player)) {
              if (this.playerHasSingleUnfinishedPiece(player)){
                    let singlePossibleMove = this.getsinglePossibleMove(player);
                    if (singlePossibleMove){
                      const indexOf = moves.indexOf(singlePossibleMove.move);
                      if (indexOf>-1){
                        moves.splice(indexOf, 1);
                      }
                      this.movePieceByPosition(singlePossibleMove.piece,singlePossibleMove.move);
                    }

              } else {
                if (moves.length===1){
                  let piece = this.getPieceWithPossibleMove(player);
                  this.movePieceByPosition(piece,moves.shift());
              } else 
                {
                  this.setState({animateForSelection:true});
                }
                
              }
        } else {
          this.setState({turn:this.getNextTurn(), moves:[],animateForSelection:false});
        }

      } else {
        this.setState({turn:this.getNextTurn(),moves:[],animateForSelection:false});
      }
    }
    else {
      this.setState.apply({turn:this.getNextTurn(),animateForSelection:false});
    }

  }
  getRandomInt(){
    let randomInt = Math.floor(Math.random() * Math.floor(6));
    return randomInt +1;
  }

  renderPlayerBox(player, customStyle) {
    const {one, two, three, four} = player.pieces;
    customStyle.opacity = this.state.turn === player.player? 1:0.6;
    return (
      <PlayerBox color={player.color}
      one={one}
      two={two}
      three={three}
      four={four}
      customStyle={customStyle}
      onPieceSelection= {(selectedpiece)=>{
        if (this.state.turn === player.player){
          this.onPieceSelection(selectedpiece);
        }
      }}
      />
    );
  }

  onPieceSelection = (selectedPiece) =>{
   if (this.state.iswaitingForDiceRoll){
     return;
   }
   const { moves } = this.state;
   const {player} = this.state[selectedPiece.color];
   const {one,two, three, four}= player.pieces;

   if (moves.length===1){

    if (selectedPiece.position === HOME && moves[0]!==6){
      return;
    }
    this.movePieceByPosition(selectedPiece, moves.shift());
   } else if (moves.length>1){
      if (selectedPiece.position = HOME){
        moves.shift();
        selectedPiece.position = selectedPiece.color===RED? R1 : selectedPiece.color===YELLOW? Y1 : selectedPiece.color===GREEN? G1 : selectedPiece.color===BLUE? B1 : undefined;
        selectedPiece.updateTime = new Date().getTime();
        this.setState(this.state,()=>{
          if (moves.length===1){
            if (!this.playerHasOptionsForMoves(player)){
              this.movePieceByPosition(selectedPiece,moves,shift());
            } else {
              const isActivePiece = (piece) => piece.position!==HOME && piece.position!==FINISHED;
              let activePiece = [];
              isActivityPiece(one)?ActivePiece.push(one): undefined;
              isActivityPiece(two)?ActivePiece.push(two): undefined;
              isActivityPiece(three)?ActivePiece.push(three): undefined;
              isActivityPiece(four)?ActivePiece.push(four): undefined;
              let isSamePositionForAllActivePieces = activePieces.every((activePiece) =>activePiece.position=activePieces[0].position);
              if (isSamePositionForAllActivePieces){
                this.movePieceByPosition(selectedPiece,moves.shift());
              }
            }
          }
        }); 
      } else {
          const onMoveSelected = () => {
            if (this.isMovePossibleForPosition(selectedPiece.position,selectedMove)){

            }
          };
          let moveOption = [];
          let optionOne = moves[0].toString();
          moveOption.push({text:optionOne,onPress:()=>{onMoveSelected(optionOne);}});
          let optionTwo = move.length>1? moves[1].toString():undefined;
          optionTwo? moveOption.path({text:optionTwo,onPress:()=>{onMoveSelected(optionTwo);}}):undefined;
          let optionThree = move.length>2? moves[2].toString():undefined;
          optionThree? moveOption.path({text:optionThree,onPress:()=>{onMoveSelected(optionThree);}}):undefined;
          Alert.alert("Select your move", "",moveOption, {cancelable:true});
        }
   }
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ff0',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  twoPlayersContainer: {
    flex: 3,
    flexDirection: 'row',
    
  },
  horizontaCellsContainer: {
    flex: 2,
    backgroundColor: '#fff',
  },
});
