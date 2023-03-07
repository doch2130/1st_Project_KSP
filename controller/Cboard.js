const { Board, BoardComment, BoardNestedComment } = require('../model/index');
const CuserFunction = require('./Cuser');

exports.index = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        Board.findAll({
            order: [["number", "ASC"]],
        })
        .then((result2) => {
            // 세션 체크
            if(req.session.user) {
                result["isLogin"] = true;
                CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                    result['user_img'] = userProfile.user_img;
                    res.render("basicBoard", {data: result2, result });
                });
            } else {
                result["isLogin"] = false;
                result['user_img'] = 'd_img.png';
                res.render("basicBoard", {data: result2, result });
            }
        });
    } catch (err) {
        next(err);
    }
}
// 첨에 res.render("list", {data: result });라고 적었는데
// 오류나서 Board.findOne으로 적었는데 또 오류나서 Board.findAll쓰니까 해결됨..

exports.write = (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;
            CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                result['user_img'] = userProfile.user_img;
                res.render("writeBoard", {result});
            });
        } else {
            result["isLogin"] = false;
            result['user_img'] = 'd_img.png';
            res.render("writeBoard", {result});
        }
    } catch (err) {
        next(err);
    }
}

exports.write_data = (req, res, next) => {
    try {
        // console.log( req.file );
        let data = {
        title: req.body.title,
        id: req.session.user,
        // id: req.session.user //세션 req.session.user = req.body.id;  이런식으로 나중에 넣기!
        // content에서 엔터키 입력 저장 시 에러 발생 확인
        // mysql 저장 할 때 엔터 키를 <br /> 로 변경하여 저장
        content: req.body.content.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
        hit: 0
        //글조회 페이지ejs에 함수로 넣어서 클릭하면 조회수올라가게!하고 ejs에서 컨트롤러쪽으로 요청보내면 컨트롤러에서 조회수 올리도록..(?) 날짜올라가는거 전에 배운거~~  req.body서버로 보낸거 응답개수랑 ejs에서 title,content처럼 보내준 갯수랑 일치해야되는거임.
        //id랑 hit은 서버에서 보내주고있는값이아니라 알아서 들어오기때문에 안맞춰줘도 됨 
        }
        if ( req.file ) data["filename"] = req.file.filename;
        // req.file 이 있다는 것은 파일을 업로드했다는 것
        // let data라는 객체 안에 req.file 이 있으면, 즉 파일을 업로드했으면, data 라는 객체에 filename 이라는 key로 req.file.filename( 내가 업로드한 파일 이름 ) 을 넣어서 만들어라.
        Board.create(data)
        .then((result)=>{
        res.send(String(result));
    });
    } catch (err) {
        next(err);
    }
}

exports.read = (req, res, next) => {
    try {
        let result = {id : req.session.user};

        Board.increment({hit: 1}, {where: {number: req.query.number}}); //조회수 증가시키는 코드 
        Board.findOne({
            where : { 
                number: req.query.number
            } 
        })
        .then((resultBoard) => {
            // DB에 저장된 <br/> 태그를 출력할 때는 \r\n 으로 다시 변경하여 출력
            resultBoard.content = resultBoard.content.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
            result['Board'] = resultBoard;

            BoardComment.findAll({
                where: {
                    boardnumber: req.query.number
                },
                order: [["number", "DESC"]]
            })
            .then((resultComment) => {
                for (let i = 0; i < resultComment.length; i++) {
                    resultComment[i].content = resultComment[i].content.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
                }
                result['comment'] = resultComment;

                BoardNestedComment.findAll({
                    where: {
                        boardnumber: req.query.number
                    },
                    order: [["number", "DESC"]]
                })
                .then((resultNestedComment) => {
                    // console.log(resultNestedComment);
                    // console.log(resultNestedComment[0].content);
                    for (let i = 0; i < resultNestedComment.length; i++) {
                        resultNestedComment[i].content = resultNestedComment[i].content.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
                    }
                    result['nestedComment'] = resultNestedComment;

                    // 세션 체크
                    if(req.session.user) {
                        result["isLogin"] = true;
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            // res.render("readBoard", {data: result3, result });
                            res.render("readBoard", { result });
                        });
                    } else {
                        result["isLogin"] = false;
                        result['user_img'] = 'd_img.png';
                        // res.render("readBoard", {data: result3, result });
                        res.render("readBoard", { result });
                    }
                });
            });
        });
    } catch (err) {
        next(err);
    }
}

exports.delete = (req, res, next) => {
    try {
        Board.destroy({
            where: { number: req.body.number }
        })
        .then(()=>{
            res.send(true);
        });
    } catch (err) {
        next(err);
    }
}

