import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {types} from '../../data/dummyData';

import TypeCard from '../../components/TypeCard';

const Step1 = ({data, setType}) => {
  const displayCards = types.map(type => (
    <TypeCard
      action={setType}
      data={type}
      key={type.id}
      isActive={data.type === type.id ? true : false}
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

export default Step1;
