"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileChooserAvatar = document.querySelector(`.ad-form__field input[type=file]`);
const previewAvatar = document.querySelector(`.ad-form-header__preview img`);

const fileChooserHousing = document.querySelector(`.ad-form__upload input[type=file]`);
const previewHousing = document.querySelector(`.ad-form__photo img`);

const getPicture = (fileChooser, preview) => {
  fileChooser.addEventListener(`change`, () => {
    const file = fileChooser.files[0];
    const fileName = file.type.toLowerCase();

    const matches = FILE_TYPES.some((elem) => {
      return fileName.endsWith(elem);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.classList.remove(`hidden`);
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

getPicture(fileChooserAvatar, previewAvatar);
getPicture(fileChooserHousing, previewHousing);

window.images = {
  previewAvatar,
  previewHousing
};
