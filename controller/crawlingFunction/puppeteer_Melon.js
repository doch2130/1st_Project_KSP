// puppeteer 사용해야 멜론의 좋아요 건수 가져오기 가능
// 푸피터 + 체리오
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const fetch = require('node-fetch');

// 실시간 크롤링
exports.melonCrawlingFunction = (cb) => {
    const url = "https://www.melon.com/chart/index.htm";

    // 크롤링 + 파일 저장 함수 시작
    (async() => {
        try {
        // json 데이터 저장 변수
        let data = {};
        data.data = [];
        let lists = '';

        // 날짜 객체 설정
        let date = new Date();
        // 이미지 파일 저장 변수
        let fileFormat;

        // 50개 먼저 긁어온 후 나머지 50개를 긁어온다.
        // 1~50, 51~100 클래스명이 다르다.
        for (let i = 1; i < 3; i++) {
            // 브라우저를 실행한다.
            // 옵션으로 headless모드를 끌 수 있다.
            const browser = await puppeteer.launch({
                headless: false
            });

            // 새로운 페이지를 연다.
            const page = await browser.newPage();
            // 페이지의 크기를 설정한다.
            await page.setViewport({
                width: 1920,
                height: 1080
            });
            // "https://charts.youtube.com/charts/TopSongs/kr?hl=ko" URL에 접속하여 페이지의 HTML을 가져온다.
            await page.goto(url);
            // 해당 셀렉터가 출력될 때까지 기다려준다.        
            await page.waitForSelector('table > tbody > tr.lst100');
            // $에 cheerio를 로드한다.
            const content = await page.content();
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            const $ = cheerio.load(content);

            if(i == 1) {
                // 가져오는 데이터의 list 부분을 설정한다.
                lists = $("table > tbody > tr.lst50");
            } else {
                lists = $("table > tbody > tr.lst100");
            }
            console.log(lists.length);

            // 모든 리스트를 순환한다. await 함수를 이용해서 종료가 끝나야 다음 함수가 실행되게 설정한다.
            // await를 설정하지 않으면 데이터가 저장되기 전에 파일 저장함수가 먼저 실행되서 빈 값이 들어간다.
            await lists.each(async (index, list) => {
                // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
                const rank = $(list).find("td:nth-child(2) > div > span.rank").text();
                let rankVariance = $(list).find("td:nth-child(3) > div > span").attr('title');
                const albumImgSrc = $(list).find("td:nth-child(4) > div > a > img").attr('src');
                let title = $(list).find("td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a").text();
                let singer = $(list).find("td:nth-child(6) > div > div > div.ellipsis.rank02 > a").text();
                const albumTitle = $(list).find("td:nth-child(7) > div > div > div > a").text();
                // 좋아요 수를 불러오는데 앞에 불필요한 텍스트를 자르고 숫자만 가져온다.  \n총 건수\n123,451 => slic함수로 123,451만 가져온다.
                const likeCount = $(list).find("td:nth-child(8) > div > button > span.cnt").text().slice(5);

                // 인덱스와 함께 로그를 찍는다.
                // console.log({
                //    index, title, rank, rankVariance, albumImg, title, singer, albumTitle, likeCount
                // });

                // 랭크 변동에 대한 텍스트를 간단한 표시로 변경
                if(rankVariance.includes("순위 동일") === true) {
                    rankVariance = '=';
                } else if(rankVariance.includes("상승") === true) {
                    rankVariance = rankVariance.replace("단계 상승", " UP");
                } else if(rankVariance.includes("하락") === true) {
                    rankVariance = rankVariance.replace("단계 하락", " DN");
                } else if(rankVariance.includes("순위 진입") === true) {
                    rankVariance = rankVariance.replace("순위 진입", "NEW");
                }

                // ' 기호나 & 기호가 있으면 좋아요 함수가 제대로 안먹는 현상 발견
                // replace로 ' 는 삭제하고 &는 and 텍스트로 변경
                title = title.replaceAll("'", "");
                title = title.replaceAll("&", "and");
                singer = singer.replaceAll("'", "");
                singer = singer.replaceAll("&", "and");


                // 이미지 파일 이름 설정
                // // JSON 파일에 같이 저장하기 위해 push 상단에서 설정
                if(i == 1) {
                    fileFormat = ('00' + date.getHours()).slice(-2) + '-' + ('00'+index).slice(-2) + '.jpg';
                } else {
                    fileFormat = ('00' + date.getHours()).slice(-2) + '-' + ('00'+(index+50)).slice(-2) + '.jpg';
                }

                // 데이터 저장 변수 설정 및 데이터 저장
                let obj = {
                    title: title,
                    rank: rank,
                    rankVariance: rankVariance,
                    albumImgSrc: albumImgSrc,
                    albumImgFile: fileFormat,
                    singer: singer,
                    albumTitle: albumTitle,
                    likeCount: likeCount
                }
                // json 데이터에 저장한 데이터 1개씩 저장
                data.data.push(obj);
            });
            // 브라우저를 종료한다.
            browser.close();
        }

        // 파일 저장
        // 파일 이름 설정 melonChartHour-년-월-일-시간
        let formatDate = 'melonChartHour' + '-' + date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2) + '-' + ('00' + date.getHours()).slice(-2);

        // 파일 경로 및 이름, 확장자 설정
        let fileName = './static/res/chart_data/Melon/'+formatDate+'.json';

        // 파일 작성    stringify 함수로 data 작성시 탭 넣어서 보기 편하게 변경
        await fs.writeFile(fileName, JSON.stringify(data, null, '\t'))
        .then(() => {
            console.log('Melon Fs Write Success');
            // cb(true);
        })
        .catch((err) => {
            throw err;
        });

        const check = await melonCrawling_ImgFileSave(fileName);
        // console.log(check);
        cb(true);
    } catch (err) {
        console.log('crawling err', err);
    }
        
    })();
}


