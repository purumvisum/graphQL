import data from './data.js'
import {filterArticles} from "./utils"
import uuid from "uuid/v4"

const resolvers = {
  Query: {
    hello: () => `Hello World!`,
    users: (parent, {limit}) => {
    if(limit) {
         return data.users.slice(0, limit)
      }
    return data.users
    },
    articles: (parent, { search = {} }) => {
      return filterArticles(data.articles, search)
    },
    article: (parent, { id }) => data.articles.find(article => article.id === id),
    user: (parent, { id }) => data.users.find(user => user.id === id)
  },
  User: {
    articles: (user, { search }) => {
      const articlesByUser = data.articles.filter(
          article => article.authorId === user.id
      );
      return filterArticles(articlesByUser, search);
    }
  },
  Article: {
    author: (article) => {
      return data.users.filter( user => {
        return user.id === article.authorId
      })
    }
  },
  Mutation: {
    createUser: (parent, { user }) => {
      if (data.users.find(u => u.email === user.email)) {
        throw new Error("User already exists!");
      }

      const newUser = {
        id: uuid(),
        ...user
      };

      data.users.push(newUser);
      return newUser;
    },
    updateUser: (parent, { id, userUpdate }) => {
      const foundUser = data.users.find(user => user.id === id);
      if (!foundUser) {
        throw new Error("User is not found!");
      }

      const updatedUser = {
        ...foundUser,
        ...userUpdate
      };

     
      data.users = data.users.map(user =>
          user.id === id ? updatedUser : user
      );

      return updatedUser;
    },
    publishArticle: (parent, {id}) => {
    const article = data.articles.find(article => article.id === id);
      if (article.isPublished) {
        throw new Error("Is already published!");
      }
      article.isPublished = true;
      
      return article;
      
    }
  }
};

export default resolvers;
