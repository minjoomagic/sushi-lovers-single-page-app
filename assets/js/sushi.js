document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
//Add a sushi form
const addBtn = document.querySelector('#add-sushi-btn')
const addSushiForm = document.querySelector('.container')
const editSushiSubmit = document.querySelector('.edit-sushi-submit')
let addSushi = false

addBtn.addEventListener('click', function(e){
  addSushi = !addSushi
  if (addSushi) {
    addSushiForm.style.display = 'block'
    // submit listener here
  }
  else {
    addSushiForm.style.display = 'none'
  }
})

//edit a sushi form
const editBtn = document.querySelector('#edit-sushi-btn')
const editSushiForm = document.querySelector('.container')
const addSushiSubmit = document.querySelector('#add-sushi-submit')
let editSushi = false

editBtn.addEventListener('click', function(e){
  // hide & seek with the form
  editSushi = !editSushi
  if (editSushi) {
    editSushiForm.style.display = 'block'
    // submit listener here
  } else {
    editSushiForm.style.display = 'none'
  }
})


    let allSushi;

function fetchSushi(){
  fetch('http://localhost:3000/sushi')
  .then(res => res.json())
  .then(sushi => {
    console.log('My Sushi', sushi)
    allSushi = sushi
    renderAllSushi(allSushi)
  })
}//end of fetch

const sushiCollection = document.querySelector('#sushi-collection')


function renderAllSushi(allSushi){
  sushiCollection.innerHTML = ''
  allSushi.forEach(function(sushi){
    renderOneSushi(sushi)
  })
}

function renderOneSushi(sushi){
  sushiCollection.innerHTML += `
  <div class="card">
    <h3>${sushi.name}</h3>
    <img src=${sushi.image} class="sushi-image" />
    <h4>For:${sushi.sushilevel}</h4>
    <h3><button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button></h3>
  </div>
  `
}

//add a new sushi
const sushiForm = document.querySelector('#sushi-form')
addSushiForm.addEventListener('submit', function(e){
  e.preventDefault()
  // console.log(e.target.name.value)
  // console.log(e.target.image.value)
  // console.log(e.target['sushi-mastery-dropdown'].value)

  fetch('http://localhost:3000/sushi', {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
       "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "sushilevel": e.target['sushi-mastery-dropdown'].value
    })
  })//end of fetch
  .then(res => res.json())
  .then(newSushi => fetchSushi(console.log('this is my new sushi')))

  sushiForm.reset();
  addSushiForm.style.display = 'none'
  addSushi=false

})//end of addSushi






fetchSushi();

}); //end of DOM loader
