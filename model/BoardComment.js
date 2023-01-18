
const BoardComment = ( Sequelize, DataTypes)=>{  
  return Sequelize.define(
      "board_comment",
      {
          number: { 
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true, 
              autoIncrement: true
          },
          boardnumber: { 
              type: DataTypes.INTEGER,
              allowNull: false 
          },
          id: {
              type: DataTypes.STRING(20),
              allowNull: false
          },
          content: {
              type: DataTypes.TEXT,
              allowNull: false
          },
          writetime: {
              type: DataTypes.DATE,
              allowNull: false,
              defaultValue: DataTypes.NOW
          },
          updateflag: { 
              type: DataTypes.BOOLEAN,
              allowNull: false,
              defaulteValue : "0"
          }
      },
      {
          tableName: "board_comment",
          freezeTableName: true,
          timestamps: false
      },
)
}
BoardComment.associate = models => {
  // BoardComment 안에 "number 컬럼 이름"으로 Board모델에 있는 "number"을 새로운 컬럼으로 추가한다.
  BoardComment.belongsTo(models.Board, {foreignKey: "boardnumber", sourceKey: 'number'});

  // BoardComment 안에 있는 "number"을 "number라는 컬럼 이름"으로 BoardNestedComment 새로운 컬럼으로 추가한다.
  BoardComment.hasMany(models.BoardNestedComment, {foreignKey: "commentnumber", sourceKey: 'number'});
};

module.exports = BoardComment;
