var express=require('express');

var app = express();

const itemsGenerator = (page) => {
	let records = Math.floor(Math.random()*10+1);
    return [...Array(records).keys()].map(() => {
    	let length = Math.floor(Math.random()*10+5);
    	return `${page}_` + [...Array(length).keys()].map(() => {
          return String.fromCharCode(
          	Math.floor(Math.random()*26)+65
          );
    	}).join('');
    });
};

app.get('/getTitles', (req, res) => {
	let page = req.query && req.query.page;
	if (page) {
		return res.json({
			page,
    		titles: itemsGenerator(page)
    	});
	}

	let pages = Math.floor(Math.random() * 17 + 1);
	return res.json({pages});
});

app.listen(3000);



