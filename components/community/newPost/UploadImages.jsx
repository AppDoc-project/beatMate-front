import AddImage from '@assets/PostItem/AddTmage';
import { useNavigation } from '@react-navigation/native';
import { postImages } from 'api/commity';
import { COLORS } from 'colors';
import * as ImagePicker from 'expo-image-picker';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

function UploadImages({ addresses, setAddresses }) {
  const [selectedImages, setSelectedImages] = useState([]);

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
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, result]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      const file = {
        uri: image.uri,
        type: 'image/jpeg',
        name: `${index}.jpg`,
      };
      formData.append(`files`, file);
    });

    postImages(formData)
      .then((res) => {
        const updatedAddresses = { ...addresses };
        updatedAddresses.addresses = res.data.data;
        setAddresses(updatedAddresses.addresses);
        console.log(updatedAddresses.addresses);
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else {
          console.log('사진 올리기 실패', error);
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

  return (
    <Container>
      <View style={styles.row}>
        {selectedImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => removeImage(index)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </View>
          </TouchableOpacity>
        ))}
        {[...Array(remainingSlots)].map((_, index) => (
          <TouchableOpacity key={index + selectedImages.length} onPress={uploadImage}>
            <View style={styles.imageContainer}>
              <AddImage style={styles.addImage} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
        <Text style={styles.uploadText}>사진 업로드 하기</Text>
      </TouchableOpacity>
    </Container>
  );
}

UploadImages.propTypes = {
  addresses: PropTypes.object.isRequired,
  setAddresses: PropTypes.func.isRequired,
};

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
};

export default UploadImages;
