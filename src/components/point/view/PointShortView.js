import React, {useCallback} from 'react';
import {Card, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-native';
import {StyleSheet, View} from 'react-native';
import {imageLink} from 'utils/googleLinks';

const PointShortView = ({point}) => {
  const navigate = useNavigate();
  const editPoint = useCallback(() => {
    navigate(`/point-view/${point.id}`);
  }, [navigate, point]);

  return (
    <Card onPress={editPoint} style={styles.card}>
      <View style={styles.name}>
        <Text>{point.name}</Text>
      </View>
      {point.cover && <Card.Cover source={{uri: imageLink(point.cover)}} />}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    flexBasis: '46%',
  },
  name: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1000,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
  },
});

export default PointShortView;

PointShortView.propTypes = {
  point: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cover: PropTypes.string,
  }).isRequired,
};
