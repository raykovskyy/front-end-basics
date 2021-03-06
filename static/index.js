var dataJSON;
function createItem(id, data, side) {
  var navArrow = side==="right"?"before":"after",
    pushSide = side==="right"?"left":"right";

  let divItem = document.createElement('div');
    divItem.className = "item";
    divItem.setAttribute("id", id);

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
          
          spanAuthor.className = "author";
          spanAuthor.innerText = `${data.author}`;
          spanAuthorB.innerText = `Автор : `;

    let divNav = document.createElement('div');
      divNav.className = navArrow;
      divNav.addEventListener("click", (e)=>onArrowClick(e, pushSide));

    spanImg.appendChild(img);
    divPic.appendChild(spanImg);
    divItem.appendChild(divPic);
    
    spanName.insertBefore(spanNameB, spanName.firstChild);
    divTitle.appendChild(spanName);

    spanAuthor.insertBefore(spanAuthorB, spanAuthor.firstChild);
    divTitle.appendChild(spanAuthor);

    divItem.appendChild(divTitle);
    divItem.appendChild(divNav);

    return divItem;
}

function onArrowClick(e, pushSide){
  var item = e.target.parentNode,
    side = pushSide=="left"?"right":"left",
    id = item.getAttribute('id'),
    pushTo = document.querySelector(`.${pushSide}`),
    localStorageItems = JSON.parse(localStorage.getItem("items"));

    item.remove();
    pushTo.appendChild(createItem(id, dataJSON[id], pushSide));

    localStorageItems[side] = localStorageItems[side].filter((e)=>e!==id);
    if (!localStorageItems[pushSide]) localStorageItems[pushSide] = [];
    localStorageItems[pushSide].push(id);

    localStorage.setItem("items", JSON.stringify(localStorageItems));

}

function readFile(path, callback){
    var json = {},
      path = path || 'static/data.json',
      request = new XMLHttpRequest();
      request.open("GET", path, false); request.send(null);
    try{
      json = JSON.parse(request.responseText);
    }catch(err){console.error(err)};

    return json;
}

function onFilterAuthtors(text){
  var filter   = Array.prototype.filter,
    result   = document.querySelectorAll('div.title'),
    filtered = filter.call( result, function( node ) {
      return node.querySelector('span.author').innerText.toLowerCase().indexOf(text.toLowerCase())===-1;
    }),
    notFiltered = filter.call( result, function( node ) {
      return node.querySelector('span.author').innerText.toLowerCase().indexOf(text.toLowerCase())!==-1;
    });
  filtered.forEach((e)=>e.parentNode.className=e.parentNode.className+" hide");
  notFiltered.forEach((e)=>{e.parentNode.className = e.parentNode.className.replace("hide", "")})
}

function init(){
  dataJSON = readFile();
  if(!localStorage.getItem("items")) localStorage.setItem("items", JSON.stringify({"left":Object.keys(dataJSON)}))
  var data = JSON.parse(localStorage.getItem("items"));

  Object.keys(data).forEach(function(side){
    let div = document.querySelector(`.${side}`);
    data[side].map((e)=>div.appendChild(createItem(e, dataJSON[e], side)));
  });
}

document.addEventListener("DOMContentLoaded", function(){
  init();
  var timeout;
  document.querySelector('input[type=text]').addEventListener("keyup", function(e){
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      onFilterAuthtors(e.target.value)
    }, 100);
  });
});