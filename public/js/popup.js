const button = document.getElementById("create");
const createButton = document.getElementById("createCard");
const copyButton = document.getElementById("copy");
let copyLink = "";
const closeBtn = document.getElementById("closeBtn");

button.addEventListener("click", e => {
  e.preventDefault()
  
  document.getElementById("background").style = "display: block;";

//   const color = document.getElementById("color").value;
//   const username = document.getElementById("username").value;

//   const url = window.location.href + "card/" + username + "?color=" + color;

   document.getElementById("popup").style = "display: block;";
//   document.getElementById("background").style = "display: block;";

//   document.getElementById("card").setAttribute("src", url);
//   document.getElementById("link").innerText = url;
//   document.getElementById("nostyle").href = url;
})

closeBtn.addEventListener("click", e => {
    document.getElementById("popup").style = "display: none;";
  document.getElementById("background").style = "display: none;";
})
createButton.addEventListener("click", e => {
  //send request to server
  const username = document.getElementById("username").value;
  const color = document.getElementById("color").value;
  copyLink = window.location.href + "card/" + username + "?color=" + color.toLowerCase();
  document.getElementById("relCard").setAttribute("src", copyLink)
  document.getElementById("relCard").style = "display: block;";

  document.getElementById("etext").style = "display: none;";
})


copyButton.addEventListener("click", e => {
  // copy link variable to clipboard
  const el = document.createElement('textarea');
  el.value = copyLink;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
})

//this was made by atskukoro