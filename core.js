/* Copyright (C) 2014 Bryan Jones

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// Using unit circle math might be easier, but the laws of sin
// and cosine are so much more fun! Plus I will be adding elliptical
// orbits.

$(document).ready(function() {
  drawCanvas();
  // Set the default drop down to match current month.
  $('#selector').val(new Date().getMonth());

  var total_days = daysInMonth(new Date().getMonth(), new Date().getYear());

  var selectList = document.getElementById('day-list');
  for (var i = 1; i <= total_days; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectList.appendChild(option);
  }
  $('#day-list').val(new Date().getDate());
  $('#year-field').val(new Date().getFullYear());


  $('#submit').click(function() {
    resetCanvas();
  });

  // Change the canvas if they select a month or day.
  $('#selector, #day-list').change(function() {
    resetCanvas();
  });
});

/**
 * Draw the canvas.
 */
function drawCanvas(date, day, year) {
  if (typeof date == "undefined" || typeof day == "undefined") {
    date = new Date().getMonth();
    day = new Date().getDate();
  }
  if (typeof year == "undefined") {
    year = new Date().getFullYear();
  }
  var canvas = document.getElementById('earth-clock');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    var centerX = 350;
    var centerY = 350;
    var mercuryRadius = 3;
    var venusRadius = 9;
    var earthRadius = 10;
    var marsRadius = 7;
    var jupiterRadius = 30;
    var saturnRadius = 20;
    var uranusRadius = 12;
    var neptuneRadius = 12;
    var mercuryColor = "#aaa";
    var venusColor = "#a51";
    var earthColor = "#18e";
    var marsColor = "#723";
    var jupiterColor = "#f95";
    var saturnColor = "#993";
    var uranusColor = "#0f7";
    var neptuneColor = "#04f";
    var mercuryOrbitRadius = 40;
    var venusOrbitRadius = 60;
    var earthOrbitRadius = 90;
    var marsOrbitRadius = 120;
    var jupiterOrbitRadius = 170;
    var saturnOrbitRadius = 230;
    var uranusOrbitRadius = 280;
    var neptuneOrbitRadius = 320;
    var mercuryOrbitalPeriod = 88;
    var venusOrbitalPeriod = 224.7;
    var earthOrbitalPeriod = 365.25;
    var marsOrbitalPeriod = 686.971;
    var jupiterOrbitalPeriod = 4332.59;
    var saturnOrbitalPeriod = 10759.22;
    var uranusOrbitalPeriod = 30687.15;
    var neptuneOrbitalPeriod = 60190.03;
    var mercuryOffset = 300;
    var venusOffset = 298;
    var earthOffset = 0;
    var marsOffset = 190;
    var jupiterOffset = 130;
    var saturnOffset = 170;
    var uranusOffset = 144;
    var neptuneOffset = 230;

    // Draw orbit.
    drawOrbit(ctx, centerX, centerY, earthOrbitRadius);
    drawOrbit(ctx, centerX, centerY, marsOrbitRadius);
    drawOrbit(ctx, centerX, centerY, mercuryOrbitRadius);
    drawOrbit(ctx, centerX, centerY, venusOrbitRadius);
    drawOrbit(ctx, centerX, centerY, jupiterOrbitRadius);
    drawOrbit(ctx, centerX, centerY, saturnOrbitRadius);
    drawOrbit(ctx, centerX, centerY, uranusOrbitRadius);
    drawOrbit(ctx, centerX, centerY, neptuneOrbitRadius);

    // Draw sun
    drawSun(ctx, centerX, centerY);

    // Draw Mercury.
    drawPlanet(ctx, centerX, centerY, mercuryOrbitRadius, mercuryRadius, mercuryColor, mercuryOrbitalPeriod, date, day, year, mercuryOffset);

    // Draw Venus.
    drawPlanet(ctx, centerX, centerY, venusOrbitRadius, venusRadius, venusColor, venusOrbitalPeriod, date, day, year, venusOffset, 1);

    // Draw Earth.
    drawPlanet(ctx, centerX, centerY, earthOrbitRadius, earthRadius, earthColor, earthOrbitalPeriod, date, day, year, earthOffset);

    // Draw Mars.
    drawPlanet(ctx, centerX, centerY, marsOrbitRadius, marsRadius, marsColor, marsOrbitalPeriod, date, day, year, marsOffset);

    // Draw Jupiter.
    drawPlanet(ctx, centerX, centerY, jupiterOrbitRadius, jupiterRadius, jupiterColor, jupiterOrbitalPeriod, date, day, year, jupiterOffset);

    // Draw Saturn.
    drawPlanet(ctx, centerX, centerY, saturnOrbitRadius, saturnRadius, saturnColor, saturnOrbitalPeriod, date, day, year, saturnOffset);

    // Draw Uranus.
    drawPlanet(ctx, centerX, centerY, uranusOrbitRadius, uranusRadius, uranusColor, uranusOrbitalPeriod, date, day, year, uranusOffset);

    // Draw Neptune.
    drawPlanet(ctx, centerX, centerY, neptuneOrbitRadius, neptuneRadius, neptuneColor, neptuneOrbitalPeriod, date, day, year, neptuneOffset);
  }
}

