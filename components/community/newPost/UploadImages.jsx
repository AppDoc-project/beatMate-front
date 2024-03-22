import AddImage from '@assets/PostItem/AddTmage';
import { useNavigation } from '@react-navigation/native';
import { postImages } from 'api/commity';
import { COLORS } from 'colors';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Octicons from 'react-native-vector-icons/Octicons';
import format from 'pretty-format';

UploadImages.propTypes = {
  isPhotoValid: PropTypes.bool.isRequired,
  setPhotoValid: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired,
  setAddresses: PropTypes.func.isRequired,
  selectedImages: PropTypes.array.isRequired,
  setSelectedImages: PropTypes.func.isRequired,
};

function UploadImages({ isPhotoValid, setPhotoValid, addresses, setAddresses, selectedImages, setSelectedImages }) {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const navigation = useNavigation();

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.1,
      aspect: [1, 1],
      base64: false,
      width: 500,
      height: 500,
    });

    if (!result.canceled) {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, result.assets[0].uri]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      const file = {
        uri: image,
        type: 'image/jpeg',
        name: `${index}.jpg`,
      };
      formData.append(`files`, file);
    });

    selectedImages.length > 0 &&
      postImages(formData)
        .then((res) => {
          const updatedAddresses = { ...addresses };
          updatedAddresses.addresses = res.data.data;
          setAddresses(updatedAddresses.addresses);
          setPhotoValid(true);
          Alert.alert('알림', '사진 업로드에 성공하였습니다.');
          console.log(updatedAddresses.addresses);
        })
        .catch((error) => {
          if (error.response && error.response.status === 413) {
            console.log(format(error));
            Alert.alert('알림', '파일의 크기가 큽니다. 파일당 1mb 크기내로 올려주세요.');
          } else if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            console.log(format(error));
            navigation.navigate('loginScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            console.log(format(error));
          } else {
            console.log('사진 올리기 실패', error);
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
          }
        });
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedImages = [...prevSelectedImages];
      updatedImages.splice(indexToRemove, 1);
      return updatedImages;
    });
  };

  const remainingSlots = 5 - selectedImages.length;

  useEffect(() => {
    console.log('Selected Images:', selectedImages);
  }, [selectedImages]); // selectedImages가 업데이트될 때마다 useEffect 실행

  useEffect(() => {
    // addresses가 존재하고 selectedImages가 비어있을 경우에만 초기화
    if (addresses.length > 0 && selectedImages.length === 0) {
      setSelectedImages(addresses);
    }
  }, [addresses]);

  return (
    <Container>
      <View style={styles.row}>
        {selectedImages.map((image, index) =>
          isPhotoValid ? (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ) : (
            <TouchableOpacity key={index} onPress={() => removeImage(index)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          ),
        )}
        {!isPhotoValid &&
          [...Array(remainingSlots)].map((_, index) => (
            <TouchableOpacity key={index + selectedImages.length} onPress={uploadImage}>
              <View style={styles.imageContainer}>
                <AddImage style={styles.addImage} />
              </View>
            </TouchableOpacity>
          ))}
      </View>
      {isPhotoValid ? (
        <View style={styles.iconContainer}>
          <Octicons name="check" size={RFValue(20)} color={COLORS.subLightblue} style={{ marginLeft: 10 }} />
        </View>
      ) : (
        <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
          <Text style={styles.uploadText}>사진 업로드 하기</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}

const Container = styled.View``;

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: wp(-1),
  },
  imageContainer: {
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  addImage: {
    width: 100,
    height: 100,
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  uploadText: {
    color: 'black',
    borderWidth: 1.5,
    borderColor: COLORS.main,

    overflow: 'hidden',
    padding: 5,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(50),
  },
};

export default UploadImages;
