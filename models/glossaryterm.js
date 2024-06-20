const {Sequelize} = require('sequelize');

const sequelize = require('../utils/database.js');

const GlossaryTerm = sequelize.define('glossaryterms', {
   id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
      term: {
      type: Sequelize.STRING,
      allowNull: false,
   },
	termdesc: {
	     type: Sequelize.TEXT,
      allowNull: true,
 

},
   
});


module.exports = GlossaryTerm;
