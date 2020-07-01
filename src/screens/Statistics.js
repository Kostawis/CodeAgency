import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {withTheme} from 'react-native-paper';
import {BarChart, PieChart} from 'react-native-chart-kit';

import {queryAll} from '../database/realmSchema';
import {colors as dummyColors, sizes as dummySizes} from '../data/dummyData';

const Statistics = () => {
  const [query, setQuery] = useState([]);

  useEffect(() => {
    const setAllPosts = async () => {
      const data = await queryAll();
      setQuery(data);
    };
    setAllPosts();
  }, []);

  const getStats = (data, type) => {
    return query.reduce((acc, arr) => {
      const el = data.find(({id}) => arr[type] === id);
      acc.find(({id}) => el.id === id)
        ? acc.forEach(item => el.id === item.id && item.count++)
        : acc.push({...el, count: 1});
      return acc;
    }, []);
  };

  const prepareColors = () => {
    const stats = getStats(dummyColors, 'color');
    return stats.reduce((acc, arr) => {
      const newArr = {
        ...arr,
        name: '',
        color: arr.value,
        legendFontSize: 15,
        legendFontColor: '#333',
      };
      acc.push(newArr);
      return acc;
    }, []);
  };

  const prepareSizes = () => {
    const stats = getStats(dummySizes, 'size');
    const sortedStats = stats.sort(
      (a, b) => a.id - b.id || a.name.localeCompare(b.name),
    );

    return sortedStats.reduce((acc, arr, i) => {
      i === 0 && (acc = {labels: [], datasets: [{data: []}]});
      acc.labels.push(arr.name);
      acc.datasets[0].data.push(arr.count);

      return acc;
    }, {});
  };

  console.log();

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>Kolory</Text>
      <PieChart
        data={prepareColors()}
        width={Dimensions.get('window').width - 20}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="count"
        backgroundColor="rgba(84, 13, 110, .1)"
        paddingLeft="15"
        style={styles.circleChart}
      />
      {prepareSizes().labels && (
        <>
          <Text style={styles.h2}>Wielkości czcionek</Text>
          <BarChart
            // style={graphStyle}
            data={prepareSizes()}
            height={220}
            width={Dimensions.get('window').width - 20}
            chartConfig={{
              background: '#e26a00',
              backgroundGradientFrom: 'rgba(84, 13, 110, .1)',
              backgroundGradientTo: 'rgba(84, 13, 110, .1)',
              backgroundGradientToOpacity: 0.6,
              backgroundGradientFromOpacity: 0.8,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.circleChart}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  h2: {
    fontSize: 22,
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 6,
  },
  circleChart: {
    marginBottom: 8,
    borderRadius: 16,
  },
});

export default withTheme(Statistics);
