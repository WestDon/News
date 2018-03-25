//var Map = require("immutable").Map;

function getInitialState() {
    return {
        articles: !!JSON.parse(localStorage.getItem("articles")) ? JSON.parse(localStorage.getItem("articles")) : [],
    };
}

var reducer = function (state = getInitialState(), action) {
    switch (action.type) {
        case "ADD_ARTICLE":

            const article = action.article;
            let articles = state.articles;
            
            articles.push(article);

            localStorage.setItem("articles", JSON.stringify(articles));

            return {
                ...state,
                articles
            };
    }
    return state;
}
module.exports = reducer;