const express = require("express");
const routes = express.Router();
const axios = require("axios");
const parser = require("node-html-parser");

const URL = "https://4images1mot-solution.com/";
function url_compose(letters="",length=0){
    return URL + "?letters=" + letters + "&length=" + length;
}
    
    
routes.get("/", async (req, res) => {
    const { letters, length, first } = req.query;
if(!letters&&!length)
return {error:'Aucune lettre ou taille renseignée' };
    const url = url_compose(letters, length);
    const response = await axios.get(url);
    const html = response.data;
    // console.log(html);
    const root = parser.parse(html);
    const a = root.querySelectorAll(".images li a");
    var words_list  = a.map((element) => {
        let src = element.querySelector("img").getAttribute('data-src');
        let word = element.querySelector("span").text;
      //  console.log(src,word);
        
        if (src && !src.startsWith("http")) {
            if (src.startsWith("/"))
                src = src.substring(1);
            src = URL + src;
        }
        return {
            word: word,
            img: src,
        }
    });

    if (first) {
        let first_letter = first.toLocaleUpperCase();
        words_list = words_list.filter((element) => {
            return element.word.startsWith(first_letter);
        }
        );
    }

  
    return res.json(words_list);
});




module.exports = routes;
