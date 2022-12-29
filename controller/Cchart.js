const allChartFileFunction = require('./musicFileFunction/allChartFileFunction');
const youtubeFileFunction = require('./musicFileFunction/youtubeFileFunction');
const melonFileFunction = require('./musicFileFunction/melonFileFunction');
const genieFileFunction = require('./musicFileFunction/genieFileFunction');
const ClikeSingFunction = require('./ClikeSing');
const CgraphFunction = require('./Cgraph');
const CuserFunction = require('./Cuser');


// 차트 모아보기
exports.allChart = (req, res) => {
    let result = {id : req.session.user};

    // 1차 멜론 데이터 함수 실행
    allChartFileFunction.melon_All_File((melondata) => {
        if(melondata) {
            result["melondata"] = {data: melondata};
            
            allChartFileFunction.melon_ALL_Day_File((melonDaydata) => {
                if(melonDaydata) {
                    result["melonDaydata"] = {data: melonDaydata};

                    allChartFileFunction.genie_All_File((geniedata) => {
                        if(geniedata) {
                            result["geniedata"] = {data: geniedata};

                            allChartFileFunction.genieMovie_All_File((genieMoviedata) => {
                                if(genieMoviedata) {
                                    result["genieMoviedata"] = {data: genieMoviedata};

                                    allChartFileFunction.youtube_All_File((youtubedata) => {
                                        if(youtubedata) {
                                            result["youtubedata"] = {data: youtubedata};

                                            allChartFileFunction.youtubeMovie_All_File((youtubeMoviedata) => {
                                                if(youtubeMoviedata) {
                                                    result["youtubeMoviedata"] = {data: youtubeMoviedata};

                                                    CgraphFunction.comparative_graph((filedata) => {
                                                        result["graph"] = filedata;

                                                        // 세션 체크
                                                        if(req.session.user) {
                                                            result["isLogin"] = true;
                                                            CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                                                                result['user_img'] = userProfile.user_img;
                                                                res.render("allChart", {result});
                                                            });
                                                        } else {
                                                            result["isLogin"] = false;
                                                            res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                                                        }

                                                    });
                                                } else {
                                                    res.status(500).render('500');
                                                }
                                            });
                                        } else {
                                            res.status(500).render('500');
                                        }
                                    });
                                } else {
                                    res.status(500).render('500');
                                }
                            });
                        } else {
                            res.status(500).render('500');
                        }
                    });
                } else {
                    res.status(500).render('500');
                }
            });
        } else {
            res.status(500).render('500');
        }
    });
}

