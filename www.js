const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const dateTime = require('./dateTime_et.js')
const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine 2023</title>\n</head>\n<body>';
const pageBanner = '\n\t<img src="banner.png" alt="Lehe bänner">\n';
const pageBody = '\n\t<h1>Andrus Rinde</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee" target="_blank">TLÜ</a> Digitehnoloogiate instituudis õppetöö raames!</p>\n\t<p>Olen väga tore!</p>\n\t<p>Keskmist kasvu meesterahvas parimais aastais!</p>\n\t<hr>\n\t<p>Kursus, mille raames leht tehti on: veebiprogrammeerimine.</p>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	console.log(url.parse(req.url, true));
	let currentURL = url.parse(req.url, true);
	if(currentURL.pathname === "/"){
		//määrame tagastatavate andmete päise, et on veebileht
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write(`<p>Lehe avamise hetkel oli ${dateTime.timeNowET()}</p>`);
		res.write('<p><a href="addName">Lisame nime</a>!</p>');
		res.write('<p><a href="semesterprogress">Semestri progress</a>!</p>');
		res.write('<p><a href="pildid">Ülikooli pildid</a>!</p>');
		res.write(pageFoot);
		//et see kõik valmiks ja ära saadetaks
		return res.end();
	}
	else if (currentURL.pathname === "/addName"){ 
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<h2>Eliana Leonova</h2>');
		res.write(pageFoot);
		//et see kõik valmiks ja ära saadetaks
		return res.end();
	}
	else if (currentURL.pathname === "/semesterprogress"){ 
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<h2>SEMESTRI PROGRESS TEHA</h2>');
		const max = 10;
		const value = 5;
		res.write(`<meter min="0" max="${max}" value="${value}"></meter>`)
		res.write(pageFoot);
		//et see kõik valmiks ja ära saadetaks
		return res.end();
	}
	else if (currentURL.pathname === "/banner.png"){
		let filePath = path.join(__dirname, "public", "banner/banner.png");
		fs.readFile(filePath, (err, data)=>{
			if(err){
				throw err;
			}
			else {
				res.writeHead(200, {"Content-Type": "image/png"});
				res.end(data);
			}
		});
	} 
	else if (currentURL.pathname === "/pildid"){
		let filePath = path.join(__dirname, "public", "tluphotos/tlu_5.jpeg");
		fs.readFile(filePath, (err, data)=>{
			if(err){
				throw err;
			}
			else {
				res.writeHead(200, {"Content-Type": "image/png"});
				res.end(data);
			}
		});
	} 
}).listen(5200);

//5200   rinde

//52XX

//näiteks 5208