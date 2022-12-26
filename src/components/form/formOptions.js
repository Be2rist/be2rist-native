import {ActivityIndicator, Text} from 'react-native-paper';
import languages from 'languages';
import React from 'react';
import {StyleSheet} from 'react-native';

export const languageOption = language => () =>
  (
    <Text style={styles.textOption}>
      {languages.find(lang => lang.lng === language)?.name}
    </Text>
  );

export const imageName = (googleDriveMetadata, id) => () =>
  googleDriveMetadata.loading ? (
    <ActivityIndicator style={styles.textOption} />
  ) : (
    <Text style={styles.textOption}>{googleDriveMetadata.data[id]?.name}</Text>
  );

const styles = StyleSheet.create({
  textOption: {
    paddingTop: 28,
    paddingLeft: 16,
  },
});
