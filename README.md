<h1> KSP (1st_Project_SeSAC_KSP) </h1>

<h1> 프로젝트 소개 (Project Described) </h1>
<h3> 1. 기획 의도 </h3>
이 프로젝트의 주제는 다른 모든 음원차트 사이트를 한곳에서 확인하고 서로 방명록처럼 소통할 수 있는 사이트를 만드는 것입니다.
<br />
The theme of this project is to create a site where you can check all the other music chart sites in one place and communicate with each other like a guestbook.

<h3> 2. 주요 기능 </h3>

|기능| 설명|
|:---|:---|
|Main Page|1. 달력, 그날의 기록, 올해 나의 기록 등 노출.<br>2. Header를 통해 로그아웃 가능.|
|Calendar|1. 이벤트를 등록 가능.<br>2.날짜를 클릭하면 로그를 기록할 수 있는 페이지로 넘어가고 해당 날짜를 가져 옴.<br>3. 날짜를 클릭하면 해당 날짜에 기록된 데이터가 영화, 책, 공연이 서로 다른 색으로 표시.<br>4. 날짜를 클릭하면 해당 날짜에 기록된 데이터 내용이 달력 아래에 노출.<br>5. 상세보기를 누르면 등록한 이벤트의 상세 내용이 나오고, 삭제 가능.|
|Signup / Login / Logout|1. 아이디 중복 확인을 할 수 있다.<br>2. 회원가입 시 유효성 검사 가능.<br>3. 회원가입 시 일반 사용자: permission을 default로 생성, 관리자: DB에서 permission을 직접 설정.<br>4. 로그인에 성공할 경우 토큰이 생성.<br>5. 로그아웃에 성공할 경우 토큰을 비워주어야 함.|
|Board (Movie / Book / Performance)|1. 검색 창에 검색어를 입력하면 서버를 통해 각 API에 요청한 데이터를 받아 옴.(검색 기능 내 유효성 검사)<br>2. 검색 창 밑에 API에서 받아온 해당 검색 데이터 리스트가 나타나고 클릭 시 포스터, 제목, 감독, 장르 등의 세부 옵션 폼 내용 자동 완성<br>3. 리뷰 내용을 입력 후 폼을 전송하면 해당 폼의 정보가 DB에 저장 됨. (로그인 유저 정보 포함되어 있음, 폼 전송 시 유효성 검사)|
|Graph|1. 모든 사용자의 책, 영화, 공연 기록 데이터를 가져온다.<br>2. 로그인 한 사용자의 책, 영화, 공연 기록 데이터를 가져 옴.<br>3. 데이터를 바탕으로 그래프가 그려짐.|
|Api|[ 공통 ]<br>1. API에서 받아온 데이터를 폼 양식과 DB에 필요한 object 타입으로 가공.<br> [ 개별 ]<br>1. Movie API (Naver Open API)<br>2. Book API (Aladin API)<br>3. Performance API (KOPIS 공연예술통합전산망 API)|
|mongoDB|1. users <br>  a. 회원가입 시 아이디, 비밀번호, permission, token의 항목을 가진 스키마 생성<br>  b. 회원가입 시 비밀번호는 암호화하여 저장.(Bcrypt 이용)<br>  c. 로그인 시 입력된 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 비교<br>  d. 로그인 시 jsonwebtoken을 이용해 토큰 생성(JWT 이용)<br>  e. 로그아웃 시 토큰은 빈값으로 만들어 주어 쿠키는 자동으로 없어지도록 구현<br>2. chatting<br>  a. chatroom: 각 유저의 채팅방에 대한 정보 및 userSocketID, userID가 기록된다. <br>*  로그인을 하지 않은 사용자의 경우 임의 값이 설정된다. <br>*  24시간 이후 자동 삭제가 되지만, 사용자가 연결을 종료해도 삭제된다. <br>*  관리자가 수동으로 방을 나가는 경우에도 삭제가 된다. <br> b. chats: 사용자들의 메시지 기록이 저장되는 곳이며, 이 때 저장되는 정보는 사용자 정보, 메시지 정보, 방 정보가 저장된다. <br>*  24시간 이후 자동 삭제가 되지만, 사용자가 연결을 종료해도 삭제된다.<br>3. Board<br>  a.  book, movie, performance의 스키마 형성<br>  b.  데이터 객체 안에는 유저 email, 날짜, 폼 정보 등이 들어있다.|
|Chatting|[ 공통 ]<br>1. 챗봇 아이콘을 누르면 채팅창이 열린다. <br>2. 새로운 메시지가 올 경우 챗봇 아이콘에 빨간색 알림이 나온다. <br>[ 관리자 전용 ]<br>1. 채팅방 리스트가 있다.<br>2. 채팅방 리스트 데이터 : 새로고침 시 DB에서 받아오기 or 사용자가 메시지를 입력하면 자동 생성 (단, 관리자가 접속해 있는 경우에만)<br>3. 채팅방 나가기 기능이 있다.<br>4. 새로운 메시지가 올 경우 각 방 별로 데이터가 갱신된다.<br>5. 각 방에 대한 마지막 메시지와 메시지 전송한 사람의 ID 또는 닉네임을 볼 수 있다.<br>6. 각 방에 새로운 메시지가 오면 시간에 따라 최상단으로 이동한다.<br>7. 각 방에 새로운 메시지가 오면 읽지 않은 메시지 숫자와 알림이 표시된다.|

