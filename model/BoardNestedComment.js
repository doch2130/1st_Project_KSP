
const BoardNestedComment = ( Sequelize, DataTypes)=>{  
  return Sequelize.define(
      "board_nested_comment",
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
          commentnumber: {
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
          tableName: "board_nested_comment",
          freezeTableName: true,
          timestamps: false
      },
)
}
BoardNestedComment.associate = models => {
  // BoardNestedComment 안에 "number 컬럼 이름"으로 BoardComment모델에 있는 "number"을 새로운 컬럼으로 추가한다.
  BoardNestedComment.belongsTo(models.BoardComment, {foreignKey: "commentnumber", sourceKey: 'number'});
};

module.exports = BoardNestedComment;
