let myLibrary = []
const container = document.querySelector(".container");
const addBook = document.querySelector("#addBook");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = myLibrary.length;
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read));
}

function removeBookFromLibrary(index){
    for (let i = index + 1; i < myLibrary.length; i++){
        myLibrary[i].index -= 1;
    }
    myLibrary.splice(index, 1);
}

function displayBooks(){
    container.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++){
        const content = document.createElement("div");
        content.classList.add("content");

        const title = document.createElement("div");
        const author = document.createElement("div");
        const pages = document.createElement("div");
        const read = document.createElement("button");
        const remove = document.createElement("button");

        title.textContent = `Title: ${myLibrary[i].title}`;
        author.textContent = `Author: ${myLibrary[i].author}`;
        pages.textContent = `${myLibrary[i].pages} pages`;
        read.textContent = myLibrary[i].read ? "Read" : "Not Read";
        remove.textContent = "Remove"

        if (myLibrary[i].read){
            read.style.backgroundColor = "#9fff9c";
        }
        else{
            read.style.backgroundColor = "#ff9c9c";
        }

        read.addEventListener("click", () => {
            if (read.textContent == "Not Read"){
                read.style.backgroundColor = "#9fff9c";
                read.textContent = "Read";
                myLibrary[i].read = true;
            }
            else{
                read.style.backgroundColor = "#ff9c9c";
                read.textContent = "Not Read";
                myLibrary[i].read = false;
            }
        })

        remove.addEventListener("click", () => {
            removeBookFromLibrary(i);
            displayBooks();
        })

        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(pages);
        content.appendChild(read);
        content.appendChild(remove);

        container.appendChild(content);
    }
}

addBook.addEventListener("click", () => {
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block'
})

document.querySelector(".black_overlay").addEventListener("click", () => {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
})

document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = parseInt(document.querySelector("#pages").value);
    let read = document.querySelector("#read").checked;
    ifs = false;

    if (title == ""){
        document.querySelector("#title-check").style.visibility = "visible";
        ifs = true;
    }
    else{
        document.querySelector("#title-check").style.visibility = "hidden";
    }
    if (author == ""){
        document.querySelector("#author-check").style.visibility = "visible";
        ifs = true;
    }
    else{
        document.querySelector("#author-check").style.visibility = "hidden";
    }
    if (document.querySelector("#pages").value == ""){
        document.querySelector("#pages-check").style.visibility = "visible";
        ifs = true;
    }
    else{
        document.querySelector("#pages-check").style.visibility = "hidden";
    }
    if (ifs){
        return;
    }

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    document.querySelector("#title-check").style.visibility = "none";
    document.querySelector("#author-check").style.visibility = "none";
    document.querySelector("#pages-check").style.visibility = "none";
    document.querySelector("#form").reset();
})


displayBooks();
