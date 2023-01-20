# 1st_Project_SeSAC_KSP

## Project Described
The theme of this project is to create a site where you can check all the other music chart sites in one place and communicate with each other like a guestbook.

## Project Work
Date: 2022-12-13 ~ 2022-12-29   
Team members: 4 people   
Github Link: https://github.com/KimParkSam/1st_Project   

## Project Additional Work
Date: 2022-12-30 ~ 2023-01-20   
Members: 1 people   

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
