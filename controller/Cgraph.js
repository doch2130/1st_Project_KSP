const fs = require('fs').promises;

exports.comparative_graph = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./static/res/chart_data/Graph/comparative_data.json', 'utf8')
        .then((response) => {
            // 불러온 파일의 데이터를 json으로 다시 parse 작업 해준다.
            response = JSON.parse(response);
            resolve (response);
        })
        .catch((err) => {
            reject(err);
        });
    });
};
