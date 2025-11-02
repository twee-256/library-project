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
    myLibrary.push("ID: " + this.id + ", " + this.info());
    displayBook();
}

// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);

function displayBook() {
    let newBook = [];
    myLibrary.forEach(book => {
        newBook = book.split(", ").slice(1);
    })
    console.log(newBook);
    console.log(newBook[0].split("by"));
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card")
    const titleAuthor = newBook[0].split("by");
    const title = document.createElement("p");
    title.textContent = titleAuthor[0];
    const author = document.createElement("p");
    author.textContent = titleAuthor[1];
    const pages = document.createElement("p");
    pages.textContent = newBook[1];
    const read = document.createElement("p");
    read.textContent = newBook[2];

    cardDiv.append(title, author, pages, read);
    container.appendChild(cardDiv);
}

// displayBook();

const show = document.querySelector("#addNewBook");
const dialogBox = document.querySelector("#formDialog");
const confirm = document.querySelector("#confirmAdd");

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