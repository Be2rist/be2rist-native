import React, {useCallback} from 'react';
import {Avatar, Button, Card, Paragraph} from 'react-native-paper';
import PanelHandle from 'components/point/PanelHandle';

const MapMarker = props => <Avatar.Icon {...props} icon="map-marker" />;

const PointView = ({
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
      <Card.Content>
        <PanelHandle />
      </Card.Content>
      <Card.Title
        title={point.name}
        subtitle={`${distance} m`}
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
      {point.cover && <Card.Cover source={{uri: point.cover}} />}
      <Card.Content>
        <Paragraph>{point.description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default PointView;