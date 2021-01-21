var img     = document.getElementById('img');
var files;

//Not working yet
function listFiles(src) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", src);
    xhr.responseType = "document";
    xhr.onload = function(response) {
        list = xhr.response.querySelectorAll("tr");
        list2 = [];
        for(let obj of list) {
            list2.push(obj.querySelector("a").href);
        }
        console.log(list);
        
    }
    xhr.send();
}