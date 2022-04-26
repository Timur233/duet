var frontend = (function frontendModule() {

    function authorMarker() {
        console.log("%cExclusive Qurylys with Iskandarov Timur", "color:#fff; background-color:#7eb621; padding: 8px 15px; font-size: 14px; border-radius: 4px; text-align:center")
    }

    function yandexMap() {
        searchMap = new ymaps.Map('map', {
            center: [43.240643643765466,76.93736234688615], //43.318978, 76.897165
            zoom: 15,
            controls: [],
        });

        (marker = new ymaps.Placemark([43.240643643765466,76.93736234688615],
            {
                hintContent: 'Жилой комплекс',
                balloonContent: 'Exclusive Duet',
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'assets/img/markers/map-marker.png',
                iconImageSize: [81.16, 110],
                iconImageOffset: [-40.58, -110],
            }
        )),
            searchMap.geoObjects.add(marker);
        searchMap.behaviors.disable('scrollZoom');

    }

    function closePreloader() {

        setTimeout( () => {
                fade(document.getElementById('preloader'))
            }
            ,1400)

    }

    //Fade out element
    function fade(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 0.1);
    }

    function sideBarToggle(condition) {
        let button = document.getElementById('sidebarToggle')
        let sideBar = document.querySelector('.sidebar')
        let bars = document.querySelector('.ham5')
        let sideBarPhone = document.querySelector('.call .phone')
        let mainPhone = document.querySelector('.contact-block__phone')

        sideBarPhone.href = 'tel:' + mainPhone.textContent
        sideBarPhone.textContent = mainPhone.textContent

        if (condition == 'open') {
            document.body.classList.remove('sidebarOpen')
            sideBar.classList.remove('open')
            button.setAttribute('data-condition', '')
        } else {
            document.body.classList.add('sidebarOpen')
            sideBar.classList.add('open')
            button.setAttribute('data-condition', 'open')
        }

        bars.classList.toggle('active')
    }

    function advantagesCarousel() {

        let slidesPerView = 3;
        let margin = 80;
        let effect = 'slide';
        let centeredSlides = true;

        if (window.innerWidth < 768) {
            slidesPerView = 1.3
            effect = ''
            center = false
            margin = 25
        }
        if (window.innerWidth < 576) {
            slidesPerView = 1.2
        }

        var steps = new Swiper('.advant-items', {
            loop: true,
            effect,
            centeredSlides,
            slidesPerView: slidesPerView,
            initialSlide: 0,
            keyboardControl: true,
            mousewheelControl: true,
            lazyLoading: true,
            spaceBetween: margin,
            navigation: {
                nextEl: ".advant-next",
                prevEl: ".advant-prev",
            },
        })

    }

    function buildingStepsCarousel() {

        let slidesPerView = 4
        let margin = 25
        if (window.innerWidth < 768) {
            slidesPerView = 1.3
            effect = ''
            center = false
            margin = 25
        }
        if (window.innerWidth < 576) {
            slidesPerView = 1.2
        }
        var steps = new Swiper('.steps-swiper', {
            loop: false,
            slidesPerView: slidesPerView,
            initialSlide: 0,
            keyboardControl: true,
            mousewheelControl: true,
            lazyLoading: true,
            spaceBetween: margin,
            navigation: {
                nextEl: ".building-steps-next",
                prevEl: ".building-steps-prev",
            },
        })

        buildingStepsAutoHeight()

    }

    function buildingStepsAutoHeight() {

        //Set autoHeight
        let steps_items = document.querySelectorAll('.steps-swiper .swiper-slide')
        steps_items.forEach(function (step) {
            let height = (step.offsetWidth / 3) * 4.70
            step.style.height = height
        })

    }

    function galleryCarousel() {

        var gallery = new Swiper('.gallery-swiper', {
            loop: true,
            slidesPerView: "auto",
            initialSlide: 0,
            keyboardControl: true,
            mousewheelControl: true,
            autoHeight: true,
            spaceBetween: 25,
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
                errMess.style.width = el.offsetWidth + 'px';
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
                    el.setAttribute('style', 'border: 2px solid red;')
                    errors = true
                }
            }
        })

        if (!errors) {
            let user_data = collect_user_data()
            formQuery = Object.assign(formQuery, user_data)
            formSendData(formQuery, form)
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
        let response = await fetch('/form/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formQuery)
        });

        form.innerHTML = await response.text()

    }

    function activeMenuItem(scroll) {
        const menuItems = document.querySelectorAll('.nav-menu a');
        const headerHeight = document.querySelector('header').offsetHeight;
        const checkActivation = (scroll, elTop, elBottom) => { 
            if (scroll >= elTop && scroll <= elBottom) {
                return true;
            }

            return false;
        }
        const selectElement = (element) => {
            const oldSelect = document.querySelector('.active');

            if (oldSelect) oldSelect.classList.remove('active');
            element.classList.add('active');
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

    var newFilter = (function creiateFilter() {

        function getRooms(offers, filters) {
            //console.log(offersAll)
            let roomsBtnHtml = ""
            let roomsNumberArray = []
            for (var offer in offersAll) {
                if (!roomsNumberArray.includes(offersAll[offer].rooms)) {
                    roomsNumberArray.push(offersAll[offer].rooms)
                    roomsBtnHtml = roomsBtnHtml + '<a class="btn btn-gradient-filter me-2 mb-3 rooms" data-filter="' + offersAll[offer].rooms + '" href="#" onclick="frontend.filterClick(\'#roomButtons\' ,this.getAttribute(\'data-filter\')); frontend.filterCreiate(offersAll); return false">' + offersAll[offer].rooms + (offersAll[offer].rooms != 1 ? translater.multiplier : translater.multiplierX1) + '</a>'
                }
            }
            let rooms = document.getElementById('roomButtons')
            rooms.innerHTML = roomsBtnHtml
            if (filters.room == '') {
                let activeRoom = document.querySelector('#roomButtons .btn:first-child')
                activeRoom.classList.add("active")
            } else {
                let activeRoom = document.querySelector('#roomButtons [data-filter="' + filters.room + '"]')
                activeRoom.classList.add("active")
            }
        }

        function getFloors(offers, filters) {
            let floorsBtnHtml = ""
            let floorsNumberArray = []
            for (var offer in offers) {
                for (var floor in offers[offer].floors) {
                    if (!floorsNumberArray.includes(offers[offer].floors[floor])) {
                        floorsNumberArray.push(offers[offer].floors[floor])
                        floorsBtnHtml = floorsBtnHtml + '<a class="btn btn-gradient-filter me-2 mb-3 sections" data-filter="' + offers[offer].floors[floor] + '" href="#" onclick="frontend.filterClick(\'#floorButtons\', this.getAttribute(\'data-filter\')); frontend.filterCreiate(offersAll); return false">' + offers[offer].floors[floor] + '</a>'
                    }
                }
            }
            let floors = document.getElementById('floorButtons')
            floors.innerHTML = floorsBtnHtml
            if (filters.floor != '') {
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
                    squareBtnHtml = squareBtnHtml + '<a class="btn btn-gradient-filter me-2 mb-3 square" data-filter="' + offers[offer].square + '" href="#" onclick="frontend.filterClick(\'#squareButtons\', this.getAttribute(\'data-filter\')); frontend.filterCreiate(offersAll); return false">' + offers[offer].square + ' м2</a>'
                }
            }
            let square = document.getElementById('squareButtons')
            square.innerHTML = squareBtnHtml
            if (filters.square != '') {
                let activeSquare = document.querySelector('#squareButtons [data-filter="' + filters.square + '"]')
                if (activeSquare) {
                    activeSquare.classList.add("active")
                } else {
                    square.firstElementChild.classList.add("active")
                }
            }
        }

        function filterOffers(offersAll) {

            let offers = []
            for (let key in offersAll) {
                offers[key] = offersAll[key];
            }

            //
            // console.log(offers)

            let filters = {
                room: document.querySelector('#roomButtons a.active').getAttribute('data-filter'),
                floor: document.querySelector('#floorButtons a.active') != null ? document.querySelector('#floorButtons a.active').getAttribute('data-filter') : '',
                square: document.querySelector('#squareButtons a.active') != null ? document.querySelector('#squareButtons a.active').getAttribute('data-filter') : ''
            }

            getRooms(offers, filters)
            if (filters.room != '') {
                for (var offer in offers) {
                    if (offers[offer].rooms != filters.room) {
                        delete offers[offer]
                    }
                }
            }
            getFloors(offers, filters)

            if (filters.floor != '') {
                for (var offer in offers) {
                    if (!offers[offer].floors.includes(filters.floor)) {
                        delete offers[offer]
                    }
                }
            }
            getSquare(offers, filters)

            if (filters.square != '') {
                for (var offer in offers) {
                    if (offers[offer].square != filters.square) {
                        delete offers[offer]
                    }
                }
            }

            renderOffers(offers)
            sortButtons('#roomButtons a')
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
            var offersHtml = '';
            offersHtml += '<div class="swiper-flats"><div class="swiper-wrapper">';
            offers.forEach(function (el) {
                offersHtml += '		<div class="swiper-slide">';
                offersHtml += '        <div class="bg-white-transprent w-100 h-100 p-4">';
                offersHtml += '          <div class="row h-100">';
                offersHtml +=
                    '            <div class="col-md-5 floot-info d-flex flex-wrap">';
                offersHtml += '              <div class="floor-data align-items-start mt-2">';
                offersHtml += '                <h4>' + el.rooms + ((el.rooms != 1) ? translater.multiplier : translater.multiplierX1) + '</h4>';
                offersHtml += '                <p>' + translater.square + ': <b>' + el.square + ' м2</b></p>';
                offersHtml += '                <a class="downloadPlan" data-caption="' + el.title + '" href="https://cms.abpx.kz' + el.plan.path + '" onclick="frontend.lightBox(this.href); return false">' + translater.download_plan + '</a>';
                //offersHtml += '                <div class="mb-3">';
                //offersHtml += '                  <span>Стоимость от: </span>';
                //offersHtml += '                  <h6>18 530 000 тг</h6>';
                //offersHtml += '                  <b>от 306 280 за м2</b>';
                //offersHtml += '                </div>';
                offersHtml += '              </div>';
                offersHtml +=
                    '              <div class="orderBottons mt-auto align-items-end">';
                offersHtml +=
                    '                <a href="#" class="btn btn-gradient-filter mb-3" data-bs-toggle="modal" data-bs-target="#callbackModal">' + translater.leave_a_request + '</a>';
                offersHtml += '              </div>';
                offersHtml += '            </div>';
                offersHtml += '            <div class="col-md-7 p-3 floor-plan d-flex">';
                offersHtml += '              <a href="https://cms.abpx.kz' + el.plan.path + '" onclick="frontend.lightBox(this.href); return false">';
                offersHtml += '                <img data-src="https://cms.abpx.kz/' + el.plan.path + '" class="swiper-lazy">';
                offersHtml += '				   <div class="swiper-lazy-preloader swiper-lazy-preloader-pink"></div>';
                offersHtml += '              </a>';
                offersHtml += '            </div>';
                offersHtml += '          </div>';
                offersHtml += '        </div>';
                offersHtml += '      </div>';
            });
            offersHtml += '</div><div class="swiper-button-next flat-next"></div><div class="swiper-button-prev flat-prev"></div></div>';
            let offersCarousel = document.querySelector('.plansCarousel')
            offersCarousel.innerHTML = offersHtml
            startNewSwiper()
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

            if (parent == "#roomButtons") {
                let floorActive = document.querySelector('#floorButtons .active')
                let squareActive = document.querySelector('#squareButtons .active')
                if (floorActive != null) {
                    floorActive.classList.remove('active')
                }
                if (squareActive != null)
                    squareActive.classList.remove('active')
            }

            if (parent == "#floorButtons") {
                let squareActive = document.querySelector('#squareButtons .active')
                if (squareActive != null) {
                    squareActive.classList.remove('active')
                }
            }

        }

        return {
            filterOffers: filterOffers,
            activateButton: activateButton
        }

    })()

    function frontendReady() {
        authorMarker()
        buildingStepsCarousel()
        advantagesCarousel()
        galleryCarousel()
        closePreloader()
        phoneValidator()
    }

    function frontendResize() {
        buildingStepsCarousel()
    }

    function frontendScroll() {

        var house = document.querySelector('.about-img img')
        var header = document.querySelector('header')

        if (window.pageYOffset < 1200) {
            scroll1 = window.pageYOffset / 120
            scroll2 = window.pageYOffset / 18
            house.style.transform = "translateY("+ (20 - scroll1) +"%)"
        } else {
            if (!header.classList.contains('ymap')) {
                header.classList.add('ymap')
                ymaps.ready(yandexMap)
            }
        }

        if (window.pageYOffset > 150)	{
            header.classList.add('fixed')

        } else {
            header.classList.remove('fixed')
        }

        if (window.pageYOffset > 350)	{
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky')
            }
        } else {
            if (header.classList.contains('sticky')) {
                header.classList.remove('sticky')
            }
        }

        activeMenuItem(window.pageYOffset);

    }

    return {
        filterCreiate: newFilter.filterOffers,
        filterClick: newFilter.activateButton,
        lightBox: creiateLightbox,
        sidebar: sideBarToggle,
        form: formValidator,
        ready: frontendReady,
        resize: frontendResize,
        scroll: frontendScroll
    }

})()

document.addEventListener("DOMContentLoaded", ()=>{ frontend.ready() })
window.addEventListener("resize", ()=>{ frontend.resize() })
document.addEventListener("scroll", ()=>{ frontend.scroll() })

frontend.filterCreiate(offersAll)