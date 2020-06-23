import React from 'react';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {Card, Button} from 'react-native-paper';

const TypeCard = ({isActive, data: {color, size, type}, action}) => {
  return (
    <View style={[styles.view, !isActive && styles.opacity]}>
      {isActive && <Button icon="check-circle" style={styles.activeSign} />}
      <TouchableWithoutFeedback onPress={() => action(color.id)}>
        <Card
          style={[
            styles.card,
            isActive && styles.activeBorder,
            {backgroundColor: color.value},
          ]}>
          <Card.Cover source={{uri: type.image}} style={styles.image} />
          <Card.Title
            title={type.title}
            subtitle={type.subtitle}
            titleStyle={{fontSize: 20 * size.value}}
            subtitleStyle={{fontSize: 12 * size.value}}
          />
        </Card>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    zIndex: 1,
    width: '50%',
    borderRadius: 8,
  },
  card: {
    margin: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 6,
    elevation: 0,
  },
  image: {
    width: '100%',
    height: 120,
    zIndex: 19,
  },
  cardParagraph: {
    marginTop: 0,
    fontSize: 12,
    lineHeight: 14,
  },
  activeSign: {
    position: 'absolute',
    right: -20,
    zIndex: 2,
  },
  activeBorder: {
    borderColor: 'green',
  },
  opacity: {
    opacity: 0.5,
  },
});

export default TypeCard;
