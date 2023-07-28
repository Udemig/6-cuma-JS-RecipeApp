import { v4 } from 'https://jspm.dev/uuid';
import { elements } from './js/helpers.js';
import { Search } from './js/api.js';
import {
  clearLoader,
  renderLoader,
  renderResults,
  renderBasketItems,
} from './js/ui.js';
import { Recipe } from './js/recipe.js';

const recipe = new Recipe();

//! Olay İzleyicileri
elements.form.addEventListener('submit', handleSubmit);

//! Fonksiyonlar
async function handleSubmit(e) {
  e.preventDefault();
  // aratılan kelime
  const query = elements.searchInput.value;

  // arama terimi boş değilse çalışır
  if (query) {
    // search sınıfının bir örneğini oluştur
    const search = new Search(query);

    // istek atmaya başlamadan önce loader'ı ekrana bas
    renderLoader(elements.resultList);

    // istek atma
    try {
      await search.getResults();
      // isteğe cevap gelince loader'ı ekrandan kaldır
      clearLoader();

      // gelen cevabı ekrana bas
      renderResults(search.result);
    } catch (err) {
      alert('Aradığınız kriterler uygun tarif bulunamadı');
      clearLoader();
    }
  }
}

// tarif detaylarını alma
const controlRecipe = async () => {
  const id = location.hash.replace('#', '');
  if (id) {
    // ekran loader'ı bas
    renderLoader(elements.recipeArea);

    try {
      // tarif bilgilerini ala
      await recipe.getRecipe(id);

      // loader'ı kaldır
      clearLoader();

      // ekrana tarif arayüzünü bas
      recipe.renderRecipe(recipe.info);
    } catch (err) {
      alert('Verileri alırken hata oluştu');
      clearLoader();
    }
  }
};

// iki farklı olayı izleme
['hashchange', 'load'].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});

const basket = [];

// tarif alanındaki tıklanmalarda çalışır
const handleClick = (e) => {
  if (e.target.id === 'add-to-basket') {
    // tarifler diizni dön
    recipe.ingredients.forEach((title) => {
      // her bir tarif için obje oluştur ve id ekle
      const newItem = {
        id: v4(),
        title,
      };

      // yeni oluşan tarifi sepete ekle
      basket.push(newItem);
    });
    // ekrana sepet elemanlarını basma
    renderBasketItems(basket);
  }
};

// sepete ekele butonuna tıklanmayı izle
elements.recipeArea.addEventListener('click', handleClick);
