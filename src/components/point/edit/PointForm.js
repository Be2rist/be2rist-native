import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import TextInputField from 'components/form/TextInputField';
import {Form} from 'react-final-form';
import LanguageListDialog from 'components/settings/LanguageListDialog';
import languages from 'languages';
import {required} from 'utils/validation';
import {useTranslation} from 'react-i18next';
import {getMetadataById, selectMetadata} from 'services/redux/googleDriveSlice';
import {useDispatch, useSelector} from 'react-redux';
import GoogleDriveModal from 'components/googledrive/GoogleDriveModal';
import PropTypes from 'prop-types';
import googleDriveMimeTypes from 'utils/googleDriveMimeTypes';
import LocationConfirmationDialog from 'components/point/edit/LocationConfirmationDialog';
import LocationDialog from 'components/point/edit/LocationDialog';
import {GeolocationFlow} from 'GeoLocationProvider';

const languageOption = language => () =>
  (
    <Text style={styles.textOption}>
      {languages.find(lang => lang.lng === language)?.name}
    </Text>
  );

const imageName = (googleDriveMetadata, id) => () => {
  return googleDriveMetadata.loading ? (
    <ActivityIndicator style={styles.textOption} />
  ) : (
    <Text style={styles.textOption}>
      {googleDriveMetadata.data[id]?.originalFilename}
    </Text>
  );
};

