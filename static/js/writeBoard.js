function register() {
    var form = document.getElementById("form_write");
    var formData = new FormData(form);
    
    var form_content = document.getElementById('form_content');
    // console.log('title', form.title.value);
    // console.log('id', form.id.value);
    console.log(form_content.value.trim());
    if(form.title.value.trim() == '') {
        alert('제목을 입력하여 주세요.');
    } else if(form_content.value.trim() == '') {
        alert('내용을 입력하여 주세요.');
    } else {
        axios({
            method: 'post',
            url: '/board/write',
            data :  formData,
            headers : {
            'Content-Type': 'multipart/form-data'
    
        }
        }).then((rep) => {return rep.data;} )
            .then((data) => {
            if( data ) {
                alert( "작성 완료" );
                document.location.href='/board';
            }                                    
        })
        // .then((rep) => {
        //     if( rep.data ) {
        //         alert( "작성 완료" );
        //         document.location.href='/board';
        //     }                                    //위에 방식이랑 같은건데 다른 표현방법
        // })
        .catch((err) => {
            alert( "알 수 없는 문제가 발생했습니다." );
            //다른파일이 들어오면 catch로 오류발생!
        });
    }
    
}
