const { User } = require('../model/indexUser');
const { LikeSing } = require('../model/indexLikeSing');
const { Board } = require("../model/indexBoard");

//로그인 페이지
exports.login_main = (req, res) => {
    res.render('login');
}

//로그인 기능
exports.user_login = (req, res) => {
    User.findAll({
        where : { id : req.body.id, pw : req.body.pw },
        limit : 1
    }) 
    .then((result)=>{   
        console.log(result);
        if( result.length > 0 ){
            req.session.user = req.body.id;
            console.log( '세션 : ', req.session);
            res.send(true);
        }
        else {
            console.log('로그인 실패');
            res.send(false);
        } 
    });
};

//회원가입 페이지
exports.register = (req, res) => {
    res.render('signup');
};

//아이디 중복 체크
exports.check_id = async(req, res) => {
    console.log('중복체크 테스트, 아이디');
    let result = await User.findOne({
        where : { id : req.body.id }
    });
    if ( result != null ){
        //중복된 값이 있으면 true
        res.send (true);
    } else {
        res.send (false);
    };
};

//닉네임 중복 체크
exports.check_name = async(req, res) => {
    console.log('중복체크 테스트, 닉네임');
    console.log(req.body);
    let result = await User.findOne({
        where : { name : req.body.name }
    });

    if ( result != null ) res.send(true);
    else res.send(false);
};

//이메일 중복 체크
exports.check_mail = async(req, res) => {
    console.log('중복체크 테스트, 이메일');
    let result = await User.findOne({
        where : { e_mail : req.body.e_mail },
    });
    if ( result != null ){
        //중복된 이메일 ture
        res.send (true);
    } else {
        res.send (false);
    };
};

//회원가입 기능
exports.post_signup = (req,res) => {
    let data = {
        id : req.body.id,
        name : req.body.name,
        pw : req.body.pw,
        e_mail : req.body.e_mail
    };
    User.create(data)
    .then((result)=>{
        res.send(true);
    });
};

//로그아웃
exports.user_logout = (req, res) => {
    req.session.destroy(function (err){
        if(err) throw err ;
        res.send(true);
    });
};

//회원정보 가져오기
exports.Edit_info = async (req, res) => {
    let result = await User.findOne({
        where : { id : `${req.session.user}`}
    });
    if(result) {
        res.render('Edit_info', { data : result });
    } else {
        // res.send('false');
        res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
    }
}

//회원정보 수정
exports.Edit_info_update = async (req,res) => {
    console.log(req.body);
    let result = await User.update(req.body,
    { where : { id : `${req.session.user}` }
    });
    console.log(result);
    res.send({ data : result });
};

//회원 탈퇴
exports.user_delete = async (req, res) => {
    console.log('회원탈퇴 : ', req.session.user );
    let result = await User.destroy(
    { where : { id : `${req.session.user}` }}
    );
    await LikeSing.destroy(
        { where : { user_id : `${req.session.user}` }}
    );
    await Board.destroy(
        { where : { id : `${req.session.user}` }}
    );

    req.session.destroy(function (err){
        if(err) throw err ;
        res.send(true);
    });
};

//마이페이지
exports.mypage = async (req, res) => {
    let result = {id : req.session.user};

    // 세션 체크
    if(req.session.user) {
        result["isLogin"] = true;

        // 유저 name 체크
        let result2 = await User.findOne({
            where : { id : `${req.session.user}`}
        });
        // console.log(result2.user_img);

        // 프로필 이미지 파일이 없으면 기본 이미지 설정
        result['user_img'] = result2.user_img;
        if(!result2.user_img) {
            result2.user_img = 'd_img.png';
            result['user_img'] = 'd_img.png';
        }

        LikeSing.findAll({
            where: {
                user_id: `${req.session.user}`
            },
            order: [['no', 'DESC']]
        }).then((rows) => {
            // console.log(rows);
            // console.log(rows[0].album_img);

            if(rows.length < 4) {
                // console.log('4개이하');
                for(let i = 0; i < 4; i++) {
                    if(rows[i] === undefined) {
                        let likeData = {
                            user_id : '정보 없음',
                            title : '정보 없음',
                            singer : '정보 없음',
                            album_img : '/static/res/image/empty_list.jpg'
                        };

                        rows.push(likeData);
                        console.log('test', rows);
                    }
                }


                result["likesing"] = rows;
                // console.log(result.likesing[0].title);
                // res.render('mypage', { data : result2, result});
            
            } else {
                // 좋아요 4개 이상인 경우
                result["likesing"] = rows;
                // console.log(result.likesing[0].title);
                // res.render('mypage', { data : result2, result});

            }            

        }).then(() => {
            Board.findAll({
                where: {
                    id: `${req.session.user}`
                },
                order: [["number", "DESC"]],
            }).then((rows)=>{
                if(rows.length < 5) {
                    for(let i=0; i < 5; i++ ){
                        if((rows[i] === undefined)){
                            let boardData = {
                                number : '정보 없음',
                                title : '정보 없음',
                                id : '정보 없음',
                                content : '정보 없음',
                                filename : '정보 없음',
                                date : '정보 없음',
                                hit : '정보 없음'
                            };
                            rows.push(boardData);
                            console.log('boardData : ', boardData);
                        }
                    }
        
                    result["Board"] = rows;
                    res.render('mypage', { data : result2, result});
                }
                else {
                    result["Board"] = rows;
                    res.render('mypage', { data : result2, result});
                }
            });
        });
    } else {
        result["isLogin"] = false;
        res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
    }
  
};


//마이페이지 업로드 기능
exports.upload_file = (req, res) => {
    console.log("마이페이지 업로드 : ", req.file );
    if(req.file) {
        User.update({
            user_img : req.file.filename
        },
        { where :  { id : `${req.session.user}` } }
        );
        res.send({ path : req.file.filename });
    }
};




exports.user_profile_img = (userSession, cb) => {
    // 유저 name 체크
    User.findOne({
        where : { id : `${userSession}`}
    })
    .then((rows) => {
        // 프로필 이미지 파일이 없으면 기본 이미지 설정
        if(!rows.user_img) {
            rows.user_img = 'd_img.png';
        }
        cb(rows);
    });
}

