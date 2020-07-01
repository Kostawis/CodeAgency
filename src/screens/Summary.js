import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {queryById, deleteById} from '../database/realmSchema';
import {getById} from '../data/dummyData';
import {Card, withTheme, Button} from 'react-native-paper';
import Moment from 'moment';

import 'moment/locale/pl';

const Summary = ({route, theme, navigation}) => {
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

  const deleteCurrent = async () => {
    Alert.alert(
      'Na pewno usunąć?',
      'Post zostanie nieodwracalnie usunięty.',
      [
        {
          text: 'Anuluj',
          onPress: () => {},
        },
        {
          text: 'Usuń',
          onPress: async () => {
            await deleteById(query.id);
            navigation.navigate('Calendar');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return query.id ? (
    <ScrollView>
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
          <View
            style={[{backgroundColor: color.value}, styles.smallColorBox]}
          />
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
        <View style={styles.buttons}>
          <Button
            icon="delete-outline"
            mode="contained"
            onPress={deleteCurrent}
            style={[
              styles.deleteButton,
              styles.button,
              {backgroundColor: theme.colors.red},
            ]}>
            Usuń
          </Button>
        </View>
      </View>
    </ScrollView>
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
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 18,
  },
  editButton: {
    marginRight: 14,
  },
});

export default withTheme(Summary);
