import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import useDarkMode from 'components/custom/useDarkMode';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import PropTypes from 'prop-types';
import PanelHandle from 'components/custom/slidingup/PanelHandle';

const ios = Platform.OS === 'ios';

const SlidingUpMainMenuPanel = ({children, viewDimension}) => {
  const darkMode = useDarkMode();
  const styles = useMemo(() => makeStyles(darkMode), [darkMode]);
  const deviceHeight = useWindowDimensions().height;

  const draggableRange = useMemo(
    () => ({
      top: viewDimension.height + 1,
      bottom: deviceHeight / 7.8,
    }),
    [deviceHeight, viewDimension.height],
  );

  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [allowDragging, setAllowDragging] = useState(true);
  const [atTop, setAtTop] = useState(true);

  const snappingPoints = [draggableRange.top, draggableRange.bottom];

  const panelRef = useRef();
  const [panelPositionVal] = useState(
    new Animated.Value(draggableRange.bottom),
  );

  const onMomentumDragEnd = useCallback(
    (value: number) => {
      if (value === draggableRange.top && !scrollEnabled) {
        setScrollEnabled(true);
        setAtTop(true);
      }
    },
    [draggableRange, scrollEnabled],
  );

  const onMomentumScrollEnd = useCallback(event => {
    const {nativeEvent} = event;
    if (nativeEvent.contentOffset.y === 0) {
      setAtTop(true);
      if (ios) {
        setAllowDragging(true);
      }
    }
  }, []);

  const PANEL_VELOCITY = ios ? 1 : 2.3;
  const hideFullScreenPanelOptions = useMemo(
    () => ({
      velocity: PANEL_VELOCITY,
      toValue: draggableRange.bottom,
    }),
    [PANEL_VELOCITY, draggableRange.bottom],
  );

  const onDragStart = useCallback(
    (_, gestureState) => {
      if (atTop && scrollEnabled) {
        if (gestureState.vy > 0) {
          setScrollEnabled(false);
          if (ios) {
            setAllowDragging(true);
          }
          if (panelRef && panelRef.current) {
            panelRef.current.show(hideFullScreenPanelOptions);
          }
        } else {
          setAtTop(false);
          if (ios) {
            setAllowDragging(false);
          }
        }
      }
    },
    [atTop, scrollEnabled, hideFullScreenPanelOptions],
  );
  return (
    <SlidingUpPanel
      ref={panelRef}
      animatedValue={panelPositionVal}
      draggableRange={draggableRange}
      snappingPoints={snappingPoints}
      backdropOpacity={0}
      showBackdrop={false}
      height={viewDimension.height}
      allowDragging={allowDragging}
      onMomentumDragEnd={onMomentumDragEnd}
      onDragStart={onDragStart}>
      <View style={styles.panelContent}>
        <PanelHandle />
        <ScrollView
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={onMomentumScrollEnd}>
          {children}
        </ScrollView>
      </View>
    </SlidingUpPanel>
  );
};

const makeStyles = isDarkMode =>
  StyleSheet.create({
    panelContent: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
  });

export default SlidingUpMainMenuPanel;

SlidingUpMainMenuPanel.propTypes = {
  viewDimension: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
