Jarosh = { DateTime: function(input, offset) {
    
    var self = arguments.callee;
    
    var _days = function(num, abbr) {
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
    };
    
    var _months = function(num, abbr) {
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
    };
        
    var _days_in_month = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    
    //__________________________________________________________________________ 
    
    var _isNumericString = function(str)
    {
        for (var i=0; i<str.length; i++)
            if (isNaN(str[i]))
                return false;
        return true;
    };
    //__________________________________________________________________________ 
    
    var _normalize = function(input)
    {
        if (input.D < 0) 
        {
            input.M--;
            input.D += 30;
        }
        
        if (input.h < 0) 
        {
            input.D--;
            input.h += 24;
        }
        
        if (input.m < 0) 
        {
            input.h--;
            input.m += 60;
        }
        
        if (input.s < 0) 
        {
            input.m--;
            input.s += 60;
        }
        
        return (input.D<0 || input.h<0 || input.m<0 || input.s<0);
    };
    //__________________________________________________________________________ 
    
    var _parse = function(input, offset)
    {
        var r = {
            Y : 0,
            M : 0,
            D : 0,
            h : 0,
            m : 0,
            s : 0
        };
        
        if (!(input instanceof Date) && !isNaN(Date.parse(input)))
            input = Date.parse(input);
        
        if (!input)
            input = '0';
        
        if (input instanceof Date)
        {
            if (offset!=undefined && offset!=null && !isNaN(offset))
                input = new Date(input.getTime()+offset*1000);
                //alert( '@' + (new Date().getTime()) + ' / ' + (new Date(input.getTime()-offset*1000).getTime()) );
                
            r = {
                Y : input.getFullYear(),
                M : (input.getMonth()+1),
                D : input.getDate(),
                h : input.getHours(),
                m : input.getMinutes(),
                s : input.getSeconds()
            };
        }
        else
        {
            input = (input+'').trim();
            if (input.trim().length>=11 && input.trim().length<=14 && _isNumericString(input.trim()))
            {
                input = input.trim();
                r = {
                    Y : parseInt(input.substring(0,input.length-10)),
                    M : '' + parseInt( (parseInt(input[input.length-10])?input[input.length-10]:'') + input[input.length-9] ),
                    D : '' + parseInt( (parseInt(input[input.length-8])?input[input.length-8]:'')   + input[input.length-7] ),
                    h : '' + parseInt( (parseInt(input[input.length-6])?input[input.length-6]:'')   + input[input.length-5] ),
                    m : '' + parseInt( (parseInt(input[input.length-4])?input[input.length-4]:'')   + input[input.length-3] ),
                    s : '' + parseInt( (parseInt(input[input.length-2])?input[input.length-2]:'')   + input[input.length-1] )
                };
            }
        }
        
        return r;
    };
    //__________________________________________________________________________ 
    
    var _ = _parse( (!input ? new Date() : input), offset );
    
    return {
        
        //______________________________________________________________________
        
        days: function(func) {
            if (func instanceof Function)
                _days = func;
            return this;
        },
        //______________________________________________________________________
        
        months: function(func) {
            if (func instanceof Function)
                _months = func;
            return this;
        },
        //______________________________________________________________________
        
        format: function(format) {
            
            var r = '';
            
            for (var i=0; i<format.length; i++) {
                r += (format[i]!='\\')
                    ? this.getX(format[i])
                    : (format[i+1] ? format[++i] : '');
            }

            return r;
        },
        //______________________________________________________________________

        getDay: function()
        {
            return _.D;
        },
        //______________________________________________________________________

        getMonth: function()
        {
            return _.M;
        },
        //______________________________________________________________________

        getYear: function()
        {
            return _.Y;
        },
        //______________________________________________________________________

        getHours: function()
        {
            return _.h;
        },
        //______________________________________________________________________

        getMinutes: function()
        {
            return _.m;
        },
        //______________________________________________________________________

        getSeconds: function()
        {
            return _.s;
        },
        //______________________________________________________________________

        getX: function(x)
        {
            var r = '*';

            switch (x)
            {
                // ---------- Day: ----------
                case 'd':
                    r = (_.D.length==2 || _.D>=10) ? _.D : '0'+_.D;
                    break;
                case 'D':
                    r = _days(this.getDayOfWeek(), true);
                    break;
                case 'j':
                    r = _.D;
                    break;
                case 'l':
                    r = _days(this.getDayOfWeek());
                    break;
                case 'N':
                    r = (this.getDayOfWeek()-1!=0) ? this.getDayOfWeek()-1 : 7;
                    break;
                case 'w':
                    r = this.getDayOfWeek()-1;
                    break;
                case 'z':
                    r = this.getDayOfYear()-1;
                    break;
                // ---------- Month: ----------
                case 'F':
                    r = _months(_.M);
                    break;
                case 'm':
                    r = (_.M.length==2 || _.M>=10) ? _.M : '0'+_.M;
                    break;
                case 'M':
                    r = _months(_.M, true);
                    break;
                case 'n':
                    r = _.M;
                    break;
                case 't':
                    r = _days_in_month[_.M];
                    break;
                // ---------- Year: ----------
                case 'L':
                    r = this.isLeapYear(_.Y) ? 1 : 0;
                    break;
                case 'Y':
                    r = _.Y;
                    break;
                case 'y':
                    var Y = _.Y;
                    for (var i=0; i<4-_.Y.length; i++)
                        Y = '0'+Y;
                    r = Y;
                    break;
                // ---------- Time: ----------
                case 'a':
                    r = (_.h<12) ? 'am' : 'pm';
                    break;
                case 'A':
                    r = (_.h<12) ? 'AM' : 'PM';
                    break;
                case 'g':
                    r = _.h-((_.h<12)?0:12);
                    break;
                case 'G':
                    r = _.h;
                    break;
                case 'h':
                    r = _.h-((_.h<12)?0:12);
                    if (r<10)
                        r = '0'+r;
                    break;
                case 'H':
                    r = (_.h<10) ? '0'+_.h : _.h;
                    break;
                case 'i':
                    r = (_.m<10) ? '0'+_.m : _.m;
                    break;
                case 's':
                    r = (_.s<10) ? '0'+_.s : _.s;
                    break;

                default:
                    r = x;
                    break;
            }

            return r;
        },
        //______________________________________________________________________

        getDayOfWeek: function()
        {
            var y = parseInt(_.Y);
            var m = parseInt(_.M);
            var d = parseInt(_.D);

            var checkpoint_day = 0;
            var checkpoint_dow = 2; // Tue

            for (var i=1; i<1980; i++)
            {
                checkpoint_day += (!this.isLeapYear(i)) ? 365 : 366;
            }

            for (var i=1; i<=y; i++)
            {
                if (i!=y)
                    d += (!this.isLeapYear(i)) ? 365 : 366;
                else
                    for (var j=1; j<m; j++)
                        d += _days_in_month[j];
            }

            return (d-checkpoint_day)%7+checkpoint_dow;
        },
        //______________________________________________________________________

        getDayOfYear: function()
        {
            var m = parseInt(_.M);
            var d = parseInt(_.D);

            for (var i=1; i<m; i++)
            {
                d += _days_in_month[i];
                if (m==1 && this.isLeapYear(_.Y))
                    d++;
            }

            return d;
        },
        //______________________________________________________________________

        isLeapYear: function(year)
        {
            year = (year==undefined)
                ? parseInt(_.Y)
                : parseInt(year);

            return (year%400==0 || year%4==0)
                ? 1
                : 0;
        },
        //______________________________________________________________________

        add: function(date)
        {
            throw 'Not implemented';
        },
        //______________________________________________________________________
        
        sub: function(date)
        {
            throw 'Not implemented';
        },
        //______________________________________________________________________
        
        diff: function(date)
        {
            if (!(date instanceof Object))
                date = self(date);
            
            //alert(JSON.stringify(date.getYear()));
            
            var M = (this.getYear()-date.getYear())*12 + (this.getMonth()-date.getMonth());
            var D = (this.getDay()-date.getDay());
            var h = (this.getHours()-date.getHours());
            var m = (this.getMinutes()-date.getMinutes());
            var s = (this.getSeconds()-date.getSeconds());

            var r = {
                M : M,
                D : D,
                h : h,
                m : m,
                s : s,
                format: function(format, precision) {
                    
                    var r = '';

                    var short = false;
                    
                    if (this.M>=0)
                    {
                        if (this.M>0)
                        {
                            var t_w = Math.floor(this.M*4.345238095+this.D/7);
                            r = t_w + (short ? 'w' : (' week' + ((t_w>1)?'s':'')));
                        }
                        else
                        if (this.D>0)
                        {
                            if (this.D>=7)
                            {
                               r = Math.floor(this.D/7) + (short ? 'w' : (' week' + ((Math.floor(this.D/7)>1)?'s':'')));
                            }
                            else
                            {
                                r = this.D + (short ? 'd' : (' day' + ((this.D>1)?'s':'')));
                            }
                        }
                        else
                        if (this.h>0)
                        {
                            r = this.h + (short ? 'h' : (' hour' + ((this.h>1)?'s':'')));
                        }
                        else
                        if (this.m>0)
                        {
                            r = this.m + (short ? 'm' : (' minute' + ((this.m>1)?'s':'')));
                        }
                        else
                        if (this.s>0)
                        {
                            r = this.s + (short ? 's' : (' second' + ((this.s>1)?'s':'')));
                        }
                    }

                    return !short
                        ? ( ((r.length>0) ? r : 'a moment') + ' ago' )
                        : ( ((r.length>0) ? r : 'now') );
                }
            };

            while (_normalize(r));

            return r;
        }
        //______________________________________________________________________
        
    };
    
} };


Jarosh.DateTime.FORMAT          = "Y-m-d h:i:s";
Jarosh.DateTime.FORMAT_ATOM     = "Y-m-d\TH:i:sP";
Jarosh.DateTime.FORMAT_COOKIE   = "l, d-M-Y H:i:s T";
Jarosh.DateTime.FORMAT_ISO8601  = "Y-m-d\TH:i:sO";
Jarosh.DateTime.FORMAT_RFC822   = "D, d M y H:i:s O";
Jarosh.DateTime.FORMAT_RFC850   = "l, d-M-y H:i:s T";
Jarosh.DateTime.FORMAT_RFC1036  = "D, d M y H:i:s O";
Jarosh.DateTime.FORMAT_RFC1123  = "D, d M Y H:i:s O";
Jarosh.DateTime.FORMAT_RFC2822  = "D, d M Y H:i:s O";
Jarosh.DateTime.FORMAT_RFC3339  = "Y-m-d\TH:i:sP";
Jarosh.DateTime.FORMAT_RSS      = "D, d M Y H:i:s O";
Jarosh.DateTime.FORMAT_W3C      = "Y-m-d\TH:i:sP";
