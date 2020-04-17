# Write your query or mutation here
query($userId: String!){
    user(id: $userId){
        id,
            articles{
            title
        }
    }
}



{
    "userId": "45c7a143-0cfe-4066-80e9-0036eb88cc61"
}

///////

query($articleId: String!){
    article(id: $articleId){
        id,
            author{
            name,
                email
        }
    }
}

{
    "articleId": "05a13e9d-d9d7-428b-a525-38e7aff7eea7"
}


//// 

query ArticlesWithSearchObject {
    articles(search: {text: "ab", published: true}) {
        title
    }
}


//////

query ArticlesByUserWithSearch($userId: ID!){
    user(id: $userId) {
        id
        name

        articles (search:{published: true, text: "al"}) {
            id,
                title,
                isPublished
        }
    }
}

{
    "userId": "2de64aea-165f-460e-8089-98439cbef541"
}


////

mutation PublishArticle($id: ID!){
    publishArticle(id: $id)
    {
        id,
            title,
            isPublished
    }
}

{
    "id": "24cee9d1-6b61-4de1-8529-a391265ea320"
}


///// 

# Write your query or mutation here
mutation {
    updateUser(id: "c91ec707-215c-473d-8187-a0bb06f12b8f", userUpdate:{age: 37}){
        id
        name
        age
    }
}