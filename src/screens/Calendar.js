import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const Calendar = ({navigation}) => {
  // const [query, setQuery] = useState([]);

  // const reloadData = async () => setQuery(await displayAll());

  // const addTestToDo = async () => {
  //   const newObj = {
  //     id: Date.now(),
  //     value: Math.floor(Math.random() * 1000000001).toString(),
  //   };
  //   try {
  //     await addNew(newObj);
  //     reloadData();
  //   } catch (err) {
  //     console.log(`Error: ${err}`);
  //   }
  // };

  // const deleteAllToDo = async () => {
  //   try {
  //     await deleteAll();
  //     reloadData();
  //   } catch (err) {
  //     console.log(`Error: ${err}`);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Button title="Add" />
      {/* <Button title="Add" onPress={addTestToDo} />
      <Button title="Delete all" onPress={deleteAllToDo} />
      {query.map(({id, value}) => (
        <Text key={id}>{value}</Text>
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Calendar;
