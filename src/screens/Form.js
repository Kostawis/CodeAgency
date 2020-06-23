import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Step1 from './form_steps/Step1';
import Step2 from './form_steps/Step2';
import Step3 from './form_steps/Step3';
import Step4 from './form_steps/step4';

const Label = ({active}) => (
  <Button icon="brightness-1" color={active ? 'green' : 'black'} />
);

const Tab = createBottomTabNavigator();

const Form = () => {
  const [formData, setFormData] = useState({type: 1, size: 1, color: 1});

  const setType = type => setFormData({...formData, type: type});
  const setSize = size => setFormData({...formData, size: size});
  const setColor = color => setFormData({...formData, color: color});

  console.log(formData);

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
        // style: {width: 200},
      }}>
      <Tab.Screen name="Step1">
        {props => <Step1 {...props} setType={setType} data={formData} />}
      </Tab.Screen>
      <Tab.Screen name="Step2">
        {props => <Step2 {...props} setSize={setSize} data={formData} />}
      </Tab.Screen>
      <Tab.Screen name="Step3">
        {props => <Step3 {...props} setColor={setColor} data={formData} />}
      </Tab.Screen>
      <Tab.Screen name="Step4">
        {props => <Step4 {...props} data={formData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Form;