/**
 * Resets the canvas.
 */
function resetCanvas() {
  // Set store selected values.
  var month = $("#selector option:selected").val();
  var day = $('#day-list option:selected').val();
  var year = parseInt($('#year-field').val());

  // Remove old options from the day list.
  $("#day-list option").remove();
  total_days = daysInMonth(month, year);

  // Rebuild the select list based off of month.
  var selectList = document.getElementById('day-list');
  for (var i = 1; i <= total_days; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectList.appendChild(option);
  }

  // If the day is larger than the month total, set it to the total.
  if (day > total_days) {
    day = total_days;
  }
  $('#day-list').val(day);
  drawCanvas(month, day, year);
}

/**
 * Draw the orbital path.
 */
function drawOrbit(ctx, centerX, centerY, orbitRadius) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, orbitRadius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.closePath();
  ctx.stroke();
}

/**
 * Draw the sun.
 */
function drawSun(ctx, centerX, centerY) {
  var sunRadius = 20;
  ctx.beginPath();
  ctx.arc(centerX, centerY, sunRadius, 0, 2 * Math.PI, false);
  ctx.shadowBlur = 40;
  ctx.shadowColor = "#ffa500";
  ctx.fillStyle = "#ff0";
  ctx.fill();
  ctx.strokeStyle = "#ee0";
  ctx.closePath();
  ctx.stroke();
}

/**
 * Draw the earth and position it.
 */
function drawPlanet(ctx, centerX, centerY, orbitRadius, radius, color, orbitalPeriod, inMonth, inDay, inYear, offset, reverse) {
  // Get the current date to position the earth.
  var degree_per_day = (360/orbitalPeriod);
  inDay = degree_per_day * getDateYear(inMonth, inDay, inYear);

  // Get the x and y coordinates.
  var xPosition = calculateXPosition(inDay, inYear, orbitRadius, centerX, offset);
  var yPosition = calculateYPosition(inDay, inYear, orbitRadius, xPosition, offset);

  if (typeof reverse != 'undefined') {
    xPosition = xPosition * -1;
  }
  ctx.beginPath();
  ctx.arc((xPosition + orbitRadius) + (centerX - orbitRadius), yPosition + (centerY - orbitRadius), radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.shadowBlur = 8;
  ctx.shadowColor = ColorLuminance(color, 8);
  ctx.fill();
  ctx.strokeStyle = ColorLuminance(color, -0.2);
  ctx.stroke();
  ctx.closePath();
}

/**
 * Calculate the Y position based on date.
 */
function calculateYPosition(day, year, orbitRadius, xPosition, offset) {
  // Grab the angle in degrees.
  var degree = getDegrees(day) + getDegrees(offset);

  // Get the length of the unknown side using the law of cosines.
  var distance = Math.pow(orbitRadius, 2) + Math.pow(orbitRadius, 2);
  distance = distance - 2 * orbitRadius * orbitRadius * Math.cos(degree);
  distance = Math.sqrt(distance);

  // Now that we have the distance, we need to make sure it is
  // positioned at the right angle. If right angle, use orbitRadius.
  var drop = Math.pow(distance, 2) - Math.pow(xPosition, 2);
  drop = Math.sqrt(drop);
  return drop;
}

/**
 * Calculate the X position based on date.
 */
function calculateXPosition(day, year, orbitRadius, centerX, offset) {
  // Grab the angle in degrees.
  var degree = getDegrees(day) + getDegrees(offset)
  var distance = orbitRadius * Math.sin(degree);
  return distance;
}

/**
 * Convert radians to degrees.
 */
function getDegrees(radians) {
  // Convert radians to degrees.
  var degree = radians * Math.PI/180;
  return degree;
}

/**
 * Get current percentage relative to total days in current month.
 */
function getDayPercent(month, day, year) {
  // Get the total days of the month and current day.
  var total_days = 0;
  if (typeof month == 'undefined') {
    total_days = daysInMonth(new Date().getMonth(), new Date().getYear());
  }
  else {
    total_days = daysInMonth(month, year);
  }

  if (typeof day == 'undefined') {
    day = new Date().getDate();
  }
  // Get the current percentage of the day within the month.
  degree_percent = day/total_days;
  return degree_percent;
}

/**
 * Month is 0 based
 */
function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}


/**
 * Lighten or darken a hex value.
 */
function ColorLuminance(hex, lum) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

/**
 * Get the day of the year starting from 0.
 */
function getDateYear(month, day, year) {
  var now = 0;
  var start = 0;
  if (typeof month == 'undefined') {
    now = new Date();
    start = new Date(0, 0, 0);
  }
  else {
    now = new Date(year, month, day);
    start = new Date(0, 0, 0);
  }

  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var total_day = Math.floor(diff / oneDay);
  return total_day;
}

