const fs = require('fs').promises;

// 유튜브 top - 100
exports.youtubeFileList = function (cb) {
    fs.readdir('./static/res/chart_data/Youtube')
    .then((filelist) => {
        const lastFile = filelist.length - 1;
        // 'youtubeChartHour-2022-12-16-17.json' => 2022-12-16-17
        // console.log(filelist[lastFile].slice(17, -5));
        // 2022-12-16
        // console.log(filelist[lastFile].slice(17, -8));

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
        cb(temp);
    })
    .catch((err) => {
        throw err;
    });
}


// json 파일 데이터 읽어오는 함수
exports.youtubeFileRead = function (filelist, cb) {
    const date = new Date();
    // console.log(filelist[filelist.length-1]);
    fs.readFile('./static/res/chart_data/Youtube/'+filelist[filelist.length-1], 'utf8')
    .then((response) => {
        // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
        response = JSON.parse(response);
        // console.log(response.data);
        cb(response.data);
    })
    .catch((err) => {
        // res.send('에러 발생');
        throw err;
    });
}


// 시간 변경 함수를 위한 File List 함수 재생성 (동일 함수 변경해서 사용해도 되지만, 지금은 안정성을 위해 새로 생성)
exports.youtubeFileListHourChange = (cb) => {
    fs.readdir('./static/res/chart_data/Youtube')
    .then((filelist) => {
        const lastFile = filelist.length - 1;
        // 'youtubeChartHour-2022-12-16-17.json' => 2022-12-16-17
        // console.log(filelist[lastFile].slice(17, -5));
        // 2022-12-16
        // console.log(filelist[lastFile].slice(17, -8));

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
        cb(temp);
    })
    .catch((err) => {
        throw err;
    });
}




// json 파일 데이터 읽어오는 함수
exports.youtubeFileReadHourChange = (filelist, fileHour, cb) => {
    // console.log('fileHour', fileHour);
    const date = new Date();
    // const fileName = './static/chart_data/Youtube/youtubeCharHour-' + date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2) + '-' + ('00' + date.getHours()).slice(-2) + '.json';
    // 나중에 사용예정, 지금은 파일 지정해서 사용
    // fs.readFile('./static/chart_data/Youtube/youtubeChartHour-2022-12-14-17.json', 'utf8')
    // console.log(filelist[filelist.length-1]);

    let fileName = '';
    for(let i = 0; i < filelist.length; i++) {
        if(fileHour == filelist[i].slice(28, -5)) {
            fileName = filelist[i];
        }
    }
    if(fileName == undefined) {
        fileName = filelist[filelist.length-1];
    }

    // console.log('fileName: ', fileName);

    fs.readFile('./static/res/chart_data/Youtube/'+fileName, 'utf8')
    .then((response) => {
        // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
        response = JSON.parse(response);
        // console.log(response.data);
        cb(response.data);
    })
    .catch((err) => {
        // res.send('에러 발생');
        throw err;
    });
}




// 유튜브 뮤직비디오
exports.youtubeMovieFileList = (cb) => {
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
        cb(temp);
    })
    .catch((err) => {
        throw err;
    });
}

// json 파일 데이터 읽어오는 함수
exports.youtubeMovieFileRead = (filelist, cb) => {
    const date = new Date();
    // console.log(filelist[filelist.length-1]);
    fs.readFile('./static/res/chart_data/YoutubeMovie/'+filelist[filelist.length-1], 'utf8')
    .then((response) => {
        // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
        response = JSON.parse(response);
        // console.log(response.data);
        cb(response.data);
    })
    .catch((err) => {
        // res.send('에러 발생');
        throw err;
    });
}

// 시간 변경 함수를 위한 File List 함수 재생성 (동일 함수 변경해서 사용해도 되지만, 지금은 안정성을 위해 새로 생성)
exports.youtubeMovieFileListHourChange = function (cb) {
    fs.readdir('./static/res/chart_data/YoutubeMovie')
    .then((filelist) => {
        const lastFile = filelist.length - 1;

        const date = new Date();
        // 비교용 날짜, ex) 2022-12-17
        const compareDate = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);

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
        cb(temp);
    })
    .catch((err) => {
        throw err;
    });
}

// json 파일 데이터 읽어오는 함수
exports.youtubeMovieFileReadHourChange = function (filelist, fileHour, cb) {
    // console.log('fileHour', fileHour);
    const date = new Date();
    // const fileName = './static/chart_data/Youtube/youtubeCharHour-' + date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2) + '-' + ('00' + date.getHours()).slice(-2) + '.json';
    // 나중에 사용예정, 지금은 파일 지정해서 사용
    // fs.readFile('./static/chart_data/Youtube/youtubeChartHour-2022-12-14-17.json', 'utf8')
    // console.log(filelist[filelist.length-1]);

    let fileName = '';
    // console.log('b: ', filelist[0].slice(29, -5));
    for(let i = 0; i < filelist.length; i++) {
        if(fileHour == filelist[i].slice(29, -5)) {
            fileName = filelist[i];
        }
    }
    if(fileName == undefined) {
        fileName = filelist[filelist.length-1];
    }

    // console.log('fileName: ', fileName);

    fs.readFile('./static/res/chart_data/YoutubeMovie/'+fileName, 'utf8')
    .then((response) => {
        // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
        response = JSON.parse(response);
        // console.log(response.data);
        cb(response.data);
    })
    .catch((err) => {
        // res.send('에러 발생');
        throw err;
    });
}
