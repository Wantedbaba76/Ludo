/* eslint-disable semi */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { TouchableOpacity , ActivityIndicator} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import { colors } from '../../util/Colors';
import { GREEN, RED, YELLOW, BLUE } from '../../util/Constants';

export default Dice = ({isRolling,turn,onDiceRoll, diceNumber}) => {
  
  const {red, blue, yellow, green} = colors
  let color = turn === RED ? red :  turn === YELLOW ? yellow : turn === GREEN ? green : turn === BLUE ? blue : undefined;

  const renderSurfaceOne = () => {
    return (
      <View>
        <View style={styles.diceDot} />
      </View>

    );

  };

  const renderSurfaceTwo = () => {
    return (
      <View >
      <View style={styles.diceDot}/>
      <View style={styles.diceDot}/>
    </View>
    );

  };

  const renderSurfaceThree = () => {
    return (
      <View >
      <View style={styles.diceDot}/>
      <View style={styles.diceDot}/>
      <View style={styles.diceDot}/>
      
    </View>
    );

  };

  const renderSurfaceFour = () => {
    return (
      <View style={{flexDirection:'row',alignSelf:'center'}}>
      {renderSurfaceTwo()}
      {renderSurfaceTwo()}
    </View>
    );

  };

  const renderSurfaceFive = () => {
    return (
      <View style={{flexDirection:'row',alignSelf:'center'}}>
      {renderSurfaceTwo()}
      <View style={{flexDirection:'row',alignSelf:'center'}}>
      {renderSurfaceOne()}
      </View>
      {renderSurfaceTwo()}
    </View>
    );

  };

  const renderSurfaceSix = () => {
    return (
      <View style={{flexDirection:'row',alignSelf:'center'}}>
      {renderSurfaceTwo()}
      <View style={{flexDirection:'row',alignSelf:'center'}}>
      {renderSurfaceTwo()}
      </View>
      {renderSurfaceTwo()}
    </View>
    );

  };

  const renderDiceSurface = (diceNumber) =>{
    switch (diceNumber){
      case 1:
        return renderSurfaceOne();
        case 2:
        return renderSurfaceTwo();
        case 3:
        return renderSurfaceThree();
        case 4:
        return renderSurfaceFour();
        case 5:
        return renderSurfaceFive();
        case 6:
        return renderSurfaceSix();
    }
  };

  return (
    <View>
      <Text style={styles.textStyle}>Roll Dice</Text>
      <TouchableOpacity style={[styles.container, {backgroundColor:color}]} onPress={onDiceRoll}>
        {renderDiceSurface(diceNumber)}
      </TouchableOpacity>
      {isRolling && <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
    textStyle: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 5,
    },
    diceDot: {
      backgroundColor: colors.white,
      alignSelf: 'center',
      width: 6,
      height: 6,
      borderRadius:3,
      margin:2,
    },
    container: {
      position: 'absolute',
      marginTop: 30,
      alignSelf: 'center',
      justifyContent: 'center',
      width:40,
      height: 40,
      backgroundColor: '#f00',
  
    },
    
  
});
