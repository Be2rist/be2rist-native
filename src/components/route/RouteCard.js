import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Card,
  IconButton,
  MD3Colors,
  Paragraph,
  Title,
} from 'react-native-paper';
import {imageLink} from 'utils/googleLinks';

const RouteCard = ({route, onPlay}) => {
  return (
    <Card>
      <Card.Content>
        <Title>{route.name}</Title>
        <Paragraph>{route.description?.slice(30)}</Paragraph>
      </Card.Content>
      <Card.Cover source={{uri: imageLink(route.cover)}} />
      <Card.Actions>
        <IconButton
          icon="heart-outline"
          iconColor={MD3Colors.primary0}
          size={20}
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
