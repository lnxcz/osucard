const button = document.getElementById("create");
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


function copyText() {
  var copyText = document.getElementById("link");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");

 
  // TODO: Some alert here
}


//this was made by atskukoro