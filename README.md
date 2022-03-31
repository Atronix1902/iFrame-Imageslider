# iFrame - Imageslider

iFrame - Imageslider is an Imageslider for Web-applications which can be used and configurated via the <iframe>-tag

  - Easy use
  - Completely free
  - Great browser-compability

# How to use

It's easy just include the files on your server and use an iFrame to include it on a website.
This would create a clean slider:
```html
<iframe height="900" width="1600" src="your_path_to_slider/img/"></iframe>
```
It's possible to use it via my website too:
```html
<iframe height="900" width="1600" src="https://iframe.kriebel.ddnsfree.com/image/?src=<url to dir>">
```
But this option only provides support of using URL as filesource.

# Configuration
This slider wouldn't show anything because he doesn't know which files, so we need to configure it
The configuration is made by using a query-string:
```html
<iframe height="900" width="1600" src="img/?src=./media/"></iframe>
```
This would create a slider for the files at "your_path_to_slider/img/media/" which is actually the default configuration.

There are several options to use.
| Parameter | Type          | Description                                                                                                             | Default value         |
| ---       | ---           | ---                                                                                                                     | ---                   |
| src       | `String`      | path to dir - can be url, absolute or relative - !Works with enabled AutoIndexSite of Apache only. Didn't test NginX!   | `"./media/"`          |
| pics      | `JSONArray`   | A String representing a JSONArray whith URLs/Paths of images. If using this src will be disabled                        | `null`                |
| t         | `int / String`| style type that can be used more infos at styling                                                                       | `1`                   | 

Example of full configurated slider:
```html
<iframe height="900" width="1600" src="img/?src=./media/"></iframe>
```

and would create following image-slider:
![https://iframe.kriebel.ddnsfree.com/image](https://kriebel.ddnsfree.com/media/images/other/img_screenshot.jpg)

# Using JSONArray as source

If you're going to use the pics parameter you need to know how to use it.
A simple example of this would be:
```html
<iframe id="imgSlide" height="500px" width="100%" src="img/?src=./media/"></iframe>
<script>
    array = [
        'https://kriebel.ddnsfree.com/mediaplayer/img/media/test.png',                                          //URL to File1
        'https://cdn.myanimelist.net/s/common/uploaded_files/1459843195-9c4633bc100207c4f64ea364bfd10fab.jpeg', //URL to File2
        './media/test2.png',                                                                                    //Path to File3
        'https://loman.kryolisc.de/ucds/e4da3b7fbbce2345d7772b0674a318d5/place_82'                              //URL to File4
    ]
    srcString = 'img/?pics=' + JSON.stringify(array);                                                           //Generating spurce-string
    document.getElementById('imgSlide').setAttribute('src', srcString);                                         //Setting string as source
</script>
```

# Enable Fullscreen for click on image

If you use the HTML-Attribute 'allow="fullscreen"' it is possible to click on the image to show it on fullscreen

# Styling

It is possible to create own CSS or edit the default.
The slider gets its stylesheets from `./css/1.css` file by default.
By editing it you can edit the default styling.
Another option is to add a new CSS file into that directory and set the t-parameter to filename.

Example:
| Filename  | Query     |
| ---       | ---       |
| blabla.css| t=blabla  |
| 2.css     | t=2       |

# License
Take a look into LICENSE file
