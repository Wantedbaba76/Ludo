/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { Alert } from 'react-native';
import {
  View,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class NewGameMode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        transparent={true}
        onRequestClose={() => {}}
        visible={this.props.isStartGameModeVisible}>
        <ScrollView>
          <View style={styles.modelStyle}>
            <View style={styles.modelContainer}>
              <Text style={{color: '#f00', marginBottom: 10}}>
                Red Player Name
              </Text>
              <TextInput
                style={[styles.nameInputStyle, styles.redInputStyle]}
                onChangeText={this.props.onRedInput}
              />
              <Text style={{color: '#FFD700', marginBottom: 10}}>
               Yellow Player Name
              </Text>
              <TextInput
                style={[styles.nameInputStyle, styles.yellowInputStyle]}
                onChangeText={this.props.onYellowInput}
              />
              <Text style={{color: '#00f', marginBottom: 10}}>
                Blue Player Name
              </Text>
              <TextInput
                style={[styles.nameInputStyle, styles.blueInputStyle]}
                onChangeText={this.props.onBlueInput}
              />
              <Text style={{color: '#006400', marginBottom: 10}}>
              green Player Name
              </Text>
              <TextInput
                style={[styles.nameInputStyle, styles.greenInputStyle]}
                onChangeText={this.props.onGreenInput}
              />
              
              <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.props.onCancel}>
                <Text>cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  let minPlayersCount = 0;
                  this.props.red.name !== '' ? minPlayersCount++ : undefined;
                  
                  this.props.blue.name !== '' ? minPlayersCount++ : undefined;
                  
                  this.props.yellow.name !== '' ? minPlayersCount++ : undefined;
                  
                  this.props.green.name !== '' ? minPlayersCount++ : undefined;
                  if (minPlayersCount >= 2){
                    this.props.onStart();
                  }
                  else {
                    Alert.alert('Minimum 2 Players please', 'At least 2 players are required to start the game.',''
                    [
                      {text:'OK'}
                    ]
                    );
                  }
                }}>
                <Text>New Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modelStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  modelContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: '70%',
    height: undefined,
    padding: 10,
    elevation: 5,
    zIndex: 5,
    borderRadius: 20,
  },
  nameInputStyle: {
    marginBottom: 20,
    borderWidth: 1,
  },
  redInputStyle: {
    backgroundColor: '#ffefef',
    borderColor: '#ff0000',
  },
  yellowInputStyle: {
    backgroundColor: '#ffd',
    borderColor: '#ffd520',
  },
  blueInputStyle: {
    backgroundColor: '#87CEFA',
    borderColor: '#00f',
  },
  greenInputStyle: {
    backgroundColor: '#dfd',
    borderColor: '#32CD32',
  },
  buttonStyle: {
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
});
