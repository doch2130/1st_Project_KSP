const express = require("express");
const session = require('express-session');
const controllerCrawling = require("./controller/Ccrawling");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname+"/static"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(session({
    // 임의의 문자열을 가지고 세션을 암호화를 하겠다.
    secret: '1234',
    // true 일 경우 모든 요청마다 세션에 변화가 없어도 세션을 다시 저장한다. / 대부분 false로 사용한다.
    resave: false,
    // 초기화되지 않은 세션을 저장할지 선택한다. / 대부분 true로 사용한다.
    saveUninitialized: true,
}));

const router = require("./routes");
app.use('/', router);

app.get('*', (req, res) => {
    // res.send("주소가 존재하지 않습니다. 다시 한 번 확인해주세요.");
    res.status(404).render('error/404');
});

// 에러 미들웨어 테스트 해보기
app.use((err, req, res, next) => {
    console.log('error middleware: ', err);
    res.status(500).render('error/500');
    // res.status(500).send('서버에 일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
});

app.listen(port, () => {
    console.log("server open: ", port);
    // 임시 사용 중지
    // 크롤링 자동 스케줄
    // controllerCrawling.crawling_schedule();
});
