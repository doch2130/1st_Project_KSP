const melonCrawling = require('./crawlingFunction/puppeteer_Melon');
const genieCrawling = require('./crawlingFunction/puppeteer_Genie');
const youtubeCrawling = require('./crawlingFunction/puppeteer_Youtube');
const schedule = require('node-schedule');

// 크롤링 자동 실행
exports.crawling_schedule = () => {
    // 매 시간의 1분 마다 실행
    // ex) 1시 1분, 2시 1분
    schedule.scheduleJob('1 * * * *', () => {
        console.log(new Date() + ' scheduler running!');
        console.log('멜론 실시간 크롤링');
        melonCrawling.melonCrawlingFunction((result) => {
            if(result === true) {
                // res.send(true);
                console.log('멜론 실시간 크롤링 Success');
            } else {
                // res.send(false);
                console.log('멜론 실시간 크롤링 False');
            }
        });
    });

    // ex) 1시 1분 30초, 2시 1분 30초
    schedule.scheduleJob('30 1 * * * *', () => {
        console.log(new Date() + ' scheduler running!');
        console.log('유튜브 실시간 크롤링');
        youtubeCrawling.youtubeCrawlingFunction((result) => {
            if(result === true) {
                // res.send(true);
                console.log('유튜브 실시간 크롤링 Success');
            } else {
                // res.send(false);
                console.log('유튜브 실시간 크롤링 False');
            }
        });
    });

    // ex) 1시 2분, 2시 2분
    schedule.scheduleJob('2 * * * *', () => {
        console.log(new Date() + ' scheduler running!');
        console.log('지니 실시간 크롤링');
        genieCrawling.genieCrawlingFunction((result) => {
            if(result === true) {
                // res.send(true);
                console.log('지니 실시간 크롤링 Success');
            } else {
                // res.send(false);
                console.log('지니 실시간 크롤링 False');
            }
        });
    });

    // ex) 00시 3분 15초 마다 실행
    schedule.scheduleJob('15 3 0 * * *', () => {
        console.log(new Date() + ' scheduler running!');
        console.log('멜론 일간 크롤링');
        melonCrawling.melonDayCrawlingFunction((result) => {
            if(result === true) {
                // res.send(true);
                console.log('멜론 일간 크롤링 Success');
            } else {
                // res.send(false);
                console.log('멜론 일간 크롤링 False');
            }
        });
    });

    // ex) 매시 4분 마다 실행
    schedule.scheduleJob('0 4 * * * *', () => {
        console.log(new Date() + ' scheduler running!');
        console.log('유튜브 뮤직비디오 크롤링');
        youtubeCrawling.youtubeMovieCrawlingFunction((result) => {
            if(result === true) {
                // res.send(true);
                console.log('유튜브 뮤직비디오 크롤링 Success');
            } else {
                // res.send(false);
                console.log('유튜브 뮤직비디오 크롤링 False');
            }
        });
    });

    // ex) 매시 5분 마다 실행
    schedule.scheduleJob('0 5 * * * *', () => {
        console.log(new Date() + ' scheduler running!');
        console.log('지니 뮤직비디오 크롤링');
        genieCrawling.genieMovieCrawlingFunction((result) => {
            if(result === true) {
                // res.send(true);
                console.log('지니 뮤직비디오 크롤링 Success');
            } else {
                // res.send(false);
                console.log('지니 뮤직비디오 크롤링 False');
            }
        });
    });
}


// 멜론 크롤링 - top 100
exports.melonCrawlingPage = (req, res) => {
    melonCrawling.melonCrawlingFunction((result) => {
        if(result === true) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}

// 멜론 크롤링 - 일간
exports.melonDayCrawlingPage = (req, res) => {
    melonCrawling.melonDayCrawlingFunction((result) => {
        if(result === true) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}

// 지니 크롤링 - top 100
exports.genieCrawlingPage = (req, res) => {
    genieCrawling.genieCrawlingFunction((result) => {
        if(result === true) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}

// 지니 크롤링 - 뮤직비디오
exports.genieMovieCrawlingPage = (req, res) => {
    genieCrawling.genieMovieCrawlingFunction((result) => {
        if(result === true) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}




// 유튜브 크롤링 - top 100
exports.youtubeCrawlingPage = (req, res) => {
    youtubeCrawling.youtubeCrawlingFunction((result) => {
        if(result === true) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}


// 유튜브 크롤링 - 뮤직비디오
exports.youtubeMovieCrawlingPage = (req, res) => {
    youtubeCrawling.youtubeMovieCrawlingFunction((result) => {
        if(result === true) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
}