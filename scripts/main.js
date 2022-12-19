let file = null;
const publishButton = document.querySelector('#post-publish');
const postModal = document.querySelector('.add-post-modal');
const buttonAddPhoto = document.querySelector('#add-photo');
const buttonFirstPost = document.querySelector('#add-first-post');
const bodyOverlay = document.querySelector('.body-overlay');
const postText = document.querySelector('#post-text');
const hashtags = document.querySelector('#post-hashtags');
const fileUpload = document.querySelector('#file-upload');
const stepOne = document.querySelector('.add-post-modal__step-1');
const stepTwo = document.querySelector('.add-post-modal__step-2');
const modalFooter = document.querySelector('.modal__footer');
const successMessage = document.querySelector('#alert-success');
const errorMessage = document.querySelector('#alert-fail');


buttonAddPhoto.addEventListener('click', addPost);
buttonFirstPost.addEventListener('click', addPost);

function addPost() {
  postModal.classList.add('active');
  document.body.classList.add('with-overlay');
  bodyOverlay.classList.add('active');
}

//Добавление фото, не могу разобраться почему оно у меня заблокировано и дальше не пропускает
function uploadPhoto() {

fileUpload.addEventListener('change', () => {
  file = fileUpload.files[0];
  image.src = URL.createObjectURL(file);

  if (fileUpload) {
    stepOne.classList.add('hidden');
    stepTwo.classList.remove('hidden');
    stepTwo.classList.add('active');
    modalFooter.classList.remove('hidden');
    console.log(fileUpload);
  } else {
    console.log('Ошибка');
  }
});

};

function showSuccessMessage () {

  setTimeout(() => {
      successMessage.remove();
  }, 2000);
};

function showErrorMessage () {

  setTimeout(() => {
      errorMessage.remove();
  }, 2000);
}

//Добавила post запрос с обработкой ошибок и показом уведомлений
publishButton.addEventListener('click', () => {
  const formData = new FormData();
  formData.append('text', postText.value);
  formData.append('image', file);
  formData.append('tags', hashtags.value)

  fetch('https://c-gallery.polinashneider.space/api/v1/posts/', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2MzIxNTU0LCJpYXQiOjE2NzE0ODMxNTQsImp0aSI6ImZiNTlmMGE0YTgyMDRkMjNiMGQ3YWE0MTA5YmIzZDY2IiwidXNlcl9pZCI6MzB9.4mRe6i_DxZLZtpdJfNsn7oR7HeMQYkXf2ucU9mDIRNE'
    },
  })


    .then((result) => {
      if (result.ok) {
          alert('Успешно!');
          postModal.classList.remove('active');
      }
    })
    .catch((error) => {
        alert('Ошибка');
    })
    .finally(() => {
      fileUpload.value = '';
      hashtags.value = '';
      postText.value = '';
      image.src = '';
    })
})


//Закрытие модального окна при нажатии на внешнюю область, в чем здесь может быть ошибка?
postModal.onmousedown = function (post) {
  let target = post.target;
  let modalContent = postModal.getElementsByClassName('modal__content')[0];
  if (post.target.closest('.' + modalContent.className) === null) {
    this.classList.remove('.active');
  }
}
