const youtubeFileFunction = require('./musicFileFunction/youtubeFileFunction');
const melonFileFunction = require('./musicFileFunction/melonFileFunction');
const genieFileFunction = require('./musicFileFunction/genieFileFunction');
const CuserFunction = require('./Cuser');

exports.main = async (req, res) => {
    let result = {id : req.session.user};

    // req.params.num이 무조건 undefiend 이여야 함으로 변수 설정
    const undefiendVar = undefined;

    // 멜론 실시간 차트
    let [melonData, filelist] = await melonFileFunction.melonFile(undefiendVar);
    if(melonData) {
        result['melondata'] = {data: melonData, filelist: filelist};

        // 2차 멜론 함수 종료 후 지니 데이터 함수 실행
        genieFileFunction.genieFileList( (geniefilelist) => {
            genieFileFunction.genieFileRead(geniefilelist, (geniedata) => {
                // console.log(data);
                if(geniedata) {
                    // 파일에서 읽어온 지니 데이터 저장
                    result["geniedata"] = {data: geniedata, filelist: geniefilelist};

                    // 3차 멜론 함수 종료 + 지니 함수 종료 후 유튜브 데이터 함수 실행
                    youtubeFileFunction.youtubeFileList( (youtubefilelist) => {
                        youtubeFileFunction.youtubeFileRead(youtubefilelist, (youtubedata) => {
                            // console.log(data);
                            if(youtubedata) {
                                // 파일에서 읽어온 유튜브 데이터 저장
                                result["youtubedata"] = {data: youtubedata, filelist: youtubefilelist};

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
                                
                            } else {
                                res.status(500).render('error/500');
                            }
                        });
                    });
                } else {
                    res.status(500).render('error/500');
                }
            });
        });
    } else {
        res.status(500).render('error/500');
    }
};
