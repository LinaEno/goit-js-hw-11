export const markupImages = (array) => {
    return array.map(item => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, download } = item;
        return `
    <div class="photo-card">
        <a href='${largeImageURL}'>
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item">
                <b>${likes}</b>
            </p>
            <p class="info-item">
                <b>${views}</b>
            </p>
            <p class="info-item">
                <b>${comments}</b>
            </p>
            <p class="info-item">
                <b>${download}</b>
            </p>
        </div>
    </div>`
    }).join('');
    
}