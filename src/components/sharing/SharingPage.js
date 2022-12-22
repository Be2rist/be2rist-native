import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {useNavigate} from 'react-router-native';
import {useSelector} from 'react-redux';
import {selectPointList} from 'services/redux/pointSlice';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import PointShortView from 'components/point/view/PointShortView';
import Preloader from 'components/root/Preloader';

const SharingPage = () => {
  const navigate = useNavigate();
  const points = useSelector(selectPointList);
  const createPoint = useCallback(() => {
    navigate('/point');
  }, [navigate]);

  return (
    <Preloader loading={points.loading}>
      <BackgroundScrollView>
        <View style={styles.content}>
          {points.list.map(point => (
            <PointShortView key={point.id} point={point} />
          ))}
        </View>
      </BackgroundScrollView>
      <FAB icon="plus" style={styles.fab} onPress={createPoint} />
    </Preloader>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    borderRadius: 50,
    bottom: 0,
  },
});

export default SharingPage;
