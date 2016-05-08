$(function() {
    var Memory = {
            init: function(cards) {
                this.paused = false;
                this.intervalId=null;
                // 记录翻转card的id
                this.guessd = null;
                this.$game = $('.game');
                this.$overlay = $('.overlay');
                this.$restart = $('.restart');
                this.$level = $('.level').find('li');
                this.cards = cards.slice(0);
                this.cardsArray = $.merge(this.cards, this.cards);
                this.shuffleCards(this.cardsArray);
                this.render()
                this.$memoryCards = $('.card');
                this.bindEvent();
            },
            shuffleCards: function(cardsArray) {
                this.$cards = $(this.shuffle(cardsArray));
            },
            shuffle: function(array) {
                array.sort(function() {
                    return Math.random() > 0.5;
                });
                return array;
            },
            render: function() {
                var html = "";
                this.$cards.each(function(k, v) {
                    html += '<div class="card" data-id="' + v.id + '"><div class="inside"><div class="front-card"><img src="' + v.img + '" alt="' + v.name + '" /></div><div class="back-card"><img src="img/codepen-logo.png" alt="codepen" /></div></div></div>'
                })
                this.$game.html(html);
            },
            bindEvent: function() {
                var that = this;
                // cardClick
                this.$memoryCards.on('click', function() {
                        var $card = $(this);
                        if (!that.paused && !$card.find('.inside').hasClass('matched') && !$card.find('.inside').hasClass('picked')) {
                            $card.find(".inside").addClass("picked");
                            if (!that.guessd) {
                                that.guessd = $(this).attr('data-id');
                            } else if (that.guessd == $(this).attr('data-id') && !$(this).hasClass('picked')) {
                                $('.picked').addClass('matched');
                                that.guessd = null;
                            } else {
                                that.guessd = null;
                                that.paused = false;
                                setTimeout(function() {
                                    $('.picked').removeClass('picked');
                                }, 600)
                            }
                            // win
                            if ($('.matched').length == $('.card').length) {
                                setTimeout(that.win(), 500)
                            }
                        }
                    })
                    //reset   	
                this.$restart.on('click', function() {
                        //imo
                    })
                    //level
                this.level();
            },
            win: function() {
                this.$overlay.animate({ display: 'block' }, 'normal');
            },
            // timeout: function(leveltime,that) {
            // 	var time=[20,40,60]
            // 	var timeL=time[leveltime-1]
            // 	    that.$time.html(timeL);
            //     if(that.intervalId) { clearInterval(that.intervalId); }
            //         console.log(that.intervalId);
            //     that.intervalId=setInterval(function(){
            // 		timeL-=1;
            // 		that.$time.html(timeL)
            // 		if (timeL==0) {
            // 			if(that.intervalId) { clearInterval(that.intervalId); }
            // 			alert('game over');
            // 			return false;
            // 		}
            // 	},1000)
            // },
            level: function() {
                var that = this;
                //level
                this.$level.on('click', function() {
                    $levelIndex = parseInt($(this).attr('data-level'));
                    $(this).addClass('active').siblings().removeClass('active');
                    if ($levelIndex == 1) {
                        var levelcard1 = cards.slice(0, 4);
                            that.init(levelcard1);
                    } else if ($levelIndex == 2) {
                        var levelcard2 = cards.slice(0, 8);
                        	that.init(levelcard2)
                    } else if ($levelIndex == 3) {
                        var levelcard3 = cards;
                        	that.init(levelcard3);
                    }
                })
            }
        }
    // cards
    var cards = [{
        name: "php",
        img: "img/php-logo_1.png",
        id: 1,
    }, {
        name: "css3",
        img: "img/css3-logo.png",
        id: 2
    }, {
        name: "html5",
        img: "img/html5-logo.png",
        id: 3
    }, {
        name: "jquery",
        img: "img/jquery-logo.png",
        id: 4
    }, {
        name: "javascript",
        img: "img/js-logo.png",
        id: 5
    }, {
        name: "node",
        img: "img/nodejs-logo.png",
        id: 6
    }, {
        name: "photoshop",
        img: "img/photoshop-logo.png",
        id: 7
    }, {
        name: "python",
        img: "img/python-logo.png",
        id: 8
    }, {
        name: "rails",
        img: "img/rails-logo.png",
        id: 9
    }, {
        name: "sass",
        img: "img/sass-logo.png",
        id: 10
    }, {
        name: "sublime",
        img: "img/sublime-logo.png",
        id: 11
    }, {
        name: "wordpress",
        img: "img/wordpress-logo.png",
        id: 12
    }];
    Memory.init(cards);
})
