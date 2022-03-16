// DOM 
const recipesection = document.getElementsByClassName("recipes")[0];
const sectiontag = document.getElementById("tags_button_section");
let filteredTable = null;
let tagsTable = [];
let ingredientList = document.getElementById("ingredientsList");
let devicesList = document.getElementById("devicesList");
let ustensilsList = document.getElementById("ustensilsList");

// CHEVRON CLICK 
const chevronUpGreen = document.getElementById("chevron-up-green");
const chevronUpRed = document.getElementById("chevron-up-red");
const chevronUpBlue = document.getElementById("chevron-up-blue");
const chevronDownBlue = document.getElementById("chevron-down-blue");
const chevronDownGreen = document.getElementById("chevron-down-green");
const chevronDownRed = document.getElementById("chevron-down-red");
  
const listIngredients = document.getElementById("list__blue");
const listDevices = document.getElementById("list__green");
const listUstensils = document.getElementById("list__red");
const inputIngredients = document.getElementById("searchingredients");
const inputDevices = document.getElementById("searchdevices");
const inputUstensils = document.getElementById("searchustensils");
  
const titleIngredients = document.getElementById("btn-ingredient-text");
const titleDevices = document.getElementById("btn-device-text");
const titleUstensils = document.getElementById("btn-ustensil-text");
  

const renderRecipes = (recipeTable) => {
  // Get DOM elements to insert recipes
  let  recipesSection = document.getElementById("main-section");
  recipesSection.innerHTML = "";
  recipeTable.forEach((recipe) => {
    recipesSection.innerHTML += `<article class="recipe">
    <div class="article_box">
      <div class="card_img"></div>
        <div class="txt_container">
          <div class="title_time">
            <h3 class="title_name">${recipe.name}</h3>
            <span>
              <img src="./img/time.svg" alt="icon de l'horloge" aria-label="menu des ingrédients">
              <h3>${recipe.time} </h3>
            </span>
          </div>

          <div class="txt_box">
            <div class="txt_items">
              <nav class="ingridients_list" >
                <ul>
                  <li>${setIngredients(recipe.ingredients)}</li>
                </ul>
              </nav>
            </div>

            <div class="txt_items">
             <p class="description">${recipe.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</artcile>`;
});
}

function setIngredients(ingredients) {
  let html = '';
  for (const ingredient of ingredients) {
    html += '<p>' + ingredient.ingredient;
    if (ingredient.quantity) html += ' : ' + ingredient.quantity;
    if (ingredient.unit) html += '' + ingredient.unit;
    html += '</p>';
  }
  return html;
}

