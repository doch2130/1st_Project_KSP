<h1> KSP (1st_Project_SeSAC_KSP) </h1>

<h1> 프로젝트 소개 (Project Described) </h1>
<h3> 1. 기획 의도 </h3>
이 프로젝트의 주제는 다른 모든 음원차트 사이트를 한곳에서 확인하고 서로 방명록처럼 소통할 수 있는 사이트를 만드는 것입니다.
<br />
The theme of this project is to create a site where you can check all the other music chart sites in one place and communicate with each other like a guestbook.

<h3> 2. 주요 기능 </h3>

|기능| 설명|
|:---|:---|
|Header|1. 로그인, 로그아웃, 회원정보 수정, 마이 페이지 이동 기능.|
|Main Page|1. 음악 실시간 Top 10.<br>2. 배경화면 랜덤 뮤직비디오 재생.|
|My Page|1. 프로필 사진 변경 기능.<br>2. 나의 음악 좋아요 리스트.<br>3. 내가 작성한 게시글.|
|All Chart Page|1. 오늘 날짜에 대한 음악 순위 제공.<br>2. 3개 사이트에 대한 네이버 검색량 비교 그래프.|
|Chart Page|1. 오늘 날짜에 대한 음악 순위 제공.<br>2. 시간에 따른 음악 순위 제공.<br>3. 페이지에 따른 보기 개수 변경 기능.<br>나의 음악 좋아요 체크 기능.|
|Board Page|1. 회원간의 자유게시판.<br>2. 게시판 글 작성 기능, 음악 및 사진 파일 업로드 기능.<br>3. 게시판 댓글, 대댓글 기능.<br>4. 본인 게시판 수정, 삭제 기능.|
|Manager Page|1. 관리자에 한해 수동 크롤링 기능 실행.|
|Crawling Function|1. 크롤링 실행 시 페이지에 따라서 Cheerio 또는 Puppeteer 기능 실행.<br>2. 앨범 이미지 서버에 저장 작업.<br>3. 데이터 수집 후 필요한 데이터에 맞춰서 데이터 가공 작업.<br>4. 가공한 데이터를 JSON 형식으로 서버에 저장.|

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
<a href="http://101.101.210.118:8080/>"><img src="static/res/image/KSPLogo.png" style="width: 200px; border: 1px solid black; border-radius: 10px;" /></a>


<h3> 6. 기술 스택 </h3>
<h3> Front-end </h3>
<div>
<img src="https://img.shields.io/badge/-JavaScript-yellow"/>
<img src="https://img.shields.io/badge/-jQuery-blue"/>
<img src="https://img.shields.io/badge/-Chart.js-pink"/>
<img src="https://img.shields.io/badge/-Bootstrap v5-purple"/>
<img src="https://img.shields.io/badge/-AOS-lightblue"/>
</div>

<h3> Back-end </h3>

<div>
<img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/-MySQL-blue"/>
<img src="https://img.shields.io/badge/-Sequelize-blue"/>
<img src="https://img.shields.io/badge/-Cheerio-orange"/>
<img src="https://img.shields.io/badge/-Puppeteer-darkgreen"/>
<img src="https://img.shields.io/badge/-Naver Cloud Server-brightGreen"/>
</div>


<h3> 7. 프로젝트 폴더 구조 </h3>

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
