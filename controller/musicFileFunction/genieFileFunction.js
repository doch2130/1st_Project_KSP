const fs = require('fs').promises;


// 지니 실시간 차트 - 시간변경 포함
exports.genieFile = (fileHour) => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/Genie')
        .then((filelist) => {
            const lastFile = filelist.length - 1;
            // 'genieChartHour-2022-12-16-17.json' => 2022-12-16-17
            // 2022-12-16
            // console.log(filelist[lastFile].slice(15, -8));

            // 시간
            // console.log(filelist[lastFile].slice(26, -5));

            const date = new Date();
            // 비교용 날짜, ex) 2022-12-17
            const compareDate = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);

            // 임시 변수 설정 (현재 날짜 파일 저장 변수)
            const temp = [];

            // 리스트에서 현재 날짜 파일만 추출
            filelist.forEach((file, index) => {
                if(compareDate == file.slice(15, -8)) {
                    // console.log('b: ', file.slice(17, -8));
                    temp[index] = file;
                }
            });
            // 00시 이후 크롤링 실행 전인 경우 현재 날짜 파일이 없을 수 있으므로, 제일 최신 파일 저장
            if(temp.length == 0) {
                temp[0] = filelist[lastFile];
            }
            
            // temp 리스트 내부의 undefined 값 제거
            for(let i = 0; i < temp.length; i++){ 
                if (temp[i] === undefined) { 
                temp.splice(i, 1); 
                i--; 
                }
            }
            
            // 기본 출력 + 시간변경 분기점
            if(fileHour) {
                // 시간변경
                const date = new Date();
                // console.log(filelist[filelist.length-1]);
                // console.log('hour: ', filelist[0].slice(26, -5));

                let fileName = '';
                for(let i = 0; i < filelist.length; i++) {
                    if(fileHour == filelist[i].slice(26, -5)) {
                        fileName = filelist[i];
                    }
                }
                if(fileName == undefined) {
                    fileName = filelist[filelist.length-1];
                }

                fs.readFile('./static/res/chart_data/Genie/'+fileName, 'utf8')
                .then((response) => {
                    // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                    response = JSON.parse(response);
                    // console.log(response.data);
                    resolve([response.data, filelist]);
                })
                .catch((err) => {
                    // res.send('에러 발생');
                    throw err;
                });
            } else {
                // 기본 값 = 최신파일 출력
                fs.readFile('./static/res/chart_data/Genie/'+filelist[filelist.length-1], 'utf8')
                .then((response) => {
                    // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                    response = JSON.parse(response);
                    // console.log(response.data);
                    resolve([response.data, filelist]);
                })
                .catch((err) => {
                    throw err;
                });
            }
        })
        .catch((err) => {
            throw err;
        });
    });
};


//  지니 뮤직비디오 차트 - 시간변경 포함
exports.genieMovieFile = (fileHour) => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/GenieMovie')
        .then((filelist) => {
            const lastFile = filelist.length - 1;
            // 'genieChartHour-2022-12-16-17.json' => 2022-12-16-17
            // 2022-12-16
            // console.log(filelist[lastFile].slice(16, -8));

            // 시간
            // console.log(filelist[lastFile].slice(27, -5));

            const date = new Date();
            // 비교용 날짜, ex) 2022-12-17
            const compareDate = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);

            // 임시 변수 설정 (현재 날짜 파일 저장 변수)
            const temp = [];

            // 리스트에서 현재 날짜 파일만 추출
            filelist.forEach((file, index) => {
                if(compareDate == file.slice(16, -8)) {
                    // console.log('b: ', file.slice(17, -8));
                    temp[index] = file;
                }
            });
            // 00시 이후 크롤링 실행 전인 경우 현재 날짜 파일이 없을 수 있으므로, 제일 최신 파일 저장
            if(temp.length == 0) {
                temp[0] = filelist[lastFile];
            }
            
            // temp 리스트 내부의 undefined 값 제거
            for(let i = 0; i < temp.length; i++){ 
                if (temp[i] === undefined) { 
                temp.splice(i, 1); 
                i--; 
                }
            }

            // 기본 출력 + 시간변경 분기점
            if(fileHour) {
                // 시간변경
                let fileName = '';
                for(let i = 0; i < filelist.length; i++) {
                    if(fileHour == filelist[i].slice(27, -5)) {
                        fileName = filelist[i];
                    }
                }
                if(fileName == undefined) {
                    fileName = filelist[filelist.length-1];
                }

                // console.log('fileName: ', fileName);

                fs.readFile('./static/res/chart_data/GenieMovie/'+fileName, 'utf8')
                .then((response) => {
                    // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                    response = JSON.parse(response);
                    // console.log(response.data);
                    resolve ([response.data, filelist]);
                })
                .catch((err) => {
                    // res.send('에러 발생');
                    throw err;
                });
            } else {
                // 기본 값 - 최신파일 출력
                fs.readFile('./static/res/chart_data/GenieMovie/'+filelist[filelist.length-1], 'utf8')
                .then((response) => {
                    // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                    response = JSON.parse(response);
                    // console.log(response.data);
                    resolve ([response.data, filelist]);
                })
                .catch((err) => {
                    // res.send('에러 발생');
                    throw err;
                });
            }
        })
        .catch((err) => {
            throw err;
        });
    });
};
