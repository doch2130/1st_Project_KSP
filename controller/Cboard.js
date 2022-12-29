const { Board } = require("../model/indexBoard");
const CuserFunction = require('./Cuser');
const fs =require("fs").promises;

exports.index = (req,res) => {
    let result = {id : req.session.user};
    // res.render("list", {data: result });

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
            // res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
            res.render("basicBoard", {data: result2, result });
        }

        // res.render("basicBoard", {data: result2, result });
    })
    
}
//첨에 res.render("list", {data: result });라고 적었는데 오류나서 Board.findOne으로 적었는데 또 오류나서 Board.findAll쓰니까 해결됨..


exports.write = (req,res) => {
    let result = {id : req.session.user};

    // 세션 체크용
    if(req.session.user) {
        result["isLogin"] = true;
    } else {
        result["isLogin"] = false;
    }

    // 세션 체크
    if(req.session.user) {
        result["isLogin"] = true;
        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
            result['user_img'] = userProfile.user_img;
            res.render("writeBoard", {result});
        });
    } else {
        result["isLogin"] = false;
        // res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        res.render("writeBoard", {result});
    }

    // res.render("writeBoard", {result});
}

exports.write_data = (req, res) => {
    console.log( req.file );
    let data = {
       title: req.body.title,
       id: req.session.user,
       // id: req.session.user //세션 req.session.user = req.body.id;  이런식으로 나중에 넣기!
       content: req.body.content,
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
   })
}
exports.read = (req,res) => {
    let result = {id : req.session.user};

    Board.increment({hit: 1}, {where: {number: req.query.number}}); //조회수 증가시키는 코드 
    Board.findOne({
        where : { 
            number: req.query.number
        } 
    })
    .then((result3) => {
        // res.render("readBoard", {data: result3, result });

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;
            CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                result['user_img'] = userProfile.user_img;
                res.render("readBoard", {data: result3, result });
            });
        } else {
            result["isLogin"] = false;
            // res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
            res.render("readBoard", {data: result3, result });
        }
    });
}

exports.delete = (req, res) => {
    Board.destroy({
        where: { number: req.body.number }
    })
   .then((result)=>{
         console.log(result);
         res.send(true);
   })
}

//리드보드에서 업데이트보드로 /user/update?number=<%=data.number%>에서 ?뒤에있는 부분 넘겨주는 방법임.
exports.update_number = (req,res) => {
    console.log( req.query.number );
    let result = {id : req.session.user};
    Board.findOne({
        where : { 
            number: req.query.number
            //튜플에 있는 number에 맞는 게시글을 하나 가져온다
        } 
    })
    .then((result4) => {
        // if(req.session.user) {
        //     result["isLogin"] = true;
        // } else {
        //     result["isLogin"] = false;
        // }
        // console.log(result)
        // res.render("updateBoard", {data: result4, result });
        //업데이트보드에 데이터를 결과로 뿌려준다


        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;
            CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                result['user_img'] = userProfile.user_img;
                res.render("updateBoard", {data: result4, result });
            });
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
            // res.render("updateBoard", {data: result4, result });
        }
    })
}

exports.update = (req, res) => {
    console.log( "user+_update");
    console.log('test', req.file);
    let data = {
        title: req.body.title,
        id : req.body.id,
        content : req.body.content
    }
    if ( req.file ) data["filename"] = req.file.filename;

    Board.update(data, {
        where: {number: req.body.number}
    })
    .then((result)=>{
        console.log(result);
        // res.send({path: req.file.path}); 이건 파일 이미지를 보여줄때 사용하는 방법 
        // res.send({result: result, path: req.file.path}); send로 두개보내는법
        res.send(result);
        //업데이트보드에서 수정버튼누르고나서 진행될 동작들~~~
        //데이터가 타이틀,아이디,컨텐츠,넘버 총 4갠데 ejs upate함수에서 data에 넘버 빼먹어서 오류났었음 
    })
}





// 파일 있으면 코드 실행
// if(req.file) {
//     User.update({
//         user_img : req.file.filename
//     },
//     { where :  { id : `${req.session.user}` } }
//     );
//     res.send({ path : req.file.filename });
// }