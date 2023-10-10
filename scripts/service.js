export const WordEnding = (function() {

    // Функция для определения правильного окончания
    function getWordEnding (number, arr) {
        if (number > 100) number = number % 100;
        if (number <= 20 && number >= 10) return arr[2];
        if (number > 20) number = number % 10;
        return number === 1 ? arr[0] : number > 1 && number < 5 ? arr[1] : arr[2]
    }

    // Метод для изменения окончания слова
    function changeEnding(number, arr) {
      const ending = getWordEnding(number, arr); // Получаем правильное окончани
      return `${ending}`;
    }

    // Возвращаем  метод модуля
    return {
        changeEnding
    };
  })();