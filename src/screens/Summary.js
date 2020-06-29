import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {queryById} from '../database/realmSchema';
import {getById} from '../data/dummyData';
import {Card, Paragraph, withTheme} from 'react-native-paper';
import Moment from 'moment';

import 'moment/locale/pl';

const Summary = ({route, theme}) => {
  const [query, setQuery] = useState({});

  useEffect(() => {
    const {id: currentId} = route.params;
    const getData = async () => {
      const item = await queryById(currentId);
      setQuery(item);
    };

    getData();
  }, [route.params]);

  Moment.locale('pl');

  const type = getById('type', query.type);
  const size = getById('size', query.size);
  const color = getById('color', query.color);

  return query.id ? (
    <View style={styles.container}>
      <Text>
        <Text style={styles.bold}>ID: </Text>
        {query.id}
      </Text>
      <Text>
        <Text style={styles.bold}>Data utworzenia: </Text>
        {Moment(query.creationDate).format('D MMMM Y')}
      </Text>
      <Text>
        <Text style={styles.bold}>Nazwa szablonu: </Text>
        {type.title}
      </Text>
      <View style={styles.colorText}>
        <Text style={styles.bold}>Kolor: </Text>
        <Text>{color.value}</Text>
        <View style={[{backgroundColor: color.value}, styles.smallColorBox]} />
      </View>
      <Text>
        <Text style={styles.bold}>Trzcionka nagłówka: </Text>
        {(size.value * 20).toFixed(1)}px
      </Text>
      <Text>
        <Text style={styles.bold}>Trzcionka tekstu: </Text>
        {(size.value * 12).toFixed(1)}px
      </Text>
      <Text>
        <Text style={styles.bold}>Prywatne: </Text>
        {query.private ? 'tak' : 'nie'}
      </Text>
      <Text>
        <Text style={styles.bold}>Pozwalaj na udostępnianie: </Text>
        {query.allowShare ? 'tak' : 'nie'}
      </Text>
      <Text>
        <Text style={styles.bold}>Opis: </Text>
        <Text>{query.description}</Text>
      </Text>
      <Card style={[styles.card, {backgroundColor: color.value}]}>
        <Card.Cover source={{uri: type.image}} />
        <Card.Title
          title={type.title}
          subtitle={type.subtitle}
          titleStyle={{fontSize: 20 * size.value}}
          subtitleStyle={{fontSize: 12 * size.value}}
        />
      </Card>
    </View>
  ) : (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  loading: {
    height: '100%',
    justifyContent: 'center',
  },
  colorText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallColorBox: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  card: {
    marginTop: 18,
  },
  bold: {fontWeight: 'bold'},
});

export default withTheme(Summary);
