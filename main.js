console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000';

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

const getAllCharacters = () => {
  clearCharacters();

  axios.get(baseURL + '/characters')
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i]);
      }
    })
    .catch(err => console.log(err))
}

const getOneCharacter = event => {
  clearCharacters();

  axios.get(`${baseURL}/character/${event.target.id}`)
    .then((res) => {
      createCharacterCard(res.data);
    })
}

for (let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneCharacter);
}

getAllBtn.addEventListener('click', getAllCharacters);

const getOldCharacters = event => {
  event.preventDefault();
  clearCharacters();

  axios.get(`${baseURL}/character/?age=${ageInput.value}`)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i]);
      }
    })
    .catch(err => console.log(err))

  ageInput.value = '';
}

ageForm.addEventListener('submit', getOldCharacters);

const createNewChar = event => {
  event.preventDefault();

  clearCharacters();

  let newLikes = [...newLikesText.value.split(',')];

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  };

  axios.post(`${baseURL}/character/`, body)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i]);
      }
    })

    newFirstInput.value = '';
    newLastInput.value = '';
    newGenderDropDown.value = 'female';
    newLikesText.value = '';
    newAgeInput.value = '';
}

createForm.addEventListener('submit', createNewChar);

getAllCharacters();