<h3> 3. 프로젝트 기간 (Project Work) </h3>
Date: 2022-12-13 ~ 2022-12-29<br />
Team members: 4 people<br />
Source Code Github Link: https://github.com/KimParkSam/1st_Project

<h3> 프로젝트 팀원 </h3>

|박현목(FE)|박효현(FE, BE)|박아름(FE, BE)|김미정(FE, BE)| 
|:---:|:---:|:---:|:---:|
|<img src="https://avatars.githubusercontent.com/u/116782334?v=4" width="100">|<img src="https://avatars.githubusercontent.com/u/116782344?v=4" width="100" >|<img src="https://avatars.githubusercontent.com/u/116782319?v=4" width="100" >|<img src="https://avatars.githubusercontent.com/u/116782390?v=4" width="100">| 
|<a href="https://github.com/mcthemox"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a> |<a href="https://github.com/doch2130"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>|<a href="https://github.com/AHRUMPARK"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>|<a href="https://github.com/mijeongkim3"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>| 

<h3> 4. 프로젝트 개선 기간 (Project Additional Work) </h3>
Date: 2022-12-30 ~ 2023-01-20<br />
Members: 1 people<br />
Source Code Github Link: https://github.com/doch2130/1st_Project_SeSAC_KSP

<h3> 프로젝트 팀원 </h3>
|박효현(FE, BE)|
|:---:|
|<img src="https://avatars.githubusercontent.com/u/116782344?v=4" width="100" >| 
|<a href="https://github.com/doch2130"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>| 

<h3> 5. 배포 사이트 </h3>
<a href="http://101.101.210.118:8080/>"><b>KSP</b></a>


<h3> 6. 기술 스택 </h3>
<h3> Front-end </h3>
<div>
<img src="https://img.shields.io/badge/-react-blue"/>

<img src="https://img.shields.io/badge/-react--redux-blue"/>

<img src="https://img.shields.io/badge/-socket.io-brightgreen"/>

</div>

<h3>  Back-end </h3>

<div>

<img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/>

<img src="https://img.shields.io/badge/-mongoDB-brightgreen"/>
  
<img src="https://img.shields.io/badge/-jwt%20Token-blueviolet"/>
  
<img src="https://img.shields.io/badge/-bcrypt-orange"/>

</div>


<h3> 5. 프로젝트 폴더 구조 </h3>

