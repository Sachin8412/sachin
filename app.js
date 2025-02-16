const searchBox = document.querySelector(".searchBox");
const inputval = document.querySelector(".inputval");
const recipeContainer = document.querySelector(".recipe-container");

const fetchRecipes = async (query) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return null;
  }
};

searchBox.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = inputval.value.trim();

  // Check for empty search input
  if (!value) {
    recipeContainer.innerHTML = '<p>Please enter a recipe name.</p>';
    return;
  }

  const data = await fetchRecipes(value);

  if (data && data.meals) {
    recipeContainer.innerHTML = '';  // Clear previous results
    data.meals.forEach(meal => {
      const mealElement = document.createElement('div');
      mealElement.className = 'recipe';  // Set class name correctly once
      mealElement.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>Area: ${meal.strArea}</p>
        <p>Category: ${meal.strCategory}</p>
        <a href="https://www.themealdb.com/meal.php?c=${meal.idMeal}" target="_blank">View Full Recipe</a>
      `;
      recipeContainer.appendChild(mealElement);
    });
  } else {
    recipeContainer.innerHTML = '<p>No recipes found.</p>';
  }
});
