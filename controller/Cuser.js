const { User, LikeSing, Board } = require('../model/index');
const fs = require('fs');

//로그인 페이지
exports.login_main = (req, res) => {
    res.render('login');
};

//로그인 기능
exports.user_login = (req, res) => {
    User.findAll({
        where : { id : req.body.id, pw : req.body.pw },
        limit : 1
    }) 
    .then((result)=>{   
        if( result.length > 0 ){
            req.session.user = req.body.id;
            res.send(true);
        }
        else {
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
// exports.check_name = async(req, res) => {
//     let result = await User.findOne({
//         where : { name : req.body.name }
//     });

//     if ( result != null ) {
//         res.send(true);
//     }
//     else {
//         res.send(false);
//     }
// };

//이메일 중복 체크
exports.check_mail = async(req, res) => {
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
    .then(()=>{
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
        res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
    }
};

//회원정보 수정
exports.Edit_info_update = async (req,res) => {
    let result = await User.update(req.body,
    { where : { id : `${req.session.user}` }
    });

    res.send({ data : result });
};

//회원 탈퇴
exports.user_delete = async (req, res) => {
    // 탈퇴 전에 프로필 이미지 있는지 체크
    let result = await User.findOne({
        where : { id : `${req.session.user}`}
    });

    // 프로필 이미지가 있는 user 이면 프로필 이미지도 삭제
    if(result.user_img) {
        fs.unlink('./static/res/profile_img/' + result.user_img, err => {
            if (err) throw err;
        });
    }

    await User.destroy(
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
            if(rows.length < 4) {
                for(let i = 0; i < 4; i++) {
                    if(rows[i] === undefined) {
                        let likeData = {
                            user_id : '정보 없음',
                            title : '정보 없음',
                            singer : '정보 없음',
                            album_img : '/static/res/image/empty_list.jpg'
                        };
                        rows.push(likeData);
                    }
                }

                result["likesing"] = rows;            
            } else {
                // 좋아요 4개 이상인 경우
                result["likesing"] = rows;
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
// exports.upload_file = (req, res) => {
//     if(req.file) {
//         User.update({
//             user_img : req.file.filename
//         },
//         { where :  { id : `${req.session.user}` } }
//         );
//         // res.send({ path : req.file.filename });
//         res.send({ path : req.file.filename, err : false });
//     }
// };

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
};


// 마이 페이지 업로드 설정
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/res/profile_img/');
     },
    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const ext = path.extname(file.originalname);
        cb(null, req.session.user + ext);
     }
})

const fileFilter = (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"])
     // mime type 체크하여 원하는 타입만 필터링
    // console.log('사이즈 ', fileSize);
    // console.log(file.mimetype);
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
        if (fileSize <= 3500000) {
        // if (fileSize <= 1048576) {
            cb(null, true);
        } else {
            cb({msg: '3MB 이하 파일만 업로드 가능합니다.'}, false);
        }
    } else {
        cb({msg: 'jpg, jpeg, png 파일만 업로드 가능합니다.'}, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 3500000 } }).single("img");
// const upload = multer({ storage: storage, fileFilter: fileFilter }).single("img");

//마이페이지 업로드 기능
exports.upload_file = (req, res) => {
    upload(req, res, (err) => {
        // console.log(req.file);
        // console.log('err msg: ', err.msg);
        if (err) {
            res.send({ path: undefined , flag: true, err });
        }
        else {

            if(req.file) {
                User.update({
                    user_img : req.file.filename
                },
                { where :  { id : `${req.session.user}` } }
                );
                res.send({ path: req.file.filename, flag: false, err: false });
            }
        }
    })
};
