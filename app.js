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
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
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
           document.body.appendChild(form);

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
          cancelButton.addEventListener('click',() => {
            for (i = 0; i < formContainer.length; i++){
                document.body.style.background = "rgb(255, 160, 122)";
                document.getElementById("header").style.background = "rgb(173, 216, 230)"
                formContainer[i].style.display = "none";
                document.body.style.opacity = "1";
                document.getElementById('addNew').style.display = 'block';
             }
            });

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
             button.addEventListener('click',() => {
                for (i = 0; i <= formContainer.length; i++){
                    document.body.style.transition = "all 0.3s";  
                    document.body.style.background = "rgb(255, 160, 122,0.5)";
                    document.getElementById("header").style.background = "rgb(173, 216, 230,0.5)";
                    document.getElementsByClassName("")
                    formContainer[i].style.display = "block";              
                }    
             })
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
        document.body.appendChild(card);
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
        
        
        let 
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
    for (i = 0; i < formContainer.length; i++){
        formContainer[i].style.display = "none";
        document.body.style.background = "rgb(255, 160, 122)";
        document.getElementById("header").style.background = "rgb(173, 216, 230)"
        document.getElementById('addNew').style.display = 'block';
    }
  }

//  Replicating elements from local storage to front end

data.forEach(items => {
    let StorageBook = new Book()
    StorageBook.CreateCard(items.Title,items.Author,items.Pages)
})

myLibrary = (localStorage.getItem('entries'))?
    JSON.parse(localStorage.getItem('entries')): []



