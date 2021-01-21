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

/**
 * only works with auto-created index-files from webserver
 * @param {string} src source-folder of pictures 
 */
function listFiles(src) {
    let xhr = new XMLHttpRequest();
    let dataList = [];
    
    xhr.open("GET", src, false);
    xhr.send();
    let dummyDom = document.createElement('html');
    dummyDom.innerHTML = xhr.response;
    let trList = dummyDom.querySelectorAll("tr");
    console.log("Dateien in " + src + ":");
    for(let obj of trList) {
        if(obj.querySelector("a[href]") != null) { 
            fileName = obj.querySelector("a[href]").href;
            fileName = fileName.substring(fileName.length, fileName.lastIndexOf('/') + 1);
            if(fileName.length != 0 && !fileName.includes("?C=N;O=D") && fileName !== getParentDir(src) && fileName.href !== src) {
                dataList.push(src + fileName);
                console.log(fileName);
            }
        }
    }
    return dataList;
}

/**
 * 
 * @param {string[]} array array of filename/-urls
 * @returns {string[]} filtered string-array
 */
function filterImages(array) {
    let knownTypes = ['jpeg', 'webp', 'gif', 'png', 'tiff', 'svg', 'pdf', 'bmp', 'ico'];
    let newArray = [];
    for(e of array) {
        if(knownTypes.includes(e.substring(e.length, e.lastIndexOf('.') + 1).toLowerCase())) {
           newArray.push(e); 
        }
    }
    return newArray;
}

/**
 * 
 * @param {string} src source-folder of pictures, only works with auto-created index-files from webserver (Available under manMode false)
 * @param {string[]} array array of picture-urls (Available under manMode true)
 * @param {boolean} manMode specifies manual-mode of picture-url collection
 */
function initControl(src, array, manMode) {
    let files = filterImages(manMode ? array : listFiles(src));
    imgages.style.width = (files.length * 100) + '%';
    img0.remove();
    
    for(i = 0; i < files.length; i++) {
        img = document.createElement('img');
        img.src = files[i];
        img.setAttribute('alt', 'Image can\'t be displayed');
        img.classList.add('img');
        imgages.appendChild(img);
    }

    left.addEventListener('click', function() {
        if(images.style.left == "0%") {
        }
        else {
            images.style.left = (parseInt(images.style.left.replace('%', '')) + 100) + '%';
        }
    });

    right.addEventListener('click', function() {
        if(images.style.left == '-' + ((files.length - 1) * 100) + '%') {
        }
        else {
            images.style.left = (images.style.left.replace('%', '') - 100) + '%';
        }
    });
}