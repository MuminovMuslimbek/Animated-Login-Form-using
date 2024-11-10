const wrapperMain = document.querySelector('#wrapper_main');
const wrapper = document.querySelector('#wrapper');
const title = document.querySelector('#title');
const loading = document.querySelector('.loading');
const commentsBtn = document.querySelector('#comments');
const postsBtn = document.querySelector('#posts');
const albumsBtn = document.querySelector('#albums');
const photosBtn = document.querySelector('#photos');
const todosBtn = document.querySelector('#todos');
const usersBtn = document.querySelector('#users');

function CreateCard(data) {
    return `
    <div class="block">
        ${data.id ? `<span><strong>Id:</strong> ${data.id}</span>` : ""}
        ${data.title ? `<h2><strong>Title:</strong> ${data.title}</h2>` : ""}
        ${data.name ? `<h3><strong>Name:</strong> ${data.name}</h3>` : ""}
        ${data.username ? `<h3><strong>Username:</strong> ${data.username}</h3>` : ""}
        ${data.email ? `<h4><strong>Email:</strong> ${data.email}</h4>` : ""}
        ${data.address ? `<h3><strong>Address:</strong> ${data.address.street}, ${data.address.suite}, ${data.address.city}</h3>` : ""}
        ${data.body ? `<p><strong>Body:</strong> ${data.body}</p>` : ""}
        ${data.userId ? `<span><strong>UserId:</strong> ${data.userId}</span>` : ""}
        ${data.completed !== undefined ? `<h5><strong>Completed:</strong> ${data.completed}</h5>` : ""}
        ${data.phone ? `<h5><strong>Phone:</strong> ${data.phone}</h5>` : ""}
        ${data.website ? `<h5><strong>Website:</strong> ${data.website}</h5>` : ""}
        ${data.company ? `<h5><strong>Company:</strong> ${data.company.name}</h5>` : ""}
    </div>`;
}

function fetchData(apiUrl, Title) {
    loading.style.display = 'block';  
    title.innerHTML = Title;
    fetch(apiUrl)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error('API ga noto‘g‘ri murojaat qilindi!!');
        })
        .then(data => {
            wrapper.innerHTML = ''; 
            data.forEach(element => {
                let card = CreateCard(element);
                wrapper.innerHTML += card;
            });
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            loading.style.display = 'none'; 
            console.log('API ga murojaat tugadi!!');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchData('https://jsonplaceholder.typicode.com/comments', 'Home Page');
});

commentsBtn.addEventListener('click', function() {
    fetchData('https://jsonplaceholder.typicode.com/comments', 'Comments');
});

postsBtn.addEventListener('click', function() {
    fetchData('https://jsonplaceholder.typicode.com/posts', 'Posts');
});

albumsBtn.addEventListener('click', function() {
    fetchData('https://jsonplaceholder.typicode.com/albums', 'Albums');
});

todosBtn.addEventListener('click', function() {
    fetchData('https://jsonplaceholder.typicode.com/todos', 'Todos');
});

usersBtn.addEventListener('click', function() {
    fetchData('https://jsonplaceholder.typicode.com/users', 'Users');
});

function CreateCardPhotos(data) {
    return `
    <div class="block">
        <span><strong>ID:</strong> ${data.id}</span>
        <h3><strong>Title:</strong> ${data.title}</h3>
        <img src="${data.url}" alt="Photo">
        <img src="${data.thumbnailUrl}" alt="Thumbnail">
        <span><strong>Album ID:</strong> ${data.albumId}</span>
    </div>`;
}

photosBtn.addEventListener('click', function() {
    fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'GET'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
        throw new Error('API ga noto‘g‘ri murojaat qilindi!!');
    })
    .then(data => {
        wrapper.innerHTML = '';
        title.innerHTML = 'Photos';
        data.forEach(element => {
            let card = CreateCardPhotos(element);
            wrapper.innerHTML += card;
        });
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        console.log('API ga murojaat tugadi!!');
    });
});