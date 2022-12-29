window.addEventListener('DOMContentLoaded', event => {
    // 파일 업로드
    $('#upload_file').on('click', function(){
        $('#userfile').trigger('click');

        $('#userfile').change(function(){
            var form = document.getElementById('profile_info');
            var formData = new FormData(form);

            axios({
            method : 'post',
            url : '/upload_file',
            data :  formData,
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })
        //무조건 data로 받는다.
        .then((a) => { return a.data ; })
        //이미지경로 + path(req.file.filename)
        .then((reuslt) => {
            console.log(reuslt);
            document.getElementById('profile_img').src = "static/profile_img/" + reuslt.path;
            document.getElementById('profile_img_mypage').src = "static/profile_img/" + reuslt.path;
        });
      });        
     });

    //  modal 창 열기
     const like_modal = new bootstrap.Modal('#like_modal');
     $('#love_img').click(function(){
        $('#like_modal').removeClass("d-none");
        like_modal.show();
     });

     // 마이 페이지 좋아요 삭제 이벤트
     window.Mypage_likeSingEvent = (e, status) => {
        // e 이벤트 대상
        // status 세션 유무 체크
        // console.log(status);
        // console.log(typeof(status));

        if(status === 'true') {
            // console.log(e);
            // console.log(e.src);
            // console.log(flag);
            // console.log(e.parentElement.parentElement);
            const li_likeParent = e.parentElement.parentElement;
            // console.log(li_likeParent);

            // 타이틀
            // console.log(li_likeParent.children[1].textContent.trim());
            // 가수
            // console.log(li_likeParent.children[3].textContent.trim());
            // 앨범 이미지
            // console.log(li_likeParent.children[0].querySelector('img').src);

            // const img = document.createElement('img');

            let chooseMsg;
            chooseMsg = confirm('좋아요를 삭제하시겠습니까?');
            // 좋아요 삭제
            if(chooseMsg) {
                axios({
                    method: 'post',
                    url: '/mypage/likeSingDelete',
                    data: {
                        likeTitle: li_likeParent.children[1].textContent,
                        likeSinger: li_likeParent.children[3].textContent,
                        likeImg: li_likeParent.children[0].querySelector('img').src
                    }
                }).then((response) => {
                    // console.log('b', response);

                    // 모달 좋아요 리스트 1개 삭제
                    li_likeParent.remove();

                    // 마이 페이지(앨범 4개) 리스트 재출력
                    const love_img = document.getElementById('love_img');
                    // console.log(document.getElementById('love_img').querySelectorAll('a'));
                    // console.log(document.getElementById('love_img').querySelectorAll('a')[1]);
                    for (let i = 0; i <= 3; i++) {
                        love_img.querySelectorAll('a')[i].innerHTML = `
                        <img src="${response.data.result.likesing[i].album_img}">`
                    }
                    
                });
            }

        } else {
            alert('로그인 후 이용가능합니다.');
            document.location.href='/login';
        }
    }

});


