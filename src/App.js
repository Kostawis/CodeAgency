import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Header from './components/Header';

import Home from './screens/Home';
import Calendar from './screens/Calendar';
import Form from './screens/Form';
import Statistics from './screens/Statistics';
import Summary from './screens/Summary';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          header: ({scene, previous, navigation}) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Home',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Form"
          component={Form}
          options={{
            headerTitle: 'Formularz',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{
            headerTitle: 'Kalendarz',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Statistics"
          component={Statistics}
          options={{
            headerTitle: 'Statystyki',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{
            headerTitle: 'Podsumowanie',
            ...TransitionPresets.SlideFromRightIOS,
            headerLeft: undefined,
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
