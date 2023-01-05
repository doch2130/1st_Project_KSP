window.addEventListener('DOMContentLoaded', event => {
    
    // 엔터키 이벤트 - JQuery, JavaScript
    $("#login_id").keydown( (key) => {
        if (key.key == "Enter" || key.keyCode == "13") {
            user_login();
        }
    });
    document.getElementById('login_pw').addEventListener('keydown', (key) => {
        if (key.key == "Enter" || key.keyCode == "13") {
            user_login();
        }
    });

});

window.user_login = () => {
    const form = document.getElementById('form_info');
    
    let user = {
        id : form.id.value,
        pw : form.pw.value
    }
    axios ({
        method : 'post',
        url : '/signin',
        data : user
    }).then((response)=>{
        // console.log(response);
        if( response.data == true ){
            alert('로그인 성공');
            //main페이지 연결
            window.location.href="/";
        }
        else {
            alert('로그인 실패');
            form.reset();
        }
    })
}