class NewsUI {
    constructor() {
        this._container = document.querySelector(".news-container .row");
        this._defaultImage = "img/default-image.png";
    }

    /**
     * addNews - метод для вывода данных на веб-страницу 
     * @param {object} news - новости
     * @returns {void}
     */
    addNews(news) {
        const template = this._newsTemplate(news);
        this._container.insertAdjacentHTML("afterbegin", template);
    }

    /**
     * showEmptyMsg - метод для вывода на веб-страницу предупреждения, в случае отсутствия данных для отображения 
     * @returns {void}
     */
    showEmptyMsg() {
        this._container.insertAdjacentHTML("afterbegin", this._emptyTemplate());
    }

    /**
     * clearContainer - метод очищает список новостей на веб-странице
     * @returns {void}
     */
    clearContainer() {
        this._container.innerHTML = "";
    }

    /**
     * _newsTemplate - метод для формирования шаблона вывода данных на веб-страницу 
     * @param {object} urlToImage - адрес картинки новости 
     * @param {string} url - адрес исходной новости
     * @param {string} title -заголовок новости
     * @param {string} description - краткое описание новости
     * @returns {string} - шаблон
     */
    _newsTemplate({urlToImage, url, title, description}) {
        return `
        <div class="col s12 l6"> 
            <div class="card">
                <div class="card-image">
                    <img src="${urlToImage || this._defaultImage}">
                </div>
                <div class="card-content">
                    <span class="card-title">${title}</span>
                    <p>${description || ""}</p>
                </div>
                <div class="card-action">
                    <a href="${url}" target="_blank">Read more</a>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * _emptyTemplate - метод для формирования шаблона предупреждения, в случае отсутствия данных для отображения
     * @returns {string} - шаблон разметки в случае отсутствия данных
     */
    _emptyTemplate() {
        return `
        <div class="col s12"> 
            <div class="card">
                <div class="card-content">
                    <span class="card-title">No data available</span>
                </div>
            </div>
        </div>
        `
    }
}

