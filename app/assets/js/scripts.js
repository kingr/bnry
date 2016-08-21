var xhttp = new XMLHttpRequest();
var data = {};
var activeImg = {};
var activeImgPos = 0;

xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        data = JSON.parse(xhttp.responseText);
        activeImg = data[0];
        data.forEach(setActiveImgPos);
        document.getElementById('img').src = activeImg.src;
        document.getElementById('img-desc').innerHTML = 'Description: ' + activeImg.desc;
    }
};
xhttp.open('GET', '/data');
xhttp.send();

function setActiveImgPos(element, index) {
    if(element.id == activeImg.id) activeImgPos = index;
}

// click buttons
function toggleClick(val) {
    if (val == 'left') {
        TweenMax.to('#img', 0.5, {opacity: 0, onComplete: previousImg});
    } else {
        TweenMax.to('#img', 0.5, {opacity: 0, onComplete: nextImg});
    }
}

// load new images
var nextImg = function() {
    loadingStart();
    var img = document.getElementById('img');
    if (activeImgPos + 1 == data.length) {
        activeImg = data[0];
        img.src = data[0].src;
    } else {
        var newImagePos = activeImgPos + 1;
        activeImg = data[newImagePos];
        img.src = data[newImagePos].src;
    }
    document.getElementById('img-desc').innerHTML = 'Description: ' + activeImg.desc;
    data.forEach(setActiveImgPos);
};
var previousImg = function() {
    loadingStart();
    var img = document.getElementById('img');
    if (activeImgPos == 0) {
        activeImg = data[data.length-1];
        img.src = data[data.length-1].src;
    } else {
        var newImagePos = activeImgPos - 1;
        activeImg = data[newImagePos];
        img.src = data[newImagePos].src;
    }
    document.getElementById('img-desc').innerHTML = 'Description: ' + activeImg.desc;
    data.forEach(setActiveImgPos);

};

// hover
var hover = function(val) {
    if (val == 'right') {
        if (activeImgPos + 1 == data.length){
            document.getElementById('preview-right').innerHTML = data[0].desc;
            document.getElementById('preview-right-wrapper').style.display = 'block';
        } else {
            document.getElementById('preview-right').innerHTML = data[activeImgPos+1].desc;
            document.getElementById('preview-right-wrapper').style.display = 'block';
        }
    } else {
        if (activeImgPos == 0) {
            document.getElementById('preview-left').innerHTML = data[data.length-1].desc;
            document.getElementById('preview-left-wrapper').style.display = 'block';
        } else {
            document.getElementById('preview-left').innerHTML = data[activeImgPos-1].desc;
            document.getElementById('preview-left-wrapper').style.display = 'block';
        }
    }


};

var mouseleave = function(val){
    if (val == 'right') {
        document.getElementById('preview-right-wrapper').style.display = 'none';
    } else {
        document.getElementById('preview-left-wrapper').style.display = 'none';
    }
};

var loadingDone = function(){
    document.getElementById('spinner-wrapper').style.display = 'none';
    TweenMax.to('#img', 2, {opacity: 1});
    document.getElementById('image-count').innerHTML = activeImgPos+1;
};

var loadingStart = function(){
    document.getElementById('spinner-wrapper').style.display = 'block';
    TweenMax.to('#img', 2, {opacity: 0});
};