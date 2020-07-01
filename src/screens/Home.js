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
        Formularz
      </Button>
      <Button
        icon="calendar"
        mode="contained"
        onPress={() => navigation.navigate('Calendar')}
        style={styles.button}>
        Kalendarz
      </Button>
      <Button
        icon="chart-bar"
        mode="contained"
        onPress={() => navigation.navigate('Statistics')}
        style={styles.button}>
        Statystyki
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {marginVertical: 7, width: '100%', padding: 6},
});

export default Home;
