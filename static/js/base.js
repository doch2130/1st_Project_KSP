window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    mypage_move = () => {
        document.location.href="/mypage";
    }

    // AOS 애니메이션 기본 설정
    AOS.init({
        duration: 1000
    });

    // 특정 위치 클래스 추가 완료
    // https://hianna.tistory.com/469
    // url에 따라서 추가 설정하면 될 듯
    // const nav = document.getElementsByClassName('nav-link');
    // console.log(nav);
    // nav[0].className += ' active';
    // console.log(window.location.pathname);

    // console.log(document.getElementsByClassName('collapse'));

    // 삭제
    // document.getElementById('ex').classList.remove('foo');

    // 속성 변경
    // document.getElementById('id_value').setAttribute('title', 'It is kkamikoon Title');
    // https://kkamikoon.tistory.com/entry/Javascript-%EC%9A%94%EC%86%8CElement%EC%9D%98-%EC%86%8D%EC%84%B1Attribute-%EA%B0%92-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

    // url에 따라서 SideNavBar Active 활성화
    if(window.location.pathname === '/allChart') {
        document.getElementsByClassName('nav-link')[0].className += ' active';

    } else if (window.location.pathname === '/youtubeRealChart') {
        document.getElementsByClassName('nav-link')[1].classList.remove('collapsed');
        document.getElementsByClassName('nav-link')[1].setAttribute('aria-expanded', 'true');
        document.getElementById('collapseLayouts').className += ' show';
        document.getElementsByClassName('nav-link')[2].className += ' active';

    } else if (window.location.pathname === '/youtubeMovieChart') {
        document.getElementsByClassName('nav-link')[1].classList.remove('collapsed');
        document.getElementsByClassName('nav-link')[1].setAttribute('aria-expanded', 'true');
        document.getElementById('collapseLayouts').className += ' show';
        document.getElementsByClassName('nav-link')[3].className += ' active';

    } else if (window.location.pathname === '/melonRealChart') {
        document.getElementsByClassName('nav-link')[4].classList.remove('collapsed');
        document.getElementsByClassName('nav-link')[4].setAttribute('aria-expanded', 'true');
        document.getElementById('collapseLayouts1').className += ' show';
        document.getElementsByClassName('nav-link')[5].className += ' active';

    } else if (window.location.pathname === '/melonDayChart') {
        document.getElementsByClassName('nav-link')[4].classList.remove('collapsed');
        document.getElementsByClassName('nav-link')[4].setAttribute('aria-expanded', 'true');
        document.getElementById('collapseLayouts1').className += ' show';
        document.getElementsByClassName('nav-link')[6].className += ' active';

    } else if (window.location.pathname === '/genieRealChart') {
        document.getElementsByClassName('nav-link')[7].classList.remove('collapsed');
        document.getElementsByClassName('nav-link')[7].setAttribute('aria-expanded', 'true');
        document.getElementById('collapseLayouts2').className += ' show';
        document.getElementsByClassName('nav-link')[8].className += ' active';

    } else if (window.location.pathname === '/genieMovieChart') {
        document.getElementsByClassName('nav-link')[7].classList.remove('collapsed');
        document.getElementsByClassName('nav-link')[7].setAttribute('aria-expanded', 'true');
        document.getElementById('collapseLayouts2').className += ' show';
        document.getElementsByClassName('nav-link')[9].className += ' active';

    } 

    if(window.location.pathname.includes('/board') === true) {
        document.getElementsByClassName('nav-link')[10].className += ' active';
    }

});

