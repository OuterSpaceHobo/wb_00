import { pickUpPoints, user } from './data.js'
import star from './public/cart_view/star.svg'

// Модалы

function toggleCardModal (event) {
    event.preventDefault();
    const modal = document.getElementById('card__Modal')
    modal.style.display = "flex";
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
  
    let rez = pickUpPoints.map(address => `
  
    <div class="check__cardImg">
      <label class="addresses__container" for=${address.id}>
        <input type="radio" id=${address.id} name='pickup__address' value=${address.id} />
        <span class="radio__checkmark"></span>

        <div>
          <span>${address.city}, ${address.block ? `${address.block}, ` : ``} ${address.street}, д. ${address.blockAppt}</span>
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
  
    let rez = user.addresses.map(address => `
  
    <div class="check__cardImg">
      <label class="addresses__container" for=${address.id}>
        <input type="radio" id=${address.id} name='home__address' value=${address.id} />
        <span class="radio__checkmark"></span>
        <span>${address.city}, ${address.block ? `${address.block}, ` : ``} ${address.street}, д. ${address.blockAppt}</span>
        <button class="bucket__button" type="button">
        </button>
      </label>
    </div>
  
    `)
    pickup.innerHTML = rez.join('');
  }
  window.renderHomeAddress = renderHomeAddress

  
  const renderDelivery = (data, type, sideType) => {
    const delMethod = document.getElementById('delivery__method')
    const delMethodSide = document.getElementById('side__delivery__method')
  
    const rez = `
    <span class="grid__item semibold">${type}</span>
    <div class="grid__item basic__flex">
      <span>${data.city}, ${data.block ? `${data.block}, ` : ``} ${data.street}, д. ${data.blockAppt}</span>
      <span>
        <span> 
          ${data.rating ? `<img src="assets/cart_view/Path (Stroke).svg" alt=""> ${data.rating}`: ``}
        </span>
        <span> Ежедневно с 10 до 21</span>
      </span>
    </div>
    <span class="grid__item semibold">Стоимость доставки</span>
    <span class="grid__item">Бесплатно</span>
    <span class="grid__item semibold">5—6 февраля</span>
    <span class="grid__item">доставят товары</span>
    <span class="grid__item semibold">7—8 февраля</span>
    <span class="grid__item">доставят товары</span>
    `
  
    const rezSide = `
    <div class="total__header">
      <span>${sideType}</span>
      <button 
      onclick="toggleAddressesModal(event)"
      class="edit__btn"
      style="margin-left: auto;">
        <img src="assets/cart_total/Vector (3).svg" alt="">
      </button>
    </div>
    <span class="delivery__adress">${data.city}, ${data.block ? `${data.block}, ` : ``} ${data.street}, д. ${data.blockAppt}</span>
    <span class="delivery__date">5–8 фев</span>
    `
  
    delMethod.innerHTML = rez
    delMethodSide.innerHTML = rezSide
  }
  window.renderDelivery = renderDelivery
