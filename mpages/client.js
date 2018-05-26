var http = require('http');

const jobDone = (result) => {
	console.log(result);
}

const processPage = (page, pages, callback) => {
  http.get(`http://localhost:3000/getTitles?page=${page}`,
  	res => {
	  let data = '';
	  res.on('data', slice => data += slice);
	  res.on('end', () => callback(JSON.parse(data).titles));
  });
}

const processPages = (pagesData, done) => {
  let j;
  let pages = pagesData.pages;
  let pagesCount = 0;
  let store = [];

  const pageDone = (data) => {
  	pagesCount++;
  	store = [...store, ...data];
  	console.log(`${pagesCount}/${pages}`);
  	if (pagesCount == pages) {
  		done(store.sort());
  	}
  }

  for (j=1 ; j<= pages ; j++) {
   	processPage(j, pages, pageDone);
  }	
}

function queryPages() {
  http.get('http://localhost:3000/getTitles', res => {
	  let data = '';
	  res.on('data', slice => data += slice);
	  res.on('end', () => {
	  	jsonData = JSON.parse(data);
	  	console.log(jsonData.pages);
	  	processPages(jsonData, jobDone);
	  });
  });
}

function getTitlesInfo() {
  queryPages(); 	
}

getTitlesInfo();