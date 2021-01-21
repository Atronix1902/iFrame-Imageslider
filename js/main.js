var imgages = document.getElementById('images');
var img0    = document.getElementById('img0');
var left    = document.getElementById('left');
var right   = document.getElementById('right');

/**
 * 
 * @param {string} src source-url
 * @returns {string} parent-diretory related to src param example: ./test/ -> ./ | https://google.com/test/test/ -> https://google.com/test/ 
 */
function getParentDir(src) {
    let parentDir;
    if(src.charAt(src.length - 1) === '/') {
        parentDir = src.substring(0, src.lastIndexOf('/')).substring(0, src.substring(0, src.lastIndexOf('/')).lastIndexOf('/') + 1);
    } else {
        parentDir = src.substring(0, src.lastIndexOf('/') + 1);
    }
    return parentDir;
}
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