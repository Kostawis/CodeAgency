import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {queryAll, deleteById} from '../database/realmSchema';
import {NavigationEvents} from '@react-navigation';
import Swipeout from 'react-native-swipeout';

import {getById} from '../data/dummyData';

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  render() {
    return (
      <>
        <NavigationEvents
          onWillFocus={payload => console.log('will focus', payload)}
          onDidFocus={payload => console.log('did focus', payload)}
          onWillBlur={payload => console.log('will blur', payload)}
          onDidBlur={payload => console.log('did blur', payload)}
        />
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
      </>
    );
  }

  async loadItems(day) {
    const items = await queryAll();

    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);

      this.state.items[strTime] = [];
      const currDateItems = items.reduce((total, item) => {
        strTime === this.timeToString(item.creationDate) &&
          (total = [...total, item]);
        return total;
      }, []);

      currDateItems.length > 0 &&
        currDateItems.forEach(item => {
          this.state.items[strTime].push(item);
        });
    }
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });
    this.setState({
      items: newItems,
    });
  }

  renderItem({id, description, color, type}) {
    const swipeoutButtons = [{text: 'Dell', onPress: () => deleteById(id)}];
    return (
      <Swipeout
        right={swipeoutButtons}
        autoClose={true}
        style={styles.itemBox}
        close={true}>
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() =>
            this.props.navigation.navigate('Summary', {
              id,
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
      </Swipeout>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  touchableItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 0,
  },
  itemBox: {
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