const PointForm = ({point, onSubmit}) => {
  const googleDriveMetadata = useSelector(selectMetadata);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [languageDialogVisible, setLanguageDialogVisible] = useState(false);
  const [
    locationConfirmationDialogVisible,
    setLocationConfirmationDialogVisible,
  ] = useState(false);
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [imageGoogleDriveVisible, setImageGoogleDriveVisible] = useState(false);
  const [mediaGoogleDriveVisible, setMediaGoogleDriveVisible] = useState(false);
  const [coverId, setCoverId] = useState(point.cover);
  const [mediaId, setMediaId] = useState(point.audioContent);
  const [metadataLocationCallback, setMetadataLocationCallback] = useState();
  const showLanguageDialog = useCallback(() => {
    setLanguageDialogVisible(true);
  }, []);

  const hideLanguageDialog = useCallback(() => {
    setLanguageDialogVisible(false);
  }, []);

  const hideGoogleDrive = useCallback(() => {
    setImageGoogleDriveVisible(false);
    setMediaGoogleDriveVisible(false);
  }, []);

  const hideLocationConfirmationDialog = useCallback(() => {
    setLocationConfirmationDialogVisible(false);
    setMetadataLocationCallback(null);
  }, []);

  const showLocationDialog = useCallback(() => {
    setLocationDialogVisible(true);
  }, []);

  const hideLocationDialog = useCallback(() => {
    setLocationDialogVisible(false);
  }, []);

  const showImageGoogleDrive = useCallback(() => {
    setImageGoogleDriveVisible(true);
  }, []);

  const showMediaGoogleDrive = useCallback(() => {
    setMediaGoogleDriveVisible(true);
  }, []);

  const initialValues = useMemo(
    () => ({
      ...point,
      location: {
        _latitude: point.location?._latitude?.toString(),
        _longitude: point.location?._longitude.toString(),
      },
      radius: point.radius?.toString(),
    }),
    [point],
  );

  useEffect(() => {
    (mediaId || coverId) &&
      dispatch(
        getMetadataById([
          ...(mediaId ? [mediaId] : []),
          ...(coverId ? [coverId] : []),
        ]),
      );
  }, [dispatch, mediaId, coverId]);

  useEffect(() => {
    if (metadataLocationCallback) {
      const metadata =
        !googleDriveMetadata.loading && googleDriveMetadata.data[coverId];
      if (metadata && metadata.imageMediaMetadata?.location) {
        setLocationConfirmationDialogVisible(true);
      }
    }
  }, [metadataLocationCallback, coverId, googleDriveMetadata]);

  const setLocationFromMetadata = useCallback(() => {
    const metadata =
      !googleDriveMetadata.loading && googleDriveMetadata.data[coverId];
    if (metadata && metadata.imageMediaMetadata?.location) {
      metadataLocationCallback(metadata.imageMediaMetadata.location);
      setMetadataLocationCallback(null);
      setLocationConfirmationDialogVisible(false);
    }
  }, [coverId, googleDriveMetadata, metadataLocationCallback]);

  return (
    <>
      <Form
        mutators={{
          setValue: ([field, value], state, {changeValue}) => {
            changeValue(state, field, () => value);
          },
        }}
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({
          handleSubmit,
          submitting,
          pristine,
          form: {
            getState,
            mutators: {setValue},
          },
        }) => {
          const onChangeLanguage = value => {
            setValue('language', value);
            hideLanguageDialog();
          };

          const onSelectCover = id => {
            setValue('cover', id);
            setCoverId(id);
            hideGoogleDrive();
            setMetadataLocationCallback(setLocation);
          };

          const onSelectDraggableLocation = location => {
            if (location.latitude && location.longitude) {
              setValue('location._latitude', location.latitude.toString());
              setValue('location._longitude', location.longitude.toString());
            }
            hideLocationDialog();
          };

          const setLocation = () => location => {
            if (location.latitude && location.longitude) {
              setValue('location._latitude', location.latitude.toString());
              setValue('location._longitude', location.longitude.toString());
            }
          };

          const onSelectMedia = id => {
            setValue('audioContent', id);
            setMediaId(id);
            hideGoogleDrive();
          };

          return (
            <View>
              <TextInputField
                name="name"
                label={t('point.edit.label.name')}
                validate={required}
              />
              <TouchableRipple
                onPress={showLanguageDialog}
                rippleColor="rgba(0, 0, 0, .32)">
                <TextInputField
                  readonly
                  name="language"
                  label={t('point.edit.label.language')}
                  validate={required}
                  render={languageOption(getState().values?.language)}
                />
              </TouchableRipple>
              <TextInputField
                name="cover"
                label={t('point.edit.label.cover')}
                validate={required}
                render={imageName(
                  googleDriveMetadata,
                  getState().values?.cover,
                )}
                right={
                  <TextInput.Icon
                    disabled={googleDriveMetadata.loading}
                    icon="image-edit-outline"
                    onPress={showImageGoogleDrive}
                  />
                }
              />
              <TextInputField
                keyboardType="numeric"
                name="location._latitude"
                label={t('point.edit.label.latitude')}
                validate={required}
                right={
                  <TextInput.Icon
                    icon="google-maps"
                    onPress={showLocationDialog}
                  />
                }
              />
              <TextInputField
                keyboardType="numeric"
                name="location._longitude"
                label={t('point.edit.label.longitude')}
                validate={required}
              />
              <TextInputField
                keyboardType="numeric"
                name="radius"
                label={t('point.edit.label.radius')}
                validate={required}
              />
              <TextInputField
                name="audioContent"
                label={t('point.edit.label.sound')}
                validate={required}
                render={imageName(
                  googleDriveMetadata,
                  getState().values?.audioContent,
                )}
                right={
                  <TextInput.Icon
                    disabled={googleDriveMetadata.loading}
                    icon="image-edit-outline"
                    onPress={showMediaGoogleDrive}
                  />
                }
              />
              <TextInputField
                name="description"
                label={t('point.edit.label.description')}
                multiline
                numberOfLines={3}
              />
              <View className="buttons">
                <Button
                  type="submit"
                  disabled={submitting || pristine}
                  onPress={handleSubmit}>
                  Submit
                </Button>
              </View>
              <LanguageListDialog
                initialValue={getState().values.language}
                hideDialog={hideLanguageDialog}
                visible={languageDialogVisible}
                changeLanguage={onChangeLanguage}
              />
              <GoogleDriveModal
                visible={imageGoogleDriveVisible}
                imageTypes={[googleDriveMimeTypes.IMAGE]}
                onClose={hideGoogleDrive}
                onSelect={onSelectCover}
              />
              <GoogleDriveModal
                visible={mediaGoogleDriveVisible}
                imageTypes={[googleDriveMimeTypes.AUDIO]}
                onClose={hideGoogleDrive}
                onSelect={onSelectMedia}
              />
              <LocationDialog
                location={{
                  latitude:
                    +getState().values?.location?._latitude ||
                    GeolocationFlow.location?.latitude ||
                    0,
                  longitude:
                    +getState().values?.location?._longitude ||
                    GeolocationFlow.location?.longitude ||
                    0,
                }}
                visible={locationDialogVisible}
                setLocation={onSelectDraggableLocation}
                close={hideLocationDialog}
              />
            </View>
          );
        }}
      />
      <LocationConfirmationDialog
        location={
          googleDriveMetadata.data[coverId]?.imageMediaMetadata?.location
        }
        visible={locationConfirmationDialogVisible}
        setLocation={setLocationFromMetadata}
        close={hideLocationConfirmationDialog}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textOption: {
    paddingTop: 28,
    paddingLeft: 16,
  },
});

export default PointForm;

PointForm.propTypes = {
  point: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cover: PropTypes.string,
    audioContent: PropTypes.string,
    contentType: PropTypes.string,
    location: PropTypes.shape({
      _latitude: PropTypes.number,
      _longitude: PropTypes.number,
    }),
    language: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
