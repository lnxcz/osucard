var express = require('express');
const osu = require("node-osu");
const { createCanvas, loadImage, registerFont } = require('canvas');
var router = express.Router()

registerFont('./fonts/toru.otf', { family: 'Torus' })

const osuApi = new osu.Api('90efe2b42a35d38022559a9c3bd4e723192cfd9e', {
  // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
  notFoundAsError: false, // Throw an error on not found instead of returning nothing. (default: true)
  completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
  parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});


function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);

  var dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
  return dDisplay + hDisplay + mDisplay;
}

router.get('/:user', async function(req, res) {
  try {
  const color = req.query["color"]
  const canvas = createCanvas(1137, 523);
  const ctx = canvas.getContext('2d');

  let userQuery = req.params.user;

  let user = await osuApi.getUser({ u: userQuery });
  console.log(user);

  let image = "";
  switch(color) {
    case "orange":
       image = await loadImage('./images/base.png');
    break;

    default:
       image = await loadImage('./images/baseblue.png');
    break;
  }

  ctx.drawImage(image, 0, 0, 1137, 523);

  const pfp = await loadImage("https://a.ppy.sh/" + user.id);

  const flag = await loadImage("https://osu.ppy.sh/images/flags/" + user.country + ".png");
  ctx.drawImage(flag, 988, 57, 95, 62);

  // username
  ctx.font = "45px Torus";
  ctx.fillStyle = "white";
  ctx.fillText(user.name, 350, 105);

  // pp's
  ctx.fillStyle = "#CECECE";
  ctx.font = "45px Torus";
  ctx.fillText("#" + user.pp.rank, 350, 155);

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle';

  //pp  
  ctx.fillStyle = "white";
  ctx.font = "35px Torus";
  ctx.fillText(Math.floor(user.pp.raw) + "pp", 439, 220);

  // state rank
  ctx.fillStyle = "gray";
  ctx.font = "30px Torus";
  ctx.fillText("(#" + Math.floor(user.pp.countryRank) + ")", 439, 270);
  // Level
  ctx.fillStyle = "white";
  ctx.font = "38px Torus";
  ctx.fillText(Math.floor(user.level), 899, 86);

  // accuracy title
  ctx.font = "50px Torus";
  ctx.fillText("ACC", 186, 353);
  // playtime
  ctx.font = "45px Torus";
  ctx.fillText("Play Time", 990, 250);

  ctx.font = "35px Torus";
  ctx.fillText(secondsToDhms(user.secondsPlayed), 990, 297);

  // accuracy 
  ctx.font = "38px Torus";
  ctx.fillText(Math.round(user.accuracy * 100) / 100 + "%", 186, 400);

  // creatin
  ctx.fillStyle = "#CECECE";
  ctx.font = "18px Torus";
  ctx.fillText(user.raw_joinDate.split(" ")[0].replace("-", "/").replace("-", "/"), 185, 30);

  // a ranks
  ctx.fillStyle = "white";
  ctx.font = "35px Torus";
  ctx.fillText(user.counts.A, 627, 416);
  // S ranks
  ctx.fillText(user.counts.S, 733, 416);
  // sh ranks
  ctx.fillText(user.counts.SH, 843, 416);
  // ss ranks
  ctx.fillText(user.counts.SS, 953, 416);
  // ssh ranks
  ctx.fillText(user.counts.SSH, 1063, 416);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(185, 185, 125, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(pfp, 60, 60, 250, 250);

  let buffer = canvas.toBuffer().toString("base64");
  let returnedB64 = Buffer.from(buffer, 'base64');
  
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': returnedB64.length
  });
  res.end(returnedB64);
  } catch(err) {
    return res.redirect("/");
  }
})

module.exports = router