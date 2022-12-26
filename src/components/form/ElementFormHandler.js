import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {Form} from 'react-final-form';
import LanguageListDialog from 'components/settings/LanguageListDialog';
import {getMetadataById, selectMetadata} from 'services/redux/googleDriveSlice';
import {useDispatch, useSelector} from 'react-redux';
import GoogleDriveModal from 'components/googledrive/GoogleDriveModal';
import PropTypes from 'prop-types';
import googleDriveMimeTypes from 'utils/googleDriveMimeTypes';
import LocationConfirmationDialog from 'components/point/edit/LocationConfirmationDialog';
import LocationDialog from 'components/point/edit/LocationDialog';
import {GeolocationFlow} from 'GeoLocationProvider';

const ElementFormHandler = ({item, onSubmit, FormFields}) => {
  const googleDriveMetadata = useSelector(selectMetadata);
  const dispatch = useDispatch();
  const [languageDialogVisible, setLanguageDialogVisible] = useState(false);
  const [
    locationConfirmationDialogVisible,
    setLocationConfirmationDialogVisible,
  ] = useState(false);
  const [locationDialogVisible, setLocationDialogVisible] = useState(false);
  const [imageGoogleDriveVisible, setImageGoogleDriveVisible] = useState(false);
  const [mediaGoogleDriveVisible, setMediaGoogleDriveVisible] = useState(false);
  const [coverId, setCoverId] = useState(item.cover);
  const [mediaId, setMediaId] = useState(item.audioContent);
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
      ...item,
      location: {
        _latitude: item.location?._latitude?.toString(),
        _longitude: item.location?._longitude.toString(),
      },
      ...(item.radius ? {radius: item.radius?.toString()} : {}),
    }),
    [item],
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
              <FormFields
                showLanguageDialog={showLanguageDialog}
                showLocationDialog={showLocationDialog}
                getState={getState}
                googleDriveMetadata={googleDriveMetadata}
                showImageGoogleDrive={showImageGoogleDrive}
                showMediaGoogleDrive={showMediaGoogleDrive}
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

export default ElementFormHandler;

ElementFormHandler.propTypes = {
  item: PropTypes.shape({
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
