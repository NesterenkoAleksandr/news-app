// Create instance
const newsService = new NewsService(new CustomHttp());
const newsUI = new NewsUI();

// UI elements
const countrySelect = document.querySelector(".country");
const categorySelect = document.querySelector(".category");
const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("search");

/**
 * getNewsHandler - функция для формирования списка новостей и вывода его на веб-страницу
 * @returns {void}
 */
const getNewsHandler = () => {
    const country = countrySelect.value;
    const category = categorySelect.value;
    const search = inputSearch.value;

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
inputSearch.addEventListener("keyup", _ => {
    btnSearch.disabled = !inputSearch.value;

    // Установить атрибут "disabled" для комбиков "выбор страны" и "выбор категории"
    countrySelect.disabled = !btnSearch.disabled;
    categorySelect.disabled = !btnSearch.disabled;

    // Переинициализировать material design <<<!!! переделать на чистый JS !!!>>>
    $('select').formSelect();

    // Oбновить список новостей, в случае сброса условия для поиска
    if (!inputSearch.value) getNewsHandler();
});
btnSearch.addEventListener("click", getNewsHandler);
window.addEventListener("load", getNewsHandler);
