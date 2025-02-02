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
  const value = inputval.value;
  const data = await fetchRecipes(value);

  if (data && data.meals) {
    recipeContainer.innerHTML = '';
    data.meals.forEach(meal => {
      const mealElement = document.createElement('div');
      mealElement.className = 'meal';
      mealElement.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
      `;
      recipeContainer.appendChild(mealElement);
    });
  } else {
    recipeContainer.innerHTML = '<p>No recipes found.</p>';
  }
});
