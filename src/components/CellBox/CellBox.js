/* eslint-disable react/self-closing-comp */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet } from 'react-native';
import { colors } from '../../util/Colors';

export default CellBox = ({backgroundColor}) =>{
    return (
        <View style={[styles.container, {backgroundColor}]}>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.white,
    },

});
