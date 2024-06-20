const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database.js');
const GlossaryTerm = require('../models/glossaryterm.js');
const markdownit = require('markdown-it');
const Prism = require('prismjs');
const CryptoJS =require('crypto-js');
const axios = require('axios');
const tokens = [];
const fetch = require('node-fetch');

const getTermsList = async (req,res,next) => {

var query = "select id,term,termdesc from glossaryterms";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myterms":results})

}

};

const createQueryHash2 = (qr) => {
    const fullHash = CryptoJS.SHA256(qr).toString(CryptoJS.enc.Hex);
    return fullHash.substring(0, 21);
};


const fetchTest = async (req,res,next) => {

 res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Transfer-Encoding': 'chunked',
    'X-Content-Type-Options': 'nosniff'
  });

let body = {query: 'write a rest endpoint in python' ,
            "search_uuid":createQueryHash2('write a rest endpoint in python') ,    
            "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"};
/*
headers: {
          'Content-Type': 'application/json',  
          responseType: 'stream',
         }, 
         */
    
const response = await fetch('https://www.xdash.ai/api/query', { method: 'POST',          
      body:JSON.stringify(body),
      });
console.log('mybody',body);
/*
  .then(response => response.body)
  .then(stream => { res.write('mystream');})
*/

const rbody = response.body;
console.log('rbody=',rbody);
  //  res.send(rbody);


// res.end();

};


const queryXdashApi = async (req,res,next) => {


console.log('received request body-->',req.body);
try {
      
        console.log('my query received is ',req.body.query);
let body = {"query": req.body.query,
                                "search_uuid":createQueryHash2(req.body.query) ,    
            "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"};
    
/*
        fetch('https://www.xdash.ai/api/query',{
         method:'POST',
            headers: {
                  'Content-Type':'application/json',
                  'Accept':'application/json',
                  'Cache-Control': 'no-cache',
                  'Pragma': 'no-cache',
                  'Expires': 0
           },
            body: JSON.stringify(body)
             }).then(async (resp) => {            
            
                resp.json().then(async (data) => {           
      	//let b = Buffer.from(JSON.stringify(resp.body));
            const buffer = await resp.arrayBuffer();
const bytes = new Uint8Array(buffer);    
    
    console.log('POST-RESPONSE-BODY',data);
            res.send(data);
 })

})

{
    withCredentials: true,
    headers: {
       'Content-Type': 'application/json',
        'Connection':'keep-alive',
         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',

    }}

    */

        axios.post('https://www.xdash.ai/api/query',{ "query": req.body.query,
                                "search_uuid":createQueryHash2(req.body.query) ,    
            "visitor_uuid": "bcd25493385e2512be48176f9e1a58ed"} ).then(async (response) => {
                        response.json().then((data) => {
                            console.log('RESPONSE-BODY=',data);
            res.send(data);
                        } )
            
            
       // setLoading(false);
    ///    let ltdata  = response.data.substring(0,response.data.indexOf('__LLM_RESPONSE__'));
     ///   let dtarr = JSON.parse(ltdata);

      ///  console.log('SOURCES-ARRAY-->',dtarr)
        //setResults2(dtarr); 
        //setResults2Loaded(true);  

    //    console.log('REPOSNSE',response.data);
        
  ///      let ftdata  = response.data.substring(response.data.indexOf('__LLM_RESPONSE__')+16,response.data.indexOf('__RELATED_QUESTIONS__'));

       // setResults(ftdata); 
       // setResultsLoaded(true);
     //   console.log('LLM_RESPONSE-->',ftdata);

///        let rqdata = response.data.substring(response.data.indexOf('__RELATED_QUESTIONS__')+21,response.data.length); 
        

   ///     let rqarr = JSON.parse(rqdata);
        //setRelatedQuestions(rqarr);
        //setRelatedQuestionsLoaded(true);
     //   console.log('RELATED-QUESTIONS-ARRAY-->',rqarr);


/// let hstr = md2.render(ftdata);  


/// let hstra = newSources(dtarr);

/// let hstrb = myRelatedQuestions(rqarr); 
/*
 res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Transfer-Encoding': 'chunked',
    'X-Content-Type-Options': 'nosniff'
  });
//console.log(hstr);

 res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
     'Cache-Control': 'no-cache',
     'Content-Encoding': 'none',
       });
  */
//res.setHeader('Content-Type', 'text/event-stream');
//res.setHeader('Cache-Control', 'no-cache');
//res.setHeader('Connection', 'keep-alive');
 //retry:5000\n
//const getData = () => {'type': 'answer','text': `${hstr}`} ;
//const getDataa = () => {'type':'sources','text':`${hstra}`};
//const getDatab = () => {'type':'related','text': `${hstrb}`};

// setInterval(() => {
    
//res.write(JSON.stringify([{type: 'answer',text: `${hstr}`},{type:'sources',text:`${hstra}`},{type:'related',text: `${hstrb}`}]),'utf-8',()=> {console.log('SENTTTTTT111');});
//}, 10000); 

// setInterval(() => {
//res.write(JSON.stringify({type:'sources',text:`${hstra}`}),'utf-8',()=> {console.log('SENTTTTTT222');});
//}, 10000); ,]
//setInterval(() => {
//res.write(JSON.stringify({type:'related',text: `${hstrb}`}),'utf-8',()=> {console.log('SENTTTTTT333');});
//}, 10000); 


//res.write(JSON.stringify({type: 'answer',text: `${hstr}`}),'utf-8',()=> {console.log('SENTTTTTT111');});
//res.write(JSON.stringify({type:'sources',text:`${hstra}`}),'utf-8',()=> {console.log('SENTTTTTT222');});
//res.write(JSON.stringify({type:'related',text: `${hstrb}`}),'utf-8',()=> {console.log('SENTTTTTT333');});

// res.end();


//res.flush();
        }, (error) => {
                        console.log('error=',error);
                      });
     
        } catch (error) {
              console.error('Error fetching data: ', error);
        }


};