// 일간 크롤링 - 하루 1번 실행
exports.melonDayCrawlingFunction = (cb) => {
    const url = "https://www.melon.com/chart/day/index.htm";
    
    // 크롤링 + 파일 저장 함수 시작
    (async() => {
        try {
        // json 데이터 저장 변수
        let data = {};
        data.data = [];
        let lists = '';

        // 날짜 객체 설정
        let date = new Date();
        // 이미지 파일 저장 변수
        let fileFormat;

        // 50개 먼저 긁어온 후 나머지 50개를 긁어온다.
        // 1~50, 51~100 클래스명이 다르다.
        for (let i = 1; i < 3; i++) {
            // 브라우저를 실행한다.
            // 옵션으로 headless모드를 끌 수 있다.
            const browser = await puppeteer.launch({
                headless: false
            });

            // 새로운 페이지를 연다.
            const page = await browser.newPage();
            // 페이지의 크기를 설정한다.
            await page.setViewport({
                width: 1920,
                height: 1080
            });
            // "https://charts.youtube.com/charts/TopSongs/kr?hl=ko" URL에 접속하여 페이지의 HTML을 가져온다.
            await page.goto(url);
            // 해당 셀렉터가 출력될 때까지 기다려준다.        
            await page.waitForSelector('table > tbody > tr.lst100');
            // $에 cheerio를 로드한다.
            const content = await page.content();
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            const $ = cheerio.load(content);

            if(i == 1) {
                // 가져오는 데이터의 list 부분을 설정한다.
                lists = $("table > tbody > tr.lst50");
            } else {
                lists = $("table > tbody > tr.lst100");
            }
            console.log(lists.length);

            // 모든 리스트를 순환한다. await 함수를 이용해서 종료가 끝나야 다음 함수가 실행되게 설정한다.
            // await를 설정하지 않으면 데이터가 저장되기 전에 파일 저장함수가 먼저 실행되서 빈 값이 들어간다.
            await lists.each(async (index, list) => {
                // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
                const rank = $(list).find("td:nth-child(2) > div > span.rank").text();
                let rankVariance = $(list).find("td:nth-child(3) > div > span").attr('title');
                const albumImgSrc = $(list).find("td:nth-child(4) > div > a > img").attr('src');
                let title = $(list).find("td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a").text();
                let singer = $(list).find("td:nth-child(6) > div > div > div.ellipsis.rank02 > a").text();
                const albumTitle = $(list).find("td:nth-child(7) > div > div > div > a").text();
                // 좋아요 수를 불러오는데 앞에 불필요한 텍스트를 자르고 숫자만 가져온다.  \n총 건수\n123,451 => slic함수로 123,451만 가져온다.
                const likeCount = $(list).find("td:nth-child(8) > div > button > span.cnt").text().slice(5);

                // 랭크 변동에 대한 텍스트를 간단한 표시로 변경
                if(rankVariance.includes("순위 동일") === true) {
                    rankVariance = '=';
                } else if(rankVariance.includes("상승") === true) {
                    rankVariance = rankVariance.replace("단계 상승", " UP");
                } else if(rankVariance.includes("하락") === true) {
                    rankVariance = rankVariance.replace("단계 하락", " DN");
                } else if(rankVariance.includes("순위 진입") === true) {
                    rankVariance = rankVariance.replace("순위 진입", "NEW");
                }

                // 인덱스와 함께 로그를 찍는다.
                // console.log({
                //    index, title, rank, rankVariance, albumImg, title, singer, albumTitle, likeCount
                // });

                // ' 기호나 & 기호가 있으면 좋아요 함수가 제대로 안먹는 현상 발견
                // replace로 ' 는 삭제하고 &는 and 텍스트로 변경
                title = title.replaceAll("'", "");
                title = title.replaceAll("&", "and");
                singer = singer.replaceAll("'", "");
                singer = singer.replaceAll("&", "and");

                // 이미지 파일 이름 설정
                // JSON 파일에 같이 저장하기 위해 push 상단에서 설정
                if(i === 1) {
                    fileFormat = ('00' + date.getHours()).slice(-2) + '-' + ('00'+index).slice(-2) + '.jpg';
                } else {
                    fileFormat = ('00' + date.getHours()).slice(-2) + '-' + ('00'+(index+50)).slice(-2) + '.jpg';
                }

                // 데이터 저장 변수 설정 및 데이터 저장
                let obj = {
                    title: title,
                    rank: rank,
                    rankVariance: rankVariance,
                    albumImgSrc: albumImgSrc,
                    albumImgFile: fileFormat,
                    singer: singer,
                    albumTitle: albumTitle,
                    likeCount: likeCount
                }
                // json 데이터에 저장한 데이터 1개씩 저장
                data.data.push(obj);                
            });
            // 브라우저를 종료한다.
            browser.close();
        }

        // 파일 저장
        // 파일 이름 설정 melonChartDay-년-월-일-시간
        let formatDate = 'melonChartDay' + '-' + date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2) + '-' + ('00' + date.getHours()).slice(-2);

        // 파일 경로 및 이름, 확장자 설정
        let fileName = './static/res/chart_data/MelonDay/'+formatDate+'.json';

        // 파일 작성    stringify 함수로 data 작성시 탭 넣어서 보기 편하게 변경
        await fs.writeFile(fileName, JSON.stringify(data, null, '\t'))
        .then(() => {
            console.log('MelonDay Fs Write Success');
            // cb(true);
        })
        .catch((err) => {
            throw err;
        });

        const check = await melonDayCrawling_ImgFileSave(fileName);
        // console.log(check);
        cb(true);
    } catch (err) {
        console.log('crawling err', err);
    }
        
    })();
}



// 실시간 크롤링 - 이미지 파일
melonCrawling_ImgFileSave = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8')
        .then(async (response) => {
            response = JSON.parse(response);

            for await (let el of response.data) {
                const albumImgData = await fetch(el.albumImgSrc);
                const albumImgBuffer = await albumImgData.arrayBuffer();
                const uint8array = new Uint8Array(albumImgBuffer);
                await fs.writeFile(`./static/res/chart_image/Melon/${el.albumImgFile}`, uint8array);
            }
        })
        .then(() => {
            resolve(true);
        })
        .catch((err) => {
            console.log(err);
        });
    });
}

melonDayCrawling_ImgFileSave = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8')
        .then(async (response) => {
            response = JSON.parse(response);

            for await (let el of response.data) {
                const albumImgData = await fetch(el.albumImgSrc);
                const albumImgBuffer = await albumImgData.arrayBuffer();
                const uint8array = new Uint8Array(albumImgBuffer);
                await fs.writeFile(`./static/res/chart_image/MelonDay/${el.albumImgFile}`, uint8array);
            }
        })
        .then(() => {
            resolve(true);
        })
        .catch((err) => {
            console.log(err);
        });
    });
}
