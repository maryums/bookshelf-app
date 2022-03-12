
const submitBtn = document.querySelector("button")
const form = document.querySelector("form");
const formDiv = document.querySelector(".form-div")
const addBookBtn = document.querySelector("#add-book")
form.addEventListener("submit", addBookToLibrary)
form.addEventListener("submit", displayBookShelf)

document.querySelector(".form-div").style.display = "none";

addBookBtn.addEventListener("click", () => {
    if (formDiv.style.display === "none") {
        formDiv.style.display = "flex"
        addBookBtn.innerText = "Close"
    } else {
        formDiv.style.display = "none"
        addBookBtn.innerText = "Add Book"
    }

})

let myLibrary = [{
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    pages: 472,
    read: true,
},

{
    title: "Game of Thrones",
    author: "George R. R. Martin",
    pages: 694,
    read: true,
},
];


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read;


    return console.log(`${title} is by ${author} and its ${pages} pages long and  it's read: ${read}`)
}


function addBookToLibrary(e) {
    e.preventDefault();

    if (e.target.elements.title.value === '') {
        e.target.elements.title.value = `Please enter at least name of book!`
    } else {
        let new_book = new Book(e.target.elements.title.value, e.target.elements.author.value, e.target.elements.pages.value, e.target.elements.read.checked)
        e.target.elements.title.value = ''
        e.target.elements.author.value = ''
        e.target.elements.pages.value = ''
        e.target.elements.read.checked = false;
        myLibrary.push(new_book)
    }

}


function displayBookShelf(e) {
    const myLibraryContainer = document.querySelector('.my-library')
    myLibraryContainer.innerHTML = ''
    let count = 0;

    myLibrary.forEach(element => {
        const newDiv = document.createElement('div')
        newDiv.className = 'card'
        newDiv.setAttribute("id", count++)

        if (element.read === true) {
            element.read = 'Book Status: Read'
        } else if (element.read === false) {
            element.read = 'Book Status: Unread'
        }

        newDiv.innerHTML = `
        <button class="remove">remove</button>
        <p> ${element.title} by ${element.author} </p>
       <p>  Book Length: ${element.pages} pages </p>
       <button class="readToggle">  ${element.read}   </button>
        `
        myLibraryContainer.append(newDiv)
    });

    const removeBtn = document.querySelectorAll(".remove")

    for (let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener("click", (e) => {

            const arrIndex = e.target.parentNode.id
            myLibrary.splice(arrIndex, 1)
            console.log(`removed ${arrIndex} at index `)
            displayBookShelf()
        })
    }

    const toggleButton = document.querySelectorAll('.readToggle');

    toggleButton.forEach(element => {
        element.addEventListener("click", () => {
            if (element.innerHTML === "Book Status: Read") {
                element.innerHTML = "Book Status: Unread";
            } else {
                element.innerHTML = "Book Status: Read";
            }
        })

    });
}

displayBookShelf();