const express =require('express');


const {addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm,getTermById,getTermsList,stream,queryXdashApi,fetchTest} = require('../controllers/auth');
 

const router = express.Router();



router.post('/getTermById',function(req, res,next){
     getTermById(req, res,next);
} );

router.post('/getTermsList', async function(req, res,next){
    console.log('router enter sf');
 getTermsList(req, res,next);
} );

router.get('/stream', async function(req, res,next){
    console.log('router enter sf');
 stream(req, res,next);
});

router.post('/fetchTest', async function(req, res,next){
    console.log('router enter fetchTest');
 fetchTest(req, res,next);
});
router.post('/queryXdashApi', async function(req, res,next){
    console.log('router enter sf');
 queryXdashApi(req, res,next);
});
router.post('/addGlossaryTerm', async function(req, res,next){
    console.log('router enter sf');
 addGlossaryTerm(req, res,next);
});

router.post('/editGlossaryTerm', async function(req, res,next){
    console.log('router enter sf');
 editGlossaryTerm(req, res,next);
});

router.post('/deleteGlossaryTerm', async function(req, res,next){
    
 deleteGlossaryTerm(req, res,next);
});
// will match any other path
router.use('/', (req, res, next) => {
    res.status(200).json({error : "page not found"});
});


//module.exports = router;
export default router;
