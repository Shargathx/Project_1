const http = require("http");
const { generateVanasonaForHTML } = require("./src/wisdomList");
const dateEt = require("./src/dateTimeET");
// const wisdomList = require("./src/wisdomList");
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n<meta charset="utf-8">\n<title> |Testleht| </title>\n</head>\n<body>';
const pageBody = '<h1>MartinS, juuniorprogeja</h1><p>See leht on loodud <a href="https://www.tlu.ee/" target="_blank">TLU</a> veebiprogemise kursusel, ei sisalda tõsist sisu</p><p>See rida on lisatud kodus ja läbi Putty ja WinSCP üles laetud. :)</p><p>Olen kokku puutunud Javascripti, Typescripti ja Javaga ning teinud mõned proovitööd ka tööpakkumistega seoses.</p><p>Hobikorras tegelen klaveriõppega, samuti olen tegelenud laskespordiga ja motokrossiga.</p><hr></hr>';
const pageFoot = '</body><style>h1, p, img {text-align: center;margin: 20px;font-family: Arial, sans-serif;} li{margin-bottom: 10px}</style></html>';

//req = require, res = response
http.createServer(function (req, res) {
  res.writeHead(200, { "Content-type": "text/html" });
  res.write(pageHead);
  res.write(pageBody);
  res.write("<p>Täna on " + dateEt.weekDay() + ", " + dateEt.fullDate() + ".</p>");
  res.write("<p>Kell on: " + dateEt.fullTime() + ".</p>");
  res.write("<br>")
  res.write(generateVanasonaForHTML());
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