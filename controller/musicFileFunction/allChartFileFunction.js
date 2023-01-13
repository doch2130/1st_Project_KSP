const fs = require('fs').promises;

exports.melon_All_File = () => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/Melon')
        .then((filelist) => {
            const lastFile = filelist.length - 1;
            // 'melonChartHour-2022-12-16-17.json' => 2022-12-16-17
            // console.log(filelist[lastFile].slice(15, -8));
            // 2022-12-16
            // console.log(filelist[lastFile].slice(15, -8));

            const date = new Date();
            // 비교용 날짜, ex) 2022-12-17
            const compareDate = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);

            // 임시 변수 설정 (현재 날짜 파일 저장 변수)
            const temp = [];

            // 리스트에서 현재 날짜 파일만 추출
            filelist.forEach((file, index) => {
                if(compareDate == file.slice(15, -8)) {
                    // console.log('b: ', file.slice(15, -8));
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
            // resolve(temp);
            // json 파일 데이터 읽어오는 함수
            fs.readFile('./static/res/chart_data/Melon/'+temp[temp.length-1], 'utf8')
            .then((response) => {
                // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                response = JSON.parse(response);
                // console.log(response.data);
                resolve(response.data);
            })
            .catch((err) => {
                // res.send('에러 발생');
                throw err;
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}

// 멜론 일간 함수
exports.melon_ALL_Day_File = () => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/MelonDay')
        .then((filelist) => {
            const lastFile = filelist.length - 1;
            // 'melonChartHour-2022-12-16-17.json' => 2022-12-16-17
            // console.log(filelist[lastFile].slice(15, -8));
            // 2022-12-16
            // console.log(filelist[lastFile].slice(15, -8));

            const date = new Date();
            // 비교용 날짜, ex) 2022-12-17
            const compareDate = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);

            // 임시 변수 설정 (현재 날짜 파일 저장 변수)
            const temp = [];

            // 리스트에서 현재 날짜 파일만 추출
            filelist.forEach((file, index) => {
                if(compareDate == file.slice(14, -8)) {
                    // console.log('b: ', file.slice(14, -8));
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
            // resolve(temp);
            // json 파일 데이터 읽어오는 함수
            // const date = new Date();
            // console.log(filelist[filelist.length-1]);
            fs.readFile('./static/res/chart_data/MelonDay/'+temp[temp.length-1], 'utf8')
            .then((response) => {
                // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                response = JSON.parse(response);
                // console.log(response.data);
                resolve (response.data);
            })
            .catch((err) => {
                // res.send('에러 발생');
                throw err;
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}


// 지니 실시간 차트 - 1
exports.genie_All_File = () => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/Genie')
        .then((filelist) => {
            const lastFile = filelist.length - 1;
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
            // resolve(temp);
            // json 파일 데이터 읽어오는 함수
            // const date = new Date();
            // console.log(filelist[filelist.length-1]);
            fs.readFile('./static/res/chart_data/Genie/'+temp[temp.length-1], 'utf8')
            .then((response) => {
                // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                response = JSON.parse(response);
                // console.log(response.data);
                resolve (response.data);
            })
            .catch((err) => {
                // res.send('에러 발생');
                throw err;
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}



//  지니 뮤직비디오 차트 - 1
exports.genieMovie_All_File = () => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/GenieMovie')
        .then((filelist) => {
            const lastFile = filelist.length - 1;
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
            // resolve(temp);
            // json 파일 데이터 읽어오는 함수
            // const date = new Date();
            // console.log(filelist[filelist.length-1]);
            fs.readFile('./static/res/chart_data/GenieMovie/'+temp[temp.length-1], 'utf8')
            .then((response) => {
                // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                response = JSON.parse(response);
                // console.log(response.data);
                resolve (response.data);
            })
            .catch((err) => {
                // res.send('에러 발생');
                throw err;
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}




// 유튜브 top - 100
exports.youtube_All_File = () => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/Youtube')
        .then((filelist) => {
            const lastFile = filelist.length - 1;
            const date = new Date();
            // 비교용 날짜, ex) 2022-12-17
            const compareDate = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);

            // 임시 변수 설정 (현재 날짜 파일 저장 변수)
            const temp = [];

            // 리스트에서 현재 날짜 파일만 추출
            filelist.forEach((file, index) => {
                if(compareDate == file.slice(17, -8)) {
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
            // resolve(temp);
            // json 파일 데이터 읽어오는 함수
            // const date = new Date();
            // console.log(filelist[filelist.length-1]);
            fs.readFile('./static/res/chart_data/Youtube/'+temp[temp.length-1], 'utf8')
            .then((response) => {
                // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                response = JSON.parse(response);
                // console.log(response.data);
                resolve (response.data);
            })
            .catch((err) => {
                // res.send('에러 발생');
                throw err;
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}


// 유튜브 뮤직비디오
exports.youtubeMovie_All_File = () => {
    return new Promise((resolve, reject) => {
        fs.readdir('./static/res/chart_data/YoutubeMovie')
        .then((filelist) => {
            // console.log(filelist);
            const lastFile = filelist.length - 1;
            const date = new Date();
            // 비교용 날짜, ex) 2022-12-17
            const compareDate = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);
            // console.log(compareDate);

            // 임시 변수 설정 (현재 날짜 파일 저장 변수)
            const temp = [];

            // 리스트에서 현재 날짜 파일만 추출
            filelist.forEach((file, index) => {
                if(compareDate == file.slice(18, -8)) {
                    // console.log('b: ', file.slice(18, -8));
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
            // resolve(temp);
            // json 파일 데이터 읽어오는 함수
            // const date = new Date();
            // console.log(filelist[filelist.length-1]);
            fs.readFile('./static/res/chart_data/YoutubeMovie/'+temp[temp.length-1], 'utf8')
            .then((response) => {
                // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
                response = JSON.parse(response);
                // console.log(response.data);
                resolve (response.data);
            })
            .catch((err) => {
                // res.send('에러 발생');
                throw err;
            });
        })
        .catch((err) => {
            throw err;
        });
    });
}

