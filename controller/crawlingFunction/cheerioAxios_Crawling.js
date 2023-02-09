const cheerio = require('cheerio');
const axios = require('axios');

// 실시간 크롤링
const staticCrawling = () => {
    // 1페이지 1 ~ 50
    let url = "https://www.genie.co.kr/chart/top200";
    // 2페이지 51 ~ 100
    // const url2 = "https://www.genie.co.kr/chart/top200?pg=2";

    // 크롤링 + 파일 저장 함수 시작
    (async() => {
        // json 데이터 저장 변수
        let data = {};
        data.data = [];

        // 1페이지 실행 후 2페이지도 하기 위해 for문으로 2번 실행하게 설정한다.
        for (let i = 1; i < 3; i++) {

            if(i === 1) {
                url = "https://www.genie.co.kr/chart/top200";
            } else {
                url = "https://www.genie.co.kr/chart/top200?pg=2";
            }

            await axios({
                method: 'get',
                url: url
                // iconv 디코딩을 사용하려면 arraybuffer 타입으로 받아야 한다.
                // responseType: "arraybuffer"
            }).then((response) => {
                // console.log(response.data);

                const $ = cheerio.load(response.data);
                const lists = $("table.list-wrap > tbody > tr.list");

                // 모든 리스트를 순환한다. await 함수를 이용해서 종료가 끝나야 다음 함수가 실행되게 설정한다.
                // await를 설정하지 않으면 데이터가 저장되기 전에 파일 저장함수가 먼저 실행되서 빈 값이 들어간다.
                lists.each(async (index, list) => {
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

                    // ' 기호나 & 기호가 있으면 좋아요 함수가 제대로 안먹는 현상 발견
                    // replace로 ' 는 삭제하고 &는 and 텍스트로 변경
                    title = title.replaceAll("'", "");
                    title = title.replaceAll("&", "and");
                    singer = singer.replaceAll("'", "");
                    singer = singer.replaceAll("&", "and");
                    rankVariance = rankVariance.replace("new", "NEW");

                    // 데이터 저장 변수 설정 및 데이터 저장
                    let obj = {
                        title: title,
                        rank: rank,
                        rankVariance: rankVariance,
                        albumImgSrc: albumImgSrc,
                        singer: singer,
                        albumTitle: albumTitle,
                        detailLink: detailLink,
                    }
                    // json 데이터에 저장한 데이터 1개씩 저장
                    data.data.push(obj);
                });

            }).catch(err => {
                console.log(err);
            });
        }

        console.log(data);


        return true;

    })();
}
    
staticCrawling();
