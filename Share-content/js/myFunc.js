/*
* 获取滚动的头部距离和左边距离
* scroll().top scroll().left
* */
function scroll() {
    if(window.pageYOffset !== null){
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }

    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft,
    }
}


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

function show(obj) {
    return obj.style.display = "block";
}

function hide(obj) {
    return obj.style.display = "";
}

/*
* 获取宽度和高度
* client().width scroll().height
* */
function client() {
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    }
}