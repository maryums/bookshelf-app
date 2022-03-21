
const submitBtn = document.querySelector("button")
const form = document.querySelector("form");
const formDiv = document.querySelector(".form-div")
const addBookBtn = document.querySelector("#add-book")
const readInput = document.querySelector('#read')
form.addEventListener("submit", addBookToLibrary)
form.addEventListener("submit", displayBookShelf)
const allStars = document.querySelectorAll(".fa-star")
let currentID = ''
document.querySelector(".form-div").style.display = "none"
document.querySelector('.stars').style.display = "none"

let myLibrary = localStorage.getItem('library')
    ? JSON.parse(localStorage.getItem('library'))
    : [{
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        pages: 472,
        stars: 5,
        read: true,
    },

    {
        title: "Game of Thrones",
        author: "George R. R. Martin",
        pages: 694,
        stars: 5,
        read: true,
    }]



localStorage.setItem('library', JSON.stringify(myLibrary))

const data = JSON.parse(localStorage.getItem('library'))



addBookBtn.addEventListener("click", () => {
    if (formDiv.style.display === "none") {
        formDiv.style.display = "flex"
        addBookBtn.innerText = "Close"
    } else {
        formDiv.style.display = "none"
        addBookBtn.innerText = "Add Book"
    }



})

readInput.addEventListener("change", (e) => {
    if (e.target.checked) {
        document.querySelector('.stars').style.display = "block"
    }
    else {
        document.querySelector('.stars').style.display = "none"
        currentID = ''
        e.target.checked = false

    }

})

function clearAll() {
    allStars.forEach(el => {
        el.classList.remove("fas")
        el.classList.add("far")
    })
}

function currentPrev(element) {
    let result = [element]
    while (element = element.previousElementSibling)
        result.push(element)
    return result
}


for (const star of allStars) {
    star.addEventListener("click", (e) => {
        currentID = e.target.id
        clearAll()
        const previous = currentPrev(star)
        previous.forEach(element => {
            if (element.classList.contains("far")) {
                element.classList.remove("far")
                element.classList.add("fas")
            }
        })
    })
}



class Book {
    constructor(title, author, pages, stars, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.stars = stars;
        this.read = read;
        return console.log(`${title} is by ${author} and its ${pages} pages long and  it's read: ${read} its also ${stars} out of 5`);
    }
}


function addBookToLibrary(e) {
    e.preventDefault()

    if (!e.target.elements.title.value || !isNaN(e.target.elements.author.value) || (e.target.elements.pages.value) < 0 || !e.target.elements.author.value || !e.target.elements.pages.value || isNaN(e.target.elements.pages.value)) {
        alert("Please check if book details are valid")
    } else {

        let new_book = new Book(
            e.target.elements.title.value,
            e.target.elements.author.value,
            e.target.elements.pages.value,
            parseInt(currentID),
            e.target.elements.read.checked
        )
        console.log(e.target.elements)
        e.target.elements.title.value = ''
        e.target.elements.author.value = ''
        e.target.elements.pages.value = ''
        currentID = ''
        e.target.elements.read.checked = false;
        clearAll()

        myLibrary.push(new_book)
        localStorage.setItem('library', JSON.stringify(myLibrary))


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

        if (!element.stars) {
            newDiv.innerHTML = `
            <button class="remove">remove</button>
            <p> ${element.title} by ${element.author} </p>
           <p>  Book Length: ${element.pages} pages </p>
           <button class="readToggle">  ${element.read}   </button>
            `
            myLibraryContainer.append(newDiv)
        } else {
            newDiv.innerHTML = `
            <button class="remove">remove</button>
            <p> ${element.title} by ${element.author} </p>
           <p>  Book Length: ${element.pages} pages </p>
           <p> Rating: ${element.stars} out of 5 stars </p>
           <button class="readToggle">  ${element.read}   </button>
            `
            myLibraryContainer.append(newDiv)
        }
    });

    const removeBtn = document.querySelectorAll(".remove")

    for (let i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener("click", (e) => {

            const arrIndex = e.target.parentNode.id
            myLibrary.splice(arrIndex, 1)
            console.log(`removed ${arrIndex} at index `)
            localStorage.setItem('library', JSON.stringify(myLibrary))
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