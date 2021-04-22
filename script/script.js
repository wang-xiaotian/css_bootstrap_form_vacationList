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
    document.getElementById("location").innerHTML = term;
  }
});

document.getElementById("addToDisplay").addEventListener("click", (e) => {
  let display = document.getElementById("displayContainer");
  let location = document.getElementById("location").innerText;
  let img = document.getElementById("cardImgUrl").src;
  let description = document.getElementById("card-text").innerText;
  display.appendChild(createDestinationCard(location, img, description));
});

function createDestinationCard(destination, destinationImg, description) {
  let divCon = document.createElement("div");
  divCon.setAttribute("class", "col-md-3 d-flex pb-3");
  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card container-fluid");
  let imgTop = document.createElement("img");
  if (destinationImg !== null) {
    imgTop.setAttribute("src", destinationImg);
  } else {
    imgTop.setAttribute("src", "img/default.png");
  }
  imgTop.setAttribute("class", "card-img-top");
  imgTop.setAttribute("alt", destination + " is my destination");

  imgTop.setAttribute("object-fit", "cover");
  let divBody = document.createElement("div");
  divBody.setAttribute("class", "card-body");
  let cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = destination;
  let destinationDescrip = document.createElement("p");
  destinationDescrip.setAttribute("class", "card-text col-md-8");
  destinationDescrip.innerHTML = description;
  let deleteBN = document.createElement("a");
  deleteBN.setAttribute(
    "class",
    "btn btn-danger position-absolute bottom-0 end-0 m-2"
  );
  // applyBN.setAttribute("position", "absolute");
  // applyBN.setAttribute("left", 0);
  // applyBN.setAttribute("bottom", 0);

  deleteBN.innerHTML = "Delete";

  divBody.appendChild(cardTitle);
  divBody.appendChild(destinationDescrip);
  divBody.appendChild(deleteBN);
  divCard.appendChild(imgTop);
  divCard.appendChild(divBody);
  divCon.appendChild(divCard);
  return divCon;
}
