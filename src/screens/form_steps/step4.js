import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';

const Step4 = ({data, setSize}) => {
  return (
    <View style={styles.box}>
      <Text>End options</Text>
      <Button
        mode="contained"
        icon="upload"
        onPress={() => console.log('hello')}>
        Upload configuration
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step4;
