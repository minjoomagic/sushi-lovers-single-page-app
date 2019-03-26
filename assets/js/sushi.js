document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');

//Add a sushi form
const addBtn = document.querySelector('#add-sushi-btn')
const addSushiForm = document.querySelector('.container')
const editSushiSubmit = document.querySelector('.edit-sushi-submit')
let addSushi = false

addBtn.addEventListener('click', function(e) {
addSushi = !addSushi
if (addSushi) {
  addSushiForm.style.display = 'block'
  addBtn.innerText = 'Close Form'
  addBtn.className = 'btn btn-danger btn-lg'
} else {
  addSushiForm.style.display = 'none'
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
    })
} //end of fetch

const sushiCollection = document.querySelector('#sushi-collection')

function renderAllSushi(allSushi) {
  sushiCollection.innerHTML = ''
  allSushi.forEach(function(sushi) {
    renderOneSushi(sushi)
  })
}

function renderOneSushi(sushi) {
  sushiCollection.innerHTML += `
  <div class="card">
    <h3>${sushi.name}</h3>
    <img data-id=${sushi.id} src=${sushi.image}
     alt="For: ${sushi.sushilevel}" class="sushi-image" />
    <h4>For:${sushi.sushilevel}</h4>
    <h3><button class="info-btn" data-id=${sushi.id}>Info</button>
    <button class="delete-btn" data-id=${sushi.id}  >Delete</button></h3>
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
}

// add a new sushi
const sushiForm = document.querySelector('#sushi-form')
addSushiForm.addEventListener('submit', function(e){
  e.preventDefault()

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

sushiForm.reset();
addSushiForm.style.display = 'none'
addSushi = false
addBtn.className = 'btn btn-info btn-lg'
addBtn.innerText = 'Add a new sushi!'
})//end of add a new sushi

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
        <input type="submit" value="<3 Edit this Sushi <3" class="btn btn-warning btn-lg" data-id=${foundSushi.id} id="edit-sushi-submit">
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

  if (deleteBtn) {
    let id = e.target.dataset.id
    const config = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/sushi/${id}`, config)
      .then(fetchSushi)
  }
})


fetchSushi();

}); //end of DOM loader
