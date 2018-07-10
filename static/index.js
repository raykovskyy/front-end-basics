function createItem(data, side) {
  var data = {
    "author": "Джо Аберкромби",
    "name": "Кровь и железо",
    "img": "http://fantasy-worlds.org/img/preview/129/12974.jpg"
  },
  navArrow = side==="right"?"before":"after";

  let divItem = document.createElement('div');
    divItem.className = "item";

    let divPic = document.createElement('div');
      divPic.className = "pic";
      let spanImg = document.createElement('span');
        let img = document.createElement('img');
          img.src = data.img;
    
    let divTitle = document.createElement('div');
      divTitle.className = "title";
        let spanName = document.createElement('span'),
          spanNameB = document.createElement('b');

          spanName.innerText = `${data.name}`;
          spanNameB.innerText = `Название : `;

        let spanAuthor = document.createElement('span'),
          spanAuthorB = document.createElement('b');
          spanAuthor.innerText = `${data.author}`;
          spanAuthorB.innerText = `Автор : `;

    let divNav = document.createElement('div');
      divNav.className = navArrow;

        
    spanImg.appendChild(img);
    divPic.appendChild(spanImg);
    divItem.appendChild(divPic);
    
    spanName.insertBefore(spanNameB, spanName.firstChild);
    divTitle.appendChild(spanName);

    spanAuthor.insertBefore(spanAuthorB, spanAuthor.firstChild);
    divTitle.appendChild(spanAuthor);

    divItem.appendChild(divTitle);
    divItem.appendChild(divNav);

    // var leftPart = document.querySelector(`.${side}`);
    // leftPart.insertBefore(divItem, leftPart.firstChild)
    return divItem;

}

function init(){
  if(localStorage){

  }
}

document.addEventListener("DOMContentLoaded", function(){

});
