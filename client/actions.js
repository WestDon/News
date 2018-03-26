
  var addArticle = function (article) {
    return {
      type: "ADD_ARTICLE",
      article
    }
  };

  var removeArticle = function (article) {
    return {
      type: "REMOVE_ARTICLE",
      article
    }
  };
   
  module.exports = {addArticle, removeArticle};