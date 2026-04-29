import{a as p,S as f,i}from"./assets/vendor-DnoGfDwQ.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const m=void 0,y="https://pixabay.com/api/";async function h(n){try{return(await p.get(y,{params:{key:m,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(s){throw console.error("Помилка при запиті до Pixabay:",s),s}}const d=document.querySelector(".gallery"),u=document.getElementById("loader"),g=new f(".gallery a",{captions:!0,captionsData:"alt",captionPosition:"bottom"});function v(n){const s=n.map(e=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}">
          <img
            class="gallery-image"
            src="${e.webformatURL}"
            alt="${e.tags}"
            loading="lazy"
          />
        </a>
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${e.likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${e.views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${e.comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${e.downloads}</span>
          </div>
        </div>
      </li>
    `).join("");d.innerHTML=s,g.refresh()}function L(){d.innerHTML=""}function b(){u.classList.remove("hidden")}function l(){u.classList.add("hidden")}const w=document.querySelector(".form"),c=document.querySelector('input[name="search-text"]');w.addEventListener("submit",async n=>{n.preventDefault();const s=c.value.trim();if(!s){i.warning({title:"Увага",message:"Будь ласка, введи пошуковий запит!",position:"topRight"});return}L(),b();try{const e=await h(s);if(!e.hits||e.hits.length===0){i.error({title:"Помилка",message:"На жаль, нічого не знайдено. Спробуй інший пошуковий запит!",position:"topRight"}),l();return}v(e.hits),i.success({title:"Успіх",message:`Знайдено ${e.hits.length} зображень!`,position:"topRight"})}catch(e){console.error("Помилка:",e),i.error({title:"Помилка",message:"Сталась помилка при пошуку. Спробуй ще раз!",position:"topRight"})}finally{l(),c.value=""}});
//# sourceMappingURL=index.js.map
