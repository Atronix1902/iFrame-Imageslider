var imgages = document.getElementById('images');
var img0    = document.getElementById('img0');
var left    = document.getElementById('left');
var right   = document.getElementById('right');

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