import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Card,
  IconButton,
  MD3Colors,
  Paragraph,
  Title,
} from 'react-native-paper';

const RouteCard = ({route, onPlay}) => {
  return (
    <Card>
      <Card.Content>
        <Title>{route.name}</Title>
        <Paragraph>{route.description?.slice(30)}</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: route.cover}} />
      <Card.Actions>
        <IconButton
          icon="heart-outline"
          iconColor={MD3Colors.primary0}
          size={20}
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon="play"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={onPlay}
        />
      </Card.Actions>
    </Card>
  );
};

export default RouteCard;

RouteCard.propTypes = {
  route: PropTypes.object.isRequired,
  onPlay: PropTypes.func.isRequired,
};
