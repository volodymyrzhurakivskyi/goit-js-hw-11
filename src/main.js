// 1️⃣ ІМПОРТУЄМО ВСЕ, ЩО ПОТРІБНО
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

// 2️⃣ ОТРИМУЄМО ЕЛЕМЕНТИ З HTML
const form = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');

// ============================================
// 📋 ОБРОБНИК ПОДАЧІ ФОРМИ
// ============================================
form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  // ОТРИМУЄМО ЗНАЧЕННЯ З INPUT
  const query = searchInput.value.trim();

  
  if (!query) {
    iziToast.warning({
      title: 'Увага',
      message: 'Будь ласка, введи пошуковий запит!',
      position: 'topRight',
    });
    return;
  }

  //  ОЧИЩУЄМО ПОПЕРЕДНІ РЕЗУЛЬТАТИ
  clearGallery();

  //  ПОКАЗУЄМО ЛОАДЕР
  showLoader();

  try {
    // 🔍 РОБИМО ЗАПИТ ДО API
    const data = await getImagesByQuery(query);

    // ПЕРЕВІРКА 2: ЧИ ЗНАЙДЕНІ КАРТИНКИ?
    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        title: 'Помилка',
        message:
          'На жаль, нічого не знайдено. Спробуй інший пошуковий запит!',
        position: 'topRight',
      });
      //  ХОВАЄМО ЛОАДЕР
      hideLoader();
      return;
    }

    // ✅ УСПІХ! ПОКАЗУЄМО КАРТИНКИ
    createGallery(data.hits);

    // 🎉 УСПІШНЕ СПОВІЩЕННЯ
    iziToast.success({
      title: 'Успіх',
      message: `Знайдено ${data.hits.length} зображень!`,
      position: 'topRight',
    });
  } catch (error) {
    // ❌ ПОМИЛКА ПРИ ЗАПИТІ
    console.error('Помилка:', error);
    iziToast.error({
      title: 'Помилка',
      message: 'Сталась помилка при пошуку. Спробуй ще раз!',
      position: 'topRight',
    });
  } finally {
    // ✅ ХОВАЄМО ЛОАДЕР ЗАВЖДИ (успіх чи помилка)
    hideLoader();

    // 🧹 ОЧИЩУЄМО INPUT
    searchInput.value = '';
  }
});