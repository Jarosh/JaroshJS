/* global Jarosh */
(function($) {
    
    var loc = 'en';
    
    $[loc] = function() {

        return {

            daysow: function(num, abbr) {
                var arr = [
                    '-',
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ];
                return (abbr!==true)
                    ? arr[num]
                    : arr[num].substring(0,3);
            },

            months: function(num, abbr) {
                var arr = [
                    '-',
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];
                return (abbr!==true)
                    ? arr[num]
                    : arr[num].substring(0,3);
            },

            period: {

                s: function(val) {
                    return 'second' + (val.s!==1?'s':'');
                },

                i: function(val) {
                    return 'minute' + (val.s!==1?'s':'');
                },

                h: function(val) {
                    return 'hour' + (val.s!==1?'s':'');
                },

                d: function(val) {
                    return 'day' + (val.D!==1?'s':'');
                },

                m: function(val) {
                    return 'minth' + (val.M!==1?'s':'');
                },

                y: function(val) {
                    return 'year' + (val.Y!==1?'s':'');
                }

            }
            
        };

    };

} (Jarosh.DateTime) );