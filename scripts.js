const myLibrary = [];
const container = document.querySelector('.container');

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead ? "Read" : "TBR";
    this.info = function () {
        return this.title + " by " + this.author + ", " + this.pages + " pages" + ", " + this.isRead;
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    Book.call(this, title, author, pages, isRead);
    this.id = crypto.randomUUID();
    myLibrary.push({ id: this.id, info: this.info() });
    displayBook();
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

function displayBook() {
    let newBook = [];
    let id = "";
    myLibrary.forEach(book => {
        newBook = book.info.split(", ");
        id = book.id;
    })

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const titleAuthor = newBook[0].split("by");

    const title = document.createElement("p");
    title.textContent = titleAuthor[0];

    const author = document.createElement("p");
    author.textContent = titleAuthor[1];

    const pages = document.createElement("p");
    pages.textContent = newBook[1];

    const read = document.createElement("p");
    read.textContent = newBook[2];

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");

    const button = document.createElement("button");
    button.id = id;
    button.classList.add("remove");
    button.textContent = "Remove";

    button.addEventListener("click", (event) => {
        console.log(event.target.id)
        console.log(myLibrary.findIndex(book => book.id === event.target.id));
        let removeId = myLibrary.findIndex(book => book.id === event.target.id);
        myLibrary.splice(removeId);
        cardDiv.remove();
        console.log(myLibrary);
    })

    const toggle = document.createElement("button");
    toggle.classList.add("toggle");
    if (read == true) {
        toggle.textContent = "Read";
    } else {
        toggle.textContent = "TBR";
    }
    toggle.addEventListener("click", event => {
        if (toggle.textContent == "Read") {
            toggle.textContent = "TBR";
            toggle.style.backgroundColor = "#4E4C67";
            toggle.style.color = "#ffffff";
        } else {
            toggle.textContent = "Read";
            toggle.style.backgroundColor = "#ffffff";
            toggle.style.color = "#4E4C67";
        }
    })
    buttonDiv.append(button, toggle);
    cardDiv.append(title, author, pages, buttonDiv);
    container.appendChild(cardDiv);
}

const show = document.querySelector("#addNewBook");
const dialogBox = document.querySelector("#formDialog");
const confirm = document.querySelector("#confirmAdd");
const removeButton = document.querySelector(".removeButton");

show.addEventListener("click", () => {
    dialogBox.showModal();
});

dialogBox.addEventListener("close", (event) => {
    dialogBox.close();
})
confirm.addEventListener("click", (event) => {
    event.preventDefault();
    const formAuthor = document.querySelector("#author");
    const formTitle = document.querySelector("#title");
    const formPages = document.querySelector("#pages")
    const formRead = document.querySelector('input[type="radio"]:checked').value;
    const isRead = formRead ? formRead === "true" : false;
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, isRead);
    dialogBox.close();
})