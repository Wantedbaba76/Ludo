/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet,TouchableOpacity} from 'react-native';
import { colors } from '../../util/Colors';
import { HOME } from '../../util/Constants';
export default PlayerBox = ({color, customStyle,one, two, three, four, onPieceSelection}) => {
  const renderPiece = (piece) => {
    if (piece.position === HOME) {
      return (
        <TouchableOpacity style={{flex:1}} onPress= {()=>{onPieceSelection(piece);}}>
            <View style={[styles.pieceStyle,{backgroundColor:color}]} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={{flex:1}}>
        <View style={[styles.pieceStyle,{backgroundColor:colors.white}]} />
      </TouchableOpacity>
    );
  };

  return (
  <View style={[{backgroundColor:color, flex:3},customStyle]}>
       <View style={styles.innerContainer} >
       <View style={styles.piecesContainer} >
       {renderPiece(one)}
       {renderPiece(two)}
         </View>
         <View style={styles.piecesContainer}>
       {renderPiece(three)}
       {renderPiece(four)}
       </View>
       </View>
  </View>
  );
};
const styles = StyleSheet.create({
  innerContainer: {
    flex : 1,
    backgroundColor: '#fff',
    margin:20,
    borderRadius:20,
  },
  piecesContainer: {
    flexDirection: 'row',
    flex:1,
  },
  pieceStyle: {
    flex: 1,
    margin:5,
    borderRadius:25,
    borderWidth:2,
    borderColor:'#00FF',
  },
});
