# 🎵BeatMate
![beatmate](https://github.com/AppDoc-project/beatMate-front/assets/76678807/f0843cc8-bbc1-48e5-bdec-0d06b658faff)
<br>

## 팀 소개
| 우석우 | 신지수 | 전혜지 |
| --- | --- | --- |
| 백엔드 | 프론트엔드 | 프론트엔드 |
<br>

## 프로젝트 소개
- **BeatMate**는 평소 악기/보컬 레슨을 받기 위해 시간을 내기 어려운 사람들을 위한 **화상 악기/보컬 레슨 서비스**입니다.
<br>

## 프로그램 설치 및 실행 방법
- **tutor**
    - ID : tutor@100.com
    - PW : tutor1234
- **tutee**
    - ID : tutee@gamil.com
    - PW : tutee1234
<br>

## 프로젝트 아키텍쳐
![프로젝트 아키텍쳐](https://github.com/AppDoc-project/beatMate-front/assets/76678807/fb452642-e0e0-4973-a47a-e096e86e3a8d)
<br>
<br>

## 개발 스택
### BACK
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<br>
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<br>
<img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/socketdotio-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
<img src="https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white">

### FRONT
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<br>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/expo-000020?style=for-the-badge&logo=expo&logoColor=white">
<br>
<br>

## 뷰 및 기능 설명
| 이름 | 스크린샷 | 강사 | 스크린샷 | 수강생 |
| --- | --- | --- | --- | --- |
| 초기 화면 | ![강사_로그인](https://github.com/AppDoc-project/beatMate-front/assets/76678807/2698d648-dea8-43ec-8ad3-98803dbaf71c) | **spalsh 화면** : splash화면이 나온 뒤 다음 화면이 나타납니다. <br> **- 로그인X** : 로그인 화면이 띄워집니다. <br> **- 로그인O** :  홈 화면이 나타납니다. <br><br> **로그인 화면** : 사용자가 로그인, 회원가입, 비밀번호를 찾을 수 있습니다. | ![수강생_로그인](https://github.com/AppDoc-project/beatMate-front/assets/76678807/7599551d-7c3f-43df-bbe4-1ea9e2aec19c) | 강사와 같음 |
| 회원가입  |![강사_회원가입](https://github.com/AppDoc-project/beatMate-front/assets/76678807/ca252228-ce40-442a-bf7d-4e7ba038353c)  | **사용자 유형 선택** : 다음 단계로 진행하기 위해 강사 유형을 선택해야 합니다. <br><br> **회원가입 정보 입력** : 회원가입을 위해 필요한 정보를 입력한 후, 유효성 검사를 거쳐 조건을 확인합니다. 조건을 만족하지 못한 채 "계속하기" 버튼을 누를 시 알림창이 뜹니다. <br><br> **추가 정보 입력** : 레슨 음악 분야, 강사 자격 인증, 자기소개를 입력하는 화면이 추가로 있습니다. <br><br> **이메일 인증** : 회원 가입을 다 작성한 후 이메일 인증까지 완료하면 로그인 화면으로 이동합니다. | ![수강생_회원가입](https://github.com/AppDoc-project/beatMate-front/assets/76678807/f05aa312-a12b-428f-9f48-ad0c1eeaf57d) | **사용자 유형 선택** : 다음 단계로 진행하기 위해  수강생 유형을 선택해야 합니다. <br><br> **회원가입 정보 입력** : 회원가입에 필요한 정보를 입력한 후 유효성 검사를 통해 조건을 확인하고 만족하지 못한 채 ‘계속하기’ 버튼을 누를 시 알림창이 뜹니다. <br><br> **이메일 인증** : 회원 가입을 다 작성한 후 이메일 인증까지 완료하면 로그인 화면으로 이동합니다. |
| 홈 | ![home](https://github.com/AppDoc-project/beatMate-front/assets/76678807/0ddaf3d7-361f-4a5e-b264-19ba89ff24e7) | **홈 화면** : 레슨 알림과 레슨 관리, 예약 관리, 강사 찾기, 커뮤니티, 채팅, 내 정보 페이지로 이동할 수 있습니다. <br><br> **하단 탭** : 홈, 커뮤니티, 채팅, 강사 찾기, 예약, 레슨 내 정보 페이지로 이동 할 수 있습니다. | ![home](https://github.com/AppDoc-project/beatMate-front/assets/76678807/0ddaf3d7-361f-4a5e-b264-19ba89ff24e7) | 강사와 같음 |
| 커뮤니티 | ![강사_커뮤니티](https://github.com/AppDoc-project/beatMate-front/assets/76678807/3085627c-052a-4376-9dd1-504a0ac57bff) | 보컬이나 악기에 대해 서로 질문이나 소통할 수 있는 커뮤니티 화면입니다. <br><br> **카테고리 선택** : 원하는 카테고리를 선택 한 후 해당하는 커뮤니티 글을 확인할 수 있습니다. <br><br> **현재 카테고리 표시창** : 상단에는 현재 선택된 카테고리가 표시되며, 클릭하여 다른 카테고리로 이동할 수 있습니다. <br><br> **카테고리 화면** : 글 목록은 무한 스크롤로 구현하였고 ‘제목’, ‘내용’ 중 한 가지 검색 조건을 선택해 검색 할 수 있습니다. <br><br> **글쓰기 버튼** : 오른쪽 하단에 글쓰기 버튼이 항상 띄워져 있어 언제든지 게시글을 작성할 수 있습니다. <br><br>**게시글** : 해당 게시글의 댓글 수, 좋아요 수, 북마크 수를 확인할 수 있습니다. <br> **- 게시글 작성자** : 강사 이름으로 표시됩니다. <br> **- 수정 및 삭제** : 게시글 작성자는 게시글 오른쪽 상단 kebab menu를 클릭하면 게시글을 수정 또는 삭제할 수 있습니다. | ![수강생_커뮤니티](https://github.com/AppDoc-project/beatMate-front/assets/76678807/cfa53a81-b73b-4025-9b57-ede2b0bd57df) | 보컬이나 악기에 대해 서로 질문이나 소통할 수 있는 커뮤니티 화면입니다. <br><br> **카테고리 선택** : 원하는 카테고리를 선택 한 후 해당하는 커뮤니티 글을 확인할 수 있습니다. <br><br> **현재 카테고리 표시창**: 상단에는 현재 선택된 카테고리가 표시되며, 클릭하여 다른 카테고리로 이동할 수 있습니다. <br><br> **카테고리 화면** : 글 목록은 무한 스크롤로 구현하였고 ‘제목’, ‘내용’ 중 한 가지 검색 조건을 선택해 검색 할 수 있습니다. <br><br> **글쓰기 버튼** : 오른쪽 하단에 글쓰기 버튼이 항상 띄워져 있어 언제든지 게시글을 작성할 수 있습니다. <br><br> **게시글** : 해당 게시글의 댓글 수, 좋아요 수, 북마크 수를 확인할 수 있습니다. <br> **- 게시글 작성자** : 닉네임이나 '익명+숫자'로 표시됩니다. <br> **- 수정 및 삭제** : 게시글 작성자는 게시글 오른쪽 상단 kebab menu를 클릭하면 게시글을 수정 또는 삭제할 수 있습니다. |
| 채팅 | ![강사_채팅](https://github.com/AppDoc-project/beatMate-front/assets/76678807/70c82f7f-750f-48ab-8609-2db2326b1222) | 강사와 수강생 간의 의사 소통을 할 수 있는 화면입니다. 채팅을 통해 레슨 일정을 조율하고 레슨에 관한 내용을 주고 받을 수 있습니다. <br><br> **채팅 목록** : 무한 스크롤로 구현하였고 오른쪽 상단 버튼을 통해 목록을 새로 고침을 할 수 있습니다. <br><br> **채팅방** : 원하는 채팅을 확인할 수 있습니다. <br> **- 레슨 예약하기** : ‘레슨 예약하기’ 버튼을 통해 레슨 일정을 잡을 수 있습니다. | ![수강생_채팅](https://github.com/AppDoc-project/beatMate-front/assets/76678807/ac446d32-89a0-45d3-8f9e-8e73e07028aa) | 강사와 수강생 간의 의사 소통을 할 수 있는 화면입니다. 채팅을 통해 레슨 일정을 조율하고 레슨에 관한 내용을 주고 받을 수 있습니다. <br><br> **채팅 목록** : 무한 스크롤로 구현하였고 오른쪽 상단 버튼을 통해 목록을 새로 고침을 할 수 있습니다. <br><br> **채팅방** : 원하는 채팅을 확인할 수 있습니다. |
| 강사 찾기 | ![강사_강사찾기](https://github.com/AppDoc-project/beatMate-front/assets/76678807/2edeba9f-d730-4c4b-9fb6-0c931b6d49c5) | 원하는 강사를 검색하고 강사 프로필을 확인할 수 있는 화면입니다. <br><br> **강사 찾기 조건 설정** : 원하는 카테고리를 선택 한 후 ‘강사 이름으로 검색하기’와 ‘정렬 조건대로 정렬하기’ 중 하나를 선택하여 강사를 찾을 수 있습니다. <br><br> **강사 찾기 화면** : 무한 스크롤로 구현되어 있으며 원하는 강사를 선택하면 해당 강사의 프로필 화면으로 이동합니다. <br> **강사 프로필** : 강사를 찜할 수 있는 버튼이 없고 강사가 작성한 레슨 정보와 후기를 탭으로 나누어 확인할 수 있습니다. | ![수강생_강사찾기](https://github.com/AppDoc-project/beatMate-front/assets/76678807/2ca82046-fa52-44e1-9100-be0e1b1e36b6) | 원하는 강사를 검색하고 강사 프로필을 확인할 수 있는 화면입니다. <br><br> **강사 찾기 조건 설정** : 원하는 카테고리를 선택 한 후 ‘강사 이름으로 검색하기’와 ‘정렬 조건대로 정렬하기’ 중 하나를 선택하여 강사를 찾을 수 있습니다. <br><br> **강사 찾기 화면** : 무한 스크롤로 구현되어 있으며 원하는 강사를 선택하면 해당 강사의 프로필 화면으로 이동합니다. <br><br> **강사 프로필** : 프로필 화면 오른쪽 상단에 하트 버튼을 통해 강사를 찜할 수 있고 강사가 작성한 레슨 정보와 후기를 탭으로 나누어 확인할 수 있습니다. <br> **- 채팅하기** : 강사 프로필 하단에 ‘채팅하기’ 버튼을 통해 레슨 예약을 할 수 있습니다. |
| 예약 | ![강사_예약](https://github.com/AppDoc-project/beatMate-front/assets/76678807/1d18268b-07cc-4a6a-8bb2-cce688d64b2c) | 레슨 예약 현황을 확인할 수 있는 화면입니다. <br> **- 예약X** : ’예약된 레슨이 없습니다‘ 문구가 띄워집니다. <br> **- 예약O** : 시간 순으로 예약 목록이 보여집니다. <br><br> **레슨 정보 확인** : 예약된 레슨을 클릭하면 레슨 정보를 확인할 수 있습니다. <br> **- 예약 취소** : ‘예약 취소’ 버튼을 통해 레슨을 취소할 수 있습니다. | ![수강생_예약](https://github.com/AppDoc-project/beatMate-front/assets/76678807/5476a90b-e1de-4873-9d45-9c51b8d80ad9) | 레슨 예약 현황을 확인할 수 있는 화면입니다. <br> **- 예약X** : ’예약된 레슨이 없습니다‘ 문구가 띄워집니다. <br> **- 예약O** : 시간 순으로 예약 목록이 보여집니다. <br><br> **레슨 정보 확인** : 예약된 레슨을 클릭하면 레슨 정보를 확인할 수 있습니다. |
| 레슨 | ![강사_레슨](https://github.com/AppDoc-project/beatMate-front/assets/76678807/f1472d76-af22-461f-92ff-411f0f07474a) | 레슨 내역을 확인할 수 있는 화면입니다. 현재 진행 중인 레슨, 미 작성된 레슨 평가지(피드백지), 레슨 내역을 확인할 수 있습니다. 오른쪽 상단 버튼을 통해 새로 고침이 가능합니다. <br><br> **현재 진행 중인 레슨** : 레슨 시간이 되면 해당 시간의 레슨 정보가 보여줍니다. <br> **- 레슨 정보 모달창** : ‘레슨 정보 확인하기’ 버튼을 통해 세부 정보가 모달창으로 표시됩니다. 모달 외의 영역을 클릭하면 모달이 닫힙니다. <br> **- 화상 방** : 화상 레슨일 경우 화상 방이 생성되어 수업을 진행할 수 있습니다. <br><br> **미작성된 레슨 피드백지** : 강사가 작성하지 않은 피드백지 목록을 무한 스크롤로 보여줍니다.  클릭 시 해당 레슨 피드백지 작성 화면으로 이동합니다. <br><br> **레슨 내역** :  ‘레슨 내역 확인하기’ 버튼을 클릭하면 달력을 통해 월 별 레슨 내역을 확인할 수 있습니다. <br> **- 날짜 표시 구분** : 레슨이 있는 날짜와 선택한 날짜, 오늘 날짜를 구분하여 표시하였습니다. <br> **- 평가지 확인** : 날짜를 클릭하면 강사와 수강생이 작성한 레슨 평가지와 피드백지를 확인할 수 있습니다. <br> **- 월 이동 및 오늘 날짜로 이동**  : 달력 오른쪽 상단 이모티콘을 클릭하면 오늘 날짜로 이동합니다. | ![수강생_레슨](https://github.com/AppDoc-project/beatMate-front/assets/76678807/f957771e-72b0-43ec-97a1-f9ff85151ffc) | 레슨 내역을 확인할 수 있는 화면입니다. 현재 진행 중인 레슨, 미 작성된 레슨 평가지(피드백지), 레슨 내역을 확인할 수 있습니다. 오른쪽 상단 버튼을 통해 새로 고침이 가능합니다. <br><br> **현재 진행 중인 레슨** : 레슨 시간이 되면 해당 시간의 레슨 정보가 보여줍니다. <br> **- 레슨 정보 모달창** : ‘레슨 정보 확인하기’ 버튼을 통해 세부 정보가 모달창으로 표시됩니다. 모달 외의 영역을 클릭하면 모달이 닫힙니다. <br> **- 화상 방** : 화상 레슨일 경우 화상 방이 생성되어 수업을 진행할 수 있습니다. <br><br> **미작성된 레슨 평가지** : 수강생이 작성하지 않은 평가지 목록을 무한 스크롤로 보여줍니다.  클릭 시 해당 레슨 평가지 작성 화면으로 이동합니다. <br><br> **레슨 내역** :  ‘레슨 내역 확인하기’ 버튼을 클릭하면 달력을 통해 월 별 레슨 내역을 확인할 수 있습니다. <br> **- 날짜 표시 구분** : 레슨이 있는 날짜와 선택한 날짜, 오늘 날짜를 구분하여 표시하였습니다. <br> **- 평가지 확인** : 날짜를 클릭하면 강사와 수강생이 작성한 레슨 평가지와 피드백지를 확인할 수 있습니다. <br> **- 월 및 오늘 날짜로 이동**  : 달력 오른쪽 상단 이모티콘을 클릭하면 오늘 날짜로 이동합니다. |
| 내 정보 | ![강사_내정보](https://github.com/AppDoc-project/beatMate-front/assets/76678807/6b1b2319-892c-436d-8646-6910ce2feb4d) | 사용자가 쓴 게시글, 댓글, 북마크 등을 확인할 수 있는 화면입니다. <br><br> **탭** : 내가 쓴 글, 내가 쓴 댓글, 북마크 세 개의 탭으로 나누어져 있고 각 탭에 띄워지는 목록은 무한 스크롤로 구현하였습니다. <br><br> **내 정보 설정** : 오른쪽 상단에 있는 톱니바퀴 버튼을 클릭하면 이동합니다. | ![수강생_내정보](https://github.com/AppDoc-project/beatMate-front/assets/76678807/dac42711-db21-41c0-b31b-3314c80a7c37) | 사용자가 쓴 게시글, 댓글, 북마크 등을 확인할 수 있는 화면입니다. <br><br> **탭** : 내가 쓴 글, 내가 쓴 댓글, 북마크, 찜한 강사 네 개의 탭으로 나누어져 있고 각 탭에 띄워지는 목록은 무한 스크롤로 구현하였습니다. <br><br> **내 정보 설정** : 오른쪽 상단에 있는 톱니바퀴 버튼을 클릭하면 이동합니다. |

<br>

## 디렉토리 구조
```
├──.eslintrc.json
├──.gitignore
├──.prettierrc.js
├──app.json
├──App.jsx
├──babel.config.js
├──colors.js
├──eas.json
├──jsconfig.json
├──package-lock.json
├──package.json
├──README.md
├─.expo
│  ├─devices.json
│  ├─packager-info.json
│  ├─README.md
│  └─settings.json
├─api
│  ├─auth.js
│  ├─chat.js
│  ├─client.js
│  ├─community.js
│  ├─lesson.js
│  ├─mypage.js
│  ├─reservation.js
│  └─tutorpage.js
├─assets
│  ├─chat
│  |  ├─EnterIcon.jsx
│  │  └─nullProfile.jpg
│  ├─Icons
│  │  └─Buttons.jsx
│  ├─PostItem
│  │  └─AddTmage.jsx
│  ├─SignUp
│  |  └─SelectUserScreen.jsx
│  ├─loadingPage.png
|  └─profile.png
├─components
│  ├─chat
│  │  ├─list
│  │  |   ├─ChatRoomList.jsx
│  │  |   └─ChatRoomListItem.jsx
│  │  └─message
│  │      ├─MessageInput.jsx
│  │      ├─MessageList.jsx
│  │      ├─MyMessage.jsx
│  │      └─OtherMessage.jsx
│  ├─community
│  │  ├─mainPage
│  │  |   ├─CoummunityPostingItem.jsx
│  │  |   └─SelectCategory.jsx
│  │  ├─newPost
│  │  |   ├─SelectCategory.jsx
│  │  |   └─UploadImages.jsx
│  │  └─onePage
│  │      ├─CommentList.jsx
│  │      ├─CommentListItem.jsx
│  │      └─MainPostItem.jsx
│  ├─lesson
│  │  ├─currentLessonItem
│  │  |   ├─CurrentNoLesson.jsx
│  │  |   ├─CurrentOfflineLesson.jsx
│  │  |   ├─CurrentOnlineLesson.jsx
│  │  |   ├─LessonInfoContent.jsx
│  │  |   └─LessonInfoModal.jsx
│  │  ├─lessonCalendarItem
│  │  |   ├─LessonCalendar.jsx
│  │  |   ├─LessonFinalInfo.jsx
│  │  |   ├─LessonScheduleItem.jsx
│  │  |   └─RenderCalendarDate.jsx
│  │  ├─notYetWroteItem
│  │  |   └─LessonInfoContent.jsx
│  │  └─LessonFeedbackItem.jsx
│  ├─mypage
│  │  ├─mypageSetScreen
│  │  |   └─UploadImages.jsx
│  │  └─mypagetabscreens
│  │      ├─List
|  │      |   ├─MyBookmarkList.jsx
|  │      |   ├─MyCommentList.jsx
|  │      |   ├─MyPostList.jsx
|  │      |   └─MyTutorList.jsx
│  │      └─ListItem
|  │          ├─MyBookmarkListItem.jsx
|  │          ├─MyCommentListItem.jsx
|  │          ├─MyPostListItem.jsx
|  │          └─MyTutorListItem.jsx
│  ├─reservation
│  │  └─ReservationListItem.jsx
│  ├─searchtutor
│  │  ├─tutorProfile
│  │  |   ├─LessonInfoPost.jsx
│  │  |   ├─ReviewItem.jsx
│  │  |   ├─ReviewPostItem.jsx
│  │  |   └─ReveiwPostList.jsx
│  │  ├─SearchTutorItem.jsx
│  │  └─SelectCategoryTutor.jsx
│  └─signup
│     ├─ImageUpload.jsx
│     └─SelectSpecialityTab.jsx
├─context
│  ├─AuthContext.jsx
│  ├─TutorFindCategoryContext.jsx
│  └─UserInfoContext.jsx
├─hook
│  └─TutorSpecialityKo.js
├─node_modules
├─routes
│  ├─chat
|  │  └─ChatScreenNavigators.jsx
│  ├─community
|  │  └─CommunityNavigators.jsx
│  ├─lesson
|  │  └─LessonScreenNavigators.jsx
│  ├─mypage
|  │  └─MyPageScreenNavigators.jsx
│  ├─reservation
|  │  └─ReservationScreenNavigators.jsx
│  └─searchtutor
|  │  └─SearchTutorScreenNavigators.jsx
│  ├─AuthRoutes.jsx
│  └─HomeTabRoutes.jsx
└─screens
    ├─chat
    │  ├─ChatListScreen.jsx
    │  └─ChatRoomScreen.jsx
    ├─community
    │  ├─CoummunityOnePostScreen.jsx
    │  ├─CoummunityScreen.jsx
    │  ├─CoummunitySpecificScreen.jsx
    │  └─WriteNewPostScreen.jsx
    ├─lesson
    │  ├─LessonEvaluationScreen.jsx
    │  ├─LessonFeedbackScreen.jsx
    │  ├─LessonMainScreen.jsx
    │  ├─LessonScheduleScreen.jsx
    │  ├─TuteeEvaluationModifyScreen.jsx
    │  ├─TuteeEvaluationScreen.jsx
    │  ├─TutorFeedbackModifyScreen.jsx
    │  ├─TutorFeedbackScreen.jsx
    │  └─VideoScreen.jsx
    ├─login
    │  ├─ChangePassword
    |  |  ├─GetAuthCode.jsx
    |  |  ├─GetAuthEmail.jsx
    |  |  └─GetChangePassword.jsx
    │  └─LoginScreen.jsx
    ├─mypage
    │  ├─TuteeMyPageScreen.jsx
    │  └─TutorMyPageScreen.jsx
    ├─mypageset
    │  ├─communityset
    |  |  ├─ChangeNicknameScreen.jsx
    |  |  └─ChangePorfileScreen.jsx
    │  ├─etc
    |  |  └─DeleteAccountScreen.jsx
    │  ├─myinfoset
    |  |  ├─ChangeInforScreen.jsx
    |  |  ├─ChangePasswordScreen.jsx
    |  |  └─ChangePhoneNumberScreen.jsx
    │  └─MyPageSetScreen.jsx
    ├─reservation
    │  ├─ReservationFormScreen.jsx
    │  ├─ReservationMainScreen.jsx
    │  └─ReservationSpecificScreen.jsx
    ├─searchtutor
    │  ├─GetSearchOptionScreen.jsx
    │  ├─SearchTutorScreen.jsx
    │  ├─TutorCommunityListScreen.jsx
    │  └─TutorProfileScreen.jsx
    ├─signup
    |   ├─tutee
    |   |  └─TuteeGetInfoScreen.jsx
    |   ├─tutor
    |   |  ├─TutorGetInfoScreen1.jsx
    |   |  └─TutorGetInfoScreen2.jsx
    |   ├─GetAuthCodeScreen.jsx
    |   └─SelectTypeScreen.jsx
    └─HomeScreen.jsx
```
