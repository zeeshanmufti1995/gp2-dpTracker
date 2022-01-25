const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// create our Park model
class Park extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      park_id: body.park_id,
    }).then(() => {
      return Park.findOne({
        where: {
          id: body.park_id,
        },
        attributes: [
          "id",
          "park_name",
          "created_at",
          [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE park.id = vote.park_id)"),"vote_count",],
        ],
        include: [
          {
            model: models.Comment,
            attributes: [
              "id",
              "comment_text",
              "park_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
  }
}

// create fields/columns for Park model
Park.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    park_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "park",
  }
);

module.exports = Park;
