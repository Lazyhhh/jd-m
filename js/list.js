window.onload = function () {
    left_scroll();
}

function left_scroll() {
    var moveUl = document.querySelector('.main_left ul');
    //获取父盒子高度
    var parentHeight = moveUl.parentNode.offsetHeight;
    //获取ul高度
    var ulHeight = moveUl.offsetHeight;

    var headerHeight = document.querySelector('.header').offsetHeight;

    var minDistance = parentHeight - ulHeight - headerHeight;

    var maxDistance = 0;

    var startTransition = function () {
        moveUl.style.transition = 'all .3s';
    }
    var endTransition = function () {
        moveUl.style.transition = '';
    }
    var setTransform = function (distance) {
        moveUl.style.transform = 'translateY('+distance+'px)';
    }
    // console.log(minDistance);
    // console.log(maxDistance);

    // 通过touch事件移动ul
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var delayDisdance = 100;
    moveUl.addEventListener('touchstart',function (event) {
        startY = event.touches[0].clientY;
        // console.log(event.touches[0].clientY);
    });

    moveUl.addEventListener('touchmove',function (event) {
        // console.log(event.touches[0].clientY);
        moveY = event.touches[0].clientY - startY;
        if((moveY+distanceY) > maxDistance+delayDisdance) {
            moveY = 0;
            distanceY = maxDistance+delayDisdance;
        }
        else if((moveY+distanceY) < minDistance-delayDisdance) {
            moveY = 0;
            distanceY = minDistance-delayDisdance;
        }
        endTransition();
        setTransform(moveY+distanceY);
    });

    moveUl.addEventListener('touchend',function (event) {
        distanceY+=moveY;
        if(distanceY > maxDistance) {
            distanceY = maxDistance;
        }
        else if(distanceY < minDistance) {
            distanceY = minDistance;
        }
        startTransition();
        setTransform(distanceY);
    })

    var liArr = document.querySelectorAll('.main_left ul li');
    for(var i = 0; i < liArr.length; i++) {
        liArr[i].dataset['index'] = i;
    }

    // 点击高亮
    fox_tap(moveUl,function(e) {
        // console.log(e);

        var liHeight = document.querySelector('.main_left ul li').offsetHeight;

        for(var i = 0; i < liArr.length; i++) {
            liArr[i].className = '';
        }

        var currentLi = e.target.parentNode;
        currentLi.className = 'current';
        var moveDistance = currentLi.dataset['index']*liHeight*-1;
        if(moveDistance > maxDistance) {
            moveDistance = maxDistance;
        }
        else if(moveDistance < minDistance) {
            moveDistance = minDistance;
        }
        startTransition();
        setTransform(moveDistance);
        distanceY=moveDistance;
    });

}