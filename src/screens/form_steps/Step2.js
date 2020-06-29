import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

import {sizes} from '../../data/dummyData';

const ListElement = ({setChecked, checked, size: {id, name}}) => (
  <View style={styles.radioBox}>
    <TouchableOpacity
      style={styles.radioBoxInner}
      onPress={() => setChecked(id)}>
      <Text>{name}</Text>
      <RadioButton
        value={id}
        status={checked === id ? 'checked' : 'unchecked'}
        onPress={() => setChecked(id)}
      />
    </TouchableOpacity>
  </View>
);

const Step2 = ({data, action, navigation}) => {
  const setSize = size => {
    action({...data, size: size});
    setTimeout(() => {
      navigation.navigate('Step3');
    }, 100);
  };

  const elementsList = sizes.map(size => (
    <ListElement
      key={size.id}
      size={size}
      setChecked={setSize}
      checked={data.size}
    />
  ));

  return <View style={styles.box}>{elementsList}</View>;
};

const styles = StyleSheet.create({
  radioBox: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
  },
  radioBoxInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});

export default Step2;
