import AddImage from '@assets/PostItem/AddTmage';
import { useNavigation } from '@react-navigation/native';
import { postImages } from 'api/mypage';
import { COLORS } from 'colors';
import * as ImagePicker from 'expo-image-picker';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import { styled } from 'styled-components/native';

function UploadImages({ addresses, setAddresses }) {
  const [selectedImage, setSelectedImage] = useState(null);

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
      setSelectedImage(result);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      return; // No image selected
    }

    const formData = new FormData();
    const file = {
      uri: selectedImage.uri,
      type: 'image/jpeg',
      name: 'selectedImage.jpg',
    };
    formData.append('file', file);

    postImages(formData)
      .then((res) => {
        setAddresses(res.data.message);
        console.log('이미지 url 변환', res.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else {
          console.log('이미지 url 변환', format(error));
        }
      });
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <Container>
      <View style={styles.row}>
        {selectedImage && (
          <TouchableOpacity onPress={removeImage}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage.uri }} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
        {!selectedImage && (
          <TouchableOpacity onPress={uploadImage}>
            <View style={styles.imageContainer}>
              <AddImage style={styles.addImage} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {selectedImage && (
        <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
          <Text style={styles.uploadText}>사진 업로드 하기</Text>
        </TouchableOpacity>
      )}
    </Container>
  );
}

UploadImages.propTypes = {
  addresses: PropTypes.string.isRequired,
  setAddresses: PropTypes.func.isRequired,
};

const Container = styled.View``;

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginTop: 10,
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
