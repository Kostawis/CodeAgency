import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, Switch, TextInput} from 'react-native-paper';
import {insertNew, deleteAll} from '../../database/realmSchema';
import {v4 as uuidv4} from 'react-native-uuid';

const Step4 = ({data, action, navigation}) => {
  const insertNewItem = async () => {
    const prepearinItem = {...data, id: uuidv4(), creationDate: new Date()};
    const {id} = await insertNew(prepearinItem);
    navigation.navigate('Summary', {
      id,
    });
  };

  const setEndOptions = (item, name) => {
    action({...data, [name]: item});
    setTimeout(() => {
      navigation.navigate('Step4');
    }, 100);
  };

  return (
    <View style={styles.box}>
      <Text>Prywatne</Text>
      <Switch
        value={data.private}
        onValueChange={() => setEndOptions(!data.private, 'private')}
      />
      <Text>Pozwól na udostępnianie</Text>
      <Switch
        value={data.allowShare}
        onValueChange={() => setEndOptions(!data.allowShare, 'allowShare')}
      />
      <TextInput
        label="Dodaj opis"
        multiline={true}
        value={data.description}
        onChangeText={text => setEndOptions(text, 'description')}
      />
      <Button mode="contained" icon="upload" onPress={insertNewItem}>
        Upload configuration
      </Button>
      <Button mode="contained" icon="upload" onPress={deleteAll}>
        Delete all
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Step4;
