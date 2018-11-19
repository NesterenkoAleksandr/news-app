class NewsService {
    constructor(http) {
        this._key = "f6ec9224239a44d9b1c3de45f129f27b";
        this._url = "https://newsapi.org/v2";
        this._country = "ua";
        this._category = "technology";
        this.search = "";
        this._http = http;
        this._getUrlTemplate = (url, key, country, category, search) =>{
            if (!search) {
                return `${url}/top-headlines?country=${country}&category=${category}&apiKey=${key}`;
            } 
            return `${url}/everything?q=${search}&apiKey=${key}`;
        }
    }

    /**
     * fetchTopHeadlines - функция получает с сервера краткую сводку новостей и обрабатывает ее через callback 
     * @param {object} callback - функция для обработки полученных данных
     * @param {string} country - фильтр по стране
     * @param {string} category - фильтр по категории новостей
     * @param {string} search - условие для поиска
     * @returns {void}
     */
    fetchTopHeadlines(callback, country = this._country, category = this._category, search = _this.search) {
        this._http.get(this._getUrlTemplate(this._url, this._key, country, category, search), callback);
    }
}