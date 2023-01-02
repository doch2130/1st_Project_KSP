    window.addEventListener('DOMContentLoaded', event => {

        // 게시물 페이지 보기 10개 고정
        let viewCount = 10;
        // console.log(viewCount);

        // 스크립트 데이터로 테이블 출력하는 함수
        function tableData(data, viewCount, btnId) {
            const tbody = document.querySelector('tbody');

            // 표 데이터 임시 저장 변수
            
            let temp = '';

            // 비교용 날짜 변수
            let date = new Date();
            
            // 데이터가 딱 맞게 viewCount에 나눠지는 데이터면 정상 출력이 되지만
            // 99개 처럼 나머지가 생기는 경우에는 데이터 부족으로 에러 호출 확인
            // if문 설정하여 btnId*viewCount가 data.length 보다 크면 조건문을 다르게 실행하도록 분기
            if(btnId*viewCount > data.length) {
                // viewCount에 따라 데이터 출력 실행

                let lastdata;
                if(data.length-btnId*viewCount < 0) {
                    lastdata = 0;
                } else {
                    lastdata = data.length-btnId*viewCount;
                }

                // 페이지 번호 변수
                let j = data.length-btnId*viewCount+viewCount;
                    
                for(let i=data.length-btnId*viewCount+viewCount-1; i >= lastdata; i--) {
                    temp += `<tr>
                        <td>${j}</td>
                        <td><a href="/board/read?number=${data[i].number}">${data[i].title}</a></td>
                        <td>${data[i].id}</td>`;

                    if(date.toLocaleDateString() === data[i].date.toLocaleDateString()) {
                        temp += `<td>${data[i].date.toString().slice(16, 21)}</td>`;
                    } else {
                        temp += `<td>${data[i].date.toLocaleDateString()}</td>`;
                    }

                    temp += `<td>${data[i].hit}</td>
                        </tr>`;
                    
                    // 페이지 번호 - 1
                    j--;
                }

            } else {
                // viewCount에 따라 데이터 출력 실행

                // 페이지 번호 변수
                let j = data.length-btnId*viewCount+viewCount;

                for(let i=data.length-btnId*viewCount+9; i >= data.length-btnId*viewCount; i--) {
                    temp += `<tr>
                        <td>${j}</td>
                        <td><a href="/board/read?number=${data[i].number}">${data[i].title}</a></td>
                        <td>${data[i].id}</td>`;

                    if(date.toLocaleDateString() === data[i].date.toLocaleDateString()) {
                        temp += `<td>${data[i].date.toString().slice(16, 21)}</td>`;
                    } else {
                        temp += `<td>${data[i].date.toLocaleDateString()}</td>`;
                    }

                    temp += `<td>${data[i].hit}</td>
                        </tr>`;

                    // 페이지 번호 - 1
                    j--;
                }

            }
            tbody.innerHTML = temp;
        }

        // ******처음 출력을 위한 초기 실행 함수******
        // 1번 실행해서 데이터 출력
        // 초기 실행이라서 btnId 변수 대신에 1값 고정
        tableData(ejsDataBoardList, viewCount, 1);

        // 페이지 버튼 출력을 위한 1차 작업 함수
        function pageAlgo(total, bottomSize, listSize, cursor){
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
        let info = pageAlgo(ejsDataBoardList.length, 3, viewCount, 1);

        // 페이지 버튼 출력 함수
        function pageBtn(info) {
            const pageBtn = document.getElementById('pageBtn');
            let temp ='';

            // disabled 조건 해제 - 2022-12-24 1300
            // 1번 페이지 인 경우 pre 버튼 dsabled 조건 걸기
            // if(info.cursor == 1) {
            //     temp += `<ul class="pagination justify-content-center">
            //     <li class="page-item disabled" style="cursor: text";>
            //         <a class="page-link">pre</a>
            //     </li>`;
            // } else {
                temp += `<ul class="pagination justify-content-center">
                <li class="page-item" onclick="pageBtnMove('1', ${viewCount})">
                    <a class="page-link">pre</a>
                </li>`;
            // }

            for (let i=info.firstBottomNumber; i <= info.lastBottomNumber; i++) {
                // 버튼 출력하다가 i가 현재 페이지랑 값이 같으면 현재 페이지 표시용 active 클래스 추가
                if (i == info.cursor) {
                    temp += `<li class='page-item active' onclick="pageBtnMove('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
                } else {
                    temp += `<li class='page-item' onclick="pageBtnMove('${i}', ${viewCount})"><a class="page-link">${i}</a></li>`;
                }
            }

            // disabled 조건 해제 - 2022-12-24 1300
            // 마지막 페이지 인 경우 next 버튼 disabled 조건 걸기
            // if(info.cursor == info.totalPageSize) {
            //     temp += `<li class="page-item disabled" style="cursor: text";>
            //             <a class="page-link">next</a>
            //         </li>
            //     </ul>`;
            // } else {
                temp += `<li class="page-item" onclick="pageBtnMove('${info.totalPageSize}', ${viewCount})">
                        <a class="page-link">next</a>
                    </li>
                </ul>`;
            // }
            pageBtn.innerHTML = temp;
        }

        // ******처음 출력을 위한 초기 실행 함수******
        // 페이지 버튼 출력 함수
        pageBtn(info);



        // 외부 JS 파일에서 작성하면 ejs 파일의 태그에서 이벤트를 인식 못하는 에러가 발생한다.
        // 그러나 widnow를 이용하여 함수를 작성하면 정상적으로 작동한다.
        // 하단 페이지 버튼 클릭 시 실행되는 함수
        window.pageBtnMove = (btnId, viewCount) => {
            // console.log(btnId);

            // 페이지 번호 클릭 후 새로운 데이터 출력
            tableData(ejsDataBoardList, viewCount, btnId);

            // 페이지 하단 번호 변경 작업
            let info = pageAlgo(ejsDataBoardList.length, 3, viewCount, btnId);
            pageBtn(info);
        }

    });

