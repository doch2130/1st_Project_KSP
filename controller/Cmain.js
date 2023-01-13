const youtubeFileFunction = require('./musicFileFunction/youtubeFileFunction');
const melonFileFunction = require('./musicFileFunction/melonFileFunction');
const genieFileFunction = require('./musicFileFunction/genieFileFunction');
const CuserFunction = require('./Cuser');

exports.main = async (req, res) => {
    let result = {id : req.session.user};

    // req.params.num이 무조건 undefiend 이여야 함으로 변수 설정
    const undefiendVar = undefined;

    // 멜론 실시간 차트
    let [melonData, melonFilelist] = await melonFileFunction.melonFile(undefiendVar);
    result['melondata'] = {data: melonData, filelist: melonFilelist};

    // 지니 실시간 차트
    let [genieData, genieFilelist] = await genieFileFunction.genieFile(undefiendVar);
    result["geniedata"] = {data: genieData, filelist: genieFilelist};

    // 유튜브 실시간 차트
    let [youtubeData, youtubeFilelist] = await youtubeFileFunction.youtubeFile(undefiendVar);
    result["youtubedata"] = {data: youtubeData, filelist: youtubeFilelist};

    // 데이터 없는 경우 error 페이지 출력
    if(!(melonData && genieData && youtubeData)) {
        res.status(500).render('error/500');
    } else {
        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;
            CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                // console.log('qwe ', userProfile.user_img);
                result['user_img'] = userProfile.user_img;
                res.render("index", {result});
            });
        } else {
            result["isLogin"] = false;
            result['user_img'] = 'd_img.png';
            res.render("index", {result});
        }
    }
};
