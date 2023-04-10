export { renderGallery };

const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  const markup = images
    .map(image => {
      const {
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
      <a class="gallery-item" href="${largeImageURL}">
      <div class="photo-card" id="${id}">
          <img class = "card-image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
          <div class="info">
              <p class="info-item">
                  <b>Likes:</b> 
                  ${likes}
              </p>
              <p class="info-item">
                  <b>Views:</b> 
                  ${views}
              </p>
              <p class="info-item">
                  <b>Comments:</b>
                  ${comments}
              </p>
              <p class="info-item">
                  <b>Downloads:</b>
                  ${downloads}
              </p>
          </div>
      </div>
  </a>
      `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
