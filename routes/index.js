const express = require("express");
const controllerMain = require("../controller/Cmain");
const controllerUser = require("../controller/Cuser");
const controllerChart = require("../controller/Cchart");
const controllerLikeSing = require("../controller/ClikeSing");
const controllerBoard = require("../controller/Cboard");
const controllerCrawling = require("../controller/Ccrawling");
const controllerManager = require("../controller/Cmanager");
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 메인 페이지 및 세션 체크
router.get("/", controllerMain.main);

// 로그인 and 회원가입 페이지
router.get("/login", controllerUser.login_main);
router.post("/signin", controllerUser.user_login);
router.get('/signup', controllerUser.register);
router.post('/signup', controllerUser.post_signup);
// 로그아웃
router.delete('/logout', controllerUser.user_logout);
// 회원가입 중복 검사
router.post('/check_id', controllerUser.check_id);
router.post('/check_name', controllerUser.check_name);
router.post('/check_mail', controllerUser.check_mail);
// 개인정보 수정
router.get('/Edit_info', controllerUser.Edit_info);
router.patch('/Edit_info_update', controllerUser.Edit_info_update);
// 회원 탈퇴
router.delete('/user_delete', controllerUser.user_delete);
// 마이 페이지
router.get('/mypage', controllerUser.mypage);

// 마이 페이지 업로드 설정
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/res/profile_img/');
    },
    filename: function (req, file, cb) {
      // multer 한글 깨짐 방지
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const ext = path.extname(file.originalname);
      cb(null, req.session.user + ext);
    }
  })
});

// 게시판 파일 업로드 설정
const upload_board = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/res/board/');
    },
    filename: function (req, file, cb) {
      // multer 한글 깨짐 방지
      // console.log(Buffer.from(file.originalname, 'latin1').toString('utf8'));
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
      const ext = path.extname(file.originalname);  //ext확장자명을 오리지널 파일이름으로 올라오도록 바굼!
      cb(null, file.originalname);
      // if(ext !== '.mp3' ) cb(new Error('PNG, JPG만 업로드하세요')) //확장자ext가 mp3가 아니면 png,jpg만 업로드하세요 라고 띄우고
    //  else cb(null, file.originalname); //그게 아니면~~ 확장자가 mp3인 경우 파일의 원래이름을 띄운다!
    }
  })
});

// 마이 페이지 파일 업로드
router.post('/upload_file', upload.single('img'), controllerUser.upload_file);

// 마이 페이지 좋아요 삭제
router.post("/mypage/likeSingDelete", controllerLikeSing.Mypage_LikeSingDelete);

// 게시판 페이지
router.get("/board", controllerBoard.index);
router.get("/board/write", controllerBoard.write);
router.post("/board/write", upload_board.single('boardfile'), controllerBoard.write_data);
router.get("/board/read", controllerBoard.read);

router.get("/board/update", controllerBoard.update_number);
//첨에 /update?number=<%=data.number%>넣어서 안됐었는데 ?뒤에있는건 쿼리스트링이라서.....컨트롤러에서 쿼리로 받아야됨.
//이건 리드보드에서 업데이트보드로 url number쿼리 넘겨주는 라우터임!
router.patch("/board/update", upload_board.single('boardfile'), controllerBoard.update);
router.delete("/board/delete", controllerBoard.delete);


// 차트 모아보기 페이지
// router.get("/allChart", controllerChart.allChart);
router.get("/allChart", controllerChart.allChart);
// 유튜브 차트 페이지
// 유튜브 - top 100
router.get("/youtubeRealChart", controllerChart.youtubeRealChartMain);
router.get("/youtubeRealChart/:num", controllerChart.youtubeRealChartMainType);
// 유튜브 - 뮤직비디오
router.get("/youtubeMovieChart", controllerChart.youtubeMovieChart);
router.get("/youtubeMovieChart/:num", controllerChart.youtubeMovieChartType);

// 멜론 차트 페이지
// 멜론 - top 100
router.get("/melonRealChart", controllerChart.melonRealChartMain);
router.get("/melonRealChart/:num", controllerChart.melonRealChartMainType);
// 멜론 - 일간
router.get("/melonDayChart", controllerChart.melonDayChartMain);
// router.get("/melonDayChart/:num", controllerChart.melonDayChartMainType);

// 지니 차트 페이지
// 지니 - top 100
router.get("/genieRealChart", controllerChart.genieRealChartMain);
router.get("/genieRealChart/:num", controllerChart.genieRealChartMainType);
// 지니 - 뮤직비디오
router.get("/genieMovieChart", controllerChart.genieMovieChartMain);
router.get("/genieMovieChart/:num", controllerChart.genieMovieChartMainType);

// 차트 페이지 - 좋아요 기능 (모든 차트보기 제외)
router.post("/Chart/likeSingRegister", controllerLikeSing.LikeSingRegister);
router.post("/Chart/likeSingDelete", controllerLikeSing.LikeSingDelete);
router.post("/Chart/likeSing_ReSearch", controllerLikeSing.LikeSing_ReSearch);


// 관리자 페이지 - 크롤링 수동 요청
router.get("/manager", controllerManager.manager);
router.post("/manager/login", controllerManager.manager_login);
// 크롤링 요청 페이지
router.post("/crawling/melon", controllerCrawling.melonCrawlingPage);
router.post("/crawling/melonday", controllerCrawling.melonDayCrawlingPage);
router.post("/crawling/genie", controllerCrawling.genieCrawlingPage);
router.post("/crawling/geniemovie", controllerCrawling.genieMovieCrawlingPage);
router.post("/crawling/youtube", controllerCrawling.youtubeCrawlingPage);
router.post("/crawling/youtubemovie", controllerCrawling.youtubeMovieCrawlingPage);

module.exports = router;
