// Create instance
const newsService = new NewsService(new CustomHttp());
const newsUI = new NewsUI();

// UI elements
const formFilter = document.forms["form-filter"];
const countrySelect = formFilter.elements["sel-country"];
const categorySelect = formFilter.elements["sel-category"];
const btnSearch = formFilter.elements["btn-search"];
const inputSearch = formFilter.elements["search"];

/**
 * getSearchHandler - функция активирует/деактивирует элементы управления в зависимости от наличия условия для поиска
 * @returns {void}
 */
const getSearchHandler = () => {
    btnSearch.disabled = !inputSearch.value;

    // Установить атрибут "disabled" для элемента "фильтр по стране"
    countrySelect.disabled = !btnSearch.disabled;
    M.FormSelect.init(countrySelect);

    // Установить атрибут "disabled" для элемента "фильтр по категории"
    categorySelect.disabled = !btnSearch.disabled;
    M.FormSelect.init(categorySelect); 

    // Oбновить список новостей, в случае сброса условия для поиска
    if (!inputSearch.value) getNewsHandler();    
}

/**
 * getNewsHandler - функция для формирования списка новостей и вывода его на веб-страницу
 * @returns {void}
 */
const getNewsHandler = () => {
    const country = countrySelect.value;
    const category = categorySelect.value;
    const search = inputSearch.value.replace(/ /g, '+');

    // Получить и вывести на веб-страницу краткую сводку новостей
    newsService.fetchTopHeadlines((res) => {
        const { articles, totalResults } = res;

        // Очистить список новостей на веб-странице
        newsUI.clearContainer();

        // Вывести на веб-страницу список новостей или предупреждение об их отсутствии
        if (!totalResults) {
            newsUI.showEmptyMsg();
        } else {
            articles.forEach(news => newsUI.addNews(news));
        }        
    }, country, category, search);
};

// Подписка на события
countrySelect.addEventListener("change", getNewsHandler);
categorySelect.addEventListener("change", getNewsHandler);

formFilter.addEventListener("submit", e => {
    e.preventDefault();
    // Обновить данные только если указанно условие для поиска 
    if (inputSearch.value) getNewsHandler();
});

inputSearch.addEventListener("keyup", getSearchHandler);
btnSearch.addEventListener("click", getNewsHandler);
window.addEventListener("load", getNewsHandler);
