import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const Calendar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button title="Go home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Calendar;
