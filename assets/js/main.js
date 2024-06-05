var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("table-body");

var bookmarks;

if(localStorage.getItem("bookmarks") == null){
    bookmarks =[];
}else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
}

addBtn.onclick = function(){
    var bookmark = {
        name : nameInput.value,
        url : urlInput.value
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    display();
}


function display(){
    var marks = ``;
    for(var i=0;i<bookmarks.length;i++){
        marks +=`
            <tr>
                <td>${bookmarks[i].name}</td>
                <td><a href="${bookmarks[i].url}"><button class="btn btn-primary">Visit</button></a></td>
                <td><button onclick="update(i)" class="btn btn-info">Update</button></td>
                <td><button onclick="delete(i)" class="btn btn-danger">Delete</button></td>
            </tr>    
        `
    }
    tableBody.innerHTML = marks;
}