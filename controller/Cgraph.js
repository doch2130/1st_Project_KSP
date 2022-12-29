const fs = require('fs').promises;

exports.comparative_graph = (cb) => {
    fs.readFile('./static/res/chart_data/Graph/comparative_data.json', 'utf8')
    .then((response) => {
        // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
        response = JSON.parse(response);
        // console.log(response);
        cb(response);
    })
    .catch((err) => {
        // res.send('에러 발생');
        throw err;
    });
}
