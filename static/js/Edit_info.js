//수정 버튼 기능
function Edit_info_update() {
    const form = document.getElementById('Edit_info');
    if (!form.name.checkValidity()) {
        // $('#name_check_sucess').html('<p style="color:red;">대소문자, 한글, 숫자, 2글자 이상 10글자 이하</p>');
        alert('닉네임을 양식에 맞춰 작성해주세요.');
    } else if (!form.pw.checkValidity()) {
        // $('#pw_check_sucess').html('<p style="color:red;">최소 5 자, 최소 하나의 문자, 숫자, 특수 문자 사용</p>');
        alert('비밀번호를 양식에 맞춰 작성해주세요.');
    } else {
        // const form = document.getElementById('Edit_info');
        //만약 pw 값이 같거나 name을 검사하면
        if (form.pw.value == form.rePw.value || form.name.checkValidity()) {
            //데이타에 변경할 목록만 보낸다. name, pw > name이나 pw만 바꾸려면
            // 1. name은 form.name.value (바뀌든 안바뀌든 입력값으로 수정)
            // 2. pw가 만약 값이 있으면, data객체의 "pw"값에 입력값을 보낸다.
            // 3. pw가 만약 값이 없으면, data객체에 값을 보내지 않는다 => 수정되지 않는다.
            const data = { name: form.name.value };
            if (form.pw.value != "") {
                data["pw"] = form.pw.value;
            } 

            axios({
                method: 'patch',
                url: '/Edit_info_update',
                data: data
            })
            .then((response) => {
                // var form = document.getElementById('Edit_info');
                form.name.value = response.data.name;
                window.location.href = "/";
                alert('정보 수정 성공');
            });
        } else {
            alert('형식에 맞지 않습니다.');
        };
    }
};

//닉네임 유효성 검사 name
function nickValidity(e) {
    if (e.value == '') {
        $('#name_check_sucess').html('<p style="color:red;">대소문자, 숫자, 2글자 이상 10글자 이하</p>');
    } else if (!e.checkValidity()) {
        $('#name_check_sucess').html('<p style="color:red;">대소문자, 숫자, 2글자 이상 10글자 이하</p>');
        return false;
    } else {
        $('#name_check_sucess').html('<p style="color:blue;">사용 가능한 닉네임입니다.</p>');
        
        // axios({
        //     method: 'post',
        //     url: '/check_name',
        //     data: { name: e.value }
        // })
        // .then((result) => {
        //     if (result.data) {
        //         $('#name_check_sucess').html('<p style="color:red;">중복된 닉네임입니다.</p>');
        //     } else {
        //         $('#name_check_sucess').html('<p style="color:blue;">사용 가능한 닉네임입니다.</p>');
        //     }
        // });
    }
}
//비밀번호 유효성 검사 pw
function pwValidity(e) {
    if (e.value == '') {
        $('#pw_check_sucess').html('<p style="color:red;">최소 5 글자, 최소 하나의 문자, 숫자, 특수 문자 사용</p>');
    } else if (!e.checkValidity()) {
        $('#pw_check_sucess').html('<p style="color:red;">최소 5 글자, 최소 하나의 문자, 숫자, 특수 문자 사용</p>');
        return false;
    } else {
        $('#pw_check_sucess').html('<p style="color:blue;">사용 가능한 비밀번호입니다.</p>');
    }
};

//비밀번호 재검사 rePw
function rePwValidity(e) {
    const form = document.getElementById('Edit_info');

    if (e.value == '') {
        $('#pw_check_sucess').html('<p style="color:red;">비밀번호가 일치하지 않습니다.</p>');
    }
    if (form.pw.value != form.rePw.value) {
        $('#pw_check_sucess').html('<p style="color:red;">비밀번호가 일치하지 않습니다.</p>');
    } else {
        $('#pw_check_sucess').html('<p style="color:blue;">비밀번호가 일치합니다.</p>');
    }
};

function delete_info() {
    const form = document.getElementById('Edit_info');

    const chooseMsg = confirm('회원 탈퇴 하시겠습니까?');
    if(chooseMsg) {
        axios({
        method: 'delete',
        url: '/user_delete',
        data: { id: form.id.value }
        })
        .then(() => {
            alert('회원 탈퇴가 완료되었습니다.');
            window.location.href = "/";
        });
    }
}
