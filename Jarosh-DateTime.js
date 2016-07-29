/* global Function */
(function($) {

    
    $.Jarosh = $.Jarosh || {};


    $.Jarosh.DateTime = function(value, timezone, format, offset) {

        var self = arguments.callee;

        var _days_in_month = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        
        var _locale = 'en';
        var _daysow = null;
        var _months = null;

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

        var _parse = function(input, format, offset)
        {
            var r = {
                Y : 1,
                M : 1,
                D : 1,
                h : 0,
                m : 0,
                s : 0
            };


            format = format || 'YmdHis';

            //if (!(input instanceof Date) && !isNaN(Date.parse(input)))
            //    input = Date.parse(input);

            if (!input)
                input = '0';

            if (input instanceof Date)
            {
                if (!isNaN(offset) && offset)
                    input = new Date(input.getTime()+offset*1000);

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

                


                var prs = {
                    num: function(str, len, min, max) {
                        var tmp = '';
                        if (len)
                        {
                            tmp = str.substring(0,len);
                            if (!tmp.match(/^[0-9]+$/))
                                throw 'Parse Error';
                        }
                    },
                    str: function(str, len, lim) {
                        
                    }
                };







                for (var i=0; i<input.length; i++) {
                    if (format[i]!=='\\')
                        switch (format[i]) {
                            case 'd':
                                prs.num(input.substring(i+1),2,1,31);
                                break;
                            case 'm':

                                break;
                            case 'Y':

                                break;
                            case 'H':

                                break;
                            case 'i':

                                break;
                            case 's':

                                break;
                        }
                    else
                        i++;
                }            






                /*
                if (input.length>=11 && input.length<=14 && _isNumericString(input))
                {
                    r = {
                        Y : parseInt(input.substring(0,input.length-10)),
                        M : '' + parseInt( (parseInt(input[input.length-10])?input[input.length-10]:'') + input[input.length-9] ),
                        D : '' + parseInt( (parseInt(input[input.length-8])?input[input.length-8]:'')   + input[input.length-7] ),
                        h : '' + parseInt( (parseInt(input[input.length-6])?input[input.length-6]:'')   + input[input.length-5] ),
                        m : '' + parseInt( (parseInt(input[input.length-4])?input[input.length-4]:'')   + input[input.length-3] ),
                        s : '' + parseInt( (parseInt(input[input.length-2])?input[input.length-2]:'')   + input[input.length-1] )
                    };
                }
                */
            }

            return r;
        };
        //__________________________________________________________________________ 

        var _setTimezone = function(timezone) {
            timezone = timezone || 'UTC';
            _.Z = $.Jarosh.DateTime['TMZONE_'+timezone.toUpperCase()]
                ? timezone.toUpperCase()
                : 'UTC';
        };
        //__________________________________________________________________________ 

        var _ = _parse( (!value ? new Date() : value), format, offset );

        _setTimezone(timezone);

        return {

            cls: 'Jarosh.DateTime',

            //______________________________________________________________________

            days: function(func) {
                if (func instanceof Function)
                    _daysow = func;
                return this;
            },
            //______________________________________________________________________

            months: function(func) {
                if (func instanceof Function)
                    _months = func;
                return this;
            },
            //______________________________________________________________________

            locale: function(locale) {
                if (typeof locale !== 'undefined')
                    _locale = locale;
                return _locale;
            },
            //______________________________________________________________________

            format: function(format) {

                format = format || $.Jarosh.DateTime.FORMAT;
                
                var r = '';

                for (var i=0; i<format.length; i++) {
                    r += (format[i]!=='\\')
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
                        r = (_.D.length===2 || _.D>=10) ? _.D : '0'+_.D;
                        break;
                    case 'D':
                        r = ( (_daysow instanceof Function)
                            ? _daysow
                            : $.Jarosh.DateTime[this.locale()]().daysow
                        )(this.getDayOfWeek(), true);
                        break;
                    case 'j':
                        r = _.D;
                        break;
                    case 'l':
                        r = ( (_daysow instanceof Function)
                            ? _daysow
                            : $.Jarosh.DateTime[this.locale()]().daysow
                        )(this.getDayOfWeek());
                        break;
                    case 'N':
                        r = (this.getDayOfWeek()-1!==0) ? this.getDayOfWeek()-1 : 7;
                        break;
                    case 'w':
                        r = this.getDayOfWeek()-1;
                        break;
                    case 'z':
                        r = this.getDayOfYear()-1;
                        break;
                    // ---------- Month: ----------
                    case 'F':
                        r = ( (_months instanceof Function)
                            ? _months
                            : $.Jarosh.DateTime[this.locale()]().months
                        )(_.M, false, _);
                        break;
                    case 'm':
                        r = (_.M.length===2 || _.M>=10) ? _.M : '0'+_.M;
                        break;
                    case 'M':
                        r = ( (_months instanceof Function)
                            ? _months
                            : $.Jarosh.DateTime[this.locale()]().months
                        )(_.M, true, _);
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
                    case 'u':
                        r = '000000';
                        break;
                    // ---------- Timezone: ----------
                    case 'O':
                        r = this.getTimezoneOffset(false).split(':').join('');
                        break;
                    case 'P':
                        r = this.getTimezoneOffset(false);
                        break;
                    case 'T':
                        r = _.Z;
                        break;
                    case 'Z':
                        r = Math.floor(this.getTimezoneOffset()*60*60);
                        break;  
                    // ---------- Misc.: ----------
                    case 'U':
                        r = Math.floor( (new Date()).getTime() / 1000 );
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
                    if (i!==y)
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
                    if (m===1 && this.isLeapYear(_.Y))
                        d++;
                }

                return d;
            },
            //______________________________________________________________________

            getTimestamp: function()
            {

            },
            //______________________________________________________________________

            getTimezone: function()
            {
                return _.Z;
            },
            //______________________________________________________________________

            getTimezoneOffset: function(numeric)
            {
                numeric = (numeric!==false);

                var r = $.Jarosh.DateTime['TMZONE_'+_.Z];

                if (!numeric)
                {
                    r = ( (r<0) ? '-' : '+' )
                        + ( (r<10) ? '0' : '' )
                        + Math.floor(r)
                        + ':'
                        + Math.floor(r%1*60);
                }

                return r;
            },
            //______________________________________________________________________

            isLeapYear: function(year)
            {
                year = (typeof year === 'undefined')
                    ? parseInt(_.Y)
                    : parseInt(year);

                return (year%400===0 || year%4===0)
                    ? 1
                    : 0;
            },
            //______________________________________________________________________

            modify: function(value)
            {
                alert(value);
                return this;
            },
            //______________________________________________________________________

            setDate: function(year, month, day)
            {
                this.modify([
                    $.Jarosh.zerofill(year,4),
                    $.Jarosh.zerofill(month,2),
                    $.Jarosh.zerofill(day,2),
                    $.Jarosh.zerofill(_.h,2),
                    $.Jarosh.zerofill(_.m,2),
                    $.Jarosh.zerofill(_.s,2)
                ].join());
                return this;
            },
            //______________________________________________________________________

            setISODate: function(year, week, day)
            {
                return this;
            },
            //______________________________________________________________________

            setTime: function(hour, minute, second)
            {
                this.modify([
                    $.Jarosh.zerofill(_.Y,4),
                    $.Jarosh.zerofill(_.M,2),
                    $.Jarosh.zerofill(_.D,2),
                    $.Jarosh.zerofill(hour,2),
                    $.Jarosh.zerofill(minute,2),
                    $.Jarosh.zerofill(second,2)
                ].join());
                return this;
            },
            //______________________________________________________________________

            setTimestamp: function(timestamp)
            {
                this.modify(new Date(timestamp*1000));
                return this;
            },
            //______________________________________________________________________

            setTimezone: function(timezone, readjust)
            {
                _setTimezone(timezone);
                return this;
            },
            //______________________________________________________________________

            add: function(date)
            {
                throw 'Not implemented';
                return this;
            },
            //______________________________________________________________________

            sub: function(date)
            {
                throw 'Not implemented';
                return this;
            },
            //______________________________________________________________________

            diff: function(date)
            {
                if (!(date instanceof Object))
                    date = self(date);

                var r = {
                    Y : (this.getYear()-date.getYear()),
                    M : (this.getMonth()-date.getMonth()),// + (this.getYear()-date.getYear())*12,
                    D : (this.getDay()-date.getDay()),
                    h : (this.getHours()-date.getHours()),
                    m : (this.getMinutes()-date.getMinutes()),
                    s : (this.getSeconds()-date.getSeconds())
                };

                //alert(JSON.stringify(r));

                while (_normalize(r));

                return self.Interval(r);
            }
            //______________________________________________________________________

        };

    };


    //
    //


    $.Jarosh.DateTime.Interval = function(interval) {


        var _ = {
            A: interval.A || null, // in minutes
            Y: interval.Y || 0,
            M: interval.M || 0,
            D: interval.D || 0,
            h: interval.h || 0,
            m: interval.m || 0,
            s: interval.s || 0
        };

        var _format = {

        };


        return {

            cls: 'Jarosh.DateTime.Interval',

            format: function(format, filter) {

                var r = '';

                if (typeof format !== 'object') {

                    for (var i=0; i<format.length; i++) {
                        switch (format[i]) {
                            case '%':
                                r += format[i+1] ? this.getX(format[++i]) : '';
                                break;
                            case '#':
                                r += format[i+1] ? _format[format[++i]](_) : '';
                                break;
                            default:
                                r += format[i];
                                break;
                        }
                    }

                } else {

                    r = [];

                    for (var i=0; i<format.length; i++) {
                        r.push(this.format(format[i]));
                    }

                }

                return r;





                var r = '';

                var short = false;

                if (_.M>=0)
                {
                    if (_.M>0)
                    {
                        var t_w = Math.floor(_.M*4.345238095+_.D/7);
                        r = t_w + (short ? 'w' : (' week' + ((t_w>1)?'s':'')));
                    }
                    else
                    if (_.D>0)
                    {
                        if (_.D>=7)
                        {
                           r = Math.floor(_.D/7) + (short ? 'w' : (' week' + ((Math.floor(_.D/7)>1)?'s':'')));
                        }
                        else
                        {
                            r = _.D + (short ? 'd' : (' day' + ((_.D>1)?'s':'')));
                        }
                    }
                    else
                    if (_.h>0)
                    {
                        r = _.h + (short ? 'h' : (' hour' + ((_.h>1)?'s':'')));
                    }
                    else
                    if (_.m>0)
                    {
                        r = _.m + (short ? 'm' : (' minute' + ((_.m>1)?'s':'')));
                    }
                    else
                    if (_.s>0)
                    {
                        r = _.s + (short ? 's' : (' second' + ((_.s>1)?'s':'')));
                    }
                }

                return !short
                    ? ( ((r.length>0) ? r : 'a moment') + ' ago' )
                    : ( ((r.length>0) ? r : 'now') );
            },


            getX: function(x, char) {

                char = char || (char===true);

                var r = '*';

                switch (x) {
                    case 'Y':
                        r = $.Jarosh.zerofill(_.Y, 2);
                        break;
                    case 'y':
                        r = _.Y;
                        break;
                    case 'M':
                        r = $.Jarosh.zerofill(_.M, 2);
                        break;
                    case 'm':
                        r = _.M;
                        break;
                    case 'D':
                        r = $.Jarosh.zerofill(_.D, 2);
                        break;
                    case 'd':
                        r = _.D;
                        break;
                    case 'a':
                        r = _.A ? Math.floor(_.A/60/24) : 'N/A';
                        break;
                    case 'H':
                        r = $.Jarosh.zerofill(_.h, 2);
                        break;
                    case 'h':
                        r = _.h;
                        break;
                    case 'I':
                        r = $.Jarosh.zerofill(_.m, 2);
                        break;
                    case 'i':
                        r = _.m;
                        break;
                    case 'S':
                        r = $.Jarosh.zerofill(_.s, 2);
                        break;
                    case 's':
                        r = _.s;
                        break;
                    case 'R':
                        r = (!_.A || _.A>=0) ? '+' : '-';
                        break;
                    case 'r':
                        r = (!_.A || _.A>=0) ? '' : '-';
                        break;
                    default:
                        r = x;
                        break;
                }

                return r;
            },


            setFormatChar: function(chr, fun) {
                if (fun instanceof Function)
                    _format[chr] = fun;
                else
                    throw "Jarosh.DateTime.Interval.setFormatChar / 'fun' must be of a Function type";
                return this;
            }


        };

    };
    
    //
    //
    
    $.Jarosh.column = $.Jarosh.zerofill || function(array, col) {
        var r = [];
        for (var i=0; i<array.length; i++) {
          r.push(array[i][col]);
        }
        return r;
    };
    
    
    $.Jarosh.zerofill = $.Jarosh.zerofill || function(value, width) {
        value = value || '';
        width -= value.toString().length;
        return ( width > 0 )
            ? ( new Array( width + (/\./.test( value ) ? 2 : 1) ).join('0') + value )
            : ( value + '' );
    };
    
    //
    //

    $.Jarosh.DateTime.FORMAT            = "Y-m-d h:i:s";
    $.Jarosh.DateTime.FORMAT_ATOM       = "Y-m-d\TH:i:sP";
    $.Jarosh.DateTime.FORMAT_COOKIE     = "l, d-M-Y H:i:s T";
    $.Jarosh.DateTime.FORMAT_ISO8601    = "Y-m-d\TH:i:sO";
    $.Jarosh.DateTime.FORMAT_RFC822     = "D, d M y H:i:s O";
    $.Jarosh.DateTime.FORMAT_RFC850     = "l, d-M-y H:i:s T";
    $.Jarosh.DateTime.FORMAT_RFC1036    = "D, d M y H:i:s O";
    $.Jarosh.DateTime.FORMAT_RFC1123    = "D, d M Y H:i:s O";
    $.Jarosh.DateTime.FORMAT_RFC2822    = "D, d M Y H:i:s O";
    $.Jarosh.DateTime.FORMAT_RFC3339    = "Y-m-d\TH:i:sP";
    $.Jarosh.DateTime.FORMAT_RSS        = "D, d M Y H:i:s O";
    $.Jarosh.DateTime.FORMAT_W3C        = "Y-m-d\TH:i:sP";

    $.Jarosh.DateTime.PERIOD_S          = 1;
    $.Jarosh.DateTime.PERIOD_I          = $.Jarosh.DateTime.PERIOD_S * 60;
    $.Jarosh.DateTime.PERIOD_H          = $.Jarosh.DateTime.PERIOD_I * 60;
    $.Jarosh.DateTime.PERIOD_D          = $.Jarosh.DateTime.PERIOD_H * 24;
    $.Jarosh.DateTime.PERIOD_M          = $.Jarosh.DateTime.PERIOD_D * 365.25 / 12;
    $.Jarosh.DateTime.PERIOD_Y          = $.Jarosh.DateTime.PERIOD_D * 365.25;

    $.Jarosh.DateTime.TMZONE_ACDT       = 10.5;
    $.Jarosh.DateTime.TMZONE_ACST       = 9.5;
    $.Jarosh.DateTime.TMZONE_ACT        = -5; // 8
    $.Jarosh.DateTime.TMZONE_ADT        = -3;
    $.Jarosh.DateTime.TMZONE_AEDT       = 11;
    $.Jarosh.DateTime.TMZONE_AEST       = 10;
    $.Jarosh.DateTime.TMZONE_AFT        = 4.5;
    $.Jarosh.DateTime.TMZONE_AKDT       = -8;
    $.Jarosh.DateTime.TMZONE_AKST       = -9;
    $.Jarosh.DateTime.TMZONE_AMST       = -3;
    $.Jarosh.DateTime.TMZONE_AMT        = -4; // 4
    $.Jarosh.DateTime.TMZONE_ART        = -3;
    $.Jarosh.DateTime.TMZONE_AST        = 3; // -4
    $.Jarosh.DateTime.TMZONE_AWDT       = 9;
    $.Jarosh.DateTime.TMZONE_AWST       = 8;
    $.Jarosh.DateTime.TMZONE_AZOST      = -1;
    $.Jarosh.DateTime.TMZONE_AZT        = 4;
    $.Jarosh.DateTime.TMZONE_BDT        = 8; // 6
    $.Jarosh.DateTime.TMZONE_BIOT       = 6;
    $.Jarosh.DateTime.TMZONE_BIT        = -12;
    $.Jarosh.DateTime.TMZONE_BOT        = -4;
    $.Jarosh.DateTime.TMZONE_BRST       = -2;
    $.Jarosh.DateTime.TMZONE_BRT        = -3;
    $.Jarosh.DateTime.TMZONE_BST        = 6; // 11, 1
    $.Jarosh.DateTime.TMZONE_BTT        = 6;
    $.Jarosh.DateTime.TMZONE_CAT        = 2;
    $.Jarosh.DateTime.TMZONE_CCT        = 6.5;
    $.Jarosh.DateTime.TMZONE_CDT        = -5; // -4
    $.Jarosh.DateTime.TMZONE_CEDT       = 2;
    $.Jarosh.DateTime.TMZONE_CEST       = 2;
    $.Jarosh.DateTime.TMZONE_CET        = 1;
    $.Jarosh.DateTime.TMZONE_CHADT      = 13.75;
    $.Jarosh.DateTime.TMZONE_CHAST      = 12.75;
    $.Jarosh.DateTime.TMZONE_CHOT       = 8;
    $.Jarosh.DateTime.TMZONE_ChST       = 10;
    $.Jarosh.DateTime.TMZONE_CHUT       = 10;
    $.Jarosh.DateTime.TMZONE_CIST       = -8;
    $.Jarosh.DateTime.TMZONE_CIT        = 8;
    $.Jarosh.DateTime.TMZONE_CKT        = -10;
    $.Jarosh.DateTime.TMZONE_CLST       = -3;
    $.Jarosh.DateTime.TMZONE_CLT        = -4;
    $.Jarosh.DateTime.TMZONE_COST       = -4;
    $.Jarosh.DateTime.TMZONE_COT        = -5;
    $.Jarosh.DateTime.TMZONE_CST        = -6; // 8, 9.5, 10.5, -5
    $.Jarosh.DateTime.TMZONE_CT         = 8;
    $.Jarosh.DateTime.TMZONE_CVT        = -1;
    $.Jarosh.DateTime.TMZONE_CWST       = 8.75;
    $.Jarosh.DateTime.TMZONE_CXT        = 7;
    $.Jarosh.DateTime.TMZONE_DAVT       = 7;
    $.Jarosh.DateTime.TMZONE_DDUT       = 10;
    $.Jarosh.DateTime.TMZONE_DFT        = 1;
    $.Jarosh.DateTime.TMZONE_EASST      = -5;
    $.Jarosh.DateTime.TMZONE_EAST       = -6;
    $.Jarosh.DateTime.TMZONE_EAT        = 3;
    $.Jarosh.DateTime.TMZONE_ECT        = -4; // -5
    $.Jarosh.DateTime.TMZONE_EDT        = -4;
    $.Jarosh.DateTime.TMZONE_EEDT       = 3;
    $.Jarosh.DateTime.TMZONE_EEST       = 3;
    $.Jarosh.DateTime.TMZONE_EET        = 2;
    $.Jarosh.DateTime.TMZONE_EGST       = 0;
    $.Jarosh.DateTime.TMZONE_EGT        = -1;
    $.Jarosh.DateTime.TMZONE_EIT        = 9;
    $.Jarosh.DateTime.TMZONE_EST        = -5; // 10
    $.Jarosh.DateTime.TMZONE_FET        = 3;
    $.Jarosh.DateTime.TMZONE_FJT        = 12;
    $.Jarosh.DateTime.TMZONE_FKST       = -3;
    $.Jarosh.DateTime.TMZONE_FKT        = -4;
    $.Jarosh.DateTime.TMZONE_FNT        = -2;
    $.Jarosh.DateTime.TMZONE_GALT       = -6;
    $.Jarosh.DateTime.TMZONE_GAMT       = -9;
    $.Jarosh.DateTime.TMZONE_GET        = 4;
    $.Jarosh.DateTime.TMZONE_GFT        = -3;
    $.Jarosh.DateTime.TMZONE_GILT       = 12;
    $.Jarosh.DateTime.TMZONE_GIT        = -9;
    $.Jarosh.DateTime.TMZONE_GMT        = 0;
    $.Jarosh.DateTime.TMZONE_GST        = -2; // 4
    $.Jarosh.DateTime.TMZONE_GYT        = -4;
    $.Jarosh.DateTime.TMZONE_HADT       = -9;
    $.Jarosh.DateTime.TMZONE_HAEC       = 2;
    $.Jarosh.DateTime.TMZONE_HAST       = -10;
    $.Jarosh.DateTime.TMZONE_HKT        = 8;
    $.Jarosh.DateTime.TMZONE_HMT        = 5;
    $.Jarosh.DateTime.TMZONE_HOVT       = 7;
    $.Jarosh.DateTime.TMZONE_HST        = -10;
    $.Jarosh.DateTime.TMZONE_IBST       = 0;
    $.Jarosh.DateTime.TMZONE_ICT        = 7;
    $.Jarosh.DateTime.TMZONE_IDT        = 3;
    $.Jarosh.DateTime.TMZONE_IOT        = 3;
    $.Jarosh.DateTime.TMZONE_IRDT       = 4.5;
    $.Jarosh.DateTime.TMZONE_IRKT       = 8;
    $.Jarosh.DateTime.TMZONE_IRST       = 3.5;
    $.Jarosh.DateTime.TMZONE_IST        = 5.5; // 1, 2
    $.Jarosh.DateTime.TMZONE_JST        = 9;
    $.Jarosh.DateTime.TMZONE_KGT        = 6;
    $.Jarosh.DateTime.TMZONE_KOST       = 11;
    $.Jarosh.DateTime.TMZONE_KRAT       = 7;
    $.Jarosh.DateTime.TMZONE_KST        = 9;
    $.Jarosh.DateTime.TMZONE_LHST       = 10.5; // 11
    $.Jarosh.DateTime.TMZONE_LINT       = 14;
    $.Jarosh.DateTime.TMZONE_MAGT       = 12;
    $.Jarosh.DateTime.TMZONE_MART       = -9.5;
    $.Jarosh.DateTime.TMZONE_MAWT       = 5;
    $.Jarosh.DateTime.TMZONE_MDT        = -6;
    $.Jarosh.DateTime.TMZONE_MET        = 1;
    $.Jarosh.DateTime.TMZONE_MEST       = 2;
    $.Jarosh.DateTime.TMZONE_MHT        = 12;
    $.Jarosh.DateTime.TMZONE_MIST       = 11;
    $.Jarosh.DateTime.TMZONE_MIT        = -9.5;
    $.Jarosh.DateTime.TMZONE_MMT        = 6.5;
    $.Jarosh.DateTime.TMZONE_MSK        = 3;
    $.Jarosh.DateTime.TMZONE_MST        = 8; // -7, 6.5
    $.Jarosh.DateTime.TMZONE_MUT        = 4;
    $.Jarosh.DateTime.TMZONE_MVT        = 5;
    $.Jarosh.DateTime.TMZONE_MYT        = 8;
    $.Jarosh.DateTime.TMZONE_NCT        = 11;
    $.Jarosh.DateTime.TMZONE_NDT        = -2.5;
    $.Jarosh.DateTime.TMZONE_NFT        = 11;
    $.Jarosh.DateTime.TMZONE_NPT        = 5.75;
    $.Jarosh.DateTime.TMZONE_NST        = -3.5;
    $.Jarosh.DateTime.TMZONE_NT         = -3.5;
    $.Jarosh.DateTime.TMZONE_NUT        = -11;
    $.Jarosh.DateTime.TMZONE_NZDT       = 13;
    $.Jarosh.DateTime.TMZONE_NZST       = 12;
    $.Jarosh.DateTime.TMZONE_OMST       = 6;
    $.Jarosh.DateTime.TMZONE_ORAT       = 5;
    $.Jarosh.DateTime.TMZONE_PDT        = -7;
    $.Jarosh.DateTime.TMZONE_PET        = -5;
    $.Jarosh.DateTime.TMZONE_PETT       = 12;
    $.Jarosh.DateTime.TMZONE_PGT        = 10;
    $.Jarosh.DateTime.TMZONE_PHOT       = 13;
    $.Jarosh.DateTime.TMZONE_PKT        = 5;
    $.Jarosh.DateTime.TMZONE_PMDT       = -2;
    $.Jarosh.DateTime.TMZONE_PMST       = -3;
    $.Jarosh.DateTime.TMZONE_PONT       = 11;
    $.Jarosh.DateTime.TMZONE_PST        = -8; // 8
    $.Jarosh.DateTime.TMZONE_PYST       = -3;
    $.Jarosh.DateTime.TMZONE_PYT        = -4;
    $.Jarosh.DateTime.TMZONE_RET        = 4;
    $.Jarosh.DateTime.TMZONE_ROTT       = -3;
    $.Jarosh.DateTime.TMZONE_SAKT       = 11;
    $.Jarosh.DateTime.TMZONE_SAMT       = 4;
    $.Jarosh.DateTime.TMZONE_SAST       = 2;
    $.Jarosh.DateTime.TMZONE_SBT        = 11;
    $.Jarosh.DateTime.TMZONE_SCT        = 4;
    $.Jarosh.DateTime.TMZONE_SGT        = 8;
    $.Jarosh.DateTime.TMZONE_SLST       = 5.5;
    $.Jarosh.DateTime.TMZONE_SRET       = 11;
    $.Jarosh.DateTime.TMZONE_SRT        = -3;
    $.Jarosh.DateTime.TMZONE_SST        = -11; // 8
    $.Jarosh.DateTime.TMZONE_SYOT       = 3;
    $.Jarosh.DateTime.TMZONE_TAHT       = -10;
    $.Jarosh.DateTime.TMZONE_THA        = 7;
    $.Jarosh.DateTime.TMZONE_TFT        = 5;
    $.Jarosh.DateTime.TMZONE_TJT        = 5;
    $.Jarosh.DateTime.TMZONE_TKT        = 13;
    $.Jarosh.DateTime.TMZONE_TLT        = 9;
    $.Jarosh.DateTime.TMZONE_TMT        = 5;
    $.Jarosh.DateTime.TMZONE_TOT        = 13;
    $.Jarosh.DateTime.TMZONE_TVT        = 12;
    $.Jarosh.DateTime.TMZONE_UCT        = 0;
    $.Jarosh.DateTime.TMZONE_ULAT       = 8;
    $.Jarosh.DateTime.TMZONE_USZ1       = 2;
    $.Jarosh.DateTime.TMZONE_UTC        = 0;
    $.Jarosh.DateTime.TMZONE_UYST       = -2;
    $.Jarosh.DateTime.TMZONE_UYT        = -3;
    $.Jarosh.DateTime.TMZONE_UZT        = 5;
    $.Jarosh.DateTime.TMZONE_VET        = -4.5;
    $.Jarosh.DateTime.TMZONE_VLAT       = 10;
    $.Jarosh.DateTime.TMZONE_VOLT       = 4;
    $.Jarosh.DateTime.TMZONE_VOST       = 6;
    $.Jarosh.DateTime.TMZONE_VUT        = 11;
    $.Jarosh.DateTime.TMZONE_WAKT       = 12;
    $.Jarosh.DateTime.TMZONE_WAST       = 2;
    $.Jarosh.DateTime.TMZONE_WAT        = 1;
    $.Jarosh.DateTime.TMZONE_WEDT       = 1;
    $.Jarosh.DateTime.TMZONE_WEST       = 1;
    $.Jarosh.DateTime.TMZONE_WET        = 0;
    $.Jarosh.DateTime.TMZONE_WIT        = 7;
    $.Jarosh.DateTime.TMZONE_WST        = 8;
    $.Jarosh.DateTime.TMZONE_YAKT       = 9;
    $.Jarosh.DateTime.TMZONE_YEKT       = 5;
    $.Jarosh.DateTime.TMZONE_Z          = 0;

} (this) );