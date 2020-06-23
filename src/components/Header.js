import React from 'react';
import {Appbar, IconButton, withTheme} from 'react-native-paper';

const Header = ({scene, previous, navigation, theme}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header>
      {previous && (
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color={theme.colors.surface}
        />
      )}
      <Appbar.Content title={title} />
      <IconButton
        icon="share"
        onPress={console.log('click')}
        color={theme.colors.surface}
      />
    </Appbar.Header>
  );
};

export default withTheme(Header);
