document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');


//Add a sushi form
const addBtn = document.querySelector('#add-sushi-btn')
const sushiCont = document.querySelector('.container')
const editSushiSubmit = document.querySelector('.edit-sushi-submit')
let addSushi = false

addBtn.addEventListener('click', function(e) {
addSushi = !addSushi
if (addSushi) {
  sushiCont.style.display = 'block'
  addBtn.innerText = 'Close Form'
  addBtn.className = 'btn btn-danger btn-lg'
} else {
  sushiCont.style.display = 'none'
  addBtn.className = 'btn btn-info btn-lg'
  addBtn.innerText = 'Add a new sushi!'

  }
})

//edit a sushi form
// const editBtn = document.querySelector('#edit-sushi-btn')
// const editSushiForm = document.querySelector('.container')
// const addSushiSubmit = document.querySelector('#add-sushi-submit')
// let editSushi = false
//
// editBtn.addEventListener('click', function(e){
//   editSushi = !editSushi
//   if (editSushi) {
//     editSushiForm.style.display = 'block'
//   } else {
//     editSushiForm.style.display = 'none'
//   }
// })


    let allSushi;

 function fetchSushi() {
  fetch('http://localhost:3000/sushi')
    .then(res => res.json())
    .then(sushi => {
      console.log('My Sushi', sushi)
      allSushi = sushi
      renderAllSushi(allSushi)
      // dragAndDrop()
    })
} //end of fetch

const sushiCollection = document.querySelector('#sushi-collection')
const dataList = document.querySelector('#text_editors')

function renderAllSushi(allSushi) {
  sushiCollection.innerHTML = ''
  dataList.innerHTML = ''
  allSushi.forEach(function(sushi) {
    renderOneSushi(sushi)
  })
}

function renderOneSushi(sushi) {
  sushiCollection.innerHTML += `
  <div class="card" draggable="true">
    <h3 type='text' name='name'>${sushi.name}</h3>
    <img data-id=${sushi.id} src=${sushi.image}
     alt="For: ${sushi.sushilevel}" class="sushi-image" />
    <h4>For:${sushi.sushilevel}</h4>
    <h3>
    <button id="likes" class="likes-btn" data-id=${sushi.id}>❤️</button>
    <button class="info-btn" data-id=${sushi.id}>Info</button>
    <button class="delete-btn" data-id=${sushi.id}  >Delete</button>
    Loves: ${sushi.likes}
    </h3>
  </div>
  <!-- The Modal -->
  <div id="myModal" class="modal">
  <span class="close">&times;</span>
  <img class="modal-content" id="img">
  <h3>
    <div id="caption"></div>
  </h3>
<div class="modal-container mt-1">

</div>
  `
  addListNames(sushi)
}

//name fuzzy suggest(this part is from datalist in index.html near 70-80)
function addListNames(sushi){
  const option = document.createElement('option')
  let regex = /[()]/g;
  option.value = sushi.name.toLowerCase().replace(regex, "")

  dataList.appendChild(option)
}

// ////////////////////////////////////////////////*********
// function showAlert(message, className){
//  const div = document.createElement('div');
//  div.className = `alert alert-${className}`;
//  div.appendChild(document.createTextNode(message));
//  // const appTitle = document.querySelector('#app-title')
//  const aboveSushiLine = document.querySelector('.above-sushi-line')
//  // const appDisplay = document.querySelector('.display-4')
//  // appTitle.insertBefore(div, appDisplay)
//  aboveSushiLine.insertBefore(div, sushiCollection)






// add a new sushi
const sushiForm = document.querySelector('#sushi-form')
sushiCont.addEventListener('submit', function(e) {
  e.preventDefault()
  if (e.target.name.value === '' || e.target.image.value === '') {
    showAlert("😡😡😡You Can't leave any fields blank😡😡😡", 'danger')
  } else {

    fetch('http://localhost:3000/sushi', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": e.target.name.value,
          "image": e.target.image.value,
          "sushilevel": e.target['sushi-mastery-dropdown'].value
        })
      }) //end of fetch
      .then(res => res.json())
      .then(newSushi => fetchSushi(console.log('this is my new sushi')))
      .then(() => showAlert('Added a new sushi, Mmmm. Go to the bottom to see your new sushi', 'success'))

    sushiForm.reset();
    sushiCont.style.display = 'none'
    addSushi = false
    addBtn.className = 'btn btn-info btn-lg'
    addBtn.innerText = 'Add a new sushi!'

  }
}) //end of add a new sushi


