var frontend = (function frontendModule() {

    function authorMarker() {
      console.log("%cExclusive Qurylys with Iskandarov Timur", "color:#fff; background-color:#7eb621; padding: 8px 15px; font-size: 14px; border-radius: 4px; text-align:center")
    }

    function paralaxSlider(offset) {
      if (offset <= 650) {
        const paralaxLayers = document.querySelectorAll('.parallax__layer');

        paralaxLayers.forEach((layer) => {
          const speed = layer.getAttribute('data-speed');
          const duration = layer.getAttribute('data-duration');
          const transform = offset/duration;

          layer.style.transition = speed + "s all";
          layer.style.transform = layer.style.transform.split(' ')[0] + " translateY(" + transform + "px)";
        });
      }
    }

    function creiateMap() {
      var map = document.querySelector('.dragscroll>img.map-image');
      var container = document.querySelector('.dragscroll');

      if (map) {
          showCenterMap()

          function showCenterMap() {
              map.style.position = 'absolute';
              let left = ((map.offsetWidth - container.offsetWidth) / 2) * -1
              let top = ((map.offsetHeight - container.offsetHeight) / 2) * -1
              map.style.left = left + 'px'
              map.style.top = top + 'px'
          }

          map.onmousedown = function(e) {

          var coords = getCoords(map);
          var shiftX = e.pageX - coords.left;
          var shiftY = e.pageY - coords.top;

          moveAt(e);

          function moveAt(e) {
              map.style.left = getLmits(e).left + 'px';
              map.style.top = getLmits(e).top + 'px';
          }

          function getLmits(e) {

              let left = e.pageX - container.offsetLeft - shiftX
              let top = e.pageY - container.offsetTop - shiftY

              if (left > 0) {
              left = 0
              }

              if (left < ((map.offsetWidth - container.offsetWidth) * -1))     {
              left = ((map.offsetWidth - container.offsetWidth) * -1)
              }

              if (top > 0) {
              top = 0
              }

              if (top < ((map.offsetHeight - container.offsetHeight) * -1))     {
              top = ((map.offsetHeight - container.offsetHeight) * -1)
              }

              return {
              left: left,
              top: top
              }

          }

          document.onmousemove = function(e) {
              moveAt(e);
          };

          map.onmouseup = function() {
              document.onmousemove = null;
              map.onmouseup = null;
          };

          }

          map.ondragstart = function() {
          return false;
          };

          function getCoords(elem) {   // кроме IE8-
          var box = elem.getBoundingClientRect();
          return {
              top: box.top + pageYOffset,
              left: box.left + pageXOffset
          };
          }
      }
    }

    function yandexMap() {
      let center = [43.2406273791933,76.81309677116388];
          if (window.outerWidth < 720) {
              center = [43.2406273791933,76.81309677116388];
          }

          searchMap = new ymaps.Map('interective-map', {
              center: center,
              zoom: 15,
              controls: ['zoomControl'],
          });

          cildrenCollection = new ymaps.GeoObjectCollection(null)
          medicalShopCollection = new ymaps.GeoObjectCollection(null)
          medicalCollection = new ymaps.GeoObjectCollection(null)
          schoolCollection = new ymaps.GeoObjectCollection(null)
          sportCollection = new ymaps.GeoObjectCollection(null)
          shopCollection = new ymaps.GeoObjectCollection(null)

          let cildren = [[43.241623, 76.804920], [43.244982, 76.813536], [43.244691, 76.818094], [43.246475, 76.816390], [43.247704, 76.815030], [43.245693, 76.822420], [43.239383, 76.816692], [43.239705, 76.819423], [43.238654, 76.819620], [43.238332, 76.821066]]
          let medicalShop = [[43.241391, 76.812323],[43.241548, 76.813604], [43.245348, 76.815990], [43.242534, 76.818691], [43.242099, 76.819535], [43.241629, 76.817671], [43.243337, 76.815545], [43.242654, 76.815094], [43.242855, 76.813658]]
          let medical = [[43.233883, 76.787446], [43.244020, 76.819027], [43.241816, 76.813340], [43.242649, 76.814736], [43.242095, 76.811981], [43.229371, 76.802200], [43.246503, 76.846616], [43.232789, 76.800194]]
          let school = [[43.244226, 76.816779], [43.237635, 76.823281], [43.247580, 76.800784], [43.248077, 76.824543]]
          let sport = [[43.243157, 76.817861], [43.241708, 76.825342], [43.237486, 76.826608]]
          let shop = [[43.241629, 76.817662],[43.241340, 76.812321],[43.242083, 76.812304],[43.242338, 76.813797],[43.242025, 76.813228], [43.242222, 76.816105], [43.242745, 76.816184], [43.242786, 76.813692]]
          for (var i = 0, l = cildren.length; i < l; i++) {
              cildrenCollection.add(new ymaps.Placemark(cildren[i], {hintContent: 'Детский сад',balloonContent: ''},{iconLayout: 'default#image',
                  iconImageHref: 'https://shaharcity.kz/assets/img/map/childrens.svg',iconImageSize: [30, 40.9],iconImageOffset: [-15, -40.9],}));
          }
          for (var i = 0, l = medicalShop.length; i < l; i++) {
              medicalShopCollection.add(new ymaps.Placemark(medicalShop[i], {hintContent: 'Аптека',balloonContent: ''},{iconLayout: 'default#image',
                  iconImageHref: 'https://shaharcity.kz/assets/img/map/medical_shop.svg',iconImageSize: [30, 40.9],iconImageOffset: [-15, -40.9],}));
          }
          for (var i = 0, l = medical.length; i < l; i++) {
              medicalCollection.add(new ymaps.Placemark(medical[i], {hintContent: 'Поликлиника',balloonContent: ''},{iconLayout: 'default#image',
                  iconImageHref: 'https://shaharcity.kz/assets/img/map/medical_red.svg',iconImageSize: [30, 40.9],iconImageOffset: [-15, -40.9],}));
          }
          for (var i = 0, l = school.length; i < l; i++) {
              schoolCollection.add(new ymaps.Placemark(school[i], {hintContent: 'Школа',balloonContent: ''},{iconLayout: 'default#image',
                  iconImageHref: 'https://shaharcity.kz/assets/img/map/school.svg',iconImageSize: [30, 40.9],iconImageOffset: [-15, -40.9],}));
          }
          for (var i = 0, l = sport.length; i < l; i++) {
              sportCollection.add(new ymaps.Placemark(sport[i], {hintContent: 'Фитнес-центр',balloonContent: ''},{iconLayout: 'default#image',
                  iconImageHref: 'https://shaharcity.kz/assets/img/map/sport.svg',iconImageSize: [30, 40.9],iconImageOffset: [-15, -40.9],}));
          }
          for (var i = 0, l = shop.length; i < l; i++) {
              shopCollection.add(new ymaps.Placemark(shop[i], {hintContent: ' Супермаркет',balloonContent: ''},{iconLayout: 'default#image',
                  iconImageHref: 'https://shaharcity.kz/assets/img/map/shop.svg',iconImageSize: [30, 40.9],iconImageOffset: [-15, -40.9],}));
          }

          (marker = new ymaps.Placemark([43.2406273791933,76.81309677116388],
              {},
              {
                  iconLayout: 'default#image',
                  iconImageHref: 'https://cms.abpx.kz/storage/uploads/2022/02/10/6204ebf9b7751marker1.svg',
                  iconImageSize: [144, 82],
                  iconImageOffset: [-77, -82],
              }
          )),
          searchMap.geoObjects.add(cildrenCollection);
          searchMap.geoObjects.add(medicalShopCollection);
          searchMap.geoObjects.add(medicalCollection);
          searchMap.geoObjects.add(schoolCollection);
          searchMap.geoObjects.add(sportCollection);
          searchMap.geoObjects.add(shopCollection);
          searchMap.geoObjects.add(marker);
          searchMap.behaviors.disable('scrollZoom');
    }

    function closePreloader() {

      setTimeout( () => {
        fade(document.getElementById('preloader'))
      }
      ,0)

    }

    function creiateUserNotification() {
      if (localStorage.getItem('notificationCheck') != 'yes') {
        var notificationModalEl = document.getElementById('notificationModal')
        if (notificationModalEl) {
          let notificationModal = new bootstrap.Modal(notificationModalEl, {
            keyboard: false
          })
          notificationModal.show()

          let closeNotification = document.querySelector('#notificationModal .btn-close')
          closeNotification.addEventListener('click', () => { localStorage.setItem('notificationCheck', 'yes') })
          notificationModalEl.addEventListener('click', () => { localStorage.setItem('notificationCheck', 'yes') })
        }
      }
    }

    function fade(element) {
      var op = 1;  // initial opacity
      var timer = setInterval(function () {
        if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
        } else if (op >= 1) {
          
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.16;
      }, 0.1);
    }

    function sideBarToggle(condition) {
      const toggleBtn = document.querySelector('.menu-toggle');
      const sideBar = document.querySelector('.sidebar');
      const header = document.querySelector('.main-header');

      toggleBtn.classList.remove('menu-toggle--open');
      sideBar.classList.remove('sidebar--open');

      if (window.pageYOffset < 300)
      header.classList.remove ('main-header--sticky');
    }

    function sideBarToggleBtnEvent () {
      const toggleBtn = document.querySelector('.menu-toggle');
      const sideBar = document.querySelector('.sidebar');
      const header = document.querySelector('.main-header');

      toggleBtn.addEventListener('click', () => {
          toggleBtn.classList.toggle('menu-toggle--open');
          sideBar.classList.toggle('sidebar--open');

          if (window.pageYOffset < 300)
          header.classList.toggle('main-header--sticky');
      });
    }

    function buildingStepsCarousel() {
      //Building Steps
      let slidesPerView = 3;
      let center = false;
      let margin = 16;

      if (window.innerWidth < 1350) {
        slidesPerView = 3;
      }

      if (window.innerWidth < 990) {
        slidesPerView = 2.3;
      }

      if (window.innerWidth < 768) {
        slidesPerView = 1.3;
        center = false
        margin = 16
      }

      if (window.innerWidth < 576) {
        slidesPerView = 1.2
        center = false
        margin = 16
      }

      var steps = new Swiper('.building-steps__swiper', {
        effect: null,
        loop: false,
        slidesPerView: slidesPerView,
        initialSlide: 0,
        keyboardControl: true,
        mousewheelControl: true,
        lazyLoading: true,
        centeredSlides: center,
        preventClicks: true,
        preventClicksPropagation: false,
        lazyLoadingInPrevNext: true,
        spaceBetween: margin,
          navigation: {
              nextEl: ".swiper-button-next.building-steps__controll",
              prevEl: ".swiper-button-prev.building-steps__controll",
          },
      });

      buildingStepsAutoHeight();

    }

    function buildingStepsAutoHeight() {

      //Set autoHeight
      let steps_items = document.querySelectorAll('.building-steps__swiper .swiper-slide');

      steps_items.forEach(function (step) {
        let height = (step.offsetWidth / 10) * 13;
        step.style.height = height;
      })

    }

    function advantagesCarousel() {
      //Advantages-swiper
      let advantagesCount = 4

      if (window.innerWidth < 1220) {
        advantagesCount = 3
      }
      if (window.innerWidth < 990) {
        advantagesCount = 2
      }
      if (window.innerWidth < 768) {
        advantagesCount = 1.3
      }
      if (window.innerWidth < 576) {
        advantagesCount = 1
      }

      var advantages = new Swiper('.advantages-swiper', {
        effect: false,
        loop: false,
        centeredSlides: false,
        slidesPerView: advantagesCount,
        initialSlide: 0,
        keyboardControl: true,
        mousewheelControl: true,
        lazyLoading: true,
        preventClicks: false,
        preventClicksPropagation: false,
        lazyLoadingInPrevNext: true,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
      })
    }

    function galleryCarousel() {

      var galery = new Swiper('.gallery-swiper', {
        loop: false,
        slidesPerView: "auto",
        initialSlide: 0,
        keyboardControl: true,
        mousewheelControl: true,
        autoHeight: true,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next.main-gallery__controll",
          prevEl: ".swiper-button-prev.main-gallery__controll",
      }
      })

    }

    function creiateLightbox(data) {

      var lightbox = new FsLightbox()
      data = data.split(',')
      lightbox.props.sources = data
      lightbox.props.onInit
      lightbox.open()

    }

    function phoneValidator(){

      var phoneInputs = document.querySelectorAll('input[name="phone"]')
      phoneInputs.forEach((el) => {
        el.addEventListener('input', function (e) {
          clearMessages()
          let numberCodes = ['710','711','712','713','714','715','716','717','718','721','722','723','724','725','726','727','728','729','736','700','701','702','703','704','705','706','707','708','709','747','750','751','760','761','762','763','764','771','775','776','777','778']
          let x = e.target.value.replace(/\D/g, '').match(/(^\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

          e.target.value = !x[3] ? "+" + x[1] + x[2] : "+" + x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');

          let errMess = document.createElement('span')
          errMess.classList.add('input-err')
          errMess.textContent = translater.no_valid_number

          //console.log(numberCodes.indexOf(x[2]))
          if (x[3] && ((x[1] != '7') || (numberCodes.indexOf(x[2]) == -1))) {
            el.parentNode.appendChild(errMess)
          } else {
            clearMessages()
          }

        });
      })

    }

    function validatePhoneNumber(number) {
      if (number.match(/^\+\d{1} \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/)) {
        return true
      } else {
        return false
      }
    }

    function clearMessages() {
      let messAll = document.querySelectorAll('.input-err')
      messAll.forEach((el) => {
        el.remove()
      })
    }

    function formValidator(element) {
      let errors = false
      let form = element.parentNode.parentNode
      let inputs = form.querySelectorAll('input, textarea')
      let userName = form.querySelector('[name="name"]')
      let formQuery = new Object()

      let preloader = document.createElement('div')
      preloader.classList.add('form-preloader')
      form.appendChild(preloader)

      if (userName.value == '') {
        userName.value = 'Не указано'
      }

      inputs.forEach(function (el) {

        if (el.hasAttribute("required") && el.value != "" || !el.hasAttribute("required") && el.value != "") {
          let id = el.id
          let name = el.getAttribute('fieldname')
          let data = el.value
          formQuery[''+id] = {name, data}
        } else {
          if (el.hasAttribute("required")) {
            el.setAttribute('style', 'border-color: red;')
            errors = true
          }
        }

        if (el.name == 'phone') {
          if (!validatePhoneNumber(el.value)) {
            clearMessages()
            let errMess = document.createElement('span')
            errMess.classList.add('input-err')
            errMess.textContent = translater.no_valid_number
            el.parentNode.appendChild(errMess)
            errors = true
          } else {
            clearMessages()
          }
        }

      })

      if (!errors) {
        let user_data = collect_user_data()
        formQuery = Object.assign(formQuery, user_data)
        formSendData(formQuery, form)
      } else {
        preloader.remove()
      }

    }

    function collect_user_data(){

      const url = new URL(document.location.href)
      let user_data = new Object()

      //UTM DATA
      if (url.searchParams.get('utm_source')) {
        let name = 'utm_source'
        let data = url.searchParams.get('utm_source')
        user_data['utm_source'] = {name: name, data: data}
      }

      if (url.searchParams.get('utm_medium')) {
        let name = 'utm_medium'
        let data = url.searchParams.get('utm_medium')
        user_data['utm_medium'] = {name: name, data: data}
      }

      if (url.searchParams.get('utm_campaign')) {
        let name = 'utm_campaign'
        let data = url.searchParams.get('utm_campaign')
        user_data['utm_campaign'] = {name: name, data: data}
      }

      if (url.searchParams.get('utm_term')) {
        let name = 'utm_term'
        let data = url.searchParams.get('utm_term')
        user_data['utm_term'] = {name: name, data: data}
      }

      if (url.searchParams.get('utm_content')) {
        let name = 'utm_content'
        let data = url.searchParams.get('utm_content')
        user_data['utm_content'] = {name: name, data: data}
      }

      //UserAgent
      if (window.navigator.userAgent) {
        let name = 'userAgent'
        let data = window.navigator.userAgent
        user_data['userAgent'] = {name: name, data: data}
      }

      //Cookie
      if (get_cookie('_ga')) {
        let name = '_ga'
        let data = get_cookie('_ga').split('.')
        data = data[data.length - 2] + '.' + data[data.length - 1]
        user_data['_ga'] = {name: name, data: data}
      }

      //GetCookie Function
      function get_cookie ( cookie_name )
      {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

        if ( results )
          return ( unescape ( results[2] ) );
        else
          return null;
      }

      return user_data

    }

    async function formSendData(formQuery, form) {
      let response = await fetch('?form=send_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formQuery)
      });
      
      fbq('track', 'Lead');
      document.location.href = "?page=thanks-page";

      form.innerHTML = await response.text()

    }

    const locationFilter = (function () {

      const filterParams = {
        rooms: null,
        floor: null,
        square: null
      };
      
      const startNewSwiper = () => {
        let flats = new Swiper('.locations-result__carousel', {
          loop: false,
          spaceBetween: 60,
          lazy: false,
          navigation: {
            nextEl: ".locations--controll.swiper-button-next",
            prevEl: ".locations--controll.swiper-button-prev",
          },
        })
      }

      const renderOffers = (locations) => {
        const parent = document.querySelector('.locations__result');
        let html = '';

        html += `<div class="locations-result__carousel swiper-locations">
                              <div class="swiper-wrapper">`;

        locations.forEach(location => {
          html += `
            <div class="locations-result__item swiper-slide">
              <div class="flex location">
                <div class="flex__1-2 location__info">
                  <div class="locations-result__data">
                    <h4 class="location__title">${location.rooms} комнатная</h4>
                    <p class="location__square">Площадь: <b>${location.square} м<sup>2</sup></b></p>
                  </div>
                  <div class="location__btn-group">
                    <a class="location__download" href="https://cms.abpx.kz${location.plan.path}">
                      Скачать планировку
                    </a>
                    <button class="btn location__btn" onclick="frontend.modal(this)" data-modal="#callback-modal">
                      Оставить заявку
                    </button>
                  </div>
                </div>
                <div class="flex__1-2 location__img-block">
                  <a href="https://cms.abpx.kz${location.plan.path}" onclick="frontend.lightBox(this.getAttribute('href')); return false" >
                    <img class="location__img" src="https://cms.abpx.kz${location.plan.path}" />
                  </a>
                </div>
              </div>
            </div>`
          ;
        });

        html += `</div>
                <div class="swiper-button-next locations--controll"></div>
                <div class="swiper-button-prev locations--controll"></div>
              </div>`;

        parent.innerHTML = html;

        startNewSwiper();
        
      };

      const renderButtons = (locations) => {
        const locationsFilter = document.querySelector('.locations-filter');
        const rooms =  new Set(); 
        let floors =  new Set(); 
        const squares =  new Set(); 

        locations.map((location) => {
          rooms.add(location.rooms);
          floors = new Set(location.floors.concat(...floors));
          squares.add(location.square);
        });
        
        locationsFilter.innerHTML = '';

        (function () {
          const label = document.createElement('span');
          const btnsGroup = document.createElement('div');
          let roomsButtons = null;
          
          label.classList = 'locations-filter__label';
          label.textContent = 'Количество комнат:';
          locationsFilter.appendChild(label);
          
          btnsGroup.classList = 'locations-filter__group filter-group';

          roomsButtons = [...rooms].sort((a,b) => {
            return a - b;
          });
          roomsButtons.forEach((room) => {
            const btn = document.createElement('button'); 

            btn.classList = 'btn filter-group__btn filter-group__btn--room';

            if (filterParams.rooms == room) {
              btn.classList.add('active')
            }

            btn.textContent = room + ' Комнатные';
            btn.setAttribute('data-filter', room);

            btn.addEventListener('click', (e) => {

              if (btn.classList.contains('active')) {
                filterParams.rooms = null;
              } else {
                filterParams.rooms = room;
              }

              filterParams.floor = null;
              filterParams.square = null;
              
              updateFilter();
            });

            btnsGroup.appendChild(btn);
          });

          locationsFilter.appendChild(btnsGroup);
        })();
        
        (function () {
          const label = document.createElement('span');
          const btnsGroup = document.createElement('div');
          let floorsButtons = null;
          
          label.classList = 'locations-filter__label';
          label.textContent = 'Этаж:';
          locationsFilter.appendChild(label);
          
          btnsGroup.classList = 'locations-filter__group filter-group';

          floorsButtons = [...floors].sort((a,b) => {
            return a - b;
          });
          floorsButtons.forEach((floor) => {
            const btn = document.createElement('button'); 

            btn.classList = 'btn filter-group__btn filter-group__btn--floors';

            if (filterParams.floor == floor) {
              btn.classList.add('active')
            }

            btn.textContent = floor;
            btn.setAttribute('data-filter', floor);

            btn.addEventListener('click', () => {

              if (btn.classList.contains('active')) {
                filterParams.floor = null;
              } else {
                filterParams.floor = floor;
              }

              filterParams.square = null;

              updateFilter();

            });

            btnsGroup.appendChild(btn);
          });

          locationsFilter.appendChild(btnsGroup);
        })();
        
        (function () {
          const label = document.createElement('span');
          const btnsGroup = document.createElement('div');
          let squaresButtons = null;
          
          label.classList = 'locations-filter__label';
          label.textContent = 'Площадь:';
          locationsFilter.appendChild(label);
          
          btnsGroup.classList = 'locations-filter__group filter-group';

          squaresButtons = [...squares].sort((a,b) => {
            return a - b;
          });
          squaresButtons.forEach((square) => {
            const btn = document.createElement('button'); 

            btn.classList = 'btn filter-group__btn filter-group__btn--square';

            if (filterParams.square == square) {
              btn.classList.add('active')
            }
            
            btn.innerHTML = square + ' м <sup>2</sup>';
            btn.setAttribute('data-filter', square);

            btn.addEventListener('click', () => {
              if (btn.classList.contains('active')) {
                filterParams.square = null;
              } else {
                filterParams.square = square;
              }

              updateFilter();
            });

            btnsGroup.appendChild(btn);
          });

          locationsFilter.appendChild(btnsGroup);
        })();

      };

      const fetchData = (rooms = null, floor = null, square = null) => {
        const url = new URL(document.location.href);
        
        url.searchParams.set('get', 'data');
        !rooms || url.searchParams.set('rooms', rooms);
        !floor || url.searchParams.set('floor', floor);
        !square || url.searchParams.set('square', square);

        fetch(url.href)
          .then(res => res.json())
          .then(res => {
            //Checked errors
            renderButtons(res.entries);
            renderOffers(res.entries);
          });
      };

      const updateFilter = () => {
        fetchData(
          filterParams.rooms,
          filterParams.floor,
          filterParams.square
        );
      };

      fetchData();
    })()

    var newFilter = (function creiateFilter() {

      function getFloors(offers, filters) {
        let floorsBtnHtml = ""
        let floorsNumberArray = []
        for (var offer in offers) {
          for (var floor in offers[offer].floors) {
            if (!floorsNumberArray.includes(offers[offer].floors[floor])) {
              floorsNumberArray.push(offers[offer].floors[floor])
              floorsBtnHtml = floorsBtnHtml + '<a class="floor-buttons__item sections" data-filter="' + offers[offer].floors[floor] + '" href="#" onclick="frontend.filterClick(\'#floorButtons\', this.getAttribute(\'data-filter\')); frontend.filterCreiate(offersAll); return false">' + offers[offer].floors[floor] + '</a>'
            }
          }
        }
        let floors = document.getElementById('floorButtons');
        floors.innerHTML = floorsBtnHtml;
        if (filters.floor !== '') {
          let activeFloor = document.querySelector('#floorButtons [data-filter="' + filters.floor + '"]')
          if (activeFloor) {
            activeFloor.classList.add("active")
          } else {
            floors.firstElementChild.classList.add("active")
          }
        }
      }

      function getSquare(offers, filters) {
        let squareBtnHtml = ""
        let squareNumberArray = []
        for (var offer in offers) {
          if (!squareNumberArray.includes(offers[offer].square)) {
            squareNumberArray.push(offers[offer].square)
            squareBtnHtml = squareBtnHtml + '<a class="square square-buttons__item" data-filter="' + offers[offer].square + '" href="#" onclick="frontend.filterClick(\'#squareButtons\', this.getAttribute(\'data-filter\')); frontend.filterCreiate(offersAll); return false">' + offers[offer].square + ' м<sup>2</sup></a>'
          }
        }
        let square = document.getElementById('squareButtons')
        square.innerHTML = squareBtnHtml

        if (filters.square == '') {
          let activeSquare = document.querySelector('#squareButtons .square-buttons__item:first-child')
          activeSquare.classList.add("active");
        } else {
          let activeSquare = document.querySelector('#squareButtons [data-filter="' + filters.square + '"]');
          activeSquare.classList.add("active");
        }
      }

      function filterOffers(offersAll) {

        let offers = []
        for (let key in offersAll) {
          offers[key] = offersAll[key];
        }

        let filters = {
          square: document.querySelector('#squareButtons a.active') != null ? document.querySelector('#squareButtons a.active').getAttribute('data-filter') : '',
          floor: document.querySelector('#floorButtons a.active') != null ? document.querySelector('#floorButtons a.active').getAttribute('data-filter') : '',
        }

        getSquare(offers, filters)

        if (filters.square !== '') {
          for (var offer in offers) {
            if (offers[offer].square != filters.square) {
              delete offers[offer]
            }
          }
        }
        
        getFloors(offers, filters)

        if (filters.floor !== '') {
          for (var offer in offers) {
            if (!offers[offer].floors.includes(filters.floor)) {
              delete offers[offer]
            }
          }
        }

        renderOffers(offers)
        sortButtons('#floorButtons a')
        sortButtons('#squareButtons a')

      }

      function sortButtons(selector) {
        var nodeList = document.querySelectorAll(selector);
        var itemsArray = [];
        var parent = nodeList[0].parentNode;
        for (var i = 0; i < nodeList.length; i++) {
          itemsArray.push(parent.removeChild(nodeList[i]));
        }
        itemsArray.sort(function (nodeA, nodeB) {
          var textA = nodeA.getAttribute('data-filter');
          var textB = nodeB.getAttribute('data-filter');
          var numberA = parseInt(textA);
          var numberB = parseInt(textB);
          if (numberA < numberB) return -1;
          if (numberA > numberB) return 1;
          return 0;
        })
                .forEach(function (node) {
                  parent.appendChild(node)
                });
      }

      function renderOffers(offers) {
        const priceNode = document.querySelector('.location_price');
        const floorPlanNode = document.querySelector('.floor-plan__img');
        const locationPlanNode = document.querySelector('.locaton-plan__img');
        const buttonNode = document.querySelector('.download-link__location');
        const locations = offers.filter(el => {return el});
        const locationData = locations[0];

        priceNode.textContent = locationData.price + ' тг.';
        floorPlanNode.src = 'https://cms.abpx.kz' + locationData.floor_plan.path;
        locationPlanNode.src = 'https://cms.abpx.kz' + locationData.plan.path;
        buttonNode.href = 'https://cms.abpx.kz' + locationData.plan.path;
      }

      function startNewSwiper(offersAll) {
        let flats = new Swiper('.swiper-flats', {
          spaceBetween: 20,
          lazy: true,
          navigation: {
            nextEl: ".flat-next",
            prevEl: ".flat-prev",
          },
        })
      } 

      function activateButton(parent, dataFilter) {
        let then = document.querySelector(parent + ' .active')
        let now = document.querySelector(parent + ' [data-filter="' + dataFilter + '"]')

        if (then != null) {
          then.classList.remove('active')
        }
        if (now != null) {
          now.classList.add('active')
        }

        if (parent == "#squareButtons") {
          let floorActive = document.querySelector('#floorButtons .active')
          if (floorActive != null) {
            floorActive.classList.remove('active')
          }
        }

      }

      return {
        filterOffers: filterOffers,
        activateButton: activateButton
      }

    })()

    function correctStikyHeader() {
      const header = document.querySelector('.main-header');

      if (window.pageYOffset > 300) 
        header.classList.add('main-header--sticky');
    }

    function headerMenuLinks () {
      const menuItems = document.querySelectorAll('.navigate__link:not(.lang-switcher__item), .mobile-menu__link');

      menuItems.forEach(item => {
          item.addEventListener('click', (event) => {
              const el = document.querySelector(item.getAttribute('href'));
              const headerHeight = document.querySelector('header.main-header').offsetHeight;

              window.scrollTo({
                  top: el.offsetTop - headerHeight,
                  behavior: "smooth"
              });

              event.preventDefault();
          });
      });
    }

    function activeMenuItem(scroll) {
      const menuItems = document.querySelectorAll('.navigate__link:not(.lang-switcher__item)');
      const headerHeight = document.querySelector('header').offsetHeight;
      const checkActivation = (scroll, elTop, elBottom) => { 
          if (scroll >= elTop && scroll <= elBottom) {
              return true;
          }

          return false;
      }
      const selectElement = (element) => {
          const oldSelect = document.querySelector('.navigate__link--active');

          if (oldSelect) oldSelect.classList.remove('navigate__link--active');
          element.classList.add('navigate__link--active');
      }

      menuItems.forEach(item => {
          const el = document.querySelector(item.getAttribute('href'));

          if (el) {
            const isSelected = checkActivation(
                                    scroll, 
                                    el.offsetTop - headerHeight, 
                                    (el.offsetTop + el.offsetHeight) - headerHeight
                                );

            if (isSelected) {
                selectElement(item);
            }
          }
      });
    }
    
    function modal() {
      const buttons = document.querySelectorAll('[data-modal]');

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const modal = document.querySelector(btn.getAttribute('data-modal'));

          modal.classList.toggle('modal--hidden');

          return false;
        });
      });
    }

    function toggleModal(btn) {
      const modal = document.querySelector(btn.getAttribute('data-modal'));

      modal.classList.toggle('modal--hidden');
      
      return false;
    }

    function frontendReady() {
      authorMarker();
      buildingStepsCarousel();
      galleryCarousel();
      // closePreloader();
      modal();
      phoneValidator();
      headerMenuLinks();
      correctStikyHeader();
      sideBarToggleBtnEvent();
    }

    function frontendResize() {
      buildingStepsCarousel();
    }

    function frontendScroll() {
      // paralaxSlider(window.pageYOffset);
      activeMenuItem(window.pageYOffset);
      //Slider paralax
      var scrollPosition = 0
      //var decor1 = document.querySelector('.decor1')
      //var decor2 = document.querySelector('.decor2')
      var header = document.querySelector('header');
      let slider = document.getElementById('home');
      //var logo = document.querySelector('header a.navbar-brand img')

      if (window.pageYOffset < 700) {
        scroll1 = window.pageYOffset / 4;
        scroll2 = window.pageYOffset / 20;
        //decor1.style.transform = "translateY(-" + scroll1 + "px)"
        //decor2.style.transform = "translateY(-" + scroll2 + "px)"
      } else {
        if (!header.classList.contains('ymap')) {
          header.classList.add('ymap');
          ymaps.ready(frontend.yandex);
        }
      }

      if (window.pageYOffset > 450)	{
        // header.classList.add('fixed');
        // slider.style.marginTop = header.offsetHeight + 'px';
        // pt-4 pb-1
      } else {
        // header.classList.remove('fixed');
        // slider.style.marginTop = '0px';
      }

      if (window.pageYOffset > 450)	{
        if (!header.classList.contains('main-header--sticky')) {
          header.classList.add('main-header--sticky');
        }
      } else {
        if (header.classList.contains('main-header--sticky')) {
          header.classList.remove('main-header--sticky');
        }
      }
    }

    return {
      marker: authorMarker,
      steps: buildingStepsCarousel,
      advantages: advantagesCarousel,
      filterCreiate: newFilter.filterOffers,
      filterClick: newFilter.activateButton,
      lightBox: creiateLightbox,
      sidebar: sideBarToggle,
      map: creiateMap,
      yandex: yandexMap,
      form: formValidator,
      ready: frontendReady,
      resize: frontendResize,
      scroll: frontendScroll,
      modal: toggleModal
    }

  })();

document.addEventListener("DOMContentLoaded", ()=>{ frontend.ready() });
window.addEventListener("resize", ()=>{ frontend.resize() });
document.addEventListener("scroll", ()=>{ frontend.scroll() });