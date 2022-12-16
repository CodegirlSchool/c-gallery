'use strict';

const postModal = document.querySelector('.add-post-modal');
const buttonAddPhoto = document.querySelector('#add-photo');
const buttonFirstPost = document.querySelector('#add-first-post');
const bodyOverlay = document.querySelector('.body-overlay');

//Добавила обработчик на 2 кнопки для открытия модального окна, также добавила классы для body и bodyOverlay для запрета прокрутки при открытии модалки
buttonFirstPost.addEventListener('click', () => {
    postModal.classList.add('active');
    document.body.classList.add('with-overlay');
    bodyOverlay.classList.add('active');
})

buttonAddPhoto.addEventListener('click', () => {
    postModal.classList.add('active');
    document.body.classList.add('with-overlay');
    bodyOverlay.classList.add('active');
})

//Добавление фото
const loadPhoto = () => {
const fileUpload = document.querySelector('#file-upload');
const stepOne = document.querySelector('.add-post-modal__step-1'); 
const stepTwo = document.querySelector('.add-post-modal__step-2'); 
const modalFooter = document.querySelector('.modal__footer');

  fileUpload.addEventListener('change', () => {
      image.src = URL.createObjectURL(fileUpload.files[0]);
      image.style.display = "block";

      if (fileUpload) {
          console.log(fileUpload);
          stepOne.classList.add('hidden');
          stepTwo.classList.remove('hidden');
          stepTwo.classList.add('active');
          modalFooter.classList.remove('hidden');
      } else {
          console.log('Ошибка');
      }
  });
};

loadPhoto();


//Добавила ввод текста в форме, ввод текста в textarea и сохранение в контейнер
const textarea = document.querySelector('textarea');
const textContainer = document.querySelector('.add-post-modal__step-2')
textContainer.classList.remove('hidden');//открыли шаг 2, написание текста в форму
textarea.addEventListener('keydown', function () {

  const messageText = textarea.value;
  const newMessage = document.createElement('div');
  newMessage.textContent = messageText;

  textContainer.append(newMessage);
  textarea.value = '';

});

//Добавила post запрос с обработкой ошибок и показом уведомлений(в целом думаю все должно быть верно)
postModal.onsubmit = async (e) => {
  e.preventDefault();

  let response = await fetch('https://c-gallery.polinashneider.space/api/v1/posts/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer: Belskaya20'
    },
    body: new FormData(postModal)({
      text: 'string',
      image: 'string',
      created_at: '2022-12-16T20:43:26.272Z',
      tags: []
    })
  })


    .then((result) => {
      if (result.ok) {
        setTimeout(() => {
          alert('Успешно добавлено!');
          postModal.reset();
        }, 2000);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      setTimeout(() => {
        alert('Ошибка, попробуйте еще раз!');
        postModal.reset();
      }, 2000);
    })
};


//Попробовала сделать закрытие модального окна при нажатии на внешнюю область
postModal.onmousedown = function (post) {
  let target = post.target;
  let modalContent = postModal.getElementsByClassName('modal__content')[0];
  if (post.target.closest('.' + modalContent.className) === null) {
    this.classList.remove('.active');
  }
}
console.log();