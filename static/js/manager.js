window.addEventListener('DOMContentLoaded', event => {
    manger_login = () => {
        const manager_form = document.getElementById('manager_form');

        axios({
            method: 'post',
            url: '/manager/login',
            data: {
                id: manager_form.id.value,
                pw: manager_form.pwd.value
            }
        }).then((response) => {
            if(response.data) {
                const main = document.getElementById('main');
                let temp = `<div>
                    <button type="button" class="btn btn-primary" onclick="crawling_melon()">멜론 Top 100 크롤링</button>
                    <button type="button" class="btn btn-primary" onclick="crawling_melonDay()">멜론 일간 크롤링</button>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" onclick="crawling_genie()">지니 Top 100 크롤링</button>
                    <button type="button" class="btn btn-primary" onclick="crawling_genieMovie()">지니 뮤직 비디오 크롤링</button>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" onclick="crawling_youtube()">유튜브 Top 100 크롤링</button>
                    <button type="button" class="btn btn-primary" onclick="crawling_youtubeMovie()">유튜브 뮤직 비디오 크롤링</button>
                </div>
                <div style="margin-top: 1rem;">
                    <p id="crawling_text"></p>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" onclick="home()" >HOME</button>
                </div>`;

                main.innerHTML = temp;
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                manager_form.reset();
            }
        })
    }

    crawling_melon = () => {
        const crawling_text = document.getElementById('crawling_text');
        crawling_text.innerHTML = "<span>멜론 실시간 데이터 수집 진행 중입니다.</span>"

        const mangerBtn = document.querySelectorAll('button');
        for (let i=0; i < mangerBtn.length; i++) {
            mangerBtn[i].setAttribute('disabled', true);
        }
        axios({
            method: 'post',
            url: '/crawling/melon',
        }).then((response) => {
            // const crawling_text = document.getElementById('crawling_text');
            if(response.data) {
                // alert('데이터 수집에 성공하였습니다.');
                crawling_text.innerHTML = "<span style='color' blue;'>멜론 실시간 데이터 수집에 성공 하였습니다.</span>"
            } else {
                // alert('멜론 실시간 데이터 수집에 실패하였습니다.');
                crawling_text.innerHTML = "<span style='color: red;'>멜론 실시간 데이터 수집에 실패하였습니다.</span>"
            }

            for (let i=0; i < mangerBtn.length; i++) {
                mangerBtn[i].removeAttribute('disabled');
            }
        });
    }
    crawling_melonDay = () => {
        const crawling_text = document.getElementById('crawling_text');
        crawling_text.innerHTML = "<span>멜론 일간 데이터 수집 진행 중입니다.</span>"

        const mangerBtn = document.querySelectorAll('button');
        for (let i=0; i < mangerBtn.length; i++) {
            mangerBtn[i].setAttribute('disabled', true);
        }
        axios({
            method: 'post',
            url: '/crawling/melonday',
        }).then((response) => {
            // const crawling_text = document.getElementById('crawling_text');
            if(response.data) {
                // alert('데이터 수집에 성공하였습니다.');
                crawling_text.innerHTML = "<span style='color' blue;'>멜론 일간 데이터 수집에 성공하였습니다.</span>"
            } else {
                // alert('멜론 일간 데이터 수집에 실패하였습니다.');
                crawling_text.innerHTML = "<span style='color: red;'>멜론 일간 데이터 수집에 실패하였습니다.</span>"
            }

            for (let i=0; i < mangerBtn.length; i++) {
                mangerBtn[i].removeAttribute('disabled');
            }
        });
    }
    crawling_genie = () => {
        const crawling_text = document.getElementById('crawling_text');
        crawling_text.innerHTML = "<span>지니 실시간 데이터 수집 진행 중입니다.</span>"

        const mangerBtn = document.querySelectorAll('button');
        for (let i=0; i < mangerBtn.length; i++) {
            mangerBtn[i].setAttribute('disabled', true);
        }
        axios({
            method: 'post',
            url: '/crawling/genie',
        }).then((response) => {
            // const crawling_text = document.getElementById('crawling_text');
            if(response.data) {
                // alert('데이터 수집에 성공하였습니다.');
                crawling_text.innerHTML = "<span style='color' blue;'>지니 실시간 데이터 수집에 성공하였습니다.</span>"
            } else {
                // alert('지니 실시간 데이터 수집에 실패하였습니다.');
                crawling_text.innerHTML = "<span style='color: red;'>지니 실시간 데이터 수집에 실패하였습니다</span>"
            }

            for (let i=0; i < mangerBtn.length; i++) {
                mangerBtn[i].removeAttribute('disabled');
            }
        });
    }
    crawling_genieMovie = () => {
        const crawling_text = document.getElementById('crawling_text');
        crawling_text.innerHTML = "<span>지니 뮤직 비디오 데이터 수집 진행 중입니다.</span>"

        const mangerBtn = document.querySelectorAll('button');
        for (let i=0; i < mangerBtn.length; i++) {
            mangerBtn[i].setAttribute('disabled', true);
        }
        axios({
            method: 'post',
            url: '/crawling/genieMovie',
        }).then((response) => {
            // const crawling_text = document.getElementById('crawling_text');
            if(response.data) {
                // alert('데이터 수집에 성공하였습니다.');
                crawling_text.innerHTML = "<span style='color' blue;'>지니 뮤직 비디오 데이터 수집에 성공하였습니다.</span>"
            } else {
                // alert('지니 뮤직 비디오 데이터 수집에 실패하였습니다.');
                crawling_text.innerHTML = "<span style='color: red;'>지니 뮤직 비디오 데이터 수집에 실패하였습니다.</span>"
            }

            for (let i=0; i < mangerBtn.length; i++) {
                mangerBtn[i].removeAttribute('disabled');
            }
        });
    }
    crawling_youtube = () => {
        const crawling_text = document.getElementById('crawling_text');
        crawling_text.innerHTML = "<span>유튜브 실시간 데이터 수집 진행 중입니다.</span>"

        const mangerBtn = document.querySelectorAll('button');
        for (let i=0; i < mangerBtn.length; i++) {
            mangerBtn[i].setAttribute('disabled', true);
        }
        axios({
            method: 'post',
            url: '/crawling/youtube',
        }).then((response) => {
            // const crawling_text = document.getElementById('crawling_text');
            if(response.data) {
                // alert('데이터 수집에 성공하였습니다.');
                crawling_text.innerHTML = "<span style='color' blue;'>유튜브 실시간 데이터 수집에 성공하였습니다.</span>"
            } else {
                // alert('유튜브 실시간 데이터 수집에 실패하였습니다.');
                crawling_text.innerHTML = "<span style='color: red;'>유튜브 실시간 데이터 수집에 실패하였습니다.</span>"
            }

            for (let i=0; i < mangerBtn.length; i++) {
                mangerBtn[i].removeAttribute('disabled');
            }
        });
    }
    crawling_youtubeMovie = () => {
        const crawling_text = document.getElementById('crawling_text');
        crawling_text.innerHTML = "<span>유튜브 뮤직 비디오 데이터 수집 진행 중입니다.</span>"

        const mangerBtn = document.querySelectorAll('button');
        for (let i=0; i < mangerBtn.length; i++) {
            mangerBtn[i].setAttribute('disabled', true);
        }
        axios({
            method: 'post',
            url: '/crawling/youtubeMovie',
        }).then((response) => {
            // const crawling_text = document.getElementById('crawling_text');
            if(response.data) {
                // alert('유튜브 뮤직 비디오 데이터 수집에 성공하였습니다.');
                crawling_text.innerHTML = "<span style='color' blue;'>유튜브 뮤직 비디오 데이터 수집에 성공하였습니다.</span>"
            } else {
                // alert('유튜브 뮤직 비디오데이터 수집에 실패하였습니다.');
                crawling_text.innerHTML = "<span style='color: red;'>유튜브 뮤직 비디오데이터 수집에 실패하였습니다.</span>"
            }

            for (let i=0; i < mangerBtn.length; i++) {
                mangerBtn[i].removeAttribute('disabled');
            }
        });
    }

    home = () => {
        document.location.href = '/';
    }
});
