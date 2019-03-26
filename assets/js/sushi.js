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
    <img src=${sushi.image} class="sushi-image" />
    <h4>For:${sushi.sushilevel}</h4>
    <h3><button class="edit-btn" data-id=${sushi.id}>Edit</button>
    <button class="delete-btn" data-id=${sushi.id}  >Delete</button></h3>
  </div>
  `
}

// add a new sushi
const sushiForm = document.querySelector('#sushi-form')
addSushiForm.addEventListener('submit', function(e){
  e.preventDefault()
  // console.log(e.target.name.value)
  // console.log(e.target.image.value)
  // console.log(e.target['sushi-mastery-dropdown'].value)

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

})

// //render edit form on the popup when edit is pressed
// const myPopup = document.querySelector('#myPopup')
// document.addEventListener('click', function(e){
//   if(e.target.innerText === 'Edit')
//   myPopup.innerHTML += `
//   <form action="/action_page.php" class="form-container">
//   <h1>Edit this Sushi</h1>
//
//   <label for="name"><b>Name</b></label>
//   <input type="text" placeholder="sushi name" name="name" required>
//
//   <label for="Image URL"><b>Image Url</b></label>
//   <input type="Image URL" placeholder="sushi url" name="url" required>
//
//   <button type="submit" class="btn">Update</button>
//   <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
//   </form>
//   `
// })//end of document listener
//



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
