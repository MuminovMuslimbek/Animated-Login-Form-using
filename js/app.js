    const wrapperMain = document.querySelector('#wrapper_main')
        // const h1Element = wrapperMain ? wrapperMain.querySelector('h1') : null;
    const wrapper = document.querySelector('#wrapper')
    const commentsBtn = document.querySelector('#comments')
    const postsBtn = document.querySelector('#posts')
    const albumsBtn = document.querySelector('#albums')
    const photosBtn = document.querySelector('#photos')
    const todosBtn = document.querySelector('#todos')
    const usersBtn = document.querySelector('#users')

    // if (h1Element) {
    //     h1Element.innerHTML = 'Home Page';
    // } else {
    //     console.error("h1 element topilmadi yoki wrapper_main id'si noto'g'ri.");
    // }

    function CreateCard(data) {
        return `
        <div class="block">
                ${data.url ? `<img src="${data.url}">` : ""}
                ${data.id ? `<span><strong>Id:</strong> ${data.id}</span>` : ""}
                ${data.title ? `<h2><strong>Title:</strong> ${data.title}</h2>` : ""}
                ${data.name ? `<h3><strong>Name:</strong> ${data.name}</h3>` : ""}
                ${data.username ? `<h3><strong>Username:</strong> ${data.username}</h3>` : ""}
                ${data.email ? `<h4><strong>Email:</strong> ${data.email}</h4>` : ""}
                ${data.address ? `<h3><strong>Address:</strong> ${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}, ${data.address.geo.lat}, ${data.address.geo.lng}</h3>` : ""}
                ${data.body ? `<p><strong>Body:</strong> ${data.body}</p>` : ""}
                ${data.userId ? `<span><strong>UserId:</strong> ${data.userId}</span>` : ""}
                ${data.completed !== undefined ? `<h5><strong>Completed:</strong> ${data.completed}</h5>` : ""}
                ${data.phone ? `<h5><strong>Phone:</strong> ${data.phone}</h5>` : ""}
                ${data.website ? `<h5><strong>Website:</strong> ${data.website}</h5>` : ""}
                ${data.company ? `<h5><strong>Company:</strong> ${data.company.name}, ${data.company.catchPhrase}, ${data.company.bs}</h5>` : ""}
            </div>
        `;
    }

    function fetchData(apiUrl) {
        wrapper.innerHTML = '';
        fetch(apiUrl, { method: 'GET' })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                if (response.status === 404) {
                    throw new Error('API ga notog`ri murojaat qilindi!!');
                }
            })
            .then(data => {
                data.forEach(element => {
                    let card = CreateCard(element);
                    wrapper.innerHTML += card;
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                console.log('API ga murojaat tugadi!!');
            });
    }

    document.addEventListener('DOMContentLoaded', function() {
        fetchData('https://jsonplaceholder.typicode.com/comments');
        // h1Element.textContent = 'Home Page';
    });

    commentsBtn && commentsBtn.addEventListener('click', function() {
        fetchData('https://jsonplaceholder.typicode.com/comments')
        // h1Element.textContent = 'Home Page';
    });

    postsBtn && postsBtn.addEventListener('click', function() {
        fetchData('https://jsonplaceholder.typicode.com/posts')
        // h1Element.textContent = 'Posts';
    });

    albumsBtn && albumsBtn.addEventListener('click', function() {
        fetchData('https://jsonplaceholder.typicode.com/albums')
        // h1Element.textContent = 'Albums';
    });

    photosBtn && photosBtn.addEventListener('click', function() {
        fetchData('https://jsonplaceholder.typicode.com/photos')
        // h1Element.textContent = 'Photos';
    });

    todosBtn && todosBtn.addEventListener('click', function() {
        fetchData('https://jsonplaceholder.typicode.com/todos')
        // h1Element.textContent = 'Todos';
    });

    usersBtn && usersBtn.addEventListener('click', function() {
        fetchData('https://jsonplaceholder.typicode.com/users')
        // h1Element.textContent = 'Users';
    });