//alert("i am here");
const unsplashAPI =
  "https://api.unsplash.com/search/photos?client_id=CLnWpARpr78PvJHV7Y6ApKdMDkFoxb2eqr_UxKHeO5g&page=1&query=";

// query unsplash and return json formatted response
async function query(term) {
  let api = unsplashAPI + term;
  try {
    const res = await fetch(api);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

// generate random index number for an array
function random(x) {
  return Math.floor(Math.random() * x);
}

// load image and destination info on the card
document.getElementById("loadOnCardBT").addEventListener("click", (event) => {
  event.preventDefault();
  //alert("load on card");
  let cardImgUrl = document.getElementById("cardImgUrl");
  let cardText = document.getElementById("card-text");
  let term = document.getElementById("destination").value;
  let description = document.getElementById("formDescription").value;
  if (term.length != 0) {
    //console.log(term);
    // document.getElementById("cardImgUrl").setAttribute("src", url);
    query(term).then((response) => {
      let images = response.results;
      let url = images[random(images.length)].urls.thumb;
      cardImgUrl.setAttribute("src", url);
      console.log(response.results.length);
    });
    cardText.innerHTML = description;
    document.getElementById("cardDestination").innerHTML = term;
  }
});

document.getElementById("addToDisplay").addEventListener("click", (e) => {});

function createDestinationCard() {
  document.getElementById("displayContainer");
}
