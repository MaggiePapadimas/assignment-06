/*

Condiments
Pippin Barr

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

RiTA
http://rednoise.org/rita/index.html

*/
// vowels added capitals
let vowels = "aeiouAEIOU";

$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json', gotData);
});

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {
  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  let condiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }
  //for greek gods
  let myth = getRandomElement(data.greek_gods);
  //for books
  let read = getRandomElement(data.books);
  // Now the cat
  let cat = getRandomElement(data.cats);
  let verb2 = 'a'
  if(vowels.includes(cat.charAt(0))){
    verb2 = 'an';
  }

  // Same again for room
  let room = getRandomElement(data.rooms);
  let verb3 = 'a';
  if(vowels.includes(room.charAt(0))){
    verb3 = 'an';
  }


  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let descriptions = `${condiment} ${verb} like ${verb2} ${cat} in ${verb3} ${room} with the greek God(dess) ${myth} reading ${read}.`;

  // Finally, we add it to the page and hey presto!
  $('body').append(descriptions);
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
//page refresh
function refresh() {
  location.reload();
}