// 유튜브 실시간 차트 - 1
exports.youtubeRealChartMain = (req, res) => {
    let result = {id : req.session.user};

    youtubeFileFunction.youtubeFileList((filelist) => {
        youtubeFileFunction.youtubeFileRead(filelist, (data) => {
            // console.log(data);
            // 세션 체크
            if(req.session.user) {
                result["isLogin"] = true;
            } else {
                result["isLogin"] = false;
            }

            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                result['geniedata'] = {data: ''};
                result['melondata'] = {data: ''};

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.render("youtubeRealChart", {result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}

// 유튜브 실시간 차트 - 2 - 시간변경
exports.youtubeRealChartMainType = (req, res) => {
    let result = {id : req.session.user};
    // console.log('num: ', req.params.num);
    youtubeFileFunction.youtubeFileListHourChange((filelist) => {
        // console.log(filelist[1].slice(28, -5));
        // console.log(filelist[0]);
        youtubeFileFunction.youtubeFileReadHourChange(filelist, req.params.num, (data) => {
            // console.log(data);
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                result['geniedata'] = {data: ''};
                result['melondata'] = {data: ''};
                // res.render('youtubeRealChart', {result});
                // res.render('youtubeRealChart', {data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({result});

                // 세션 체크
                // if(req.session.user) {
                //     result["isLogin"] = true;
                //     ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                //         result['likeSing'] = {data: rows};
                //         res.send({result});
                //     });
                // } else {
                //     result["isLogin"] = false;
                //     res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                // }

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.send({result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}


// 유튜브 뮤직비디오 차트 - 1
exports.youtubeMovieChart = (req, res) => {
    let result = {id : req.session.user};

    youtubeFileFunction.youtubeMovieFileList((filelist) => {
        youtubeFileFunction.youtubeMovieFileRead(filelist, (data) => {
            // console.log(data);
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubeMoviedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                // result['geniedata'] = {data: ''};
                // result['melondata'] = {data: ''};

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.render("youtubeMovieChart", {result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}

// 유튜브 뮤직비디오 차트 - 2 - 시간변경
exports.youtubeMovieChartType = (req, res) => {
    let result = {id : req.session.user};
    // console.log('num: ', req.params.num);
    youtubeFileFunction.youtubeMovieFileListHourChange((filelist) => {
        // console.log(filelist[1].slice(28, -5));
        // console.log(filelist[0]);
        youtubeFileFunction.youtubeMovieFileReadHourChange(filelist, req.params.num, (data) => {
            // console.log(data);
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubeMoviedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                // result['geniedata'] = {data: ''};
                // result['melondata'] = {data: ''};
                // res.render('youtubeRealChart', {result});
                // res.render('youtubeRealChart', {data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({result});

                // // 세션 체크
                // if(req.session.user) {
                //     result["isLogin"] = true;
                //     ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                //         result['likeSing'] = {data: rows};
                //         res.send({result});
                //     });
                // } else {
                //     result["isLogin"] = false;
                //     res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                // }

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.send({result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

                

            } else {
                res.status(500).render('500');
            }
        });
    });
}


// 멜론 실시간 차트
exports.melonRealChartMain = (req, res) => {
    let result = {id : req.session.user};

    melonFileFunction.melonFileList((filelist) => {
        melonFileFunction.melonFileRead(filelist, (data) => {
            // console.log(data);
            
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: ''};
                result['melondata'] = {data: data, filelist: filelist, fileHour: req.params.num};

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.render("melonRealChart", {result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}

// 멜론 실시간 차트 - 2 - 시간변경
exports.melonRealChartMainType = (req, res) => {
    let result = {id : req.session.user};
    // console.log('num: ', req.params.num);
    melonFileFunction.melonFileListHourChange((filelist) => {
        // console.log(filelist[1].slice(28, -5));
        // console.log(filelist[0]);
        melonFileFunction.melonFileReadHourChange(filelist, req.params.num, (data) => {
            // console.log(data);
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: ''};
                result['melondata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                // res.render('youtubeRealChart', {result});
                // res.render('youtubeRealChart', {data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({result});

                // // 세션 체크
                // if(req.session.user) {
                //     result["isLogin"] = true;
                //     ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                //         result['likeSing'] = {data: rows};
                //         res.send({result});
                //     });
                // } else {
                //     result["isLogin"] = false;
                //     res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                // }

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.send({result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}


// 멜론 일간 차트

exports.melonDayChartMain = (req, res) => {
    let result = {id : req.session.user};

    melonFileFunction.melonDayFileList((filelist) => {
        melonFileFunction.melonDayFileRead(filelist, (data) => {
            // console.log(data);
            
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                // result['youtubedata'] = {data: ''};
                // result['geniedata'] = {data: ''};
                result['melonDaydata'] = {data: data, filelist: filelist, fileHour: req.params.num};

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.render("melonDayChart", {result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}


// 멜론 일간 차트 - 2 - 시간변경
exports.melonDayChartMainType = (req, res) => {
    let result = {id : req.session.user};
    // console.log('num: ', req.params.num);
    melonFileFunction.melonDayFileListHourChange((filelist) => {

        melonFileFunction.melonDayFileReadHourChange(filelist, req.params.num, (data) => {
            // console.log(data);
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                // result['youtubedata'] = {data: ''};
                // result['geniedata'] = {data: ''};
                result['melonDaydata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                // res.render('youtubeRealChart', {result});
                // res.render('youtubeRealChart', {data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({result});

                // // 세션 체크
                // if(req.session.user) {
                //     result["isLogin"] = true;
                //     ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                //         result['likeSing'] = {data: rows};
                //         res.send({result});
                //     });
                // } else {
                //     result["isLogin"] = false;
                //     res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                // }

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.send({result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}






// 지니 실시간 차트
exports.genieRealChartMain = (req, res) => {
    let result = {id : req.session.user};

    genieFileFunction.genieFileList((filelist) => {
        genieFileFunction.genieFileRead(filelist, (data) => {
            // console.log(data);
            
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                result['melondata'] = {data: ''};

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.render("genieRealChart", {result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}


// 지니 실시간 차트 - 시간 변경
exports.genieRealChartMainType = (req, res) => {
    let result = {id : req.session.user};
    // console.log('num: ', req.params.num);
    genieFileFunction.genieFileListHourChange((filelist) => {

        genieFileFunction.genieFileReadHourChange(filelist, req.params.num, (data) => {
            // console.log(data);
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                result['youtubedata'] = {data: ''};
                result['geniedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                result['melondata'] = {data: ''};
                // res.render('youtubeRealChart', {result});
                // res.render('youtubeRealChart', {data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({result});

                // // 세션 체크
                // if(req.session.user) {
                //     result["isLogin"] = true;
                //     ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                //         result['likeSing'] = {data: rows};
                //         res.send({result});
                //     });
                // } else {
                //     result["isLogin"] = false;
                //     res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                // }

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.send({result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}





// 지니 뮤직 비디오 차트
exports.genieMovieChartMain = (req, res) => {
    let result = {id : req.session.user};

    genieFileFunction.genieMovieFileList((filelist) => {
        genieFileFunction.genieMovieFileRead(filelist, (data) => {
            // console.log(data);
            
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                // result['youtubedata'] = {data: ''};
                result['genieMoviedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                // result['melondata'] = {data: ''};

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.render("genieMovieChart", {result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}


// 지니 뮤직 비디오 차트 - 시간 변경
exports.genieMovieChartMainType = (req, res) => {
    let result = {id : req.session.user};
    // console.log('num: ', req.params.num);
    genieFileFunction.genieMovieFileListHourChange((filelist) => {

        genieFileFunction.genieMovieFileReadHourChange(filelist, req.params.num, (data) => {
            // console.log(data);
            if(data) {
                // 파일에서 읽어온 데이터를 전달
                // result['youtubedata'] = {data: ''};
                result['genieMoviedata'] = {data: data, filelist: filelist, fileHour: req.params.num};
                // result['melondata'] = {data: ''};
                // res.render('youtubeRealChart', {result});
                // res.render('youtubeRealChart', {data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({data: data, filelist: filelist, fileHour: req.params.num});
                // res.send({result});

                // // 세션 체크
                // if(req.session.user) {
                //     result["isLogin"] = true;
                //     ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                //         result['likeSing'] = {data: rows};
                //         res.send({result});
                //     });
                // } else {
                //     result["isLogin"] = false;
                //     res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                // }

                // 세션 체크
                if(req.session.user) {
                    result["isLogin"] = true;
                    ClikeSingFunction.LikeSingSearch(req.session.user, (rows) => {
                        result['likeSing'] = {data: rows};
                        CuserFunction.user_profile_img(req.session.user, (userProfile) => {
                            result['user_img'] = userProfile.user_img;
                            res.send({result});
                        });
                    });
                } else {
                    result["isLogin"] = false;
                    res.send("<script>alert('로그인 후 이용가능합니다.');location.href='/login';</script>");
                }

            } else {
                res.status(500).render('500');
            }
        });
    });
}
