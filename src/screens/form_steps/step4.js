import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, Switch, TextInput} from 'react-native-paper';
import {insertNew} from '../../database/realmSchema';
import {v4 as uuidv4} from 'react-native-uuid';
import {CommonActions} from '@react-navigation/native';

const Step4 = ({data, action, navigation}) => {
  const insertNewItem = async () => {
    const prepearinItem = {...data, id: uuidv4(), creationDate: new Date()};
    const {id} = await insertNew(prepearinItem);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Home'},
          {
            name: 'Summary',
            params: {id},
          },
        ],
      }),
    );
  };

  const setEndOptions = (item, name) => action({...data, [name]: item});

  return (
    <View>
      <View style={styles.switch}>
        <Text>Prywatne</Text>
        <Switch
          value={data.private}
          onValueChange={() => setEndOptions(!data.private, 'private')}
        />
      </View>
      <View style={styles.switch}>
        <Text>Pozwól na udostępnianie</Text>
        <Switch
          value={data.allowShare}
          onValueChange={() => setEndOptions(!data.allowShare, 'allowShare')}
        />
      </View>
      <TextInput
        label="Dodaj opis..."
        multiline={true}
        value={data.description}
        style={styles.textarea}
        onChangeText={text => setEndOptions(text, 'description')}
      />
      <Button
        mode="contained"
        icon="upload"
        onPress={insertNewItem}
        style={styles.button}>
        Upload configuration
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 30,
    marginHorizontal: 70,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  textarea: {
    marginTop: 20,
    minHeight: 90,
    marginHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default Step4;
