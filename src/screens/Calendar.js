import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {queryAll} from '../database/realmSchema';
import {getById} from '../data/dummyData';

const Calendar = ({navigation}) => {
  const [items, setItems] = useState({});

  const renderItem = ({id, description, color, type}) => {
    return (
      <TouchableOpacity
        style={styles.touchableItem}
        onPress={() =>
          navigation.navigate('Summary', {
            id,
            idUploaded: false,
          })
        }>
        <View style={styles.item}>
          <Text style={styles.title}>{getById('type', type).title}</Text>
          <Text numberOfLines={1} style={styles.description}>
            {description}
          </Text>
        </View>
        <View style={styles.rightBox}>
          <Image
            style={styles.image}
            source={{uri: getById('type', type).image}}
          />
          <View
            style={[
              styles.itemColor,
              {backgroundColor: getById('color', color).value},
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const loadItems = async () => {
      const query = await queryAll();

      for (let i = -15; i < 85; i++) {
        const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        items[strTime] = [];
        const currDateItems = query.reduce((total, item) => {
          strTime === timeToString(item.creationDate) &&
            (total = [...total, item]);
          return total;
        }, []);

        currDateItems.length > 0 &&
          currDateItems.forEach(item => {
            items[strTime].push(item);
          });
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    };

    const blur = navigation.addListener('blur', () => {
      console.log('blur');
      setItems({});
    });

    const focus = navigation.addListener('focus', () => {
      console.log('focus');
      loadItems();
    });

    return () => {
      blur();
      focus();
    };
  }, [navigation, items]);

  return (
    <Agenda
      items={items}
      renderItem={renderItem}
      rowHasChanged={rowHasChanged}
    />
  );
};

const styles = StyleSheet.create({
  touchableItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 8,
  },
  rightBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  image: {
    width: 100,
    height: 'auto',
  },
  item: {
    flex: 1,
    paddingVertical: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {},
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  itemColor: {
    width: 36,
  },
});

export default Calendar;
