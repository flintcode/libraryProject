// Selectors
const submitBooks = document.querySelector("#submitButton");
const author = document.querySelector("#bookAuthor");
const title =  document.querySelector("#bookTitle");
const pages =  document.querySelector("#bookPages");
const cancel = document.querySelector("#cancelButton");
const formOpen = document.querySelector("#openForm");
const bookDisplay = document.querySelector('#bookContainer');
const addBook =  document.getElementsByClassName("addNew");
const formContainer = document.getElementsByClassName("container");
let myLibrary = []
localStorage.setItem('entries',JSON.stringify(myLibrary));
const data = JSON.parse(localStorage.getItem('entries'));

// Constructors
function Form () {
    this.read = function (){
    }
    this.createForm = () => {
        const form = document.createElement('div');
        form.id = "AddCardContainer";
          form.classList.add("container");
           document.getElementById('formContainer').appendChild(form);

        const header = document.createElement('h1');
         header.textContent = 'Add Book';
           
          form.appendChild(header);
        
        const titleInput = document.createElement("INPUT");
        titleInput.id = "titlesInput"
         titleInput.setAttribute("type",'text');
         titleInput.placeholder = "Title" ;
         form.appendChild(titleInput);

        const authorInput = document.createElement("INPUT");
        authorInput.id = "authorsInput"
         authorInput.setAttribute("type",'text');
         authorInput.placeholder = "Author"
         form.appendChild(authorInput);

        const pagesInput = document.createElement("INPUT");
        pagesInput.id = "pagesInput"
         pagesInput.setAttribute("type",'number');
         pagesInput.placeholder = "Pages"
         
         form.appendChild(pagesInput);
         
        const readCheckBox = document.createElement("INPUT");
         readCheckBox.setAttribute("type",'checkbox')
         readCheckBox.id = "readCheckBox";
             form.appendChild(readCheckBox);


        const cancelButton = document.createElement("BUTTON");
          cancelButton.textContent = "Cancel";
          form.appendChild(cancelButton);
          cancelButton.id = "cancelButton"
          cancelButton.addEventListener('click',closeForm);

        const submitButton = document.createElement("BUTTON");
         submitButton.textContent = "Submit";
         submitButton.id = 'submitButton';
         form.appendChild(submitButton);
         submitButton.addEventListener('click',addBookToLibrary)  
        }
        this.addButton = () => {
            const button =  document.createElement('BUTTON')
            button.textContent = "+ Book"
             button.id = 'addNew'
             document.body.appendChild(button)
             button.addEventListener('click',openForm)
         }       
    }
function Book (Title,Author,Pages) {
    this.Title = Title,
    this.Author = Author,
    this.Pages = Pages,
    this.CreateCard = (title,author,pages) =>{
        const card = document.createElement("div")
        card.id = title;
        card.classList.add("bookCard");
        card.textContent += title + "\r\n" +"\r\n";
        card.textContent += author + "\r\n" ;
        card.textContent += pages + " pages" + "\r\n";
        card.setAttribute('data-id',title);
        card.style.whiteSpace = "pre-line";
        bookDisplay.appendChild(card);
        const readToggle = document.createElement('button')
            readToggle.classList.add("readToggle");     
                if (document.getElementById('readCheckBox').checked){
                    readToggle.textContent = 'Read';
                    readToggle.style.background = '#94F8F3';
                }
                else{
                readToggle.textContent = 'Not Read';
                }
            card.appendChild(readToggle);
            readToggle.addEventListener('click',() => {
                if( readToggle.textContent == "Read") {
                    readToggle.textContent = "Not Read"
                    readToggle.style.background = 'white';
                }
                else {
                    readToggle.textContent ="Read"
                    readToggle.style.background = '#94F8F3';
                }          
            })
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove');
        removeButton.addEventListener('click',() => {
          myLibrary = myLibrary.filter((arrayElement) => arrayElement.Title !== card.getAttribute('data-id'))
            card.remove()
        })
        card.appendChild(removeButton)
    }
}

// prototypes
Book.prototype = Object.create(Form.prototype);

// Entry form creation
function openForm (){
    for (i = 0; i <= formContainer.length; i++){
        document.body.style.transition = "all 0.3s";  
        document.body.style.background = "rgb(122, 164, 255,0.5)";
        document.getElementById("header").style.background = "rgb(122, 164, 255,0.5)";
        formContainer[i].style.display = "block";
        formContainer[i].classList.add("addBookContainer");
    }    
}

function closeForm (){
    for (i = 0; i < formContainer.length; i++){
        document.body.style.background = "rgb(255, 160, 122)";
        document.getElementById("header").style.background = "rgb(173, 216, 230)"
        formContainer[i].style.display = "none";
        document.body.style.opacity = "1";
    }
}

let form = new Form()
form.addButton()
form.createForm()

// adding to library and constructing book card
function addBookToLibrary (e) {
    e.preventDefault()
    let book = new Book(document.getElementById('titlesInput').value,document.getElementById('authorsInput').value,document.getElementById('pagesInput').value); 
    myLibrary.push(book);
    
    book.CreateCard(book.Title,book.Author,book.Pages)
    localStorage.setItem('entries',JSON.stringify(myLibrary))
  }

//  Replicating elements from local storage to front end
data.forEach(items => {
    let entry = document.createElement('div')
    entry.textContent = items
    bookDisplay.appendChild(entry)
})

myLibrary = (localStorage.getItem('entries'))?
    JSON.parse(localStorage.getItem('entries')): []



