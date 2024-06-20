const express =require('express');


const {addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm,getTermById,getTermsList,stream,queryXdashApi,fetchTest} = require('../controllers/auth');
 

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
