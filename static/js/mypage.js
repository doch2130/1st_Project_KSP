window.addEventListener('DOMContentLoaded', event => {
    // 파일 업로드
    $('#upload_file').on('click', function(){
        $('#userfile').trigger('click');

        $('#userfile').change(function(){
            const form = document.getElementById('profile_info');
            const formData = new FormData(form);

            axios({
            method : 'post',
            url : '/upload_file',
            data :  formData,
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })
        // 무조건 data로 받는다.
        .then((a) => { return a.data ; })
        // 이미지경로 + path(req.file.filename)
        .then((reuslt) => {
            // console.log(reuslt);
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
        if(status === 'true') {
            const div_likeParent = e.parentElement;
            // console.log(div_likeParent.children[1].textContent);
            // console.log(div_likeParent.children[2].textContent);
            // console.log(div_likeParent.children[0].src);

            let chooseMsg;
            chooseMsg = confirm('좋아요를 삭제하시겠습니까?');
            // 좋아요 삭제
            if(chooseMsg) {
                axios({
                    method: 'post',
                    url: '/mypage/likeSingDelete',
                    data: {
                        likeTitle: div_likeParent.children[1].textContent,
                        likeSinger: div_likeParent.children[2].textContent,
                        likeImg: div_likeParent.children[0].src
                    }
                }).then((response) => {
                    // 모달 좋아요 리스트 1개 삭제
                    div_likeParent.remove();

                    // 마이 페이지(앨범 4개) 리스트 재출력
                    const love_img = document.getElementById('love_img');
                    let temp = '';
                    for (let i = 0; i <= 3; i++) {
                        temp += `<img src="${response.data.result.likesing[i].album_img}">`;
                    }
                    love_img.innerHTML = temp;
                    
                });
            }
        } else {
            alert('로그인 후 이용가능합니다.');
            document.location.href='/login';
        }
    }

});
