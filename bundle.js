(()=>{"use strict";(()=>{const e={ESCAPE:"Escape",ENTER:"Enter"};window.util={getRandomData:e=>e[Math.floor(Math.random()*e.length)],getRandomNumber:e=>[Math.floor(Math.random()*e.length)],getRandomInRange:(e,t)=>Math.floor(Math.random()*(t-e+1))+e,shuffleArray:e=>{const t=[...e];for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1)),n=t[e];t[e]=t[o],t[o]=n}return t},onPopupEscPress:t=>{t.key===e.ESCAPE&&(t.preventDefault(),window.map.removeActiveCard())},onPopupMessageEscPress:t=>{t.key===e.ESCAPE&&(t.preventDefault(),window.reset.removeMessageElement())},MouseButtons:{MAIN:0},KeyboardKeys:e}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector("#pin").content.querySelector(".map__pin"),o=e=>{const o=t.cloneNode(!0);return o.style.left=e.location.x-25+"px",o.style.top=e.location.y-35+"px",o.querySelector("img").src=e.author.avatar,o.querySelector("img").alt=e.offer.title,o};window.pin={mapNode:document.querySelector(".map"),mapPinsNode:e.querySelector(".map__pins"),createNodeFragment:e=>{const t=document.createDocumentFragment();for(let n=0;n<e.length;n++)t.appendChild(o(e[n]));return t},removePins:()=>{const e=window.pin.mapPinsNode.querySelectorAll(".map__pin:not(.map__pin--main)");for(let t of e)t.parentNode.removeChild(t)}}})(),window.map={mapPinMain:document.querySelector(".map__pin--main"),initPinsScreen:e=>{const t=window.pin.createNodeFragment(e);window.pin.mapPinsNode.appendChild(t)},removeActiveCard:()=>{const e=window.pin.mapNode.querySelector(".map__card");e&&(e.parentNode.removeChild(e),document.removeEventListener("keydown",window.util.onPopupEscPress))}},(()=>{const e=window.pin.mapNode.querySelector(".map__filters-container"),t=e.querySelector(".map__filters"),o=document.querySelector(".ad-form");let n=!1;const i=()=>{n=!n;const e=n?"add":"remove";Array.from(o.children).forEach((t=>{t.disabled=n,t.classList[e]("disable-cursor")})),Array.from(t.children).forEach((t=>{t.disabled=n,t.classList[e]("disable-cursor")}))},r=e=>{window.pin.mapNode.classList.remove("map--faded"),window.form.formNode.classList.remove("ad-form--disabled"),i(),window.form.passAddressInput(window.move.MainPinSize.pin.WIDTH,window.move.MainPinSize.pin.HEIGHT),window.map.initPinsScreen(e),window.filter.updateSimillarPins(e);const o=window.debounce.debounce((()=>{window.filter.updateSimillarPins(e)}));t.addEventListener("change",o)},a=e=>{e.button!==window.util.MouseButtons.MAIN&&e.key!==window.util.KeyboardKeys.ENTER||(e.preventDefault(),window.backend.load(r),window.map.mapPinMain.removeEventListener("mousedown",a),window.map.mapPinMain.removeEventListener("keydown",a))};window.activate={toggleDisabledOnFormNodes:i,onPinMainClickOrEnterPress:a,mapFilterContainerNode:e,formFiltersNode:t}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking",o={ОК:200},n=document.querySelector("#error").content.querySelector(".error"),i=e=>{const t=n.cloneNode(!0);t.querySelector(".error__message").textContent=e,window.reset.mainNode.appendChild(t),document.addEventListener("keydown",window.util.onPopupMessageEscPress),t.addEventListener("click",window.reset.removeMessageElement)},r=(e,t,n,r)=>{let a=new XMLHttpRequest;a.responseType="json",a.addEventListener("load",(()=>{a.status===o.ОК?n(a.response):i(`При обращению к серверу произошла ошибка. Статус ответа: ${a.status} ${a.statusText}. Попробуйте перезагрузить страницу`)})),a.addEventListener("error",(()=>{i(`Произошла ошибка соединения. Статус ответа: ${a.status} ${a.statusText}. Попробуйте перезагрузить страницу`)})),a.addEventListener("timeout",(()=>{i(`Запрос не успел выполниться за ${a.timeout}мс. Статус ответа: ${a.status} ${a.statusText}. Попробуйте перезагрузить страницу`)})),a.open(e,t),a.timeout=1e4,a.send("GET"===e?"":r)};window.backend={load:t=>{r("GET",e,t)},upload:(e,o)=>{r("POST",t,o,e)},showError:i,StatusCode:o}})(),window.debounce={debounce:e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}}},(()=>{const e="any",t=Array.from(window.activate.formFiltersNode.features);window.filter={updateSimillarPins:o=>{const n=o.concat(),i=e=>{switch(window.activate.formFiltersNode["housing-price"].value){case"low":return e.offer.price<1e4;case"middle":return e.offer.price>=1e4&&e.offer.price<=5e4;case"high":return e.offer.price>5e4;default:return n}},r=n.filter((t=>window.activate.formFiltersNode["housing-type"].value===e?n:t.offer.type===window.activate.formFiltersNode["housing-type"].value)).filter((t=>window.activate.formFiltersNode["housing-rooms"].value===e?n:parseInt(t.offer.rooms,10)===parseInt(window.activate.formFiltersNode["housing-rooms"].value,10))).filter((t=>window.activate.formFiltersNode["housing-guests"].value===e?n:parseInt(t.offer.guests,10)===parseInt(window.activate.formFiltersNode["housing-guests"].value,10))).filter(i).filter(i).filter((function(e){return!t.some((function(t){return t.checked&&!e.offer.features.includes(t.value)}))})).slice(0,5);window.map.removeActiveCard(),window.pin.removePins(),window.map.initPinsScreen(r),window.card.addCardNode(r)}}})(),(()=>{const e=document.querySelector("#card").content.querySelector(".map__card"),t={flat:"Квартира",bungalow:"Бунгало",palace:"Замок",house:"Дом"},o=o=>{const n=document.createDocumentFragment();return n.appendChild((o=>{const n=e.cloneNode(!0);n.querySelector(".popup__title").textContent=o.offer.title,n.querySelector(".popup__text--address").textContent=o.offer.address,n.querySelector(".popup__text--price").textContent=o.offer.price+" ₽/ночь",n.querySelector(".popup__type").textContent=t[o.offer.type],n.querySelector(".popup__text--capacity").textContent=`${o.offer.rooms} комнаты для ${o.offer.guests} гостей`,n.querySelector(".popup__text--time").textContent=`Заезд после ${o.offer.checkin}, выезд до ${o.offer.checkout}`,n.querySelector(".popup__description").textContent=o.offer.description,n.querySelector(".popup__avatar").src=o.author.avatar;const i=n.querySelector(".popup__photos"),r=i.querySelector(".popup__photo"),a=document.createDocumentFragment();i.removeChild(r);for(let e=0;e<o.offer.photos.length;e++)a.appendChild(r.cloneNode(!0)).src=o.offer.photos[e];i.appendChild(a);const d=n.querySelector(".popup__features").querySelectorAll(".popup__feature"),s=o.offer.features;for(let e=0;e<d.length;e++){let t=d[e],o=t.className.replace("popup__feature popup__feature--","");s.includes(o)||t.remove()}return n})(o)),n};window.card={createСardFragment:o,addCardNode:e=>{window.pin.mapPinsNode.querySelectorAll(".map__pin:not(.map__pin--main)").forEach(((t,n)=>{t.addEventListener("click",(()=>{window.map.removeActiveCard();const t=o(e[n]);t.querySelector(".popup__close").addEventListener("click",window.map.removeActiveCard),document.addEventListener("keydown",window.util.onPopupEscPress),window.pin.mapNode.insertBefore(t,window.activate.mapFiltersNode)}))}))}}})(),(()=>{const e={circle:{WIDTH:62,HEIGHT:62},pin:{WIDTH:62,HEIGHT:84}},t=630-e.pin.HEIGHT,o=130-e.pin.HEIGHT,n=window.pin.mapNode.offsetWidth-e.pin.WIDTH/2,i=-e.pin.WIDTH/2;window.map.mapPinMain.addEventListener("mousedown",(function(e){e.preventDefault();let r={x:e.clientX,y:e.clientY};const a=function(e){e.preventDefault();let a=r.x-e.clientX,d=r.y-e.clientY;const s=window.map.mapPinMain.offsetLeft-a,c=window.map.mapPinMain.offsetTop-d;r={x:e.clientX,y:e.clientY},s>=i&&s<=n&&(window.map.mapPinMain.style.left=s+"px"),c>=o&&c<=t&&(window.map.mapPinMain.style.top=c+"px"),window.form.passAddressInput()},d=function(e){e.preventDefault(),window.pin.mapPinsNode.removeEventListener("mousemove",a),window.pin.mapPinsNode.removeEventListener("mouseup",d)};window.pin.mapPinsNode.addEventListener("mousemove",a),window.pin.mapPinsNode.addEventListener("mouseup",d)})),window.move={MainPinSize:e}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#success").content.querySelector(".success"),o="570px",n="375px",i=()=>{const t=e.querySelector(".success"),o=e.querySelector(".error");t?(t.parentNode.removeChild(t),document.removeEventListener("keydown",window.util.onPopupMessageEscPress)):(o.parentNode.removeChild(o),document.removeEventListener("keydown",window.util.onPopupMessageEscPress))};window.reset={resetPage:()=>{window.pin.mapNode.classList.add("map--faded"),window.form.formNode.classList.add("ad-form--disabled"),window.activate.toggleDisabledOnFormNodes(),window.pin.removePins(),window.form.formNode.reset(),window.activate.formFiltersNode.reset(),window.map.mapPinMain.style.left=o,window.map.mapPinMain.style.top=n,window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH,window.move.MainPinSize.circle.HEIGHT),window.map.removeActiveCard(),window.images.previewHousing.classList.add("hidden"),window.images.previewHousing.src="",window.images.previewAvatar.src="img/muffin-grey.svg",window.map.mapPinMain.addEventListener("mousedown",window.activate.onPinMainClickOrEnterPress),window.map.mapPinMain.addEventListener("keydown",window.activate.onPinMainClickOrEnterPress)},removeMessageElement:i,mainNode:e,createMessageElement:()=>{const o=t.cloneNode(!0);e.appendChild(o),document.addEventListener("keydown",window.util.onPopupMessageEscPress),o.addEventListener("click",i)}}})(),(()=>{const e={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},t={palace:1e4,house:5e3,flat:1e3,bungalow:0},o=document.querySelector(".ad-form"),n=o.querySelector(".ad-form__reset"),i=document.querySelector("#room_number"),r=document.querySelector("#capacity"),a=()=>parseInt(window.map.mapPinMain.style.left,10)+31,d=t=>{Array.from(r.options).forEach((o=>{o.disabled=!e[t].includes(o.value)})),r.value=t>3?0:t};d(i.value);const s=()=>{o.price.min=t[o.type.value],o.price.placeholder=t[o.type.value]};s(),o.address.value=`${a()}, ${parseInt(window.map.mapPinMain.style.top,10)+31}`,o.addEventListener("input",(()=>{const e=o.title.value.length;e<30?o.title.setCustomValidity(`Ещё ${30-e} символа(ов).`):e>100?o.title.setCustomValidity(`Удалите лишние ${e-100} символа(ов).`):o.title.setCustomValidity(""),o.title.reportValidity()})),o.addEventListener("change",(e=>{switch(e.target){case o.timein:case o.timeout:(e=>{e.target===o.timein?o.timeout.value=o.timein.value:o.timein.value=o.timeout.value})(e);break;case o.type:s()}})),i.addEventListener("change",(e=>{d(e.target.value)})),o.addEventListener("submit",(e=>{window.backend.upload(new FormData(o),window.reset.resetPage),window.reset.createMessageElement(),e.preventDefault()})),n.addEventListener("click",(e=>{window.reset.resetPage(),e.preventDefault()})),window.form={formNode:o,passAddressInput:(e,t)=>{window.form.formNode.address.value=`${a()}, ${parseInt(window.map.mapPinMain.style.top,10)+62+22}`,window.form.formNode.address.readOnly=!0}}})(),window.activate.toggleDisabledOnFormNodes(),window.form.passAddressInput(window.move.MainPinSize.circle.WIDTH,window.move.MainPinSize.circle.HEIGHT),window.map.mapPinMain.addEventListener("mousedown",window.activate.onPinMainClickOrEnterPress),window.map.mapPinMain.addEventListener("keydown",window.activate.onPinMainClickOrEnterPress),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".ad-form__field input[type=file]"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector(".ad-form__upload input[type=file]"),i=document.querySelector(".ad-form__photo img"),r=(t,o)=>{t.addEventListener("change",(()=>{const n=t.files[0],i=n.type.toLowerCase();if(e.some((e=>i.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.classList.remove("hidden"),o.src=e.result})),e.readAsDataURL(n)}}))};r(t,o),r(n,i),window.images={previewAvatar:o,previewHousing:i}})()})();