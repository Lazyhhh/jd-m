window.onload = function () {
    // 顶部通栏
    headerScroll();

    // // 倒计时的效果
    cutDownTime();

    // 轮播图的效果
    banner();
}

function headerScroll() {
    var header = document.querySelector('.jd_header');
    var nav = document.querySelector('.jd_nav');
    var maxDisdance = nav.offsetTop + nav.offsetHeight;
    window.onscroll = function () {
        var scrollDisdance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var percent = scrollDisdance / maxDisdance;
        if(percent > 1) {
            percent = 1;
        }
        // console.log(percent);
        header.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
    }
}

function cutDownTime() {
    var total = 3;
    var totalSec = total*60*60;
    var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
    // console.log(liArr);
    var timer = setInterval(function () {

        if(totalSec <= 0) {
            clearInterval(timer);
            console.log('执行完毕');
            return;
        }

        totalSec--;
        var hour = Math.floor(totalSec / 3600);
        var minute = Math.floor(totalSec % 3600 / 60);
        var sec = totalSec % 60;

        liArr[0].innerHTML = Math.floor(hour/10);
        liArr[1].innerHTML = hour % 10;

        liArr[3].innerHTML = Math.floor(minute/10);
        liArr[4].innerHTML = minute % 10;

        liArr[6].innerHTML = Math.floor(sec/10);
        liArr[7].innerHTML = sec % 10;
    },1000);
}

function banner() {
    var startTransition = function () {
        moveUl.style.transition = 'all .3s';
    }

    var endTransition = function () {
        moveUl.style.transition = '';
    }

    var setTransform = function (distance) {
        moveUl.style.transform = 'translateX('+distance+'px)';
    }

    var moveUl = document.querySelector('.banner_images');
    // moveUl.style.transition = 'all .3s';
    var indexLiArr = document.querySelectorAll('.banner_index li');
    // console.log(indexLiArr);
    var sWidth = document.body.offsetWidth;
    // console.log(sWidth);
    var index = 1;
    var timer = setInterval(function () {
        startTransition();
        index++;
        setTransform(index*sWidth*-1);
    },1000);

    moveUl.addEventListener('webkitTransitionEnd',function () {
        if(index > 8) {
            index = 1;
            endTransition();
            setTransform(index*sWidth*-1);
        }
        if(index < 1) {
            index = 8;
            endTransition();
            setTransform(index*sWidth*-1);
        }
        for(var i = 0; i < indexLiArr.length; i++) {
            indexLiArr[i].className = '';
        }
        indexLiArr[index-1].className = 'current';
    });

    var startX = 0;
    var moveX = 0;
    var maxWidth = sWidth / 2;

    moveUl.addEventListener('touchstart',function (event) {
        clearInterval(timer);
        endTransition();
        startX = event.touches[0].clientX;
    });

    moveUl.addEventListener('touchmove',function (event) {
        moveX = event.touches[0].clientX - startX;
        setTransform(moveX+index*sWidth*-1);

    });

    moveUl.addEventListener('touchend',function () {
        if(Math.abs(moveX) > maxWidth) {
            startTransition();
            if(moveX > 0) {
                index--;
            }
            else {
                index++;
            }
            setTransform(index*sWidth*-1);
        }
        else {
            startTransition();
            setTransform(index*sWidth*-1);
        }
        timer = setInterval(function () {
            startTransition();
            index++;
            setTransform(index*sWidth*-1);
        },1000);
    });
}