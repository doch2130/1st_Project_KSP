const allChartFileFunction = require('./musicFileFunction/allChartFileFunction');
const youtubeFileFunction = require('./musicFileFunction/youtubeFileFunction');
const melonFileFunction = require('./musicFileFunction/melonFileFunction');
const genieFileFunction = require('./musicFileFunction/genieFileFunction');
const ClikeSingFunction = require('./ClikeSing');
const CgraphFunction = require('./Cgraph');
const CuserFunction = require('./Cuser');

// 차트 모아보기 - async + await로 작성하기
exports.allChart = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const melondata = await allChartFileFunction.melon_All_File();
            result["melondata"] = {data: melondata};

            const melonDaydata = await allChartFileFunction.melon_ALL_Day_File();
            result["melonDaydata"] = {data: melonDaydata};

            const geniedata = await allChartFileFunction.genie_All_File();
            result["geniedata"] = {data: geniedata};

            const genieMoviedata = await allChartFileFunction.genieMovie_All_File();
            result["genieMoviedata"] = {data: genieMoviedata};

            const youtubedata = await allChartFileFunction.youtube_All_File();
            result["youtubedata"] = {data: youtubedata};

            const youtubeMoviedata = await allChartFileFunction.youtube_All_File();
            result["youtubeMoviedata"] = {data: youtubeMoviedata};

            const filedata = await CgraphFunction.comparative_graph();
            result["graph"] = filedata;

            // 데이터 없는 경우 error 페이지 출력
            if (!(melondata && melonDaydata && geniedata && genieMoviedata && youtubedata && youtubeMoviedata && filedata)) {
                res.status(500).render('error/500');
            } else {
                CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                    result['user_img'] = userProfile.user_img;
                    res.render("allChart", {result});
                });
            }
            
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};


// 유튜브 실시간 차트 - async + awiat
exports.youtubeRealChartMain = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [youtubeData, filelist] = await youtubeFileFunction.youtubeFile(req.params.num);
            if(youtubeData) {
                result['youtubedata'] = {data: youtubeData, filelist: filelist, fileHour: req.params.num};
                // console.log('filelist', filelist);
                // result['geniedata'] = {data: ''};
                // result['melondata'] = {data: ''};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.render("youtubeRealChart", {result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};

// 유튜브 실시간 차트 - 2 - 시간변경
exports.youtubeRealChartMainType = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        if(req.session.user) {
            result["isLogin"] = true;

            const [youtubeData, filelist] = await youtubeFileFunction.youtubeFile(req.params.num);
            if(youtubeData) {
                result['youtubedata'] = {data: youtubeData, filelist: filelist, fileHour: req.params.num};
                // result['geniedata'] = {data: ''};
                // result['melondata'] = {data: ''};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.send({result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};


// 유튜브 뮤직비디오 차트 - 1
exports.youtubeMovieChart = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [youtubeMovieData, filelist] = await youtubeFileFunction.youtubeMovieFile(req.params.num);
            if(youtubeMovieData) {
                result['youtubeMoviedata'] = {data: youtubeMovieData, filelist: filelist, fileHour: req.params.num};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.render("youtubeMovieChart", {result});
                    });
                });
            } else {
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
    
};


// 유튜브 뮤직비디오 차트 - 2 - 시간변경
exports.youtubeMovieChartType = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [youtubeMovieData, filelist] = await youtubeFileFunction.youtubeMovieFile(req.params.num);
            if(youtubeMovieData) {
                result['youtubeMoviedata'] = {data: youtubeMovieData, filelist: filelist, fileHour: req.params.num};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.send({result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};


// 멜론 실시간 차트 - async + await
exports.melonRealChartMain = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [melonData, filelist] = await melonFileFunction.melonFile(req.params.num);
            if(melonData) {
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: ''};
                result['melondata'] = {data: melonData, filelist: filelist, fileHour: req.params.num};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.render("melonRealChart", {result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
}

// 멜론 실시간 차트 - 시간변경 - async + await
exports.melonRealChartMainType = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [melonData, filelist] = await melonFileFunction.melonFile(req.params.num);
            if(melonData) {
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: ''};
                result['melondata'] = {data: melonData, filelist: filelist, fileHour: req.params.num};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.send({result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};

// 멜론 일간 차트 - async + await
exports.melonDayChartMain = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [melonDayData, filelist] = await melonFileFunction.melonDayFile();
            if(melonDayData) {
                result['melonDaydata'] = {data: melonDayData, filelist: filelist, fileHour: req.params.num};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.render("melonDayChart", {result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};




// 지니 실시간 차트
exports.genieRealChartMain = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [genieData, filelist] = await genieFileFunction.genieFile(req.params.num);
            if(genieData) {
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: genieData, filelist: filelist, fileHour: req.params.num};
                result['melondata'] = {data: ''};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.render("genieRealChart", {result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};


// 지니 실시간 차트 - 시간 변경
exports.genieRealChartMainType = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [genieData, filelist] = await genieFileFunction.genieFile(req.params.num);
            if(genieData) {
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: genieData, filelist: filelist, fileHour: req.params.num};
                result['melondata'] = {data: ''};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.send({result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};

// 지니 뮤직 비디오 차트
exports.genieMovieChartMain = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [genieMovieData, filelist] = await genieFileFunction.genieMovieFile(req.params.num);
            if(genieMovieData) {
                result['genieMoviedata'] = {data: genieMovieData, filelist: filelist, fileHour: req.params.num};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.render("genieMovieChart", {result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};


// 지니 뮤직 비디오 차트 - 시간 변경
exports.genieMovieChartMainType = async (req, res, next) => {
    try {
        let result = {id : req.session.user};

        // 세션 체크
        if(req.session.user) {
            result["isLogin"] = true;

            const [genieMovieData, filelist] = await genieFileFunction.genieMovieFile(req.params.num);
            if(genieMovieData) {
                result['genieMoviedata'] = {data: genieMovieData, filelist: filelist, fileHour: req.params.num};

                ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                    result['likeSing'] = {data: rows};
                    CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                        result['user_img'] = userProfile.user_img;
                        res.send({result});
                    });
                });
            } else {
                res.status(500).render('error/500');
            }
        } else {
            result["isLogin"] = false;
            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
        }
    } catch (err) {
        next(err);
    }
};
