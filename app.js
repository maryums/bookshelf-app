
const submitBtn = document.querySelector("button")
const form = document.querySelector("form");
const formDiv = document.querySelector(".form-div")
const addBookBtn = document.querySelector("#add-book")



document.querySelector(".form-div").style.display = "none";

addBookBtn.addEventListener("click", () => {
    if (formDiv.style.display === "none") {
        formDiv.style.display = "flex"
    } else {
        formDiv.style.display = "none"
    }

})

let myLibrary = [{
    title: "Hop on Pop",
    author: "Dr Suess",
    pages: 34,
    read: true,
},

{
    title: "Game of Thrones",
    author: "George R. R. Martin",
    pages: 694,
    read: true
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
    // do stuff here
    e.preventDefault();
    // console.log(e.target.elements.title.value)
    let new_book = new Book(e.target.elements.title.value, e.target.elements.author.value, e.target.elements.pages.value, e.target.elements.read.checked)
    e.target.elements.title.value = ''
    e.target.elements.author.value = ''
    e.target.elements.pages.value = ''
    e.target.elements.read.checked = false;
    myLibrary.push(new_book)
}


function displayBookShelf(e) {
    const myLibraryContainer = document.querySelector('.my-library')
    myLibraryContainer.innerHTML = ''
    let count = 0;
    myLibrary.forEach(element => {
        console.log(element)
        const newDiv = document.createElement('div')
        newDiv.className = 'card'
        newDiv.setAttribute("id", count++)

        newDiv.innerHTML = `
        <button class="remove">remove</button>
        <p> ${element.title} by ${element.author} </p>
       <p>  Book Length ${element.pages} pages </p>
       <p> Read Status: ${element.read} </p>

 
        `
        myLibraryContainer.append(newDiv)
    });
    const removeBtn = document.querySelectorAll(".remove")
    removeBtn.forEach(element => {
        element.addEventListener("click", (event) => {
            const arrIndex = event.path[1].id
            myLibrary.splice(arrIndex, 1)
            console.log(`removed ${arrIndex} at index `)
            displayBookShelf()
        })
    })
}

displayBookShelf();
const removeBtn = document.querySelectorAll(".remove")
form.addEventListener("submit", addBookToLibrary)
form.addEventListener("submit", displayBookShelf)



removeBtn.forEach(element => {
    element.addEventListener("click", (event) => {
        const arrIndex = event.path[1].id
        myLibrary.splice(arrIndex, 1)
        console.log(`removed ${arrIndex} at index `)
        displayBookShelf()
    })
})