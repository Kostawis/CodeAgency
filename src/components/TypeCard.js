import React from 'react';
import {TouchableWithoutFeedback, StyleSheet, View} from 'react-native';
import {Card, Paragraph, Button} from 'react-native-paper';

const TypeCard = ({
  isActive,
  data: {id, image, title, subtitle, content},
  action,
}) => (
  <View style={[styles.view, !isActive && styles.opacity]}>
    {isActive && <Button icon="check-circle" style={styles.activeSign} />}
    <TouchableWithoutFeedback onPress={() => action(id)}>
      <Card style={[styles.card, isActive && styles.activeBorder]}>
        <Card.Cover source={{uri: image}} style={styles.image} />
        <Card.Title title={title} subtitle={subtitle} />
        <Card.Content style={styles.content}>
          <Paragraph style={styles.cardParagraph}>
            {content.length > 100
              ? content.substring(0, 100 - 3) + '...'
              : content}
          </Paragraph>
        </Card.Content>
      </Card>
    </TouchableWithoutFeedback>
  </View>
);

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
  content: {
    padding: 0,
    height: 100,
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