## Project Tree   
📦1st_Project_SeSAC_KSP   
 ┣ 📂config   
 ┃ ┗ 📜config.json   
 ┣ 📂controller   
 ┃ ┣ 📂crawlingFunction   
 ┃ ┃ ┣ 📜puppeteer_Genie.js   
 ┃ ┃ ┣ 📜puppeteer_Melon.js   
 ┃ ┃ ┗ 📜puppeteer_Youtube.js   
 ┃ ┣ 📂musicFileFunction   
 ┃ ┃ ┣ 📜allChartFileFunction.js   
 ┃ ┃ ┣ 📜genieFileFunction.js   
 ┃ ┃ ┣ 📜melonFileFunction.js   
 ┃ ┃ ┗ 📜youtubeFileFunction.js   
 ┃ ┣ 📜Cboard.js   
 ┃ ┣ 📜Cchart.js   
 ┃ ┣ 📜Ccrawling.js   
 ┃ ┣ 📜Cgraph.js   
 ┃ ┣ 📜ClikeSing.js   
 ┃ ┣ 📜Cmain.js   
 ┃ ┣ 📜Cmanager.js   
 ┃ ┗ 📜Cuser.js   
 ┣ 📂model   
 ┃ ┣ 📜Board.js   
 ┃ ┣ 📜BoardComment.js   
 ┃ ┣ 📜BoardNestedComment.js   
 ┃ ┣ 📜index.js   
 ┃ ┣ 📜LikeSing.js   
 ┃ ┗ 📜User.js   
 ┣ 📂routes   
 ┃ ┗ 📜index.js   
 ┣ 📂static   
 ┃ ┣ 📂css   
 ┃ ┃ ┣ 📜allChartPage.css   
 ┃ ┃ ┣ 📜audio.css   
 ┃ ┃ ┣ 📜base.css   
 ┃ ┃ ┣ 📜basicBoard.css   
 ┃ ┃ ┣ 📜bootstrap.css   
 ┃ ┃ ┣ 📜Edit_info.css   
 ┃ ┃ ┣ 📜font.css   
 ┃ ┃ ┣ 📜genieMovieChart.css   
 ┃ ┃ ┣ 📜genieRealChart.css   
 ┃ ┃ ┣ 📜index.css   
 ┃ ┃ ┣ 📜jquery.fullpage.css   
 ┃ ┃ ┣ 📜login.css   
 ┃ ┃ ┣ 📜manager.css   
 ┃ ┃ ┣ 📜melonDayChart.css   
 ┃ ┃ ┣ 📜melonRealChart.css   
 ┃ ┃ ┣ 📜mypage.css   
 ┃ ┃ ┣ 📜readBoard.css   
 ┃ ┃ ┣ 📜signup.css   
 ┃ ┃ ┣ 📜updateBoard.css   
 ┃ ┃ ┣ 📜writeBoard.css   
 ┃ ┃ ┣ 📜youtbeRealChart.css   
 ┃ ┃ ┗ 📜youtubeMovieChart.css   
 ┃ ┣ 📂js   
 ┃ ┃ ┣ 📜allChartPage.js   
 ┃ ┃ ┣ 📜base.js   
 ┃ ┃ ┣ 📜basicBoard.js   
 ┃ ┃ ┣ 📜Edit_info.js   
 ┃ ┃ ┣ 📜genieMovieChart.js   
 ┃ ┃ ┣ 📜genieRealChart.js   
 ┃ ┃ ┣ 📜index.js   
 ┃ ┃ ┣ 📜jquery.fullpage.js   
 ┃ ┃ ┣ 📜login.js   
 ┃ ┃ ┣ 📜manager.js   
 ┃ ┃ ┣ 📜melonDayChart.js   
 ┃ ┃ ┣ 📜melonRealChart.js   
 ┃ ┃ ┣ 📜mypage.js   
 ┃ ┃ ┣ 📜readBoard.js   
 ┃ ┃ ┣ 📜signup.js   
 ┃ ┃ ┣ 📜writeBoard.js   
 ┃ ┃ ┣ 📜youtbeRealChart.js   
 ┃ ┃ ┗ 📜youtubeMovieChart.js   
 ┃ ┗ 📂res   
 ┃ ┃ ┣ 📂audio   
 ┃ ┃ ┃ ┣ 📜afterlike.mp3   
 ┃ ┃ ┣ 📂board   
 ┃ ┃ ┃ ┣ 📜bg_img.jpg   
 ┃ ┃ ┣ 📂chart_data   
 ┃ ┃ ┃ ┣ 📂Genie   
 ┃ ┃ ┃ ┃ ┗ 📜genieChartHour-2023-01-20-15.json   
 ┃ ┃ ┃ ┣ 📂GenieMovie   
 ┃ ┃ ┃ ┃ ┗ 📜genieChartMovie-2023-01-20-15.json   
 ┃ ┃ ┃ ┣ 📂Graph   
 ┃ ┃ ┃ ┃ ┗ 📜comparative_data.json   
 ┃ ┃ ┃ ┣ 📂Melon   
 ┃ ┃ ┃ ┃ ┗ 📜melonChartHour-2023-01-20-15.json   
 ┃ ┃ ┃ ┣ 📂MelonDay   
 ┃ ┃ ┃ ┃ ┗ 📜melonChartDay-2023-01-20-15.json   
 ┃ ┃ ┃ ┣ 📂Youtube   
 ┃ ┃ ┃ ┃ ┗ 📜youtubeChartHour-2023-01-20-15.json   
 ┃ ┃ ┃ ┗ 📂YoutubeMovie   
 ┃ ┃ ┃ ┃ ┗ 📜youtubeChartMovie-2023-01-20-15.json   
 ┃ ┃ ┣ 📂chart_image   
 ┃ ┃ ┃ ┣ 📂Genie   
 ┃ ┃ ┃ ┃ ┗ 📜18-99.jpg   
 ┃ ┃ ┃ ┣ 📂GenieMovie   
 ┃ ┃ ┃ ┃ ┗ 📜18-99.jpg   
 ┃ ┃ ┃ ┣ 📂Melon   
 ┃ ┃ ┃ ┃ ┗ 📜18-99.jpg   
 ┃ ┃ ┃ ┣ 📂MelonDay   
 ┃ ┃ ┃ ┃ ┗ 📜18-99.jpg   
 ┃ ┃ ┃ ┣ 📂Youtube   
 ┃ ┃ ┃ ┃ ┗ 📜18-99.jpg   
 ┃ ┃ ┃ ┗ 📂YoutubeMovie   
 ┃ ┃ ┃ ┃ ┗ 📜18-99.jpg   
 ┃ ┃ ┣ 📂image   
 ┃ ┃ ┃ ┣ 📜bg_blend.png   
 ┃ ┃ ┃ ┣ 📜bg_img.jpg   
 ┃ ┃ ┃ ┣ 📜bg_overay.png   
 ┃ ┃ ┃ ┣ 📜d_img.png   
 ┃ ┃ ┃ ┣ 📜empty_heart.png   
 ┃ ┃ ┃ ┣ 📜empty_list.jpg   
 ┃ ┃ ┃ ┣ 📜empty_list.png   
 ┃ ┃ ┃ ┣ 📜full_heart.png   
 ┃ ┃ ┃ ┣ 📜genie.png   
 ┃ ┃ ┃ ┣ 📜logo_genie.png   
 ┃ ┃ ┃ ┣ 📜logo_melon.png   
 ┃ ┃ ┃ ┣ 📜logo_youtube.png   
 ┃ ┃ ┃ ┣ 📜melon.png   
 ┃ ┃ ┃ ┣ 📜mypage_bg.png   
 ┃ ┃ ┃ ┣ 📜mypage_bg1.png   
 ┃ ┃ ┃ ┣ 📜mypage_bg3.png   
 ┃ ┃ ┃ ┣ 📜user_12334444.png   
 ┃ ┃ ┃ ┗ 📜youtube.png   
 ┃ ┃ ┣ 📂profile_img   
 ┃ ┃ ┃ ┣ 📜d_img.png   
 ┃ ┃ ┃ ┣ 📜test1.png   
 ┃ ┃ ┃ ┣ 📜test2.jpg   
 ┃ ┃ ┃ ┗ 📜test2.png   
 ┃ ┃ ┗ 📂video   
 ┃ ┃ ┃ ┣ 📜afterLike.mp4   
 ┃ ┃ ┃ ┣ 📜antifragile.mp4   
 ┃ ┃ ┃ ┣ 📜attention.mp4   
 ┃ ┃ ┃ ┣ 📜ditto.mp4   
 ┃ ┃ ┃ ┣ 📜nxde.mp4   
 ┃ ┃ ┃ ┣ 📜shutDown.mp4   
 ┃ ┃ ┃ ┗ 📜stayThisWay.mp4   
 ┣ 📂views   
 ┃ ┣ 📂common   
 ┃ ┃ ┣ 📜Head_CDN.ejs   
 ┃ ┃ ┣ 📜Head_CDN_Mini.ejs   
 ┃ ┃ ┣ 📜sideNavbar.ejs   
 ┃ ┃ ┣ 📜topLoginBtn.ejs   
 ┃ ┃ ┗ 📜topNavbar.ejs   
 ┃ ┣ 📂data_conversion   
 ┃ ┃ ┣ 📜allChart_Graph_Data.ejs   
 ┃ ┃ ┣ 📜basicBoard_Data.ejs   
 ┃ ┃ ┣ 📜genieChart_Data.ejs   
 ┃ ┃ ┣ 📜genieMovieChart_Data.ejs   
 ┃ ┃ ┣ 📜indexChart_Data.ejs   
 ┃ ┃ ┣ 📜LikeSing_Data_Function.ejs   
 ┃ ┃ ┣ 📜melonChart_Data.ejs   
 ┃ ┃ ┣ 📜melonDayChart_Data.ejs   
 ┃ ┃ ┣ 📜youtubeChart_Data.ejs   
 ┃ ┃ ┗ 📜youtubeMovieChart_Data.ejs   
 ┃ ┣ 📂error   
 ┃ ┃ ┣ 📜404.ejs   
 ┃ ┃ ┗ 📜500.ejs   
 ┃ ┣ 📜allChart.ejs   
 ┃ ┣ 📜basicBoard.ejs   
 ┃ ┣ 📜Edit_info.ejs   
 ┃ ┣ 📜genieMovieChart.ejs   
 ┃ ┣ 📜genieRealChart.ejs   
 ┃ ┣ 📜index.ejs   
 ┃ ┣ 📜login.ejs   
 ┃ ┣ 📜manager.ejs   
 ┃ ┣ 📜melonDayChart.ejs   
 ┃ ┣ 📜melonRealChart.ejs   
 ┃ ┣ 📜mypage.ejs   
 ┃ ┣ 📜readBoard.ejs   
 ┃ ┣ 📜signup.ejs   
 ┃ ┣ 📜updateBoard.ejs   
 ┃ ┣ 📜writeBoard.ejs   
 ┃ ┣ 📜youtubeMovieChart.ejs   
 ┃ ┗ 📜youtubeRealChart.ejs   
 ┣ 📜.gitignore   
 ┣ 📜index.js   
 ┗ 📜package.json   
