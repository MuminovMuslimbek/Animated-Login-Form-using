const wrapper = document.querySelector('#comments_wrapper')

function CreateCard(data) {
    return `
       <div class="block">
            <span>${data.id}</span>
            <h3>${data.name}</h3>
            <h4>${data.email}</h4>
            <p>${data.body}</p>
        </div>
    `
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'GET'
        })
        .then(response => {
            if (response.status == 200) {
                return response.json()
            }
            if (response.status = 404) {
                throw new Error('API ga notog`ri murojaat qilindi!!')
            }
        })
        .then(data => {
            wrapper.innerHTML = ''
            data.forEach(element => {
                let card = CreateCard(element)
                wrapper.innerHTML += card;
            });
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            console.log('API ga murojaat tugadi!!');

        })
});