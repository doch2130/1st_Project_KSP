// 샘플용
const User = (Sequelize, DataTypes) => {
    return Sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            pw: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull : false
            },
            e_mail : {
                type : DataTypes.STRING(20),
                allowNull : false                
            },
            user_img : { //user_img varchar(50) null
                type : DataTypes.STRING(50),           
            }
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: false
        }
    )
}

User.associate = models => {
    // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 LikeSing 새로운 컬럼으로 추가한다.
    User.hasMany(models.LikeSing, {foreignKey: "user_id", sourceKey: 'id'});

    // Users안에 있는 "id값"을 "user_id라는 컬럼 이름"으로 Board 새로운 컬럼으로 추가한다.
    User.hasMany(models.Board, {foreignKey: "user_id", sourceKey: 'id'});
};

module.exports = User;
