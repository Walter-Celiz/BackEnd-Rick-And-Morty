
// Sequelize init and relations
const { Sequelize } = require('sequelize')
const { dbUser, dbName, dbHost, dbPassword } = require('../utils/config')

const CharacterFactory = require('./Characters')
const EpisodesFactory = require('./Episodes')

//sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`)

const sequelize = new Sequelize(
    `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
    {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);


const Character = CharacterFactory(sequelize)
const Episode = EpisodesFactory(sequelize)

//relations
Character.belongsToMany(Episode, { through: 'characters_episodes' })
Episode.belongsToMany(Character, { through: 'characters_episodes' })

module.exports = {
    conn: sequelize,
    Character,
    Episode,
}