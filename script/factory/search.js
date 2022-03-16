// // DOM 
// const searchbar = document.querySelector('#searchbar');

// searchbar.addEventListener("keyup", (e) => {
//     const serchedLetters = e.target.value.toLowerCase();
//     const cards = document.querySelectorAll(".recipe");
//     filterElements(serchedLetters,cards);
// });

// async function filterElements(letters, elements) {
//     let recipes = await getRecipes();
//     if (letters.length >= 3) {
//         clearContent();
//         for (let recipe of recipes){
//             const isNameIncludes = recipe.name.toLowerCase().includes(letters);
//             const isDescriptionIncludes = recipe.description.toLowerCase().includes(letters);
//             const isIngridientsIncludes = recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().includes(letters)).length > 0

//             if (isNameIncludes|| isDescriptionIncludes|| isIngridientsIncludes) {
//                 injectCard(recipe);
//             }
//             else{
//                 invalidSearch()
//             }
//         }        
//     } 
//     else{
//         clearContent()
//         displayRecipes()
//         invalidSearchInput.classList.replace('d-block', 'd-none');
//     }
// }

// // Effacer le contenu des recettes
// function clearContent() {
//   mainSection.innerText = '';
// }

// // ERROR 
// function invalidSearch() {
//   if (mainSection.children.length == 0) {
//     invalidSearchInput.classList.replace('d-none', 'd-block');
//   } else if (invalidSearchInput.classList.contains('d-block') && mainSection.children.length != 0) {
//     invalidSearchInput.classList.replace('d-block', 'd-none');
//   }
// }



