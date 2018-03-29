//var Map = require("immutable").Map;

function getInitialState() {
    return {
        articles: JSON.parse(localStorage.getItem("articles")) || [],
    };
}

var reducer = function (state = getInitialState(), action) {
    switch (action.type) {
        case "ADD_ARTICLE":
            {
                let article = action.article;
                let articles = state.articles;

                articles.push(article);

                localStorage.setItem("articles", JSON.stringify(articles));

                return {
                    ...state,
                    articles
                };
            }

        case "REMOVE_ARTICLE":
            {
                let article = action.article;
                let articles = state.articles;

                var index = articles.indexOf(article);
                articles.splice(index, 1);
                let newObj = articles.slice(0);

                localStorage.setItem("articles", JSON.stringify(newObj));

                return {
                    ...state,
                    articles:newObj,
                };
            }
    }
    return state;
}
module.exports = reducer;