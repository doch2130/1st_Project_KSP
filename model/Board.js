const Board = ( Sequelize, DataTypes)=>{  
    return Sequelize.define(
        "board_list",
        {
            number: { 
                type: DataTypes.INTEGER,
                allowNull: false, 
                primaryKey: true, 
                autoIncrement: true
            },
            title : { 
                type: DataTypes.STRING(200),  
                allowNull: false 
            },
            id : { 
                type: DataTypes.STRING(20),  
                allowNull: false 
            },
            content : {
                type: DataTypes.TEXT,
                allowNull: true   
            },
            date : { 
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            hit: { 
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaulteValue : "0"
            },
            filename : { 
                type: DataTypes.STRING(255),  
                allowNull: true 
            },
        },
        {
            tableName: "board_list",  
            freezeTableName: true,
            timestamps: false 
        },
  )
}
Board.associate = models => {
    // Board 안에 "user_id라는 컬럼 이름"으로 Uses모델에 있는 "id값"을 새로운 컬럼으로 추가한다.
    Board.belongsTo(models.User, {foreignKey: "user_id", sourceKey: 'id'});

    // Board 안에 있는 "number"을 "number라는 컬럼 이름"으로 BoardComment 새로운 컬럼으로 추가한다.
    // Board.hasMany(models.BoardComment, {foreignKey: "boardnumber", sourceKey: 'number'});
    Board.hasMany(models.BoardComment, {foreignKey: "boardnumber", sourceKey: 'number'});
};

module.exports = Board;
