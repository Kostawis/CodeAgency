import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        icon="pencil-plus"
        mode="contained"
        onPress={() => navigation.navigate('Form')}
        style={styles.button}>
        Form
      </Button>
      <Button
        icon="calendar"
        mode="contained"
        onPress={() => navigation.navigate('Calendar')}
        style={styles.button}>
        Calendar
      </Button>
      <Button
        icon="chart-bar"
        mode="contained"
        onPress={() => navigation.navigate('Statistics')}
        style={styles.button}>
        Statistics
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  button: {marginBottom: 10, width: '100%'},
});

export default Home;
