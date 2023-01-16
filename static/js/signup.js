
//회원가입 검사 목록
let validity = {
    id: false,
    name: false,
    pw: false,
    rePw: false,
    e_mail: false,
    agree: false
};

function register() {
    const form = document.getElementById('signup_info');
    //배열 형식 호출 + 반복
    for (const [type, value] of Object.entries(validity)) {
        if (!value) {
            // console.log(validity);
            alert('형식에 맞지 않습니다.')
            return false;
        }
    }
    let user = {
        id: form.id.value,
        name: form.name.value,
        pw: form.pw.value,
        rePw: form.rePw.value,
        e_mail: form.e_mail.value
    }
    if (user.pw == user.rePw) {
        axios({
            method: 'post',
            url: '/signup',
            data: user
        })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                alert('회원가입 성공');
                window.location.href = "/";
            });
    } else {
        alert('양식에 맞게 입력해주세요.');
    }
}


//아이디 유효성 검사 id
function idValidity() {
    const form = document.getElementById('signup_info');
    if (!form.id.checkValidity()) {
        $('#id_check_sucess').html('<p style="color:red;"> 대소문자, 한글, 숫자, 3글자 이상 10글자 이하 </p>');
        return false;
    };
    // $('#id_check_sucess').html('');

    axios({
        method: 'post',
        url: '/check_id',
        data: { id: form.id.value }
    })
        .then((result) => {
            // console.log('아이디 중복 result : ', result);
            if (result.data) {
                $('#id_check_sucess').html('<p style="color:red;"> 중복된 아이디 입니다.</p>');
            } else {
                $('#id_check_sucess').html('<p style="color:blue;">사용 가능한 아이디 입니다.</p>');
                validity["id"] = true;
            }
        });

};

//닉네임 유효성 검사 name
function nickValidity(e) {
    if (!e.checkValidity()) {
        $('#name_check_sucess').html('<p style="color:red;"> 대소문자, 숫자, 2글자 이상 10글자 이하 </p>');
        return false;
    } else {
        $('#name_check_sucess').html('<p style="color:blue; visibility: hidden;">일치합니다.</p>');
        validity["name"] = true;
    }
    // $('#name_check_sucess').html('<p style="color:blue; visibility: hidden;">일치합니다.</p>');

    // axios({
    //     method: 'post',
    //     url: '/check_name',
    //     data: { name: e.value }
    // })
    // .then((result) => {
    //     if (result.data) {
    //         // $('#name_check_sucess').html('<p style="color:red;"> 중복된 닉네임 입니다.');
    //     } else {
    //         $('#name_check_sucess').html('<p style="color:blue; visibility: hidden;">일치합니다.</p>');
    //         validity["name"] = true;
    //     }
    // });
}

//비밀번호 유효성 검사 pw
function pwValidity(e) {
    if (!e.checkValidity()) {
        $('#pw_check_sucess').html('<p style="color:red;"> 최소 5 자, 최소 하나의 문자, 숫자, 특수 문자 사용 </p>');
        return false;
    };
    $('#pw_check_sucess').html('<p style="color:blue; visibility: hidden;">일치합니다.</p>');
    validity["pw"] = true;
};

//비밀번호 재검사 rePw
function rePwValidity(e) {
    // $('#pw_check_sucess').html('');

    const form = document.getElementById('signup_info');
    if (form.pw.value == form.rePw.value) {
        $('#pw_check_sucess').html('<p style="color:blue; visibility: hidden;">일치합니다.</p>');
        validity["rePw"] = true;
    } else {
        $('#pw_check_sucess').html('<p style="color:red;"> 비밀번호가 일치 하지 않습니다.</p>');
    }
}

//e-mail 유효성 검사 e_mail
function mailValidity(e){
    if (!e.checkValidity()) {
        $('#mail_check_sucess').html('<p style="color:red;"> 형식에 맞지 않습니다.</p>');
        return false;
    };

    $('#mail_check_sucess').html('<p style="color:blue; visibility: hidden;"> 맞습니다.</p>');

    axios({
        method: 'post',
        url: '/check_mail',
        data: { e_mail: e.value }
    })
        .then((result) => {
            if (result.data) {
                $('#mail_check_sucess').html('<p style="color:red;"> 중복된 이메일 입니다.</p>');
            } else {
                $('#mail_check_sucess').html('<p style="color:blue;">사용 가능한 이메일 입니다.</p>');
                validity["e_mail"] = true;
            };
        });
}
//개인정보 동의 유효성 검사

function agree_check() {
    const check_modal = new bootstrap.Modal('#check_modal');
    if ($('#agreeValidity').is(':checked')) {

        check_modal.show();
        validity["agree"] = true;
    } else {
        check_modal.hide();
        $('#agree_check_sucess').html('<p style="color:red;"> 개인정보 동의 부탁드립니다.</p>');
        validity["agree"] = false;
    };
};