const  getIngredient = async () => {
  const recipes = await getRecipes();
  const allIngredients = [];

  const ingredientsByRecipe = recipes.map((element) => {
    return element.ingredients.map((i) => {
      return i.ingredient.replace(/ *\([^)]*\) */g, "");
    });
  });
  
  ingredientsByRecipe.forEach((element) => {
    element.forEach((i) => {
      allIngredients.push(i);
    });
  });
  
  // Passer les ingrédients en minuscule
  let ingretiensToLowerCase = allIngredients.map((i) => {
    return i.toLowerCase();
  });
    
  // Enlever les doublons et passer les premières lettres en majuscule
  const ingredientsArray = [...new Set(ingretiensToLowerCase)];
  const ingredients = ingredientsArray.map((i) => {
    return i.charAt(0).toUpperCase() + i.slice(1);
  });
    
  // DISPLAY INGRIDIENTS 
  ingredientList.innerHTML = "";

  ingredients.forEach((i) => {
    ingredientList.innerHTML += `<li class=ingredient>${i}</li>`;
  });
  
    return ingredients;
  };
      
  getIngredient();
    
  
  // GET DEVICES 
  const getDevices = async () => {
    const recipes = await getRecipes();
    const allDevices = [];
  
    const devicesByRecipe = recipes.map((element) => {
      return element.appliance;
    });
  
    devicesByRecipe.forEach((element) => {
      return allDevices.push(element);
    });
  
    // Passer les appareils en minuscule
    let devicesToLowerCase = allDevices.map((i) => {
      return i.toLowerCase();
    });
  
    // Enlever les doublons et passer les premières lettres en majuscule
    const devicesArray = [...new Set(devicesToLowerCase)];
    const devices = devicesArray.map((i) => {
      return i.charAt(0).toUpperCase() + i.slice(1);
    });
  
      // let devicesList = document.getElementById("devicesList");
      devicesList.innerHTML = "";
    
      devices.forEach((i) => {
        devicesList.innerHTML += `<li class=device>${i}</li>`;
      });
    
    return devices;
  };
  
  getDevices();
  
  //GET USTENSIL
  const getUstensils = async () => {
    const recipes = await getRecipes();
    const allUstensils = [];
  
    const ustensilsByRecipe = recipes.map((element) => {
      return element.ustensils;
    });
  
    ustensilsByRecipe.forEach((element) => {
      return element.forEach((u) => {
        return allUstensils.push(u.replace(/ *\([^)]*\) */g, ""));
      });
    });
  
    // Passer les ustensils en minuscule
    let ustensilsToLowerCase = allUstensils.map((i) => {
      return i.toLowerCase();
    });
  
    // Enlever les doublons et passer les premières lettres en majuscule
    const ustensilsArray = [...new Set(ustensilsToLowerCase)];
    const ustensils = ustensilsArray.map((i) => {
      return i.charAt(0).toUpperCase() + i.slice(1);
    });
    // Injecter les données du tableau des ustensils dans le HTML
    // let ustensilsList = document.getElementById("ustensilsList");
    ustensilsList.innerHTML = "";
  
    ustensils.forEach((i) => {
      ustensilsList.innerHTML += `<li class=ustensil>${i}</li>`;
    });
    return ustensils;
  };
  
  getUstensils();
  

  // CKICK LIST DOWN 
  const clickOnChevron = (chevronUp, chevronDown, input, list,title) => {
    chevronDown.addEventListener("click", () => {
      chevronUp.style.display = "flex";
      list.style.display = "flex";
      chevronDown.style.display = "none";
      input.style.display = "flex";
      title.style.display = "none";
    });
  
    chevronUp.addEventListener("click", () => {
      chevronDown.style.display = "flex";
      list.style.display = "none";
      chevronUp.style.display = "none";
      input.style.display = "none";
      title.style.display = "flex";
    });
  };
  
  clickOnChevron(
    chevronUpBlue,
    chevronDownBlue,
    inputIngredients,
    listIngredients,
    titleIngredients
  );
  clickOnChevron(
    chevronUpGreen,
    chevronDownGreen,
    inputDevices,
    listDevices,
    titleDevices
  );
  clickOnChevron(
    chevronUpRed,
    chevronDownRed,
    inputUstensils,
    listUstensils,
    titleUstensils
  );


//GET INGRIDIENT ON TAPE 
const FilterIngredientsList = async () => {
  const recipes = await getRecipes();
  let ingredientWord = "";
  let ingredientArray = [];
  let ingredientList = document.getElementsByClassName("list__blue__ul")[0];

  inputIngredients.addEventListener("input", () => {
    if (inputIngredients.value.length >= 1) {
      const ingredientTables = recipes.map((r) => {
        return r.ingredients.map((i) => {
          return i.ingredient;
        });
      });
      ingredientTables.forEach((table) => {
        table.forEach((i) => {
          ingredientArray.push(i.toLowerCase());
        });
      });
      const firstUppercaseLetter = ingredientArray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });
      const ingredients = [...new Set(firstUppercaseLetter)];
      ingredientWord = inputIngredients.value.toLowerCase();
      const matchSearchArray = ingredients.filter((i) => {
        if (matchInput(i, ingredientWord)) {
          return i;
        }
      });
      matchSearchArray.length > 30
        ? matchSearchArray.slice(0, 30)
        : matchSearchArray;

        ingredientList.innerHTML = "";
        matchSearchArray.forEach((i) => {
        ingredientList.innerHTML += `<li class="ingredient">${i}</li>`;
      });
    }else{
      getIngredient()
    }
  });
};
FilterIngredientsList();