//리드보드에서 업데이트보드로 /user/update?number=<%=data.number%>에서 ?뒤에있는 부분 넘겨주는 방법임.
exports.update_number = (req, res, next) => {
    try {
        // console.log( req.query.number );
        let result = {id : req.session.user};
        Board.findOne({
            where : { 
                number: req.query.number
                //튜플에 있는 number에 맞는 게시글을 하나 가져온다
            } 
        })
        .then((result4) => {
            // 세션 체크
            if(req.session.user) {
                result["isLogin"] = true;
                CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                    result['user_img'] = userProfile.user_img;
                    result4.content = result4.content.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
                    res.render("updateBoard", {data: result4, result });
                });
            } else {
                result["isLogin"] = false;
                result['user_img'] = 'd_img.png';
                res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
            }
        });
    } catch (err) {
        next(err);
    }
}

exports.update = (req, res, next) => {
    try {
        // console.log( "user+_update");
        // console.log('test', req.file);
        let data = {
            title: req.body.title,
            id : req.body.id,
            // 내용 업데이트 할 때도 엔터 키로 인한 에러 안생기게 <br />로 변경 후 데이터베이스 저장
            content: req.body.content.replace(/(?:\r\n|\r|\n)/g, '<br/>')
        }
        if ( req.file ) data["filename"] = req.file.filename;

        Board.update(data, {
            where: {number: req.body.number}
        })
        .then((result)=>{
            // console.log(result);
            res.send(result);
            //업데이트보드에서 수정버튼누르고나서 진행될 동작들~~~
            //데이터가 타이틀,아이디,컨텐츠,넘버 총 4갠데 ejs upate함수에서 data에 넘버 빼먹어서 오류났었음 
        });
    } catch (err) {
        next(err);
    }
}


// 댓글 등록
exports.commentWrite = (req, res, next) => {
    try {
        let result = {id : req.session.user};
        const data = {
            id: req.session.user,
            boardnumber: req.body.boardNumber,
            content: req.body.content.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
            updateflag: '0'
        }

        BoardComment.findAll({
            where: {
                boardnumber: req.body.boardNumber
            }
        })
        .then((rows) => {
            result['commentList'] = rows;

            BoardComment.create(data)
            .then((rows) => {
                // console.log(rows);
                result['comment'] = rows;
                res.send(result);
            });
        });
    } catch (err) {
        next(err);
    }
}

// 댓글 삭제
exports.commentDelete = (req, res, next) => {
    try {
        let result = {id : req.session.user};
        BoardComment.destroy({
            where: {number: req.body.commentNumber}
        })
        .then(async () => {
            result['nestedCommentList'] = await BoardNestedComment.findAll({
                where: {
                    boardnumber: req.body.boardNumber
                }
            });
            result['commentList'] = await BoardComment.findAll({
                where: {
                    boardnumber: req.body.boardNumber
                }
            });
            res.send(result);
        });
    } catch (err) {
        next(err);
    }
}

// 댓글 수정
exports.commentUpdate = (req, res, next) => {
    try {
        let data = {
            content: req.body.commentContent.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
            updateflag: '1'
        }

        BoardComment.update(data, {
            where: {number: req.body.commentNumber}
        })
        .then((result) => {
            res.send(result);
        });
    } catch (err) {
        next(err);
    }
}

// 대댓글 답글 작성
exports.nestedCommentWrite = (req, res, next) => {
    try {
        let result = {id : req.session.user};
        const data = {
            id: req.session.user,
            boardnumber: req.body.boardNumber,
            commentnumber: req.body.commentNumber,
            content: req.body.nestedComment.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
            updateflag: '0'
        }
        BoardNestedComment.create(data)
        .then((rows) => {
            result['create'] = rows;
            BoardNestedComment.findAll({
                where: {
                    boardnumber: req.body.boardNumber,
                    commentnumber: req.body.commentNumber,
                },
                order: [["number", "DESC"]]
            })
            .then((rows) => {
                result['list'] = rows;
                res.send(result);
            });
        });
    } catch (err) {
        next(err);
    }
}

// 대댓글 답글 삭제
exports.nestedCommentDelete = (req, res, next) => {
    try {
        BoardNestedComment.destroy({
            where: {number: req.body.nestedCommentNumber}
        })
        .then(() => {
            res.send(true);
        });
    } catch (err) {
        next(err);
    }
}

// 대댓글 및 답글 수정
exports.nestedCommentUpdate = (req, res, next) => {
    try {
        const data = {
            content: req.body.nestedCommentContent.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
            updateflag: '1'
        }

        BoardNestedComment.update(data, {
            where: {number: req.body.nestedCommentNumber}
        })
        .then((result) => {
            res.send(result);
        });
    } catch (err) {
        next(err);
    }
}
