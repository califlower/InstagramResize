var URL = window.webkitURL || window.URL;

var LANDSCAPE_RATIO = 1.91;
var PORTRAIT_RATIO = .8;

window.onload = function() {
    var input = document.getElementById('photos');
    var downloadLink = document.getElementById('downloadLink');

    input.addEventListener('change', handleFiles, false);
    downloadLink.addEventListener('click', download, false);

 
}

function handleFiles(e) {
    
    if (e.target.files.length == 0)
        return;
    var canvas = document.getElementById('inputPhoto');

    var downloadSection = document.getElementById('downloadSection')

    var ctx = canvas.getContext('2d');
    var url = URL.createObjectURL(e.target.files[0]);

    var img = new Image();

    canvas.style.display="none";

    img.onload = function() {


        if (detectLandscape(img))
            fillLandscape(img, canvas, ctx, "#FFFFFF");
        else if (detectPortrait(img))
            fillPortrait(img, canvas, ctx, "#FFFFFF");

        console.log(isFillNeeded(img));
        console.log(getLandscapeFill(img));

        downloadSection.style.display = "inline";
 
    }
    img.src = url;
    



}

function fillLandscape(img, canvas, ctx, color)
{
    /*
    Compute landscape fill
    */
    var landscapeFill = getLandscapeFill(img);

    /*
    Set canvas dimensions to photo width and height + enough pixels to equal 1.91 ratio
    */
    canvas.width = img.width;
    canvas.height = img.height + landscapeFill;

    ctx.fillStyle = color;

    ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight + landscapeFill)

    /*
    Center image vertically on canvas
    */
    ctx.drawImage(img, 0, landscapeFill/2); 


}

function fillPortrait(img, canvas, ctx, color)
{
    /*
    Compute portrait fill
    */
    var portraitFill = getPortraitFill(img);

    /*
    Set canvas dimensions to photo width + enough pixels to equal .8 ratio and height
    */
    canvas.width = img.width + portraitFill;
    canvas.height = img.height;

    ctx.fillStyle = color;

    ctx.fillRect(0, 0, img.naturalWidth + portraitFill, img.naturalHeight)

    /*
    Center image vertically on canvas
    */
    ctx.drawImage(img, portraitFill/2, 0); 


}

function download(e) {
    var canvas = document.getElementById('inputPhoto')
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
}

function isFillNeeded(img)
{
    var imgWidth = img.naturalWidth;
    var imgHeight = img.naturalHeight;
    var imgRatio = imgWidth/imgHeight;

    if (imgRatio > LANDSCAPE_RATIO || imgRatio < PORTRAIT_RATIO)
    {
        console.log("Fill is needed")
        return true;
    }
    else
    {
        console.log("Fill is not needed")
        return false;
    }
}

function getLandscapeFill(img)
{
    return Math.round(img.naturalWidth/LANDSCAPE_RATIO - img.naturalHeight);
}

function getPortraitFill(img)
{
    return Math.round(img.naturalHeight/PORTRAIT_RATIO - img.naturalWidth);
}

function detectLandscape(img)
{
    var imgWidth = img.naturalWidth;
    var imgHeight = img.naturalHeight;

    return imgWidth > imgHeight;
}


function detectPortrait(img)
{
    var imgWidth = img.naturalWidth;
    var imgHeight = img.naturalHeight;

    return imgHeight > imgWidth;
}



