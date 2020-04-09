/*================================================== Navigation ==================================================*/


(function($) { "use strict";

    $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 10) {
                header.removeClass('start-style').addClass("scroll-on");
            } else {
                header.removeClass("scroll-on").addClass('start-style');
            }
        });
    });

    //Animation

    $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');
    });

    //Menu On Hover

    $('body').on('mouseenter mouseleave','.nav-item',function(e){
        if ($(window).width() > 750) {
            var _d=$(e.target).closest('.nav-item');_d.addClass('show');
            setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },1);
        }
    });

    //Switch light/dark

    $("#switch").on('click', function () {
        if ($("body").hasClass("dark")) {
            $("body").removeClass("dark");
            $("#switch").removeClass("switched");
        }
        else {
            $("body").addClass("dark");
            $("#switch").addClass("switched");
        }
    });

})(jQuery);

/*================================================== Navigation ==================================================*/

/*
| ------------------------------------------------------------------------------
| Calendar plugin (rough draft)
| ------------------------------------------------------------------------------
*/

(function($){

    var Calendar = function (elem, options) {
        this.elem = elem;
        this.options = $.extend({}, Calendar.DEFAULTS, options);
        this.init();
    };

    Calendar.DEFAULTS = {
        datetime: undefined,
        dayFormat: 'DDD',
        weekFormat: 'DDD',
        monthFormat: 'MM/DD/YYYY',
        view: undefined,
    };

    Calendar.prototype.init = function () {
        if (! this.options.datetime || this.options.datetime == 'now') {
            this.options.datetime = moment();
        }
        if (! this.options.view) {
            this.options.view = 'month';
        }
        this.initScaffold()
            .initStyle()
            .render();
    }

    Calendar.prototype.initScaffold = function () {

        var $elem = $(this.elem),
            $view = $elem.find('.calendar-view'),
            $currentDate = $elem.find('.calendar-current-date');

        if (! $view.length) {
            this.view = document.createElement('div');
            this.view.className = 'calendar-view';
            this.elem.appendChild(this.view);
        } else {
            this.view = $view[0];
        }
        console.log($currentDate);
        console.log($currentDate);

        if ($currentDate.length > 0) {
            var dayFormat = $currentDate.data('day-format'),
                weekFormat = $currentDate.data('week-format'),
                monthFormat = $currentDate.data('month-format');
            this.currentDate = $currentDate[0];
            if (dayFormat) {
                this.options.dayFormat = dayFormat;
            }
            if (weekFormat) {
                this.options.weekFormat = weekFormat;
            }
            if (monthFormat) {
                this.options.monthFormat = monthFormat;
            }
        }
        return this;
    }

    Calendar.prototype.initStyle = function () {
        return this;
    }

    Calendar.prototype.render = function () {
        switch (this.options.view) {
            case 'day': this.renderDayView(); break;
            case 'week': this.renderWeekView(); break;
            case 'month': this.renderMonthView(); break;
                default: this.renderMonth();
        }
    }

    Calendar.prototype.renderDayView = function () {
        //$(this.elem).append('Day View');
    }

    Calendar.prototype.renderWeekView = function () {
        //$(this.elem).append('Week View');
    }

    Calendar.prototype.renderMonthView = function () {

        var datetime = this.options.datetime.clone(),
            month = datetime.month();
        datetime.startOf('month').startOf('week');

        var $view = $(this.view),
            table = document.createElement('table'),
            tbody = document.createElement('tbody');

        $view.html('');
        table.appendChild(tbody);
        table.className = 'table table-bordered';

        var week = 0, i;
        while (week < 6) {
            tr = document.createElement('tr');
            tr.className = 'calendar-month-row';
            for (i = 0; i < 7; i++) {
                td = document.createElement('td');
                td.appendChild(document.createTextNode(datetime.format('D')));
                if (month !== datetime.month()) {
                    td.className = 'calendar-prior-months-date';
                }
                tr.appendChild(td);
                datetime.add(1, 'day');
            }
            tbody.appendChild(tr);
            week++;
        }

        $view[0].appendChild(table);

        if (this.currentDate) {
            $(this.currentDate).html(
                this.options.datetime.format(this.options.monthFormat)
            );
        }

    }

    Calendar.prototype.next = function () {
        switch (this.options.view) {
            case 'day':
                this.options.datetime.add(1, 'day');
                this.render();
                break;
            case 'week':
                this.options.datetime.endOf('week').add(1, 'day');
                this.render();
                break;
            case 'month':
                this.options.datetime.endOf('month').add(1, 'day');
                this.render();
                break;
            default:
                break;
        }
    }

    Calendar.prototype.prev = function () {
        switch (this.options.view) {
            case 'day':
                break;
            case 'week':
                break;
            case 'month':
                this.options.datetime.startOf('month').subtract(1, 'day');
                this.render();
                break;
            default:
                break;
        }
    }

    Calendar.prototype.today = function () {
        this.options.datetime = moment();
        this.render();
    }

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this),
                data  = $this.data('bs.calendar'),
                options = typeof option == 'object' && option;
            if (! data) {
                data = new Calendar(this, options);
                $this.data('bs.calendar', data);
            }

            switch (option) {
                case 'today':
                    data.today();
                    break;
                case 'prev':
                    data.prev();
                    break;
                case 'next':
                    data.next();
                    break;
                default:
                    break;
            }
        });
    };

    var noConflict = $.fn.calendar;

    $.fn.calendar             = Plugin;
    $.fn.calendar.Constructor = Calendar;

    $.fn.calendar.noConflict = function () {
        $.fn.calendar = noConflict;
        return this;
    };

    // Public data API.
    $('[data-toggle="calendar"]').click(function(){
        var $this = $(this),
            $elem = $this.parents('.calendar'),
            action = $this.data('action');
        if (action) {
            $elem.calendar(action);
        }
    });

})(jQuery);

/*
| ------------------------------------------------------------------------------
| Installation
| ------------------------------------------------------------------------------
*/

$('#calendar').calendar();