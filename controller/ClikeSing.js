const { LikeSing } = require('../model/index');

exports.LikeSingSearch = (userSession, cb) => {
    if(userSession === undefined) {
        cb('');
    } else {
        LikeSing.findAll({
            where: {
                user_id: userSession
            }
        }).then((rows) => {
            // 처음 사용자는 좋아요 등록이 없으므로 Error 발생확인
            // 초기 값으로 데이터 저장
            if(rows[0] === undefined) {
                const data = {
                    "albumImg": '',
                    "title": '',
                    "singer": '',
                }
                rows.push(data);
            }
            cb(rows);
        });
    }
}

// 좋아요 등록
exports.LikeSingRegister = (req, res) => {
    LikeSing.create({
        user_id: req.session.user,
        title: req.body.likeTitle,
        singer: req.body.likeSinger,
        album_img: req.body.likeImg
    })
    .then((result) => {
        if(result) {
            res.send(true);
        }
    })
    .catch((err) => {
        throw err;
    });
}

// 좋아요 삭제
exports.LikeSingDelete = (req, res) => {
    LikeSing.destroy({
        where: {
            user_id: req.session.user,
            title: req.body.likeTitle,
            singer: req.body.likeSinger
        }
    })
    .then((result) => {
        if(result) {
            res.send(true);
        }
    })
    .catch((err) => {
        throw err;
    });
}

// 마이 페이지 좋아요 삭제
exports.Mypage_LikeSingDelete = (req, res) => {
    let result = {id : req.session.user};

    // 좋아요 삭제
    LikeSing.destroy({
        where: {
            user_id: req.session.user,
            title: req.body.likeTitle,
            singer: req.body.likeSinger
        }
    })
    .then(() => {
        // 마이 페이지 좋아요 리스트(4개) 재출력
        LikeSing.findAll({
            where: {
                user_id: `${req.session.user}`
            },
            order: [['no', 'DESC']]
        }).then((rows) => {
            // console.log(rows);
        
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
                    }
                }
                result["likesing"] = rows;
                res.send({result});
            } else {
                // 좋아요 4개 이상인 경우
                result["likesing"] = rows;
                res.send({result});
            }
        })
        .catch((err) => {
            throw err;
        });

    })
    .catch((err) => {
        throw err;
    });
}

// Chart 페이지 viewCount 변경 후 정보 갱신
// Chart 페이지 버튼 이동할 때 마다 호출
exports.LikeSing_ReSearch = (req, res) => {
    if(req.session.user === undefined) {
        res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
    } else {
        LikeSing.findAll({
            where: {
                user_id: req.session.user
            }
        }).then((rows) => {
            // 처음 사용자는 좋아요 등록이 없으므로 Error 발생확인
            // 초기 값으로 데이터 저장
            if(rows[0] === undefined) {
                const data = {
                    "albumImg": '',
                    "title": '',
                    "singer": '',
                }
                rows.push(data);
            }
            let result = {likesing : rows};
            res.send({result});
        });
    }
};
