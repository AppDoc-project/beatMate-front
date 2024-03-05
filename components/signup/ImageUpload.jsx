import AddImage from '@assets/PostItem/AddTmage';
import { useNavigation } from '@react-navigation/native';
import { postImages } from 'api/auth';
import { COLORS } from 'colors';
import { Auth } from 'context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

function ImageUpload() {
  const {
    tutor: [tutorSignUpRequest, setTutorSignUpRequest],
  } = useContext(Auth);
  const navigation = useNavigation();

  const { authenticationAddress } = tutorSignUpRequest;

  const [selectedImages, setSelectedImages] = useState([]);

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

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
      quality: 0.1, // 예시로 품질을 0.5로 설정
      aspect: [1, 1],
      base64: false,
      width: 500, // 이미지의 너비를 500px로 조정
      height: 500, // 이미지의 높이를 500px로 조정
    });

    if (!result.canceled) {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, result]);
    }
  };

  // 사진 전송 API
  const handleUpload = async () => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      const file = {
        uri: image.uri,
        type: 'image/jpeg', // 이미지 타입 설정 (JPEG 예시)
        name: `${index}.jpg`, // 파일명 설정
      };
      formData.append(`files`, file); // FormData에 이미지 추가
    });

    postImages(formData)
      .then((res) => {
        console.log(res); // 서버 응답 확인

        const updatedSignUpRequest = { ...tutorSignUpRequest }; // 이전 상태의 복사본 생성
        updatedSignUpRequest.authenticationAddress = res.data.data; // 새로운 값으로 업데이트
        setTutorSignUpRequest(updatedSignUpRequest); // 새로운 상태로 업데이트
        console.log(updatedSignUpRequest);
      })
      .catch((error) => {
        // 여기 수정 필요
        if (error.response && error.response.data.status === 404) {
          Alert.alert('알림', '파일의 크기가 큽니다. 파일당 1mb 크기내로 올려주세요.');
        } else if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log(format(error.response.data.status));
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('loginScreen');
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

  ImageUpload.propTypes = {
    authenticationAddress: PropTypes.array.isRequired, // props validation 추가
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

const Container = styled.View``;

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: wp(-1),
  },
  imageContainer: {
    marginBottom: hp(1),
    marginRight: wp(1),
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

export default ImageUpload;
