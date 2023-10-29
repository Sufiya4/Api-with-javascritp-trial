const port = 8003;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const climate = "climate";

const articles = [];

const newspapers = [
    {
        name:'thesydneymorningherald',
        address:'https://www.smh.com.au/search?text=climate'
    },
    {
        name:'thenewyorktimes',
        address:'https://www.nytimes.com/search?query=climate+change'
    },
    {
        name:'aljazeera',
        address:'https://www.aljazeera.com/search/climate'
    }
]

app.get('/', (req, res) => {
    res.json('Welcome to my -- API');
});

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a:contains(climate)', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href');
            articles.push({
                title,
                url,
                source:newspaper.name
            });
    })
})
})

app.get('/news', (req, res) => {
   /* axios.get('https://www.nytimes.com/search?query=climate+change')
    .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a:contains(climate)', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href');
            articles.push({
                title,
                url
            });
        });*/
        res.json(articles);
    });
    //.catch((err)=>console.log(err));
        

app.listen(port, () => {console.log('server running on port'+ port);});