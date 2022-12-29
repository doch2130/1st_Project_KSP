const Sequelize = require("sequelize");
// Sequelize.INTEGER이런식으로 들어가있음. VISIOTR.JS에서 데이터타입에 해당되는. 
const config = require("../config/config.json")["development"];
//객체 키형태로 development가져옴//config.json쓰면 파일마다 모델파일 안고쳐도됨.

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
); 
 //인자 4개를 함수에넣은거임 마지막 config는 전체정보 //데이터베이스 연결하는 코드임 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Board = require("./Board")(sequelize, Sequelize);
//이 괄호는 함수실행한다는뜻 함수의 인자로 각각 33번째줄이랑 1번째줄에 const옆에 정의된 변수를 가져온다.

module.exports = db;
