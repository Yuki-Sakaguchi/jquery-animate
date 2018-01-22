$(function() {

    var speed = 600;
    var backSpeed = Math.floor(speed/1.5);
    var easing = 'easeOutBack';
    var backEasing = 'easeInOutQuad';
    var className = 'js-active';
    var isActive = false;

    // 'easeOutBack';       ...すっ..びよーん!
    // 'easeInOutQuad';     ...すっ!!
    // 'easeOutElastic';    シュッ! デュビーン！
    // 'easeInOutElastic';  キビキビ!!

    var $target = $('nav .view-item');

    $target.on('mouseover', function() {
        var $this = $(this);
        var i = 0;
        var i2 = '20vw';
        var q = $this.index();

        if ($this.hasClass(className)) {
          return false;
        }

        isActive = false;

        backMove();
        setTimeout(function() {
            move(i, i2, q);
        }, backSpeed);
    });

    $target.on('mouseout', function() {
      if (isActive) {
        return false;
      }
      backMove();
    });

    $target.on('click', function() {
        var $this = $(this);
        $target.removeClass(className);
        $this.addClass(className);
        isActive = true;
    });

    /**
     * 広がる
     */
    function move(i, i2, q) {
        $target.each(function(n) {
            var $this = $(this);
            $this.stop().animate({'width': (100 - (20 * n)) + '%'}, speed, easing);
            $this.children('a').children('.text').stop().animate({'width': '20vw'}, speed, easing);
        });

        $target.each(function(n) {
            var $this = $(this);
            $this.stop().animate({'width': (100 - i) + '%'}, speed, easing);

            if (n == q) {
                i += 44;
                i2 = '44vw';
            } else {
                i += 14;
                i2 = '14vw';
            }

            $this.children('a').children('.text').stop().animate({'width': i2}, speed, easing);
        });
    }

    /**
     * 元に戻る
     */
    function backMove() {
        $target.each(function(n) {
            var $this = $(this);
            $this.stop().animate({'width': (100 - (20 * n)) + '%'}, backSpeed, backEasing);
            $this.children('a').children('.text').stop().animate({'width': '20vw'}, backSpeed, backEasing);
        });
    }

    /**
     * スタート イージング切り替え
     */
    var $easingListItemStart = $('.easing-list__item.start');

    // 初期値設定
    $easingListItemStart.each(function() {
        var $this = $(this);
        var tmpEasing = $this.data('easing');
        var className = 'current';

        if (tmpEasing == easing) {
            $easingListItemStart.removeClass(className);
            $this.addClass(className);
        }
    });

    // 値の変更
    $easingListItemStart.on('click', function() {
        var $this = $(this);
        var tmpEasing = $this.data('easing');
        var className = 'current';

        $easingListItemStart.removeClass(className);
        $this.addClass(className);

        easing = tmpEasing;
    });

    /**
     * エンド イージングの切り替え
     */
    var $easingListItemEnd = $('.easing-list__item.end');

    // 初期値
    $easingListItemEnd.each(function() {
        var $this = $(this);
        var tmpEasing = $this.data('easing');
        var className = 'current';

        if (tmpEasing == backEasing) {
            $easingListItemEnd.removeClass(className);
            $this.addClass(className);
        }
    });

    // 値の変更
    $easingListItemEnd.on('click', function() {
        var $this = $(this);
        var tmpEasing = $this.data('easing');
        var className = 'current';

        $easingListItemEnd.removeClass(className);
        $this.addClass(className);

        backEasing = tmpEasing;
    });

    // スピードの変更
    var $speedInput = $('.speed-input');
    $speedInput.val(speed);
    $speedInput.on('change', function() {
        speed = Math.floor($(this).val());
        backSpeed = Math.floor(speed/1.5);
    });
});