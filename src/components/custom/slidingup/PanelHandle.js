import * as React from 'react';
import {StyleSheet, View} from 'react-native';

const PanelHandle = () => (
  <View style={styles.handleContainer}>
    <View style={styles.handle} />
  </View>
);

const styles = StyleSheet.create({
  handleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    backgroundColor: '#D6D6D6',
    width: 34,
    marginTop: 10,
    marginBottom: 10,
    height: 4,
    borderRadius: 4,
  },
});

export default PanelHandle;
