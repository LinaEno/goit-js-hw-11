export const markupImages = (array) => {
    return array.map(item => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = item;
        return `
    <div class="photo-card">
        <a href='${largeImageURL}'>
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" width = '350' height = '250' />
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
                <b>Views: ${views}</b>
            </p>
            <p class="info-item">
                <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads: ${downloads}</b>
            </p>
        </div>
    </div>`
    }).join('');
    
}