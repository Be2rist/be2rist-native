import React, {useCallback} from 'react';
import {Avatar, Button, Card, Paragraph} from 'react-native-paper';
import PropTypes from 'prop-types';
import {imageLink} from 'utils/googleLinks';

const MapMarker = props => <Avatar.Icon {...props} icon="map-marker" />;

const PointSlidingUpPreview = ({
  point,
  distance,
  isNearby,
  setPlayingPoint,
  clearPoint,
}) => {
  const onSetPlayingPoint = useCallback(() => {
    setPlayingPoint(point);
  }, [point, setPlayingPoint]);

  return (
    <Card>
      <Card.Title
        title={point.name}
        subtitle={distance && `${distance} m`}
        left={MapMarker}
      />
      <Card.Actions>
        {!isNearby && (
          <Button icon="google-nearby" mode="outlined" onPress={clearPoint}>
            Show nearby
          </Button>
        )}
        <Button
          icon="play-box-outline"
          mode="contained"
          onPress={onSetPlayingPoint}>
          Play
        </Button>
      </Card.Actions>
      {point.cover && <Card.Cover source={{uri: imageLink(point.cover)}} />}
      <Card.Content>
        <Paragraph>{point.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default PointSlidingUpPreview;

PointSlidingUpPreview.propTypes = {
  point: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cover: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  distance: PropTypes.number,
  isNearby: PropTypes.bool.isRequired,
  setPlayingPoint: PropTypes.func.isRequired,
  clearPoint: PropTypes.func.isRequired,
};
