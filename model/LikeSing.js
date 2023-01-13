const LikeSing = (Sequelize, DataTypes) => {
    return Sequelize.define(
        'likesing',
        {
            no: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            album_img: {
                type: DataTypes.STRING(200),
                allowNull : false
            },
            title : {
                type : DataTypes.STRING(100),
                allowNull : false
            },
            singer : {
                type : DataTypes.STRING(100),
                allowNull : false
            }
        },
        {
            tableName: 'likesing',
            freezeTableName: true,
            timestamps: false
        }
    )
}

LikeSing.associate = models => {
    // LikeSing 안에 "user_id라는 컬럼 이름"으로 Uses모델에 있는 "id값"을 새로운 컬럼으로 추가한다.
    LikeSing.belongsTo(models.User, {foreignKey: "user_id", sourceKey: 'id'});
};

module.exports = LikeSing;