const myRelatedQuestions = (relatedQuestions) => {

let rqstr = '';

  for (let index=0;index<relatedQuestions.length;index++) {
     //   console.log('RQQQ==',relatedQuestions[index].question);
        rqstr += `<p>` + relatedQuestions[index].question + `</p><hr>`;
  }   
 //console.log('RQSTR=',rqstr);
  return rqstr;
};


 const newSources = (results2) => {



 let sstr = '<div class="ag-format-container"><div class="ag-courses_box">';
for (let index=0;index<results2.length;index++) {

//<a href="`+ results2[index].url +`" target="_blank" style="text-decoration: none">
//</a>

sstr += `<div class="ag-courses_item">
      <a href="` + results2[index].url + `" target="_blank" class="ag-courses-item_link">
               <div class="ag-courses-item_title">
    ` + results2[index].name +`</div>
<div class="ag-courses-item_date-box">
   <img style="position:relative;float:right;margin-right:10px;" width="40px" height="40px" 
 src="https://www.google.com/s2/favicons?domain=` + results2[index].url + `">
          <span class="ag-courses-item_date">
           `
 + (index+1) + " - " + new URL(results2[index].url).hostname +` 
          </span>
        </div>
      </a>
    </div>`;

}
sstr += `</div></div>`;
//console.log('SSTR=',sstr);
return sstr;
};


const md2 = markdownit({
    highlight(str, lang) {
    let hl;
//console.log('prism-langsfor jsx==',Prism.languages['javascript']);
    //lang !== 'markdown' &&
    try {
      if ( !(lang === 'undefined')   || (lang !== 'markdown')) {
        if(lang === 'jsx')  lang = 'javascript';
        if(lang === 'undefined') lang = 'javascript';
        if (lang === 'null') lang = 'javascript';
      hl = Prism.highlight(str, Prism.languages[lang]);
      }
    } catch (error) {
      console.error(error);
      hl = md2.utils.escapeHtml(str);
    }
//console.log('transformed markdown==',hl);
//console.log('language passed',lang);
    return `<pre style="white-space: pre-wrap !important;width:100%" class="line-numbers language-${lang}"><code  style="white-space: pre-wrap !important;width:100%" class="language-${lang}">${hl}</code></pre>`;
  },
  typographer:true,
});



const stream = async (req, res,next) => {
 
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Transfer-Encoding': 'chunked',
    'X-Content-Type-Options': 'nosniff'
  });
 
  const interval = setInterval(() => {
    const data1 = Math.random().toString(36).substring(2, 8);
    const data2 = Math.random().toString(36).substring(2, 8);
    res.write(`${data1} ${data2}`);
    console.log('sent-data-->',`${data1} ${data2}`);
  }, 100);
 
  setTimeout(() => {
    clearInterval(interval);
    res.end();
  }, 10000);
 
};

const deleteGlossaryTerm = async (req,res,next) => {

var query = "delete from glossaryterms where id="+req.body.termid;
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);

//if (results) {
res.status(200).json({"message":"Glossary Term delete success."})

//}

};



const getTermById = async (req,res,next) => {

//let myforms = await SpunkyForm.findAll();

var query = "select id,term,termdesc from glossaryterms where id="+req.body.termid;
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myterm":results})

}

};



const addGlossaryTerm = async (req,res,next) => {

try {
let response = await GlossaryTerm.create({                        
                        term: req.body.term,
                      termdesc: req.body.termdesc                       
                    });

if (response) {
console.log('within if response');
res.status(200).json({"glossaryterm":response});
}
else { res.status(500).json({"message":"glossary term error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 

return res;
};

const editGlossaryTerm = async (req,res,next) => {

try {
let response = await GlossaryTerm.update({                        
                        term: req.body.term,
                      termdesc: req.body.termdesc                       
                    },   {
    where: {
    id: req.body.termid   
  }
});

if (response) {
console.log('within if response');
res.status(200).json({"glossaryterm":response});
}
else { res.status(500).json({"message":"glossary term error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 

return res;
};

module.exports = {addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm, getTermById,getTermsList,stream,queryXdashApi,fetchTest} ;
