/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import NewGameMode from '../../components/NewGameMode/NewGameMode';

export default Home = ({isStartGameModeVisible,onNewGameButtonPress, onCancel,
    onRedInput,
    onYellowInput,
    onBlueInput,
    onGreenInput,
    red,
    blue,
    green,
    yellow,
    onStart,
    }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoStyle}>Ludo Classic</Text>
      <TouchableOpacity style={styles.newGameButton} onPress={onNewGameButtonPress}>
        <Text>New Game</Text>
      </TouchableOpacity>
      <Image
        source={require('../../images/ludo.png')}
        style={styles.ImageStyle}
      />
      <NewGameMode isStartGameModeVisible={isStartGameModeVisible}
      onCancel={onCancel}
      onRedInput={onRedInput}
      onYellowInput={onYellowInput}
      onGreenInput={onGreenInput}
      onBlueInput={onBlueInput}
      red={red}
      blue={blue}
      green={green}
      yellow={yellow}
      onStart={onStart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9C51B6',
  },
  logoStyle: {
    color: '#f00',
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: 'bold',
  },
  newGameButton: {
    backgroundColor: '#fff',
    width: 200,
    padding: 10,
    borderColor: '#999',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    elevation: 4,
  },
  ImageStyle: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
