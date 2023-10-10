import { pickUpPoints, user } from './data.js'
import star from '../public/cart_view/star.svg'
import editIcon from '../public/cart_total/Vector_(3).svg'


// Модалы

function toggleCardModal (event) {
    event.preventDefault();
    const modal = document.getElementById('card__Modal')
    modal.style.display = "flex";
    renderCards()
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  window.toggleCardModal = toggleCardModal

  
  function toggleAddressesModal (event) {
    event.preventDefault();
    const modal = document.getElementById('addresses__Modal')
    modal.style.display = "flex";
    togglePickupPoint(event) // list precheck
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  window.toggleAddressesModal = toggleAddressesModal
  
  function togglePickupPoint(event) {
    event.preventDefault();
    if (document.getElementById("to__my__address").classList.contains('show__form')) {
      document.getElementById("to__my__address").classList.remove("show__form")
      document.getElementById("courier__button").style.border = '2px solid rgba(203, 17, 171, 0.15)'
    }
    document.getElementById("to__pickup__point").classList.add("show__form");
    document.getElementById("pickup__button").style.border = '2px solid rgba(203, 17, 171, 1)'
    renderPickup()
  }
  window.togglePickupPoint = togglePickupPoint

  
  function toggleAdderess(event) {
    event.preventDefault();
    if (document.getElementById("to__pickup__point").classList.contains('show__form')) {
      document.getElementById("to__pickup__point").classList.remove("show__form")
      document.getElementById("pickup__button").style.border = '2px solid rgba(203, 17, 171, 0.15)'
    }
    document.getElementById("to__my__address").classList.add("show__form");
    document.getElementById("courier__button").style.border = '2px solid rgba(203, 17, 171, 1)'
    renderHomeAddress()
  }
  window.toggleAdderess = toggleAdderess

  
  function closeModal (modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  window.closeModal = closeModal

  
  function renderPickup() {
    let pickup = document.getElementById("pickup__list");
  
    const pickupForm = document.getElementById("to__pickup__point")
    pickupForm.addEventListener(
    "submit",
    (event) => {
      const data = new FormData(pickupForm);
      let output = "";
      for (const entry of data) {
        output = `${entry[1]}`
      }
      // console.log('form output', output)
      event.preventDefault();
      const picked = pickUpPoints.find(point => point.id === output)
      // console.log('picked', picked)
      renderDelivery(picked, 'Пункт выдачи', 'Доставка в пункт выдачи')
      document.getElementById('addresses__Modal').style.display = "none";
    },
    false,
    );

    let rez = pickUpPoints.map( (address, index) => `
  
    <div class="check__cardImg">
      <label class="addresses__container" for=${address.id}>
        <input type="radio" id=${address.id} name='pickup__address' value=${address.id} ${index === 0 ? 'checked' : ''} />
        <span class="radio__checkmark"></span>

        <div>
          <span class="adderess__span">${address.city}, ${address.block ? `${address.block}, ` : ``} ${address.street}, д. ${address.blockAppt}</span>
          <div>
            <img src=${star} alt="">
            <span class="return__text">${address.rating}</span>
            <span class="return__text gray">Пункт выдачи</span>
          </div>
        </div>
         
        <button class="bucket__button" type="button">
        </button>
      </label>
    </div>
  
    `)
    pickup.innerHTML = rez.join('');
  }
  window.renderPickup = renderPickup

  
  function renderHomeAddress() {
    let pickup = document.getElementById("myAddress__list");
  
    const myAdderessForm = document.getElementById("to__my__address")
    myAdderessForm.addEventListener(
    "submit",
    (event) => {
      const data = new FormData(myAdderessForm);
      let output = "";
      for (const entry of data) {
        output = `${entry[1]}`
      }
      // console.log('form output', output)
      event.preventDefault();
      const picked = user.addresses.find(adderess => adderess.id === output)
      // console.log('picked', picked)
      renderDelivery(picked, 'Курьером', 'Доставка курьером')
      document.getElementById('addresses__Modal').style.display = "none";
    },
    false,
    );
  
    let rez = user.addresses.map( (address, index) => `
  
    <div class="check__cardImg">
      <label class="addresses__container" for=${address.id}>
        <input type="radio" id=${address.id} name='home__address' value=${address.id} ${index === 0 ? 'checked' : ''} />
        <span class="radio__checkmark"></span>
        <span class="adderess__span">${address.city}, ${address.block ? `${address.block}, ` : ``} ${address.street}, д. ${address.blockAppt}</span>
        <button class="bucket__button" type="button">
        </button>
      </label>
    </div>
  
    `)
    pickup.innerHTML = rez.join('');
  }
  window.renderHomeAddress = renderHomeAddress

  
  const renderDelivery = (data, type, sideType) => {
    const delMethodSide = document.getElementById('side__delivery__method')
    const delType = document.getElementById('delivery__type__field')
    const delAddress = document.getElementById('delivery__address__field')
    
    delType.innerText = type;

    const delRez = `
      <span>${data.city}, ${data.block ? `${data.block}, ` : ``} ${data.street}, д. ${data.blockAppt}</span>
      <span>
        <span> 
          ${data.rating ? `<img src="assets/cart_view/Path (Stroke).svg" alt=""> ${data.rating}`: ``}
        </span>
        <span> Ежедневно с 10 до 21</span>
      </span>
    `
    delAddress.innerHTML = delRez
  
    const rezSide = `
    <div class="total__header">
      <span>${sideType}</span>
      <button 
      onclick="toggleAddressesModal(event)"
      class="edit__btn"
      style="margin-left: auto;">
        <img src=${editIcon} alt="">
      </button>
    </div>
    <span class="delivery__adress">${data.city}, ${data.block ? `${data.block}, ` : ``} ${data.street}, д. ${data.blockAppt}</span>
    <span class="delivery__date">5–8 фев</span>
    `
    delMethodSide.innerHTML = rezSide
  }
  window.renderDelivery = renderDelivery


  function renderCards() {
    let cards = document.getElementById("cards__list");
    const cardsForm = document.getElementById("cards__form")
    
    cardsForm.addEventListener(
    "submit",
    (event) => {
      const data = new FormData(cardsForm);
      let output = "";
      for (const entry of data) {
        output = `${entry[1]}`
      }
      // console.log('form output', output)
      event.preventDefault();
      const picked = user.cards.find(card => card.id === output)
      // console.log('picked', picked)
      renderCard(picked)
      document.getElementById('card__Modal').style.display = "none";
  
    },
    false,
    );
  
    const renderCard = async (cardData) => {
      const pickedCard = document.getElementById('card__container')
      const pickedCardSide = document.getElementById('side__card__container')
  
      const rez = `
      <img src=${cardData.img} alt="">    
      <div class="centered__flex basic__text">
        ${bulletCard(cardData.number)}
      </div>
      <div class="centered__flex basic__text">
        ${cardData.expiry__date}
      </div>
      `
  
      const rezSide = `
      <img src=${cardData.img} alt="">
      <div class="centered__flex">
        ${bulletCard(cardData.number)}
      </div>`
  
      pickedCard.innerHTML = rez
      pickedCardSide.innerHTML = rezSide
    }
  
  
    const bulletCard = (num) => {
      let number = num.toString().split('').map(Number);
      number.splice(6, 6, '•', '•', '•', '•', '•', '•');
      const rezult = number.join('').match(/.{1,4}/g).join(' ')
      return rezult
    }
  
    let rez = user.cards.map((card, index) => `
  
    <div class="check__cardImg">
      <label class="card__container modal__padding" for=${card.id}>
        <input type="radio" id=${card.id} name='card' value=${card.id} ${index === 0 ? 'checked' : ''} />
        <span class="radio__checkmark"></span>
        <img class="item__image" src="${card.img}" alt="">
        <span class="item__name adderess__span">${bulletCard(card.number)}</span>
      </label>
    </div>
  
    `)
    cards.innerHTML = rez.join('');
  }
  window.renderCards = renderCards
