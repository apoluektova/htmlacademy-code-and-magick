'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_NUMBER = 4;

// Генерация случайного элемента массива
var getRandomArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)]
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
