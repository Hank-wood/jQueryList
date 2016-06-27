    $(function() {
        var calendar = {
            init: function() {
                this.getDates();
                this.renderDay();
                this.bindEvent();
            },
            getDates: function() {
                //获取年月日
                var _date = new Date();
                var year = _date.getFullYear(),
                    month = _date.getMonth() + 1;
                //header显示当前月份
                var txt = year + '年' + month + '月';
                $('.now_date').html(txt)
            },
            renderDay: function(_month, _year) {
                //每次调用之前清除前面一个
                $('span').remove('.datelist');
                $('.week').remove();
                var month, year, first_day, date_item = 0,
                    nowday = 0;
                if (arguments.length != 0) {
                    month = _month
                    year = _year;
                    //月份第一天星期几
                    first_day = new Date(year, month - 1, 1).getDay();
                } else {
                    month = new Date().getMonth() + 1;
                    year = new Date().getFullYear();
                    //月份第一天星期几
                    var dates = new Date();
                    dates = new Date(dates.setDate(1));
                    first_day = dates.getDay();
                }
                //是否为闰年
                if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
                    var all_month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                } else {
                    var all_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                }
                var week = $("<div class='week'><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>")
                $('.calendar_header').after(week);
                //渲染日期
                for (var i = 1; i <= 6; i++) {
                    for (var j = 1; j <= 7; j++) {
                        $('.week').after("<span class='datelist'></span>")
                    }
                }
                for (var i = 1; i <= 6; i++) {
                    for (var j = 1; j <= 7; j++) {
                        //从第一天开始
                        date_item++;
                        if (first_day <= date_item && nowday < all_month[month - 1]) {
                            nowday++;
                            if (first_day != 0) {
                                $('.datelist').eq(date_item).html(nowday);
                            } else {
                                $('.datelist').eq(date_item - 1).html(nowday);
                            }
                        }
                    }
                }
            },
            bindEvent: function() {
                var that = this;
                var month = new Date().getMonth() + 1,
                    year = new Date().getFullYear();
                //点击input，日历显示
                $('input')[0].addEventListener('click', function() {
                    $('.calendarBox').css('display', 'block');
                });
                //premonth
                $('.pre_m')[0].addEventListener('click', function() {
                    if (month <= 1) {
                        month = 12;
                        year = year - 1;
                    } else {
                        month = month - 1;
                    }
                    var txt = year + '年' + month + '月';
                    $('.now_date').html(txt);
                    console.log($('.now_date').html())
                    that.renderDay(month, year);
                });
                //nextmonth
                $('.next_m')[0].addEventListener('click', function() {
                    if (month >= 12) {
                        month = 1;
                        year = year + 1;
                    } else {
                        month = month + 1;
                    }
                    var txt = year + '年' + month + '月';
                    $('.now_date').html(txt);
                    console.log(year);
                    that.renderDay(month, year);
                });
            }
        }
        calendar.init();
    }())