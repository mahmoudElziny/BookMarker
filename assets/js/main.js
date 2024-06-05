var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("table-body");

var bookmarks;

var mainIndex = 0;

var nameRegex = /^[A-Za-z_]{1,}$/;
function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        return true
    }
    return false;
} 
var urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
function isURLValid(){
    if(urlRegex.test(urlInput.value)){
        return true
    }
    return false;
}

if(localStorage.getItem("bookmarks") == null){
    bookmarks =[];
}else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    displaybook(bookmarks);
}

nameInput.onkeyup = function(){
    if(isNameValid() && isURLValid()){
        addBtn.removeAttribute("disabled");
    }else {
        addBtn.disabled = "true";
    }
}

urlInput.onkeyup = function(){
    if(isNameValid() && isURLValid()){
        addBtn.removeAttribute("disabled");
    }else {
        addBtn.disabled = "true";
    }
}

addBtn.onclick = function(){
    if(addBtn.innerHTML == 'Update'){
        addBtn.innerHTML == 'Submit';
        var bookmark = {
            name : nameInput.value,
            url : urlInput.value
        }
        bookmarks.splice(mainIndex, 1, bookmark);

    }else{
        var bookmark = {
        name : nameInput.value,
        url : urlInput.value
        }
        bookmarks.push(bookmark);
    }    
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displaybook(bookmarks);
    clearData();

}


function displaybook(array){
    var marks = ``;
    for(var i=0;i<array.length;i++){
        marks +=`
            <tr>
                <td>${array[i].name}</td>
                <td><a href="${array[i].url}"><button class="btn btn-primary">Visit</button></a></td>
                <td><button onclick="updatebook(${i})" class="btn btn-info">Update</button></td>
                <td><button onclick="deletebook(${i})" class="btn btn-danger">Delete</button></td>
            </tr>    
        `
    }
    tableBody.innerHTML = marks;
}

function deletebook(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displaybook(bookmarks);
}

function clearData(){
    nameInput.value = '';
    urlInput.value = '';
}

function updatebook(index){
    nameInput.value = bookmarks[index].name;
    urlInput.value = bookmarks[index].url;
    addBtn.innerHTML = "Update";
    mainIndex = index;
}

function search(value){
    var valueMatch = [];
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].name.toLowerCase().includes(value)){
            valueMatch.push(bookmarks[i]);
        }
    }   
    displaybook(valueMatch);
}