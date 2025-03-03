const url = 'http://jsonplaceholder.typicode.com/posts'

async function getPosts() {
    const response = await fetch(url, {
        method: 'GET'
    })

    const posts = await response.json()

    console.log(posts);
}

async function storePost() {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title: 'Belajar Fetch',
            body: 'Fetch Simpel',
            userId: 1
        })
    })

    const posts = await response.json()

    console.log(posts);
}

storePost()