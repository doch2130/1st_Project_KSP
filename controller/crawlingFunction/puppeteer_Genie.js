// Genie는 푸피터 + 체리오를 사용해야 한다.
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const axios = require('axios');
const fetch = require('node-fetch');

// 실시간 크롤링
exports.genieCrawlingFunction = (cb) => {
    // 1페이지 1 ~ 50
    const url = "https://www.genie.co.kr/chart/top200";
    // 2페이지 51 ~ 100
    const url2 = "https://www.genie.co.kr/chart/top200?pg=2";

    // 날짜 객체 설정
    let date = new Date();
    // 이미지 파일 저장 변수
    let fileFormat;

    // 크롤링 + 파일 저장 함수 시작
    (async() => {
        try {
        // json 데이터 저장 변수
        let data = {};
        data.data = [];

        // 1페이지 실행 후 2페이지도 하기 위해 for문으로 2번 실행하게 설정한다.
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

            // 처음에 1 ~ 50 페이지가 저장되어 있는 url 변수를 사용하고, 2번째에는 51 ~ 100 페이지가 저장되어 있는 url2 변수를 사용한다.
            if(i == 1) {
                // "https://www.genie.co.kr/chart/top200" URL에 접속하여 페이지의 HTML을 가져온다.
                await page.goto(url);
            } else {
                await page.goto(url2);
            }

            // 해당 셀렉터가 출력될 때까지 기다려준다.        
            await page.waitForSelector('table.list-wrap > tbody > tr.list');
            // $에 cheerio를 로드한다.
            const content = await page.content();
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            const $ = cheerio.load(content);
            // 가져오는 데이터의 list 부분을 설정한다.
            const lists = $("table.list-wrap > tbody > tr.list");
            console.log(lists.length);

            // 모든 리스트를 순환한다. await 함수를 이용해서 종료가 끝나야 다음 함수가 실행되게 설정한다.
            // await를 설정하지 않으면 데이터가 저장되기 전에 파일 저장함수가 먼저 실행되서 빈 값이 들어간다.
            await lists.each(async (index, list) => {
                // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
                let rank = $(list).find("td.number").text();
                let rankVariance = $(list).find("td.number > span > span > span").text();
                let albumImgSrc = $(list).find("td:nth-child(3) > a > img").attr('src');
                // title의 경우 더미 값이 추가 되지만 rank랑은 조금 다르게 가져와진다. trim 함수로 띄어쓰기를 제거하여 원하는 값만 가져온다.
                let title = $(list).find("td.info > a.title.ellipsis").text().trim();
                let singer = $(list).find("td.info > a.artist.ellipsis").text();
                const albumTitle = $(list).find("td.info > a.albumtitle.ellipsis").text();
                let detailLink = $(list).find("td.link > a").attr('onclick');
                
                // rank 변수에서 데이터를 가져올 시 더미 데이터가 같이 가져와진다.
                // slice로 자르기 위해서 end 위치를 확인하고 그에 맞게 값을 가져오는 설정을 1번 더 작업해준다.
                // rank의 경우에는 start가 0으로 고정이라서 End만 있으면 된다.
                // rank 변수의 데이터 변경이 이루어지기 때문에 const에서 let으로 변경하였다.
                const rankEnd = rank.indexOf('\n');
                rank = rank.slice(0, rankEnd);

                // 이미지 다운로드를 위해 albumImg의 주소 앞에 https:를 붙여서 저장해준다.
                albumImgSrc = "https:" + albumImgSrc;

                // onclick 속성으로 가져올 시 다른 데이터가 같이 가져와진다.
                // slice로 자르기 위해서 start, end 위치를 확인하고 그에 맞게 값을 가져오는 설정을 1번 더 작업해준다.
                // detailLink 변수의 데이터 변경이 이루어지기 때문에 const에서 let으로 변경하였다.
                const linkStart = detailLink.indexOf('fo(') + 4;
                const linkEnd = detailLink.indexOf(');return') - 1;
                detailLink = "https://www.genie.co.kr/detail/songInfo?xgnm=" + detailLink.slice(linkStart, linkEnd);

                // 인덱스와 함께 로그를 찍는다.
                // console.log({
                //     // 2번째 실행 시 index가 다시 0부터 올라와서 콘솔창에서 보면 헷갈릴 수도 있습니다.
                //     index, title, rank, rankVariance, albumImg, title, singer, albumTitle, detailLink
                // });

                // ' 기호나 & 기호가 있으면 좋아요 함수가 제대로 안먹는 현상 발견
                // replace로 ' 는 삭제하고 &는 and 텍스트로 변경
                title = title.replaceAll("'", "");
                title = title.replaceAll("&", "and");
                singer = singer.replaceAll("'", "");
                singer = singer.replaceAll("&", "and");
                rankVariance = rankVariance.replace("new", "NEW");

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
                    detailLink: detailLink,
                }
                // json 데이터에 저장한 데이터 1개씩 저장
                data.data.push(obj);
            });
            // 브라우저를 종료한다.
            browser.close();
        }

        // console.log(data.data);
        console.log("1st Crawling Exit");
        console.log("Wait Please");
        console.log("2nd Start");
        // console.log(data.data[0].detailLink);

        // 1차 크롤링 이후 2차 크롤링 시작(세부 페이지 접속)
        const detailLists = data.data;
        for (i = 0; i < detailLists.length; i++) {
            const detailUrl = detailLists[i].detailLink;
            // console.log({i, url});

            await axios({
                method: 'get',
                url: detailUrl
                // iconv 디코딩을 사용하려면 arraybuffer 타입으로 받아야 한다.
                // responseType: "arraybuffer"
            }).then((response) => {
                // console.log(response.data);

                const $ = cheerio.load(response.data);

                const detailList = $("#body-content > div.song-main-infos > div.aside-zone.daily-chart > div.total");
                const total = $(detailList).find("div:nth-child(2) > p").text();

                // totalNumPlay 값 입력 작업, 키 : 값
                detailLists[i].totalNumPlay = total;
            }).catch(err => {
                console.log(err);
            });
        }

        console.log('2nd crawling Exit');

        // 파일 저장 함수
        // 파일 이름 설정 genieChartHour-년-월-일-시간
        let formatDate = 'genieChartHour' + '-' + date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2) + '-' + ('00' + date.getHours()).slice(-2);

        // 파일 경로 및 이름, 확장자 설정
        let fileName = './static/res/chart_data/Genie/'+formatDate+'.json';

        // 파일 작성    stringify 함수로 data 작성시 탭 넣어서 보기 편하게 변경
        await fs.writeFile(fileName, JSON.stringify(data, null, '\t'))
        .then(() => {
            console.log('Genie Fs Write Success');
            // cb(true);
        })
        .catch((err) => {
            throw err;
        });

        const check = await genieCrawling_ImgFileSave(fileName);
        // console.log(check);
        cb(true);
    } catch (err) {
        console.log('crawling err', err);
    }

    })();
}
    


