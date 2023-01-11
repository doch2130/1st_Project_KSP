window.addEventListener('DOMContentLoaded', event => {

    // const dayTag = document.getElementById('dayTag');
    // const date = new Date();
    // dayTag.textContent = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);


    // ***********멜론 일간************

    // 차트 모아보기에서는 기본 설정 값 10 설정
    let viewCount = 10;

    // 스크립트 데이터로 테이블 출력하는 함수
    function tableDataMelonDay (data, viewCount, btnId) {
        const melonTable = document.querySelectorAll('tbody')[3];
        let temp = '';
        
        // 데이터가 딱 맞게 viewCount에 나눠지는 데이터면 정상 출력이 되지만
        // 99개 처럼 나머지가 생기는 경우에는 데이터 부족으로 에러 호출 확인
        // if문 설정하여 btnId*viewCount가 data.length 보다 크면 조건문을 다르게 실행하도록 분기
        if(btnId*viewCount > data.length) {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < data.length; i++) {
                temp += `<tr class='melon${i}'>
                    <td rowspan="2">${data[i].rank}</td>
                    <td rowspan="2"><img src='${data[i].albumImg}'></td>
                    <td>${data[i].singer}</td>
                    </tr>
                    <tr>
                    <td>${data[i].title}</td>
                    </tr>`;
            }
        } else {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < btnId*viewCount; i++) {
                temp += `<tr class='melon${i}'>
                    <td rowspan="2">${data[i].rank}</td>
                    <td rowspan="2"><img src='${data[i].albumImg}'></td>
                    <td>${data[i].singer}</td>
                    </tr>
                    <tr>
                    <td>${data[i].title}</td>
                    </tr>`;
            }
        }
        melonTable.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 1번 실행해서 데이터 출력
    // 초기 실행이라서 btnId 변수 대신에 1값 고정
    tableDataMelonDay(ejsDataMelonDay, viewCount, 1);

    // 페이지 버튼 출력을 위한 1차 작업 함수
    function pageAlgoMelonDay (total, bottomSize, listSize, cursor){
        // total = 총 갯수
        // bottomSize = 하단 버튼 개수
        // listSize = 화면에서 보여줄 크기
        // cursor = 현재 나의 페이지

        //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 
        let totalPageSize = Math.ceil(total / listSize);

        let firstBottomNumber, lastBottomNumber;

        // 현재 페이지 버튼 % 하단 버튼 개수 == 0 인 경우 현재 버튼이 출력이 되지 않는 현상 확인
        // 3번 버튼을 누르면 하단에 4, 5, 6 버튼만 보이는 현상
        // if 조건문으로 출력되게 변경
        if(cursor%bottomSize == 0 ) {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize - 1;
        } else {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize + 1;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize;
        }
        
        //총 갯수보다 큰 경우 방지
        if(lastBottomNumber > totalPageSize) {
            lastBottomNumber = totalPageSize;
        }

        return {
            firstBottomNumber,
            lastBottomNumber,
            totalPageSize,
            total,
            bottomSize,
            listSize,
            cursor
        }
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
    // let info = pageAlgo(280, 10, 10, 1);
    // 페이지 버튼 작업을 위한 1차 작업 초기 실행행
    let infoMelonDay = pageAlgoMelonDay(ejsDataMelonDay.length, 3, viewCount, 1);

    // 페이지 버튼 출력 함수
    function pageBtnMelonDay(infoMelonDay) {
        const tfoot = document.querySelectorAll('tfoot')[3];
        let temp ='';

        // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
        if(infoMelonDay.cursor == 1) {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item disabled" style="cursor: text";>
                <a class="page-link">pre</a>
            </li>`;
        } else {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item" onclick="pageBtnMoveMelonDay('1', ${viewCount})">
                <a class="page-link">pre</a>
            </li>`;
        }

        for (let i=infoMelonDay.firstBottomNumber; i <= infoMelonDay.lastBottomNumber; i++) {
            // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
            if (i == infoMelonDay.cursor) {
                temp += `<li class='page-item active' onclick="pageBtnMoveMelonDay('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            } else {
                temp += `<li class='page-item' onclick="pageBtnMoveMelonDay('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            }
        }
        // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
        if(infoMelonDay.cursor == infoMelonDay.totalPageSize) {
            temp += `<li class="page-item disabled" style="cursor: text";>
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        } else {
            temp += `<li class="page-item" onclick="pageBtnMoveMelonDay('${infoMelonDay.totalPageSize}', ${viewCount})">
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        }
        tfoot.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 페이지 버튼 출력 함수
    pageBtnMelonDay(infoMelonDay);



    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // 하단 페이지 버튼 클릭 시 실행되는 함수
    window.pageBtnMoveMelonDay = (btnId, viewCount) => {
        // console.log(btnId);

        // 페이지 번호 클릭 후 새로운 데이터 출력
        tableDataMelonDay(ejsDataMelonDay, viewCount, btnId);

        // 페이지 하단 번호 변경 작업
        let info = pageAlgoMelonDay(ejsDataMelonDay.length, 3, viewCount, btnId);
        pageBtnMelonDay(info);
    }




    //  ***********지니 뮤직비디오************
    // 차트 모아보기에서는 기본 설정 값 10 설정

    // 스크립트 데이터로 테이블 출력하는 함수
    function tableDataGenieMovie (data, viewCount, btnId) {
        const genieTable = document.querySelectorAll('tbody')[4];
        let temp = '';
        

        // 데이터가 딱 맞게 viewCount에 나눠지는 데이터면 정상 출력이 되지만
        // 99개 처럼 나머지가 생기는 경우에는 데이터 부족으로 에러 호출 확인
        // if문 설정하여 btnId*viewCount가 data.length 보다 크면 조건문을 다르게 실행하도록 분기
        if(btnId*viewCount > data.length) {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < data.length; i++) {
                temp += `<tr>
                    <td rowspan="2">${data[i].rank}</td>
                    <td rowspan="2"><img src='${data[i].albumImg}'></td>
                    <td>${data[i].singer}</td>
                    </tr>
                    <tr>
                    <td>${data[i].title}</td>
                    </tr>`;
            }
        } else {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < btnId*viewCount; i++) {
                temp += `<tr>
                    <td rowspan="2">${data[i].rank}</td>
                    <td rowspan="2"><img src='${data[i].albumImg}'></td>
                    <td>${data[i].singer}</td>
                    </tr>
                    <tr>
                    <td>${data[i].title}</td>
                    </tr>`;
            }
        }
        genieTable.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 1번 실행해서 데이터 출력
    // 초기 실행이라서 btnId 변수 대신에 1값 고정
    tableDataGenieMovie(ejsDataGenieMovie, viewCount, 1);

    // 페이지 버튼 출력을 위한 1차 작업 함수
    function pageAlgoGenieMovie (total, bottomSize, listSize, cursor){
        // total = 총 갯수
        // bottomSize = 하단 버튼 개수
        // listSize = 화면에서 보여줄 크기
        // cursor = 현재 나의 페이지

        //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 
        let totalPageSize = Math.ceil(total / listSize);

        let firstBottomNumber, lastBottomNumber;

        // 현재 페이지 버튼 % 하단 버튼 개수 == 0 인 경우 현재 버튼이 출력이 되지 않는 현상 확인
        // 3번 버튼을 누르면 하단에 4, 5, 6 버튼만 보이는 현상
        // if 조건문으로 출력되게 변경
        if(cursor%bottomSize == 0 ) {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize - 1;
        } else {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize + 1;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize;
        }
        
        //총 갯수보다 큰 경우 방지
        if(lastBottomNumber > totalPageSize) {
            lastBottomNumber = totalPageSize;
        }

        return {
            firstBottomNumber,
            lastBottomNumber,
            totalPageSize,
            total,
            bottomSize,
            listSize,
            cursor
        }
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
    // let info = pageAlgo(280, 10, 10, 1);
    // 페이지 버튼 작업을 위한 1차 작업 초기 실행행
    let infoGenieMovie = pageAlgoGenieMovie(ejsDataGenieMovie.length, 3, viewCount, 1);

    // 페이지 버튼 출력 함수
    function pageBtnGenieMovie(infoGenieMovie) {
        const tfoot = document.querySelectorAll('tfoot')[4];
        let temp ='';

        // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
        if(infoGenieMovie.cursor == 1) {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item disabled" style="cursor: text";>
                <a class="page-link">pre</a>
            </li>`;
        } else {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item" onclick="pageBtnMoveGenieMovie('1', ${viewCount})">
                <a class="page-link">pre</a>
            </li>`;
        }

        for (let i=infoGenieMovie.firstBottomNumber; i <= infoGenieMovie.lastBottomNumber; i++) {
            // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
            if (i == infoGenieMovie.cursor) {
                temp += `<li class='page-item active' onclick="pageBtnMoveGenieMovie('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            } else {
                temp += `<li class='page-item' onclick="pageBtnMoveGenieMovie('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            }
        }
        // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
        if(infoGenieMovie.cursor == infoGenieMovie.totalPageSize) {
            temp += `<li class="page-item disabled" style="cursor: text";>
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        } else {
            temp += `<li class="page-item" onclick="pageBtnMoveGenieMovie('${infoGenieMovie.totalPageSize}', ${viewCount})">
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        }
        tfoot.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 페이지 버튼 출력 함수
    pageBtnGenieMovie(infoGenieMovie);



    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // 하단 페이지 버튼 클릭 시 실행되는 함수
    window.pageBtnMoveGenieMovie = (btnId, viewCount) => {
        // console.log(btnId);

        // 페이지 번호 클릭 후 새로운 데이터 출력
        tableDataGenieMovie(ejsDataGenieMovie, viewCount, btnId);

        // 페이지 하단 번호 변경 작업
        let info = pageAlgoGenieMovie(ejsDataGenieMovie.length, 3, viewCount, btnId);
        pageBtnGenieMovie(info);
    }


    // ***********유튜브************
    // 스크립트 데이터로 테이블 출력하는 함수
    function tableDataYoutubeMovie(data, viewCount, btnId) {
        const youtubeTable = document.querySelectorAll('tbody')[5];
        let temp = '';
        

        // 데이터가 딱 맞게 viewCount에 나눠지는 데이터면 정상 출력이 되지만
        // 99개 처럼 나머지가 생기는 경우에는 데이터 부족으로 에러 호출 확인
        // if문 설정하여 btnId*viewCount가 data.length 보다 크면 조건문을 다르게 실행하도록 분기
        if(btnId*viewCount > data.length) {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < data.length; i++) {
                temp += `<tr>
                    <td rowspan="2">${data[i].rank}</td>
                    <td rowspan="2"><img src='${data[i].albumImg}'></td>
                    <td>${data[i].singer}</td>
                    </tr>
                    <tr>
                    <td>${data[i].title}</td>
                    </tr>`;
            }
        } else {
            // viewCount에 따라 데이터 출력 실행
            // btnId = 페이지 하단의 버튼에 따라서 페이지 데이터 호출,  스타트 번호 페이지번호 * 1페이지 표시 개수
            for(let i=btnId*viewCount-viewCount; i < btnId*viewCount; i++) {
                temp += `<tr>
                    <td rowspan="2">${data[i].rank}</td>
                    <td rowspan="2"><img src='${data[i].albumImg}'></td>
                    <td>${data[i].singer}</td>
                    </tr>
                    <tr>
                    <td>${data[i].title}</td>
                    </tr>`;
            }
        }
        youtubeTable.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 1번 실행해서 데이터 출력
    // 초기 실행이라서 btnId 변수 대신에 1값 고정
    tableDataYoutubeMovie(ejsDataYoutubeMovie, viewCount, 1);

    // 페이지 버튼 출력을 위한 1차 작업 함수
    function pageAlgoYoutubeMovie(total, bottomSize, listSize, cursor){
        // total = 총 갯수
        // bottomSize = 하단 버튼 개수
        // listSize = 화면에서 보여줄 크기
        // cursor = 현재 나의 페이지

        //한 화면에 보여줄 갯수에서 구한 하단 총 갯수 
        let totalPageSize = Math.ceil(total / listSize);

        let firstBottomNumber, lastBottomNumber;

        // 현재 페이지 버튼 % 하단 버튼 개수 == 0 인 경우 현재 버튼이 출력이 되지 않는 현상 확인
        // 3번 버튼을 누르면 하단에 4, 5, 6 버튼만 보이는 현상
        // if 조건문으로 출력되게 변경
        if(cursor%bottomSize == 0 ) {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize - 1;
        } else {
            //하단 최초 숫자
            firstBottomNumber = cursor - cursor % bottomSize + 1;
            //하단 마지막 숫자
            lastBottomNumber = cursor - cursor % bottomSize + bottomSize;
        }
        
        //총 갯수보다 큰 경우 방지
        if(lastBottomNumber > totalPageSize) {
            lastBottomNumber = totalPageSize;
        }

        return {
            firstBottomNumber,
            lastBottomNumber,
            totalPageSize,
            total,
            bottomSize,
            listSize,
            cursor
        }
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 280개의 데이터, 하단에는 20개씩, 1개화면에는 10개, 지금 나의페이지는 21
    // let info = pageAlgo(280, 10, 10, 1);
    // 페이지 버튼 작업을 위한 1차 작업 초기 실행행
    let infoYoutubeMovie = pageAlgoYoutubeMovie(ejsDataYoutubeMovie.length, 3, viewCount, 1);

    // 페이지 버튼 출력 함수
    function pageBtnYoutubeMovie(infoYoutubeMovie) {
        const tfoot = document.querySelectorAll('tfoot')[5];
        let temp ='';

        // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
        if(infoYoutubeMovie.cursor == 1) {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item disabled" style="cursor: text";>
                <a class="page-link">pre</a>
            </li>`;
        } else {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item" onclick="pageBtnMoveYoutubeMovie('1', ${viewCount})">
                <a class="page-link">pre</a>
            </li>`;
        }

        for (let i=infoYoutubeMovie.firstBottomNumber; i <= infoYoutubeMovie.lastBottomNumber; i++) {
            // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
            if (i == infoYoutubeMovie.cursor) {
                temp += `<li class='page-item active' onclick="pageBtnMoveYoutubeMovie('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            } else {
                temp += `<li class='page-item' onclick="pageBtnMoveYoutubeMovie('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            }
        }
        // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
        if(infoYoutubeMovie.cursor == infoYoutubeMovie.totalPageSize) {
            temp += `<li class="page-item disabled" style="cursor: text";>
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        } else {
            temp += `<li class="page-item" onclick="pageBtnMoveYoutubeMovie('${infoYoutubeMovie.totalPageSize}', ${viewCount})">
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        }
        tfoot.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 페이지 버튼 출력 함수
    pageBtnYoutubeMovie(infoYoutubeMovie);



    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // 하단 페이지 버튼 클릭 시 실행되는 함수
    window.pageBtnMoveYoutubeMovie = (btnId, viewCount) => {
        // console.log(btnId);

        // 페이지 번호 클릭 후 새로운 데이터 출력
        tableDataYoutubeMovie(ejsDataYoutubeMovie, viewCount, btnId);

        // 페이지 하단 번호 변경 작업
        let info = pageAlgoYoutubeMovie(ejsDataYoutubeMovie.length, 3, viewCount, btnId);
        pageBtnYoutubeMovie(info);
    }

});

