import React from 'react';
import Share from 'react-native-share';
import {Appbar, IconButton, withTheme} from 'react-native-paper';

const Header = ({scene, previous, navigation, theme, viewScreen}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const shot = async () => {
    const url = await viewScreen.current.capture();
    shareIt(url);
  };

  const shareIt = async uri => {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      url: uri,
    };
    await Share.open(shareOptions);
  };

  return (
    <Appbar.Header>
      {previous && (
        <Appbar.BackAction
          onPress={() =>
            scene.route.name === 'Summary' || scene.route.name === 'Calendar'
              ? navigation.navigate('Home')
              : navigation.goBack()
          }
          color={theme.colors.surface}
        />
      )}
      <Appbar.Content title={title} />
      <IconButton icon="share" onPress={shot} color={theme.colors.surface} />
    </Appbar.Header>
  );
};

export default withTheme(Header);
