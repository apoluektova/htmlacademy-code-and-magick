'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_NUMBER = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// Генерация случайного элемента массива
var getRandomArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Создание объекта для представления волшебника
var generateWizards = function () {
  var wizardsArray = [];
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    wizardsArray[i] = {
      name: getRandomArrayItem(FIRST_NAMES) + ' ' + getRandomArrayItem(LAST_NAMES),
      coatColor: getRandomArrayItem(COAT_COLORS),
      eyesColor: getRandomArrayItem(EYES_COLORS)
    };
  }
  return wizardsArray;
};

var wizards = generateWizards();

// Отрисовка волшебников
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content
    .querySelector('.setup-similar-item');
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Добавление волшебников в блок setup
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
wizards.forEach(function (item) {
  fragment.appendChild(renderWizard(item));
});
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

// Обработчики
// Функция закрытия окна при нажатии на Escape
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

// Функция открытия окна редактирования персонажа и закрытие по Escape
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия окна редактирования персонажа
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Появление окна редактирования персонажа при нажатии на аватарку
var setupOpen = document.querySelector('.setup-open');
setupOpen.addEventListener('click', function () {
  openPopup();
});

// Появление окна редактирования персонажа при нажатии на Enter
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// Закрытие окна редактирования персонажа при нажатии на крестик
var setupClose = setup.querySelector('.setup-close');
setupClose.addEventListener('click', function () {
  closePopup();
});

// Закрытие окна редактирования персонажа при нажатии на Enter при фокусе на крестик
setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// Отмена закрытия окна редактирования по Escape, если поле ввода имени в фокусе
var userName = setup.querySelector('.setup-user-name');
userName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});
userName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

// Валидация поля ввода имени
var userNameInput = setup.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Функция изменения цвета элементов волшебника
var getWizardElementColor = function (element, color, input) {
  var randomElementColor = getRandomArrayItem(color);
  element.style.fill = randomElementColor;
  input.value = randomElementColor;
};

// Изменение цвета мантии волшебника по нажатию
var wizardCoatColor = setup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatColorInput = setup.querySelector('input[name="coat-color"]');
wizardCoatColor.addEventListener('click', function () {
  getWizardElementColor(wizardCoatColor, COAT_COLORS, wizardCoatColorInput);
});

// Изменение цвета глаз волшебника по нажатию
var wizardEyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesColorInput = setup.querySelector('input[name="eyes-color"]');
wizardEyesColor.addEventListener('click', function () {
  getWizardElementColor(wizardEyesColor, EYES_COLORS, wizardEyesColorInput);
});

// Изменение цвета фаербола по нажатию
var fireballColor = setup.querySelector('.setup-fireball-wrap');
var fireballColorInput = setup.querySelector('input[name="fireball-color"]');
fireballColor.addEventListener('click', function () {
  var randomFireballColor = getRandomArrayItem(FIREBALL_COLORS);
  fireballColor.style.backgroundColor = randomFireballColor;
  fireballColorInput.value = randomFireballColor;
});
