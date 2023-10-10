import teeDesc from '../public/items/tee__desc.png'
import teeMobile from '../public/items/tee__mobile.png'
import teeDelivery from '../public/items/tee__delivery.png'
import caseDesc from '../public/items/case__desc.png'
import caseMobile from '../public/items/case__mobile.png'
import caseDelivery from '../public/items/case__delivery.png'
import pencilDesc from '../public/items/pencils__desc.png'
import pencilMobile from '../public/items/pencils__mobile.png'
import pencilDelivery from '../public/items/pencils__delivery.png'
import mir from '../public/cards/mir.svg'
import mc from '../public/cards/mc.svg'
import visa from '../public/cards/visa.svg'
import maestro from '../public/cards/maestro.svg'

export const products = [
    {
      'id': 'футболка',
      'name': 'Футболка UZcotton мужская',
      'color': 'белый',
      'size': '56',
      'img': teeDesc,
      'img__mobile': teeMobile,
      'img__delivery': teeDelivery,
      'price': 1051,
      'in_stock': 2,
      'general_discount': .20,
      'personal_discount': .05,
      'warehouse': 'Коледино WB',
      'seller_form': 'ООО',
      'seller_name': 'Вайлдберриз',
      'seller_ogrn': 'ОГРН 5167746237148',
      'seller_adress': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
      'avaliable' : false,
    },
    {
      'id': 'чехол',
      'name': 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
      'color': 'прозрачный',
      'img': caseDesc,
      'img__mobile': caseMobile,
      'img__delivery': caseDelivery,
      'price': 11500,
      'in_stock': 300,
      'general_discount': .50,
      'personal_discount': .10,
      'warehouse': 'Коледино WB',
      'seller_form': 'ООО',
      'seller_name': 'Мегапрофстиль',
      'seller_ogrn': 'ОГРН 1234567890123',
      'seller_adress': '129337, город Москва, ул. Красная Сосна, д. 2 к. 1 строение 1, помещ. II комната 34',
      'avaliable' : false,
    },  
    {
      'id': 'карандаши',
      'name': `Карандаши цветные Faber-Castell &quot;Замок&quot;, набор 24 цвета, заточенные, шестигранные, Faber&ndash;Castell`,
      // 'size': '56/54/52/50/48' // - в прошлых версиях макета был размер
      'img': pencilDesc,
      'img__mobile': pencilMobile,
      'img__delivery': pencilDelivery,
      'price': 450,
      'in_stock': 5,
      'general_discount': .30,
      'personal_discount': .05,
      'warehouse': 'Коледино WB',
      'seller_form': 'ООО',
      'seller_name': 'Вайлдберриз',
      'seller_ogrn': 'ОГРН 5167746237148',
      'seller_adress': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
      'avaliable' : false,
    },
  ]
  
  export const user = {
    cards: [
      {
        'img': mir,
        'brand': 'mir',
        'number': 1234123412341234,
        'expiry__date': '01/30',
        'id': 'mir__card',
      },
      {
        'img': mc,
        'brand': 'mastercard',
        'number': 4321432143214321,
        'expiry__date': '02/31',
        'id': 'mastercard__card',
      },
      {
        'img': visa,
        'brand': 'visa',
        'number': 1221122112211221,
        'expiry__date': '03/32',
        'id': 'visa__card',
      },
      {
        'img': maestro,
        'brand': 'maestro',
        'number': 9119911991199119,
        'expiry__date': '04/33',
        'id': 'maestro__card',
      },
    ],
    addresses: [
      {
        'city': 'Бишкек',
        'street': 'улица Табышалиева',
        'blockAppt': '57',
        'id': '4',
      },
      {
        'city': 'Бишкек',
        'street': 'улица Жукеева-Пудовкина',
        'blockAppt': '77/1',
        'id': '5',
      },
      {
        'city': 'Бишкек',
        'street': 'улица Ахунбаева Исы',
        'block': 'микрорайон Джал',
        'blockAppt': '67/1',
        'id': '6',
      },
    ]
  }
  
  export const pickUpPoints = [
    {
      'city': 'Бишкек',
      'street': 'улица Ахунбаева Исы',
      'block': 'микрорайон Джал',
      'blockAppt': '67/1',
      'rating': '',
      'id': '1',
    },
    {
      'city': 'Бишкек',
      'street': 'улица Ахунбаева Исы',
      'block': 'микрорайон Джал',
      'blockAppt': '67/1',
      'rating': '4.99',
      'id': '2',
    },
    {
      'city': 'Бишкек',
      'street': 'улица Табышалиева',
      'blockAppt': '57',
      'rating': '4.99',
      'id': '3',
    },
  ]