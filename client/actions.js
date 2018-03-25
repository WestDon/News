
  var addArticle = function (article) {
    return {
      type: "ADD_ARTICLE",
      article
    }
  };
   
  module.exports = {addArticle};