/* global Jarosh */
(function($) {
    
    var loc = 'ru';
    
    $[loc] = function() {

        return {

            daysow: function(num, abbr) {
                var r = [
                    ['-','-'],
                    ['Вс','Воскресенье'],
                    ['Пн','Понедельник'],
                    ['Вт','Вторник'],
                    ['Ср','Среда'],
                    ['Чт','Четверг'],
                    ['Пт','Пятница'],
                    ['Сб','Суббота']
                ];
                return num
                    ? r[num][(abbr!==true)?1:0]
                    : Jarosh.column(r,(abbr!==true)?1:0);
            },

            months: function(num, abbr) {
                var r = [
                    ['-','-'],
                    ['Янв','Январь'],
                    ['Фев','Февраль'],
                    ['Мар','Март'],
                    ['Апр','Апрель'],
                    ['Май','Май'],
                    ['Июн','Июнь'],
                    ['Июл','Июль'],
                    ['Авг','Август'],
                    ['Сен','Сентябрь'],
                    ['Окт','Октябрь'],
                    ['Ноя','Ноябрь'],
                    ['Дек','Декабрь']
                ];
                return num
                    ? r[num][(abbr!==true)?1:0]
                    : Jarosh.column(r,(abbr!==true)?1:0);
            },

            period: {

                _: function(val, key, map) {
                    var r = map[0];
                    var v = val[key] % 100;
                    if (!(v>10 && v<20))
                        switch (v%10) {
                            case 1:
                                r = map[1];
                                break;
                            case 2: case 3: case 4:
                                 r = map[2];
                                 break;
                        }
                    return r;
                },

                s: function(val) {
                    return $[loc]().period._(val, 's', ['секунд', 'секунду', 'секунды']);
                },

                i: function(val) {
                    return $[loc]().period._(val, 'm', ['минут', 'минуту', 'минуты']);
                },

                h: function(val) {
                    return $[loc]().period._(val, 'h', ['часов', 'час', 'часа']);
                },

                d: function(val) {
                    return $[loc]().period._(val, 'D', ['дней', 'день', 'дня']);
                },

                m: function(val) {
                    return $[loc]().period._(val, 'M', ['месяцев', 'месяц', 'месяца']);
                },

                y: function(val) {
                    return $[loc]().period._(val, 'Y', ['лет', 'год', 'года']);
                }

            }

        };

    };

} (Jarosh.DateTime) );