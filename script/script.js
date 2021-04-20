//alert("i am here");
const unsplashAPI =
  "https://api.unsplash.com/search/photos?client_id=CLnWpARpr78PvJHV7Y6ApKdMDkFoxb2eqr_UxKHeO5g&page=1&query=";

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

function imgUrl(term) {
  query(term).then((response) => {
    let result = response.results[random(10)].urls.large;
    console.log(result.length);
    return result;
  });
}

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
  }
});

function random(x) {
  return Math.floor(Math.random() * x);
}
