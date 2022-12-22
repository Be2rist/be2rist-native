import React from 'react';
import PropTypes from 'prop-types';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Preloader = ({loading, children}) =>
  loading ? (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  ) : (
    <>{children}</>
  );

export default Preloader;

Preloader.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
};

Preloader.defaultProps = {
  children: <div />,
};