//GET DEVICE ON TAPE 
const FilterDevicesList = async () => {
  const recipes = await getRecipes();
  let deviceWord = "";
  let deviceArray = [];
  let deviceList = document.getElementsByClassName("list__green__ul")[0];

  inputDevices.addEventListener("input", () => {
    if (inputDevices.value.length >= 1) {
      const deviceTables = recipes.map((r) => {
        return r.appliance;
      });
      deviceTables.forEach((device) => {
        deviceArray.push(device.toLowerCase());
      });
      const firstUppercaseLetter = deviceArray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });
      const devices = [...new Set(firstUppercaseLetter)];
      deviceWord = inputDevices.value.toLowerCase();
      const matchSearchArray = devices.filter((i) => {
        if (matchInput(i, deviceWord)) {
          return i;
        }
      });
      matchSearchArray.length > 30
        ? matchSearchArray.slice(0, 30)
        : matchSearchArray;

        deviceList.innerHTML = "";
      matchSearchArray.forEach((i) => {
        deviceList.innerHTML += `<li class="device">${i}</li>`;
      });
    }
    else{
      getDevices()
    }
  });
};
FilterDevicesList()

//GET USTENSIL ON TAPE 
const FilterUstensilsList = async () => {
  const recipes = await getRecipes();
  let ustensilWord = "";
  let ustensilArray = [];
  let ustensilList = document.getElementsByClassName("list__red__ul")[0];

  inputUstensils.addEventListener("input", () => {
    if (inputUstensils.value.length >= 1) {
      const ustensilTables = recipes.map((r) => {
        return r.ustensils;
      });
      ustensilTables.forEach((ustensil) => {
        ustensil.forEach((u) => {
          ustensilArray.push(u.toLowerCase());
        });
      });
      const firstUppercaseLetter = ustensilArray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });
      const ustensils = [...new Set(firstUppercaseLetter)];
      ustensilWord = inputUstensils.value.toLowerCase();
      const matchSearchArray = ustensils.filter((i) => {
        if (matchInput(i, ustensilWord)) {
          return i;
        }
      });

      ustensilList.innerHTML = "";
      matchSearchArray.forEach((i) => {
        ustensilList.innerHTML += `<li class="ustensil">${i}</li>`;
      });
    }
    else{
      getUstensils();
    }
  });
};

FilterUstensilsList()

// *********************************************************************************************************


const matchInput = (string, inputword) => {
  return string.toLowerCase().match(inputword.toLowerCase()) ? true : false;
};
const matchWithTable = (tableOfStrings, inputword) => {
  let newTable = [];
  tableOfStrings.forEach((string) => {
    newTable.push(string.toLowerCase());
  });
  tableOfStrings.forEach((string) => {
    string.toLowerCase();
  });
  let found = newTable.find((element) =>
    element.match(inputword.toLowerCase())
  );
  if (found != undefined) {
    return true;
  } else {
    return false;
  }
};




// Fonction permettant de récupérer le click sur un mot clef et filtrer un tableau de recette en fonction du nom du mot clef cliqué
const FilterbyClick = (targetNodeList, recipeTable) => {
  let selectedKeyWord = "";
  targetNodeList.forEach((element) => {
    element.addEventListener("click", () => {
      selectedKeyWord = element.textContent;

      let elementName = element.textContent;

      switch (element.className) {
        case "ingredient":
          FilterRecipesByIngredient(elementName, recipeTable);
          renderRecipes(FilterRecipesByIngredient(elementName, recipeTable));
          break;

        case "device":
          FilterRecipesByDevice(elementName, recipeTable);
          renderRecipes(FilterRecipesByDevice(elementName, recipeTable));
          break;

        case "ustensil":
          FilterRecipesByUstensil(elementName, recipeTable);
          renderRecipes(FilterRecipesByUstensil(elementName, recipeTable));
          break;

        default:
          console.log("error");
      }
    });
  });
};

// Fonction permettant de filtrer un tableau de recettes si les ingrédients correspondent à un mot donné
const FilterRecipesByIngredient = (ingredientName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    let ingredients = recipe.ingredients;
    let ingredientTable = [];
    ingredients.forEach((ingr) => {
      ingredientTable.push(ingr.ingredient);
    });
    if (matchWithTable(ingredientTable, ingredientName)) {
      return recipe;
    } 
  });
  return filteredArray;
};

