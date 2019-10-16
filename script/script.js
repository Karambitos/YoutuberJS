'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // keyboard
    {
        const keyboardButton = document.querySelector('.search-form__keyboard');
        const keyboard = document.querySelector('.keyboard');
        const closeKeyboard = document.getElementById('close-keyboard')
        const searchInput = document.querySelector('.search-form__input')
        // const backspace = document.querySelector('.keyboard-backspace');

        // keyboardButton.addEventListener('click', () => { 
            // СПОСОБ 1 (достаем клавиатуру)
            
            // if (keyboard.style.top) {
            //     keyboard.style.top = '';
            // } else {
            //     keyboard.style.top = '50%';
            // }
        // })

            // СПОСОБ 2 (достаем клавиатуру)
            const toggleKeyboard = () => {
                keyboard.style.top ? keyboard.style.top = '': keyboard.style.top = '50%'
            };
 
        // событие = печать на клавиатуре
        // Переключение языка 
        const changeLang =  (buttons, leng) => {

        const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
        'en', ' '
       ];
        const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
        'ru', ' '
       ];
       if (leng === 'en') {
           buttons.forEach((element, i) => { 
            element.textContent = langEn[i];
           }); 
       } else {
        buttons.forEach((element, i) => {
            element.textContent = langRu[i];
           });
       }

        }
        const typing = (event) => {
            const target = event.target;
            // console.log(event)
            if (target.tagName === 'BUTTON'){ // тэг пишем ЗАГЛАВНЫМИ буквами
                const contentButton = target.textContent.trim();
                const buttons = [...keyboard.querySelectorAll('button')]/* 2е стоки выше ? почему не заглавными,
                сразу переводим в массив, что бы исключить не нужные кнопки/
                ... rest = для соединения отдельных значений в массив (почему нельзя без rest).
                */.filter((elem) => elem.style.visibility !== 'hidden')
               console.log(buttons)
                if (contentButton === '⬅') { // сробатывание backspace
                    searchInput.value = searchInput.value.slice(0, length - 1); /*slice = удаляем 
                    последний символ ((0, length - 1) = от нулевого индекса до последнего в массиве)*/ 
                } else if (!contentButton) { // сробатывание прбела
                    searchInput.value += ' '; // добавляем пробел 
                } else if (contentButton === 'en' || contentButton === 'ru') {
                    changeLang(buttons, contentButton)
                } else {
                searchInput.value += contentButton;   /* trim = удаляет пробелы */ 
                } 
            }
            }

        


        keyboardButton.addEventListener('click', toggleKeyboard);
        closeKeyboard.addEventListener('click', toggleKeyboard);
        keyboard.addEventListener('click', typing);
    }

    // menu
    {
        const burger = document.querySelector('.spinner');
        const sidebarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            sidebarMenu.classList.toggle('rollUp');
        });
    // СПОСОБ 1 (меняем класс у li при нажатии)
    // учитываем что хотим чтоб клик срабатывал на a[href]
        sidebarMenu.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('a[href="#"]');
            if (target) {
                const parentTarget = target.parentElement;
                sidebarMenu.querySelectorAll('li').forEach(element => {
                if(element === parentTarget){
                    element.classList.add('active'); 
                } else {
                    element.classList.remove('active');
                }
                });     
            }
        })
    // СПОСОБ 2 (меняем класс у li при нажатии)  
    // учитываем что li может быть много в HTML, а мы не хотм им добавлять КЛАСС
    //  Почему нельзя найти все ли и пербрать их  ??????????????????????
    
        // sidebarMenu.addEventListener('click', (event) => {
        //     const sidebarButtons = sidebarMenu.querySelectorAll('li');
        //     console.log(sidebarButtons)
        //     let target = event.target;
        //     console.log(event.target)
        //     sidebarButtons.forEach((elem, i) => {
        //         target = sidebarButtons;
        //         console.log(target);
        //     })            
        // })
    }  

    // модальное окно
    {
        //    вставляем целый блок

            document.body.insertAdjacentHTML('beforeend',  `
            <div class="youTuberModal">
                <div id="youtuberClose">х</div>
                <div id="youtuberContainer"></div>
            </div>
            `);

        //    вставляем блоки по очередно 

        // const divYoutuber = document.createElement('div');
        // const youtuberClose = document.createElement('div');
        // const youtuberContainer = document.createElement('div');

        // divYoutuber.classList.add('youTuberModal');
        // youtuberContainer.id = 'youtuberContainer';
        // youtuberClose.id = 'youtuberClose'; 


        // document.body.appendChild(divYoutuber);
        // const mainDiv = document.querySelector('.youTuberModal') // обращаемся к созданному div
        // mainDiv.append(youtuberClose);// добавляем div в div
        // mainDiv.append(youtuberContainer);// добавляем div в div
        


            const youtuberItems = document.querySelectorAll('[data-youtuber]');
            const youTuberModal = document.querySelector('.youTuberModal');
            const youtuberContainer = document.getElementById('youtuberContainer');

            const qw = [3840, 2960, 1920, 1280, 854, 640, 426, 256];
            const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

                const sizeVideo = () => {

                    let ww = document.documentElement.clientWidth;
                    let wh = document.documentElement.clientHeight;

                    for (let i = 0; i < qw.length; i++) {
                        if (ww > qw[i]) {
                        youtuberContainer.querySelector('iframe').style.cssText = `
                            width:${qw[i]}px;
                            height:${qh[i]}px;
                            `;
                        youtuberContainer.style.cssText = `
                            width:${qw[i]}px;
                            height:${qh[i]}px;
                            top:${(wh - qh[i])/ 2}px;
                            left:${(ww - qw[i])/ 2}px;
                            `;
                            break;
                        };
                    };
                };

            youtuberItems.forEach((elem) => {
                elem.addEventListener('click', () =>{
                    const idVideo = elem.dataset.youtuber; // в константу кладем data элемент ('[data-youtuber]')
                    youTuberModal.style.display = 'block'; 
                    
                    const youtuberFrame = document.createElement('iframe');
                    youtuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                    youtuberContainer.append(youtuberFrame);
                    
                    window.addEventListener('resize', sizeVideo);
                    sizeVideo();               
                });
            });

            
            
            youTuberModal.addEventListener('click', () => {
                youTuberModal.style.display = ''; 
                youtuberContainer.textContent = '';
                window.removeEventListener('resize', sizeVideo);
            });  
    }

    // API
    {
        const API_KEY = 'AIzaSyAKvWM8VFfF0egp-spO6K2_C5z82x6RMVY';
        const CLIENT_ID = '312199302930-9j3l54cn4tsdirg26o1sfknnog8efqrk.apps.googleusercontent.com';
        
            // авторизация
        {   
            const buttonAuth = document.getElementById('authorize');
            const authBlock = document.querySelector('.auth');
            
            function authenticate() {
                return gapi.auth2.getAuthInstance()
                    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
                    .then(function() { console.log("Sign-in successful"); },
                          function(err) { console.error("Error signing in", err); });
              }
              function loadClient() {
                gapi.client.setApiKey(API_KEY);
                return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                    .then(function() { console.log("GAPI client loaded for API"); },
                          function(err) { console.error("Error loading GAPI client for API", err); });
              }
              function execute() {
                return gapi.client.youtube.channels.list({})
                    .then(function(response) {
                            console.log("Response", response);
                          },
                          function(err) { console.error("Execute error", err); });
              }
              gapi.load("client:auth2", function() {
                gapi.auth2.init({client_id: CLIENT_ID});
              });

              buttonAuth.addEventListener('click', () => {
                authenticate().then(loadClient);
                console.log('click');
              })

        }
            // запросы
        {

        }
    }
        
        
});