// 
exports.genieMovieCrawlingFunction = (cb) => {
    // 1페이지 1 ~ 50
    const url = "https://www.genie.co.kr/chart/musicVideo";
    // 2페이지 51 ~ 100
    const url2 = "https://www.genie.co.kr/chart/musicVideo?pg=2";

    // 날짜 객체 설정
    let date = new Date();
    // 이미지 파일 저장 변수
    let fileFormat;

    // 크롤링 + 파일 저장 함수 시작
    (async() => {
        try {
        // json 데이터 저장 변수
        let data = {};
        data.data = [];

        // 1페이지 실행 후 2페이지도 하기 위해 for문으로 2번 실행하게 설정한다.
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

            // 처음에 1 ~ 50 페이지가 저장되어 있는 url 변수를 사용하고, 2번째에는 51 ~ 100 페이지가 저장되어 있는 url2 변수를 사용한다.
            if(i == 1) {
                // "https://www.genie.co.kr/chart/top200" URL에 접속하여 페이지의 HTML을 가져온다.
                await page.goto(url);
            } else {
                await page.goto(url2);
            }

            // 해당 셀렉터가 출력될 때까지 기다려준다.        
            await page.waitForSelector('table.list-wrap > tbody > tr.list');
            // $에 cheerio를 로드한다.
            const content = await page.content();
            // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
            const $ = cheerio.load(content);
            // 가져오는 데이터의 list 부분을 설정한다.
            const lists = $("table.list-wrap > tbody > tr.list");
            console.log(lists.length);

            // 모든 리스트를 순환한다. await 함수를 이용해서 종료가 끝나야 다음 함수가 실행되게 설정한다.
            // await를 설정하지 않으면 데이터가 저장되기 전에 파일 저장함수가 먼저 실행되서 빈 값이 들어간다.
            await lists.each(async (index, list) => {
                // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
                let rank = $(list).find("td.number").text();
                let rankVariance = $(list).find("td.number > span > span > span").text();
                let albumImgSrc = $(list).find("td:nth-child(2) > a > img").attr('src');
                // title의 경우 더미 값이 추가 되지만 rank랑은 조금 다르게 가져와진다. trim 함수로 띄어쓰기를 제거하여 원하는 값만 가져온다.
                let title = $(list).find("td.info > a.title.ellipsis").attr('title');
                let singer = $(list).find("td.info > a.artist.ellipsis").text();
                const albumTitle = $(list).find("td.info > a.albumtitle.ellipsis").text();
                let detailLink = $(list).find("td.info > a.title.ellipsis").attr('onclick');
                
                // rank 변수에서 데이터를 가져올 시 더미 데이터가 같이 가져와진다.
                // slice로 자르기 위해서 end 위치를 확인하고 그에 맞게 값을 가져오는 설정을 1번 더 작업해준다.
                // rank의 경우에는 start가 0으로 고정이라서 End만 있으면 된다.
                // rank 변수의 데이터 변경이 이루어지기 때문에 const에서 let으로 변경하였다.
                const rankEnd = rank.indexOf('\n');
                rank = rank.slice(0, rankEnd);

                // 이미지 다운로드를 위해 albumImg의 주소 앞에 https:를 붙여서 저장해준다.
                albumImgSrc = "https:" + albumImgSrc;

                // onclick 속성으로 가져올 시 다른 데이터가 같이 가져와진다.
                // slice로 자르기 위해서 start, end 위치를 확인하고 그에 맞게 값을 가져오는 설정을 1번 더 작업해준다.
                // detailLink 변수의 데이터 변경이 이루어지기 때문에 const에서 let으로 변경하였다.
                const linkStart = detailLink.indexOf('ID(') + 4;
                const linkEnd = detailLink.indexOf("'1'); return") - 2;
                detailLink = "https://www.genie.co.kr/detail/mediaInfo?xvnm=" + detailLink.slice(linkStart, linkEnd);

                // 인덱스와 함께 로그를 찍는다.
                // console.log({
                //     // 2번째 실행 시 index가 다시 0부터 올라와서 콘솔창에서 보면 헷갈릴 수도 있습니다.
                //     index, title, rank, rankVariance, albumImg, title, singer, albumTitle, detailLink
                // });

                // ' 기호나 & 기호가 있으면 좋아요 함수가 제대로 안먹는 현상 발견
                // replace로 ' 는 삭제하고 &는 and 텍스트로 변경
                title = title.replaceAll("'", "");
                title = title.replaceAll("&", "and");
                singer = singer.replaceAll("'", "");
                singer = singer.replaceAll("&", "and");
                rankVariance = rankVariance.replace("new", "NEW");

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
                    detailLink: detailLink,
                }
                // json 데이터에 저장한 데이터 1개씩 저장
                data.data.push(obj);
            });
            // 브라우저를 종료한다.
            browser.close();
        }

        // console.log(data.data);
        console.log("1st Crawling Exit");
        console.log("Wait Please");
        console.log("2nd Start");
        // console.log(data.data[0].detailLink);

        // 1차 크롤링 이후 2차 크롤링 시작(세부 페이지 접속)
        const detailLists = data.data;
        for (i = 0; i < detailLists.length; i++) {
            const detailUrl = detailLists[i].detailLink;
            // console.log({i, url});

            await axios({
                method: 'get',
                url: detailUrl
                // iconv 디코딩을 사용하려면 arraybuffer 타입으로 받아야 한다.
                // responseType: "arraybuffer"
            }).then((response) => {
                // console.log(response.data);

                const $ = cheerio.load(response.data);

                const detailList = $("#body-content > div.tv_solid_view.tv_detail > div.entry");
                const total = $(detailList).find("div.additional > span.play_count").text();

                // totalNumPlay 값 입력 작업, 키 : 값
                detailLists[i].totalNumPlay = total;
            }).catch(err => {
                console.log(err);
            });
        }

        console.log('2nd crawling Exit');

        // 파일 저장 함수
        // 파일 이름 설정 genieChartMovie-년-월-일-시간
        let formatDate = 'genieChartMovie' + '-' + date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2) + '-' + ('00' + date.getHours()).slice(-2);

        // 파일 경로 및 이름, 확장자 설정
        let fileName = './static/res/chart_data/GenieMovie/'+formatDate+'.json';

        // 파일 작성    stringify 함수로 data 작성시 탭 넣어서 보기 편하게 변경
        await fs.writeFile(fileName, JSON.stringify(data, null, '\t'))
        .then(() => {
            console.log('GenieMovie Fs Write Success');
            // cb(true);
        })
        .catch((err) => {
            throw err;
        });

        const check = await genieMovieCrawling_ImgFileSave(fileName);
        // console.log(check);
        cb(true);
    } catch (err) {
        console.log('crawling err', err);
    }

    })();
}
    

genieCrawling_ImgFileSave = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8')
        .then(async (response) => {
            response = JSON.parse(response);

            for await (let el of response.data) {
                const albumImgData = await fetch(el.albumImgSrc);
                const albumImgBuffer = await albumImgData.arrayBuffer();
                const uint8array = new Uint8Array(albumImgBuffer);
                await fs.writeFile(`./static/res/chart_image/Genie/${el.albumImgFile}`, uint8array);
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

genieMovieCrawling_ImgFileSave = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8')
        .then(async (response) => {
            response = JSON.parse(response);

            for await (let el of response.data) {
                const albumImgData = await fetch(el.albumImgSrc);
                const albumImgBuffer = await albumImgData.arrayBuffer();
                const uint8array = new Uint8Array(albumImgBuffer);
                await fs.writeFile(`./static/res/chart_image/GenieMovie/${el.albumImgFile}`, uint8array);
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
