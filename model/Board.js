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
        }
  )
}

module.exports = Board;
