import teeDesc from './public/items/tee__desc.png'
import teeMobile from './public/items/tee__mobile.png'
import caseDesc from './public/items/case__desc.png'
import caseMobile from './public/items/case__mobile.png'
import pencilDesc from './public/items/pencils__desc.png'
import pencilMobile from './public/items/pencils__mobile.png'
import mir from './public/cards/mir.svg'
import mc from './public/cards/mc.svg'
import visa from './public/cards/visa.svg'
import maestro from './public/cards/maestro.svg'

export const products = [
    {
      'id': 'футболка',
      'name': 'Футболка UZcotton мужская',
      'color': 'белый',
      'size': 56,
      // 'img': 'assets/items/tee__desc.png',
      // 'img__mobile': 'assets/items/tee__mobile.png',
      // 'img': 'public/items/tee__desc.png',
      'img': teeDesc,
      'img__mobile': teeMobile,
      'price': 1051,
      'in_stock': 2,
      'general_discount': .20,
      'personal_discount': .05,
      'warehouse': 'Коледино WB',
      'seller_name': 'ООО Вайлдберриз',
      'seller_orgn': 5167746237148,
      'seller_adress': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
      'avaliable' : false,
    },
    {
      'id': 'чехол',
      'name': 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
      'color': 'прозрачный',
      // 'img': 'assets/items/case__desc.png',
      // 'img__mobile': 'assets/items/case__mobile.png',
      'img': caseDesc,
      'img__mobile': caseMobile,
      'price': 11500,
      'in_stock': 300,
      'general_discount': .50,
      'personal_discount': .10,
      'warehouse': 'Коледино WB',
      'seller_name': 'ООО Мегапрофстиль',
      'seller_orgn': 1234567890123,
      'seller_adress': '129337, Москва, где-то',
      'avaliable' : false,
    },  
    {
      'id': 'карандаши',
      'name': `Карандаши цветные Faber-Castell &quot;Замок&quot;, набор 24 цвета, заточенные, шестигранные, Faber&ndash;Castell`,
      // 'img': 'assets/items/pencils__desc.png',
      // 'img__mobile': 'assets/items/pencils__mobile.png',
      'img': pencilDesc,
      'img__mobile': pencilMobile,
      'price': 450,
      'in_stock': 5,
      'general_discount': .30,
      'personal_discount': .05,
      'warehouse': 'Коледино WB',
      'seller_name': 'ООО Вайлдберриз',
      'seller_orgn': 5167746237148,
      'seller_adress': '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
      'avaliable' : false,
    },
  ]
  
  export const user = {
    cards: [
      {
        // 'img': '/assets/cards/mir.svg',
        'img': mir,
        'brand': 'mir',
        'number': 1234123412341234,
        'expiry__date': '01/30',
        'id': 'mir__card',
      },
      {
        // 'img': '/assets/cards/mc.svg',
        'img': mc,
        'brand': 'mastercard',
        'number': 4321432143214321,
        'expiry__date': '02/31',
        'id': 'mastercard__card',
      },
      {
        // 'img': '/assets/cards/visa.svg',
        'img': visa,
        'brand': 'visa',
        'number': 1221122112211221,
        'expiry__date': '03/32',
        'id': 'visa__card',
      },
      {
        // 'img': '/assets/cards/maestro.svg',
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