// Login:
const login_wrapper = document.querySelector('.login_wrapper')
const form = document.querySelector('#form')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const btn = document.querySelector('.btn')
const body = document.querySelector('.body')
const quite = document.querySelector('#quite')
const load = document.querySelector('.load')

function validate() {
    if (usernameInput.value.trim().length === 0) {
        alert("Iltimos, username ni qayta to'ldiring!");
        usernameInput.focus();
        usernameInput.style.borderColor = 'red';
        return false;
    } else if (usernameInput.value.length < 3) {
        alert("Username 3ta harfdan kam bo'lmaydi!");
        usernameInput.focus();
        usernameInput.style.borderColor = 'red';
        return false;
    } else if (passwordInput.value.trim().length === 0) {
        alert("Iltimos, password ni qayta to'ldiring!");
        passwordInput.focus();
        passwordInput.style.borderColor = 'red';
        return false;
    }
    return true;
}

function getUserFromLocalStorage() {
    let value = [];
    if (localStorage.getItem('user')) {
        value = JSON.parse(localStorage.getItem('user'));
    }
    return value;
}

btn && btn.addEventListener('click', function(event) {
    event.preventDefault();
    let isValidate = validate();
    if (!isValidate) {
        return;
    }
    const username = "admin";
    const spassword = "admin";
    if (passwordInput.value === spassword && usernameInput.value === username) {
        login_wrapper.style.display = "none";
        load.style.display = 'block';
        setTimeout(() => {
            load.style.display = 'none';
            body.style.display = 'block';
        }, 3000)
    } else {
        alert("Username yoki passwordingizda xatolik bor!");
        passwordInput.focus();
        passwordInput.style.borderColor = 'red';
        return;
    }

    const user = {
        username: usernameInput.value,
        password: passwordInput.value
    };
    let userLocalStorage = getUserFromLocalStorage();
    userLocalStorage.push(user);
    localStorage.setItem('user', JSON.stringify(userLocalStorage));
    form.reset();
});

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('user')) {
        body.style.display = 'block';
        login_wrapper.style.display = 'none';
    } else {
        login_wrapper.style.display = 'flex';
        body.style.display = 'none';
    }
});

quite && quite.addEventListener('click', function(event) {
    event.preventDefault();
    let isQuite = confirm("Rostdan ham chiqib ketmoqchimisiz?");
    if (isQuite) {
        body.style.display = 'none';
        load.style.display = 'block';
        setTimeout(() => {
            load.style.display = 'none';
            login_wrapper.style.display = 'flex';
            localStorage.clear();
        }, 3000)
    }
});
// Search
const searchInput = document.getElementById("search");
const notFound = document.getElementById("notFound");
const searchTitle = document.getElementById("searchTitile");

searchInput.addEventListener("input", function() {
    let searchQuery = searchInput.value.toLowerCase();
    let found = false;

    const cards = wrapper.querySelectorAll(".block");

    cards.forEach(card => {
        const cardId = card.querySelector("span strong") ? card.querySelector("span").textContent.toLowerCase() : '';
        if (cardId.includes(searchQuery) && searchQuery !== "") {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    if (searchQuery === "") {
        cards.forEach(card => {
            card.style.display = "block";
        });
        searchTitle.style.display = "none";
        title.style.display = "block";
        notFound.style.display = "none";
    } else if (found) {
        searchTitle.style.display = "flex";
        title.style.display = "none";
        notFound.style.display = "none";
    } else {
        searchTitle.style.display = "none";
        title.style.display = "none";
        notFound.style.display = "flex";
    }
});

// GET API:
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
            data.slice(0, 50).forEach(element => {
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
            data.slice(0,50).forEach(element => {
                let card = CreateCardPhotos(element);
                wrapper.insertAdjacentHTML('beforeend', card);
            });
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            console.log('API ga murojaat tugadi!!');
        });
});