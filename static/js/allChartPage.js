window.addEventListener('DOMContentLoaded', event => {

    const dayTag = document.getElementById('dayTag');
    const date = new Date();
    dayTag.textContent = date.getFullYear() + '-' + ('00' + (date.getMonth()+1)).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);


    // ***********멜론************

    // 차트 모아보기에서는 기본 설정 값 10 설정
    let viewCount = 10;

    // 스크립트 데이터로 테이블 출력하는 함수
    tableDataMelon = (data, viewCount, btnId) => {
        const melonTable = document.querySelectorAll('tbody')[0];
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
    tableDataMelon(ejsDataMelon, viewCount, 1);

    // 페이지 버튼 출력을 위한 1차 작업 함수
    pageAlgoMelon = (total, bottomSize, listSize, cursor) => {
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
    let infoMelon = pageAlgoMelon(ejsDataMelon.length, 3, viewCount, 1);

    // 페이지 버튼 출력 함수
    pageBtnMelon = (infoMelon) => {
        const tfoot = document.querySelectorAll('tfoot')[0];
        let temp ='';

        // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
        if(infoMelon.cursor == 1) {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item disabled" style="cursor: text";>
                <a class="page-link">pre</a>
            </li>`;
        } else {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item" onclick="pageBtnMoveMelon('1', ${viewCount})">
                <a class="page-link">pre</a>
            </li>`;
        }

        for (let i=infoMelon.firstBottomNumber; i <= infoMelon.lastBottomNumber; i++) {
            // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
            if (i == infoMelon.cursor) {
                temp += `<li class='page-item active' onclick="pageBtnMoveMelon('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            } else {
                temp += `<li class='page-item' onclick="pageBtnMoveMelon('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            }
        }
        // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
        if(infoMelon.cursor == infoMelon.totalPageSize) {
            temp += `<li class="page-item disabled" style="cursor: text";>
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        } else {
            temp += `<li class="page-item" onclick="pageBtnMoveMelon('${infoMelon.totalPageSize}', ${viewCount})">
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        }
        tfoot.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 페이지 버튼 출력 함수
    pageBtnMelon(infoMelon);



    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // 하단 페이지 버튼 클릭 시 실행되는 함수
    window.pageBtnMoveMelon = (btnId, viewCount) => {
        // console.log(btnId);

        // 페이지 번호 클릭 후 새로운 데이터 출력
        tableDataMelon(ejsDataMelon, viewCount, btnId);

        // 페이지 하단 번호 변경 작업
        let info = pageAlgoMelon(ejsDataMelon.length, 3, viewCount, btnId);
        pageBtnMelon(info);
    }




    //  ***********지니************
    // 차트 모아보기에서는 기본 설정 값 10 설정

    // 스크립트 데이터로 테이블 출력하는 함수
    function tableDataGenie (data, viewCount, btnId) {
        const genieTable = document.querySelectorAll('tbody')[1];
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
    tableDataGenie(ejsDataGenie, viewCount, 1);

    // 페이지 버튼 출력을 위한 1차 작업 함수
    function pageAlgoGenie (total, bottomSize, listSize, cursor){
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
    let infoGenie = pageAlgoGenie(ejsDataGenie.length, 3, viewCount, 1);

    // 페이지 버튼 출력 함수
    function pageBtnGenie(infoGenie) {
        const tfoot = document.querySelectorAll('tfoot')[1];
        let temp ='';

        // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
        if(infoGenie.cursor == 1) {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item disabled" style="cursor: text";>
                <a class="page-link">pre</a>
            </li>`;
        } else {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item" onclick="pageBtnMoveGenie('1', ${viewCount})">
                <a class="page-link">pre</a>
            </li>`;
        }

        for (let i=infoGenie.firstBottomNumber; i <= infoGenie.lastBottomNumber; i++) {
            // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
            if (i == infoGenie.cursor) {
                temp += `<li class='page-item active' onclick="pageBtnMoveGenie('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            } else {
                temp += `<li class='page-item' onclick="pageBtnMoveGenie('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            }
        }
        // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
        if(infoGenie.cursor == infoGenie.totalPageSize) {
            temp += `<li class="page-item disabled" style="cursor: text";>
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        } else {
            temp += `<li class="page-item" onclick="pageBtnMoveGenie('${infoGenie.totalPageSize}', ${viewCount})">
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        }
        tfoot.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 페이지 버튼 출력 함수
    pageBtnGenie(infoGenie);



    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // 하단 페이지 버튼 클릭 시 실행되는 함수
    window.pageBtnMoveGenie = (btnId, viewCount) => {
        // console.log(btnId);

        // 페이지 번호 클릭 후 새로운 데이터 출력
        tableDataGenie(ejsDataGenie, viewCount, btnId);

        // 페이지 하단 번호 변경 작업
        let info = pageAlgoGenie(ejsDataGenie.length, 3, viewCount, btnId);
        pageBtnGenie(info);
    }


    // ***********유튜브************
    // 스크립트 데이터로 테이블 출력하는 함수
    function tableDataYoutube(data, viewCount, btnId) {
        const youtubeTable = document.querySelectorAll('tbody')[2];
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
    tableDataYoutube(ejsDataYoutube, viewCount, 1);

    // 페이지 버튼 출력을 위한 1차 작업 함수
    function pageAlgoYoutube(total, bottomSize, listSize, cursor){
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
    let infoYoutube = pageAlgoYoutube(ejsDataYoutube.length, 3, viewCount, 1);

    // 페이지 버튼 출력 함수
    function pageBtnYoutube(infoYoutube) {
        const tfoot = document.querySelectorAll('tfoot')[2];
        let temp ='';

        // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
        if(infoYoutube.cursor == 1) {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item disabled" style="cursor: text";>
                <a class="page-link">pre</a>
            </li>`;
        } else {
            temp += `<td colspan='3'><ul class="pagination">
            <li class="page-item" onclick="pageBtnMoveYoutube('1', ${viewCount})">
                <a class="page-link">pre</a>
            </li>`;
        }

        for (let i=infoYoutube.firstBottomNumber; i <= infoYoutube.lastBottomNumber; i++) {
            // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
            if (i == infoYoutube.cursor) {
                temp += `<li class='page-item active' onclick="pageBtnMoveYoutube('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            } else {
                temp += `<li class='page-item' onclick="pageBtnMoveYoutube('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
            }
        }
        // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
        if(infoYoutube.cursor == infoYoutube.totalPageSize) {
            temp += `<li class="page-item disabled" style="cursor: text";>
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        } else {
            temp += `<li class="page-item" onclick="pageBtnMoveYoutube('${infoYoutube.totalPageSize}', ${viewCount})">
                    <a class="page-link">next</a>
                </li>
            </ul>
            </td>`;
        }
        tfoot.innerHTML = temp;
    }

    // ******처음 출력을 위한 초기 실행 함수******
    // 페이지 버튼 출력 함수
    pageBtnYoutube(infoYoutube);



    // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
    // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
    // 하단 페이지 버튼 클릭 시 실행되는 함수
    window.pageBtnMoveYoutube = (btnId, viewCount) => {
        // console.log(btnId);

        // 페이지 번호 클릭 후 새로운 데이터 출력
        tableDataYoutube(ejsDataYoutube, viewCount, btnId);

        // 페이지 하단 번호 변경 작업
        let info = pageAlgoYoutube(ejsDataYoutube.length, 3, viewCount, btnId);
        pageBtnYoutube(info);
    }

});