// Fonction permettant de filtrer un tableau de recettes si les appareils correspondent à un mot donné
const FilterRecipesByDevice = (deviceName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    if (matchInput(recipe.appliance, deviceName)) {
      return recipe;
    }
  });
  return filteredArray;
};

// Fonction permettant de filtrer un tableau de recettes si les appareils correspondent à un mot donné
const FilterRecipesByUstensil = (ustensilName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    if (matchWithTable(recipe.ustensils, ustensilName)) {
      return recipe;
    }
  });
  return filteredArray;
};


// Fonction de rendu en fonction du tableau de tags
let RenderByTag = async () => {
  const recipes = await getRecipes();
  if (filteredTable === null && tagsTable.length > 0) {
    filteredTable = recipes;
    tagsTable.forEach((tag) => {
      switch (tag.type) {
        case "ingredient":
          filteredTable = FilterRecipesByIngredient(tag.name, filteredTable);
          renderRecipes(filteredTable);
          // FilterbyClick (ingredients, filteredTable) 
          break;
        case "device":
          filteredTable = FilterRecipesByDevice(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "ustensil":
          filteredTable = FilterRecipesByUstensil(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        default:
          console.log("error");
      }
    });
    filteredTable = null;
  } else if (filteredTable === null && tagsTable.length === 0) {
    renderRecipes(recipes);
  } else if (filteredTable.length > 0 && tagsTable.length > 0) {
    const rootTable = filteredTable;
    tagsTable.forEach((tag) => {
      switch (tag.type) {
        case "ingredient":
          filteredTable = FilterRecipesByIngredient(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "device":
          filteredTable = FilterRecipesByDevice(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "ustensil":
          filteredTable = FilterRecipesByUstensil(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        default:
          console.log("error");
      }
    });
    filteredTable = rootTable;
  } else {
    renderRecipes(filteredTable);
  }
};

// Gestion de l'affichage des Tags
ingredientList.addEventListener("click", (e) => {
  const tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name == tagName && (tag.type = "ingredient")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button aria-label="${tagName}" class="btntag btntag__blue">
        <span class="btntag__span">${tagName}</span>
        <div class="btntag__cross_container"><i class="far fa-times-circle fa-lg"></i></div>
      </button>`;
    tagsTable.push({ name: tagName, type: "ingredient" });
    // Permettre la fermeture des tags
    ClosureOfTags();
  } else {
    console.log("doublon");
  }
  RenderByTag();
});

devicesList.addEventListener("click", (e) => {
  let tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "device")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag__green green">
        <span class="btntag__span">${tagName}</span>
          <div class="btntag__cross_container"><i class="far fa-times-circle fa-lg"></i></div>
      </button>`;
    tagsTable.push({ name: tagName, type: "device" });
    console.log(tagsTable);
    // Fermeture des Tags
    ClosureOfTags();
  }
  RenderByTag();
});

ustensilsList.addEventListener("click", (e) => {
  let tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "ustensil")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag__red red">
        <span class="btntag__span">${tagName}</span>
          <div class="btntag__cross_container"><i class="far fa-times-circle fa-lg"></i></div>
      </button>`;
    tagsTable.push({ name: tagName, type: "ustensil" });
    ClosureOfTags();
  }
  RenderByTag();
});


// Fonction de fermeture des Tags
const ClosureOfTags = () => {
  const closeBtn = document.querySelectorAll(".btntag__cross_container");
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tagBtn = e.target.parentNode.parentNode;
      const tagNameTrimed = tagBtn.textContent.trim();
      console.log(tagNameTrimed);
      if (tagBtn.className === "btntag btntag__blue") {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "ingredient") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      } else if (tagBtn.className === "btntag btntag__green") {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "device") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      } else {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "ustensil") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      }
      tagBtn.style.display = "none";
      RenderByTag();
    });
  });
};

// Début du Scénario principal

// searchbar.addEventListener("input", async (e) => {
//   const recipes = await getRecipes();
//   let input = e.target.value;
  
//   if (input.length >= 3) {
//     filteredTable = MainFilter(input, recipes);
//     if (!filteredTable.length) {
//       console.log(recipes)
//       return recipes;
//     } else {
//       renderRecipes(filteredTable);
//     }
//   } else if (input.length < 3) {
//     filteredTable = recipes;
//     renderRecipes(filteredTable);
//   }
// });
