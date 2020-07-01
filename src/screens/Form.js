import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Step1 from './form_steps/Step1';
import Step2 from './form_steps/Step2';
import Step3 from './form_steps/Step3';
import Step4 from './form_steps/step4';

const Label = ({active}) => (
  <View style={[styles.label, {backgroundColor: active ? 'green' : 'grey'}]} />
);

const Tab = createBottomTabNavigator();

const Form = () => {
  const [formData, setFormData] = useState({
    type: 1,
    size: 1,
    color: 1,
    private: false,
    allowShare: true,
    description: '',
  });

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return <Label active={focused} />;
        },
        // tabBarLabel: () => <Label />,
        // tabBarVisible: false,
      })}
      //   tabBar={() => ()}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelPosition: 'beside-icon',
        showLabel: false,
        style: {paddingHorizontal: 120},
      }}>
      <Tab.Screen name="Step1">
        {props => <Step1 {...props} action={setFormData} data={formData} />}
      </Tab.Screen>
      <Tab.Screen name="Step2">
        {props => <Step2 {...props} action={setFormData} data={formData} />}
      </Tab.Screen>
      <Tab.Screen name="Step3">
        {props => <Step3 {...props} action={setFormData} data={formData} />}
      </Tab.Screen>
      <Tab.Screen name="Step4">
        {props => <Step4 {...props} action={setFormData} data={formData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    width: 14,
    height: 14,
    borderRadius: 50,
  },
});

export default Form;