//modal
//info button or image event listener
document.addEventListener('click', function(e){
  const infoBtn = e.target.className === 'info-btn'
  const sushiImage = e.target.className === 'sushi-image'
  const foundSushi = allSushi.find(function(sushi){
    return sushi.id == e.target.dataset.id
})
  if (infoBtn || sushiImage) {
    let modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let img = document.querySelector('.sushi-image');
    let modalImg = document.getElementById("img");
    let captionText = document.getElementById("caption");
    let modalCont = document.querySelector('.modal-container');

      modal.style.display = "block";
      modalImg.src = foundSushi.image;
      captionText.innerHTML = "For:" + " " + foundSushi.sushilevel;
      modalCont.innerHTML = `
      <form id="edit-sushi-form">
        <div class="form-group">
          <label class="col-form-label col-form-label-lg" for="inputLarge">Sushi Name</label>
          <input class="form-control form-control-lg" type="text" name="name" value="${foundSushi.name}" placeholder=${foundSushi.name} id="input-name">
        </div>
        <div class="form-group">
          <label class="col-form-label col-form-label-lg" for="inputLarge">Image URL</label>
          <input class="form-control form-control-lg" type="text" name="image" value="${foundSushi.image}" placeholder=${foundSushi.image} id="input-url">
        </div>
        <div class="form-group">
          <label class="col-form-label col-form-label-lg" for="inputLarge">Sushi Mastery (What level would this sushi be recommended for?</label>
          <h5>Sushi Novice(Never tried, 1-2 times)</h5>
          <h5>Sushi Veteran(Eats regularly but sticks with what they like)</h5>
          <h5>Sushi Savant(A sushi ninja who can tell the difference in rice acidity and seeks out only the best sushi)</h5>
          <select class="col-form-label col-form-label-lg" id="sushi-mastery-dropdown" name="sushi-mastery-dropdown">
            <option>Sushi Novice</option>
            <option>Sushi Veteran</option>
            <option>Sushi Savant</option>
          </select>
        </div>
        <input type="submit" value="❤️ Edit this Sushi ❤️" class="btn btn-warning btn-lg" data-id=${foundSushi.id} id="edit-sushi-submit">
      </form>
      </div>
      `



      //edit a sushi
      const editForm = document.querySelector('#edit-sushi-form')
      const editBtn = document.querySelector('#edit-sushi-submit')
      editForm.addEventListener('submit', function(e){
        e.preventDefault()
          if(editBtn){
            // console.log(editBtn)
            // console.log(e.target[3].dataset.id)
            // debugger
            let id = e.target[3].dataset.id

            fetch(`http://localhost:3000/sushi/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                "name": e.target.name.value,
                "image": e.target.image.value,
                "sushilevel": e.target['sushi-mastery-dropdown'].value
              })
            }) //end of fetch
            .then(res => res.json())
              .then(editedSushi => fetchSushi(console.log('this is my edited sushi')))
          }

    })//end of edit eventlistener


    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    let modalBackground = document.querySelector('.modal')

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    // modalBackground.onclick = function() {
    //     modal.style.display = "none";
    // }
  }

})//end of info button event listener


//delete a sushi
document.addEventListener('click', function(e) {
  const deleteBtn = e.target.className === 'delete-btn'
  let id = e.target.dataset.id

  if (deleteBtn) {
    const config = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/sushi/${id}`, config)
    .then(fetchSushi)
    .then(() => showAlert("😵😵😵😵😵I don't like this sushi anymore😵😵😵😵😵", 'danger'))
  }

})

//Add alerts when add form validation, add success, delete success
 function showAlert(message, className){
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  // const appTitle = document.querySelector('#app-title')
  const aboveSushiLine = document.querySelector('.above-sushi-line')
  // const appDisplay = document.querySelector('.display-4')
  // appTitle.insertBefore(div, appDisplay)
  aboveSushiLine.insertBefore(div, sushiCollection)


  //disappear after set amt of seconds
  setTimeout(()=> document.querySelector('.alert').remove(), 4000)

}//end of alert function




//drag and drop

// function dragAndDrop(){
// const sushiCard = document.querySelector('.card')
//
// sushiCard.addEventListener('dragstart', dragStart);
// sushiCard.addEventListener('dragend', dragEnd);
// }
//
//
//
// //drag functions
// function dragStart() {
//   this.className += 'hold';
//   setTimeout(()=> this.className = 'invisible', 120);
// }
//
// function dragEnd() {
//   this.className = 'sushiCard';
//
// }

//loading spinner
function showSpinner(){
const aboveSushiLine = document.querySelector('.above-sushi-line')
const p = document.createElement('p');
  p.className = "spinner";
aboveSushiLine.appendChild(p)

  //disappear after set amt of seconds
  setTimeout(()=> document.querySelector('.spinner').remove(), 2000)

}//end of spinner function


//Fuzzy Fuzzy Search  (images)
let input = document.querySelector('.search')

input.addEventListener('input', fuzzySearch)

function fuzzySearch(e){
  let regex = /[()]/g;
  const searchSushi = allSushi.filter(function(sushi){
    return sushi.name.toLowerCase().replace(regex, "").includes(e.target.value)
  })
  console.log(searchSushi)
  renderAllSushi(searchSushi)
}//end of Fuzzy Search


//adding likes
document.addEventListener('click', function(e){
  if(e.target.className === 'likes-btn'){
    const foundSushi = allSushi.find(function(sushi){
      return sushi.id == e.target.dataset.id
    })
  let id = e.target.dataset.id
  let likeDom = document.querySelector(`[data-id='${foundSushi.id}']`)
  let likeCount = foundSushi.likes

  likeDom.innerText = `Likes: ${++likeCount}`

  fetch(`http://localhost:3000/sushi/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount
    })
  }) //end of fetch
  .then(()=> fetchSushi())
}

})//end of likes









showSpinner()

setTimeout(()=> fetchSushi(), 2000)




}); //end of DOM loader
