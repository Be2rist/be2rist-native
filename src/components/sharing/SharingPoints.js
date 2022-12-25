import React from 'react';
import Preloader from 'components/root/Preloader';
import PointShortView from 'components/point/view/PointShortView';
import {useSelector} from 'react-redux';
import {selectPointList} from 'services/redux/pointSlice';

const SharingPoints = () => {
  const points = useSelector(selectPointList);
  return (
    <Preloader loading={points.loading}>
      {points.list.map(point => (
        <PointShortView key={point.id} point={point} />
      ))}
    </Preloader>
  );
};

export default SharingPoints;
