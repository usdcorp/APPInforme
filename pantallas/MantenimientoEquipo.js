import React, {Component, useEffect, useState} from 'react';
import {
    View,
    TextInput,
    Image,
    Text,
    StyleSheet,

} from 'react-native';

const MantenimientoEquipo = ({ route }) => {
    const {AnalyzerId, OptionId} = route.params;
    return(
        <View>
            <Text>AnalyzerId: {AnalyzerId}</Text>
            <Text>OptionId: {OptionId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});

export default MantenimientoEquipo;