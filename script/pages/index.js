// DOM 
const mainSection = document.getElementById('main-section');
const searchbar = document.querySelector('#searchbar');
const invalidSearchInput = document.querySelector('#error');
const cards = document.querySelectorAll(".recipe");

// TAGS 
const containerIngredients = document.querySelector('#container-ingredients');
const containerAppliances = document.querySelector('#container-appliances');
const containerUstensils = document.querySelector('#container-ustensils');



function injectCard(recipe) {
  let cardData = recipeFactory(recipe);
  let createCard = cardData.getRecipeCard();
  mainSection.appendChild(createCard);
}

async function getRecipes() {
  let url = '../data/recipes.json';
  try {
    let res = await fetch(url);
    let json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function displayRecipes() {
  const recipes = await getRecipes();
  recipes.forEach(async (recipe) => {
    const cardData = recipeFactory(recipe);
    const createCard = cardData.getRecipeCard();
    mainSection.appendChild(createCard);
  });
}

searchbar.addEventListener("keyup", (e) => {
  mainFilter();
});


// Fonction pour la recherche principale
async function mainFilter() {
  let inputLength = searchbar.value.length;
  let input = searchbar.value.toLowerCase();
  let recipes = await getRecipes();

  if (inputLength >= 3) {
    clearContent();
    recipes.forEach(async (recipe) => {
      let i = 0;
      const isNameIncludes = recipe.name.toLowerCase().includes(input)
      const isDescriptionIncludes = recipe.description.includes(input)
      const isIngridientsIncludes = recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().includes(input)).length > 0
      
      if (isNameIncludes ||isDescriptionIncludes||isIngridientsIncludes) {
        injectCard(recipe);
      }
      else {
        invalidSearch();
      }
      i++;
    });
  } else {
    clearContent();
    displayRecipes();
    invalidSearchInput.classList.replace('d-block', 'd-none');
  }
}

// Error 
function invalidSearch() {
  if (mainSection.children.length == 0) {
    invalidSearchInput.classList.replace('d-none', 'd-block');
  } else if (invalidSearchInput.classList.contains('d-block') && mainSection.children.length != 0) {
    invalidSearchInput.classList.replace('d-block', 'd-none');
  }
}

// Effacer le contenu des recettes
function clearContent() {
  mainSection.innerText = '';
}














displayRecipes()



