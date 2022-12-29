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

module.exports = LikeSing;
