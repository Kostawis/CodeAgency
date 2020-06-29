import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import {colors, types, sizes} from '../../data/dummyData';

import ColorCard from '../../components/ColorCard';

const Step2 = ({data, action, navigation}) => {
  const currentType = types.filter(type => data.type === type.id);
  const currentSize = sizes.filter(size => data.size === size.id);

  const setColor = color => {
    action({...data, color: color});
    setTimeout(() => {
      navigation.navigate('Step4');
    }, 100);
  };

  const displayCards = colors.map(color => (
    <ColorCard
      action={setColor}
      data={{color: color, size: currentSize[0], type: currentType[0]}}
      key={color.id}
      isActive={data.color === color.id ? true : false}
    />
  ));

  return (
    <ScrollView>
      <View style={styles.gridContainer}>{displayCards}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginHorizontal: 8,
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Step2;
