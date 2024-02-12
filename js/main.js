var images  = document.getElementById('images');   //Container for images of the slider
var img0    = document.getElementById('img0');     //Test-picture
var left    = document.getElementById('left');     //Left-Button
var right   = document.getElementById('right');    //Right-Button
var overlay = document.getElementById('overlay');  //Overlay
var fsElem  = document.fullscreenElement;                   //Fullscreen Element

/**
 * @author AtronixYT
 * @param {string} src source-url
 * @returns {string} parent-diretory related to src param example: ./test/ -> ./ | https://google.com/test/test/ -> https://google.com/test/ 
 */
function getParentDir(src) {
    let parentDir;                                                                                                                      //Creates local var 
    if(src.charAt(src.length - 1) === '/') {
        parentDir = src.substring(0, src.lastIndexOf('/')).substring(0, src.substring(0, src.lastIndexOf('/')).lastIndexOf('/') + 1);   //Filters the parent-dir of directory
    } else {
        parentDir = src.substring(0, src.lastIndexOf('/') + 1);                                                                         //Filters the parent-dir of file
    }
    return parentDir;                                                                                                                   //Returns parent-dir
}

/**
 * only works with auto-created index-files from webserver
 * @author AtronixYT
 * @param {string} src source-folder of pictures 
 */
function listFiles(src) {
    let xhr = new XMLHttpRequest();     //New Request for getting dir-content
    let dataList = [];                  //List of Data
    
    xhr.open("GET", src, false);        //Configures the request as a Get request at given location and synchronous 
    xhr.send();                         //Sends request
    
    let dummyDom = document.createElement('html');      //Creates dummy HTML-Document for handling request answer
    dummyDom.innerHTML = xhr.response;                  //Sets response as content of dummy
    
    let trList = dummyDom.querySelectorAll("tr");       //Gets all <tr>-tags of response
    console.log("Dateien in " + src + ":");             //Information-Message
    for(let obj of trList) {
        if(obj.querySelector("a[href]") != null) {          //If the given current object contains an <a>-tag object with given href-attribute
            href = obj.querySelector("a[href]").href;       //Gets the href-value of the <a>-tag object of current object
            if(href.charAt(href.length - 1) != '/') {       //Checks if last char is '/' (filters directories)
                fileName = href.substring(href.length, href.lastIndexOf('/') + 1);  //cuts the path of the file and only keeps the filename 
                if( fileName.length > 0 &&                  //If filename is longer than 0
                    !fileName.includes("?C=N;O=D") &&       //If filename doesn't include buggy href
                    fileName !== getParentDir(src) &&       //If filename isn't the same as the parent-dir
                    fileName.href !== src)                  //If filename isn't the current dir
                {                
                    dataList.push(src + fileName);          //Adds the current filename and path to datalist
                    console.log(fileName);                  //Logs the filename as found
                }
            }
        }
    }
    return dataList;                    //Returns the datalist
}

/**
 * @author AtronixYT
 * @param {string[]} array array of filename/-urls
 * @returns {string[]} filtered string-array
 */
function filterImages(array) {
    let knownTypes = ['jpeg', 'webp', 'gif', 'png', 'tiff', 'svg', 'pdf', 'bmp', 'ico', 'jpg', 'raw', 'arw'];     //Creates a list of known image-types
    let newArray = [];  //Creates array for filtered objects
    for(e of array) {   //for every object as e of array                                        
        if(knownTypes.includes(e.substring(e.length, e.lastIndexOf('.') + 1).toLowerCase())) {  //Filters the file-ending and compares it with all of the known ones if it is listed in known types it does something
           newArray.push(e);    //Adds current object to filtered objects list
        }
    }
    return newArray;    //returns filtered objects
}

/**
 * @author AtronixYT
 * @param {string} src source-folder of pictures, only works with auto-created index-files from webserver (Available under manMode false)
 * @param {string[]} array array of picture-urls (Available under manMode true)
 * @param {boolean} manMode specifies manual-mode of picture-url collection
 */
function initControl(src, array, manMode) {
    let files = manMode ? array : filterImages(listFiles(src)); //If manual-mode is enabled it gets the array otherwise it gets the files via filtered-listfiles function
    images.style.width = (files.length * 100) + '%';           //Sets the images-container width to amount of passed images * 100%
    img0.remove();                                              //Removes the test-image
    
    for(e of files) {                                           //Does something for every value of files
        img = document.createElement('img');            //Creates new <img>-object
        img.id  = 'images-' + files.indexOf(e);
        img.src = e;                                            //Sets current value as source of img
        img.setAttribute('alt', 'Image can\'t be displayed');   //Sets alternative text if the file can't be displayed
        img.classList.add('img');                               //Adds "img"-class to img
        images.appendChild(img);                               //Adds img to images-container
    }

    if (files.length <= 1) {
        document.getElementById('move').hidden = true;
    }

    overlay.addEventListener('click', function (event) {
        index = images.style.left.replace('%', '').replace('-', '') / 100;
        image = images.children[index];

        if(event.target === left || event.target === right) {
            console.log('Clicked ' + event.target.id);
        }

        else {
            image.requestFullscreen().then((r) => console.log(r));
        }
    });

    document.addEventListener('fullscreenchange', (event) => {
        console.log('fsElem:', fsElem);

        if(document.fullscreen) {
            console.log('Fullscreen entered');
            fsElem = document.fullscreenElement;
            fsElem.style.objectFit = 'contain';
        }

        else {
            console.log('Fullscreen exited');
            fsElem.style.removeProperty('object-fit');
        }
    });

    images.addEventListener('click', function (event) {
        document.exitFullscreen().then(() => {
            console.log('Exit Fullscreen')
        });
    });

    left.addEventListener('click', function() {                 //Adds eventlistener for click event of left-button
        if(images.style.left == "0%") {                         
        }
        else {                                                  //Otherwise
            images.style.left = (parseInt(images.style.left.replace('%', '')) + 100) + '%'; //Gets the current value of distance, parses it to int adds 100% and sets it as new value
        }
    });

    right.addEventListener('click', function() {                //Adds eventlistener for click event of right-button
        if(images.style.left == '-' + ((files.length - 1) * 100) + '%') {   //If the distance of images to the left side is already 100% * (amount of images - 1), does nothing
        }
        else {                                                  //Otherwise
            images.style.left = (images.style.left.replace('%', '') - 100) + '%';   //Gets the current value of distance, parses it to int substracts 100% and sets it as new value
        }
    });
}
