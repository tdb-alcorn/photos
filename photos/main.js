var xmlns = "http://s3.amazonaws.com/doc/2006-03-01/";
var keyXpath = "//" + xmlns + "Contents/" + xmlns + "Key";
var bucketUrl = "https://s3-us-west-2.amazonaws.com/alcorn-photos";
var excludeFiles = ["index.html", "error.html", "main.js", "main.css"];


fetch(bucketUrl)
    .then(response => response.text())
    .then(xmlString => $.parseXML(xmlString))
    .then(xmlDoc => $(xmlDoc))
    .then($xml => $xml[0].getElementsByTagNameNS(xmlns, "Key"))
    .then(keys => {
        var imgFilenames = [];
        for (var i=0, len=keys.length; i<len; i++) {
            imgFilenames.push(keys[i].textContent);
        }
        return imgFilenames;
    })
    .then(imgFilenames => {
        var fnList = $("#img-filenames");
        var fn;
        for (var i=0, len=imgFilenames.length; i<len; i++) {
            fn = imgFilenames[i];
            if (!excludeFiles.includes(fn)) {
                fnList.append("<li><a href=\"" + bucketUrl + "/" + fn + "\">" + fn + "</a>");
            }
        }
    });




