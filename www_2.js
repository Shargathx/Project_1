const http = require("http");
const PageBanner = require("./src/pageBanner");
const { getSingleWisdomSaying } = require("./src/wisdomList");
const { generateVanasonaForHTML } = require("./src/wisdomList");
const dateEt = require("./src/dateTimeET");
const pageBanner = new PageBanner("vp_banner_2025_TA.jpg");
const klaverPicture = new PageBanner("klaver.jpg");


// laeme moodulid päringu parsimiseks
const url = require("url");

// failide haldamiseks moodul:
const path = require("path");

const pageLink = '\n\t<p>Vaata ka vanasõnade <a href="/vanasonad">lehte</a>!</p>';
const hobiLink = '\n\t<p><a href="/hobid"> Siin on paar minu hobi</a></p>';

// const wisdomList = require("./src/wisdomList");
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n<meta charset="utf-8">\n<title> |Testleht| </title>\n</head>\n<body>';
const pageBody = '<h1>MartinS, juuniorprogeja</h1>\n<p>See leht on loodud <a href="https://www.tlu.ee/" target="_blank">TLU</a> veebiprogemise kursusel, ei sisalda tõsist sisu</p><p>See rida on lisatud kodus ja läbi Putty ja WinSCP üles laetud. :)</p><p>Olen kokku puutunud Javascripti, Typescripti ja Javaga ning teinud mõned proovitööd ka tööpakkumistega seoses.</p><p>Hobikorras tegelen klaveriõppega, samuti olen tegelenud laskespordiga ja motokrossiga.</p><hr></hr>';
const pageFoot = '\n</body>\n<style></style></html>';


//req = require, res = response
http.createServer(function (req, res) {

  // parsin URL-i
  console.log("Päring: " + req.url);
  let currentUrl = url.parse(req.url, true);
  console.log("Parsituna: " + currentUrl.pathname);

  if (currentUrl.pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write(pageBanner.getHTML());
    res.write(pageHead);
    res.write(pageBody);
    res.write(pageLink);
    res.write("<p>Täna on " + dateEt.weekDay() + ", " + dateEt.fullDate() + ", " + dateEt.partOfDay() + ".</p>");
    res.write("<p>Kell on: " + dateEt.fullTime() + ".</p>");
    res.write(pageFoot);
    return res.end();
  }
  else if (currentUrl.pathname === "/vanasonad") {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write(pageBanner.getHTML());
    res.write(pageHead);
    res.write(pageBody);
    res.write("<p>Suvaline vanasõna on: " + getSingleWisdomSaying() + ".</p>");
    res.write(generateVanasonaForHTML());
    return res.end();
  }

  else if (currentUrl.pathname === "/hobid"){
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    res.write(pageBanner.getHTML());
    res.write(pageHead);
    res.write(pageBody);
    res.write("Hetkel on peamiseks hobiks klaverimäng, natukene üle aasta õppinud. Kodus on selline klaver: " + klaverPicture.getHTML());
    res.write(`<p>Siin on üks klaveripala:</p><audio controls><source src="/assets/klaver.mp3" type="audio/mpeg">Viga esitamisel või laadimisel.</audio>`);
    res.write(hobiLink);
    return res.end();
  }

  else if (currentUrl.pathname.startsWith("/assets/")) {
  const filePath = path.join(__dirname, "src", currentUrl.pathname);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("File not found");
    }

    let contentType = "application/octet-stream";
    if (filePath.endsWith(".mp3")) contentType = "audio/mpeg";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}


  // res.writeHead(200, { "Content-type": "text/html" });
  res.write(pageFoot);
  return res.end();







}).listen(5135, () => {
  console.log("Server running at http://localhost:5135/");
});


//5135 on minu port, ka koduarvutile
// \n - uus reavahe
// \t - TAB, viskab edasi

// projekti kloonimiseks: git clone https://Shargathx@github.com/Shargathx/Project_1.git
// git remote -v - näitab mis aadressid seotud on
// git config user.name "name_here" - BAD METHOD; avoid
// git config --global user.name "name_here" - alati minu nimi süsteemis olemas, ei pea eraldi iga kord uuesti tegema
// git config user.name - gets my git name
// git config user.email Shargathx@users.noreply.github.com - older method, AVOID
// git config --global user.email Shargathx@users.noreply.github.com - better method
// git config user.email - gets what my email is (Shargathx@users.noreply.github.com)
// git status - näitab, kas/mis muutmata jne, mis seis on
// git add . - addib KÕIK untrackimata failid
// git add file_name - lisab ainult ühe valitud faili
// git commit -m "Esimeste tundide tööde commit" - commitib koos kommentaariga
// git push - küsib parooli, sinna github key / token