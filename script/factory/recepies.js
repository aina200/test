function recipeFactory(data) {
  const {
    appliance,
    description,
    id,
    ingredients,
    name,
    servings,
    time,
    ustensils,
  } = data;

  function getRecipeCard(id) {

    const wrapper = document.createElement('article');
    wrapper.classList.add('recipe');

    const card = document.createElement('div');
    card.classList.add('article_box');
    wrapper.appendChild(card);

    const img = document.createElement('div');
    img.classList.add('card_img');
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.classList.add('txt_container');
    card.appendChild(cardBody);

    const titleTime = document.createElement('div');
    titleTime.classList.add('title_time');
    cardBody.appendChild(titleTime);

    const recipeName = document.createElement('h3');
    recipeName.classList.add('title_name');
    titleTime.appendChild(recipeName);
    recipeName.innerText = name;

    const span = document.createElement('span');
    titleTime.appendChild(span);

    const timeIcon = document.createElement('img');
    timeIcon.setAttribute('src','/img/time.svg');
    timeIcon.setAttribute('alt','icon de l\'horloge');
    span.appendChild(timeIcon);

    const timeTxt = document.createElement('h3');
    span.appendChild(timeTxt);
    timeTxt.innerHTML = time;

    const txtBox = document.createElement('div');
    txtBox.classList.add('txt_box');
    cardBody.appendChild(txtBox);

    const txtItem1 = document.createElement('div');
    txtItem1.classList.add('txt_items');
    txtBox.appendChild(txtItem1);

    const ingridientsTxt = document.createElement('nav');
    ingridientsTxt.classList.add('ingridients_list');
    timeIcon.setAttribute('aria-label','menu des ingrédients');
    txtItem1.appendChild(ingridientsTxt);

    const ingredientList = document.createElement('ul');

    
    ingredients.forEach((element) => {
      const listItem = document.createElement('li');
      if (element.unit) {
        if (
          element.unit == 'cl' ||
          element.unit == 'g' ||
          element.unit == 'ml' ||
          element.unit == 'kg'
        ) {
          listItem.innerHTML = `<span class="fw-bold">${element.ingredient}:</span> ${element.quantity}${element.unit}`;
        } else {
          listItem.innerHTML = `<span class="fw-bold">${element.ingredient}:</span> ${element.quantity} ${element.unit}`;
        }
      } else if (element.quantity) {
        listItem.innerHTML = `<span class="fw-bold">${element.ingredient}:</span> ${element.quantity}`;
      } else {
        listItem.innerHTML = `<span class="fw-bold">${element.ingredient}</span>`;
      }
      ingredientList.appendChild(listItem);
    });

    ingridientsTxt.appendChild(ingredientList);

    const txtItem2 = document.createElement('div');
    txtItem2.classList.add('txt_items');
    txtBox.appendChild(txtItem2);

    const txtIngridients = document.createElement('p');
    txtIngridients.classList.add('description');
    txtItem2.appendChild(txtIngridients);
    txtIngridients.innerHTML = description;
    return wrapper;
  }

  return {
    appliance,
    description,
    id,
    ingredients,
    name,
    servings,
    time,
    ustensils,
    getRecipeCard,
  };
}