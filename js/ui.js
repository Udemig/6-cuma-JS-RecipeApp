import { elements } from './helpers.js';

// api'den gelen sonuçları ekrana basar
export const renderResults = (recipes) => {
  console.log(recipes);
  // her bir obje için ekrana kart basma
  recipes.slice(0, 10).forEach((recipe) => {
    // kart için html'i hazırlama
    const markup = `
         <a class="result-link">
            <img
              src="${recipe.image_url}"
            />
            <div class="data">
              <h4>${recipe.title}</h4>
              <p>${recipe.publisher}</p>
            </div>
          </a>
        `;

    // oluşturğumuz html'i ilgili yere gönderme
    elements.resultList.insertAdjacentHTML('beforeend', markup);
  });
};

// ekrana yüklenme gifi basma
export const renderLoader = (parent) => {
  // loader' htmlini hazırlama
  const loader = `
  <div class="loader">
   <img src="images/food-load.gif" />
  </div>
  `;

  //   loader'ı bize gelen html elemanın içine gönderme
  parent.insertAdjacentHTML('afterbegin', loader);
};

// ekran loader'ı kaldıracak fonksiyon
export const clearLoader = () => {
  // loader'ı dökümanda bul
  const loader = document.querySelector('.loader');

  //eğerki bulunduysa loader'I html'den kaldır
  if (loader) loader.remove();
};
