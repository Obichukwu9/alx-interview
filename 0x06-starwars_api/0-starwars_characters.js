#!/usr/bin/node

const request = require('request');
const args = process.argv;

if (args.length < 3) {
  console.error("Usage: ./0-starwars_characters.js <movieId>");
  process.exit(1);
}

const movieId = args[2];
const movieUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error);
      else resolve(JSON.parse(body));
    });
  });
}

async function fetchCharacters(movieUrl) {
  try {
    const movie = await makeRequest(movieUrl);
    if (movie.characters === undefined) {
      console.error("Movie or characters not found.");
      return;
    }

    for (const characterUrl of movie.characters) {
      try {
        const character = await makeRequest(characterUrl);
        console.log(character.name);
      } catch (characterError) {
        console.error("Error fetching character:", characterError.message);
      }
    }
  } catch (movieError) {
    console.error("Error fetching movie:", movieError.message);
  }
}
fetchCharacters(movieUrl);
