export const filterArticles = (articles, search = {}) => {
    return articles.filter(article => {
        const rules = [];
        if (search.text) {
            rules.push(
                article.title.toLowerCase().includes(search.text.toLowerCase())
            );
        }
        if (search.published !== undefined) {
            rules.push(article.isPublished === search.published);
        }
        return rules.every(rule => rule === true);
    });
};
