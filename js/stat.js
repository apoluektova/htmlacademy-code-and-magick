'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var TEXT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = 110;

var renderRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderText = function (ctx, text, x, y, color, font) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (array) {
  var maxElement = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getColor = function (item) {
  return (item === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + getRandomInteger(25, 100) + '%,' + getRandomInteger(13, 90) + '%)';
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRectangle(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + TEXT_GAP, TEXT_GAP * 2, '#000', '16px PT Mono');
  renderText(ctx, 'Список результатов:', CLOUD_X + TEXT_GAP, TEXT_GAP * 3, '#000', '16px PT Mono');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barColor = getColor(names[i]);
    renderText(ctx, names[i], CLOUD_X + TEXT_GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP, '#000', '16px PT Mono');
    renderText(ctx, Math.round(times[i]), CLOUD_X + TEXT_GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, BAR_MAX_HEIGHT + GAP + (BAR_MAX_HEIGHT - ((BAR_MAX_HEIGHT * times[i]) / maxTime)), '#000', '16px PT Mono');
    renderRectangle(ctx, CLOUD_X + TEXT_GAP * 2 + (BAR_WIDTH + BAR_GAP) * i, BAR_MAX_HEIGHT + GAP * 2 + (BAR_MAX_HEIGHT - ((BAR_MAX_HEIGHT * times[i]) / maxTime)), BAR_WIDTH, (BAR_MAX_HEIGHT * times[i]) / maxTime, barColor);
  }
};
