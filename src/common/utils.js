//  防抖函数
export function debounce(func, delay=100) {
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


//  时间戳转换函数
export function formatDate(date, fmt) {
    // 获取年份
    // y+  --->  匹配的时间字符串以何种形式呈现
    // 例如： yyyy --> 2019  yyy --> 019  yy --> 19  y --> 9
    /*
    * y+ 表示匹配一个或者多个
    * y* 表示匹配0个或者多个
    * y? 表示匹配0个或者1个
    * */

    //  隐式转换字符串，截取字符串以匹配传入字符串长度
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    // 获取
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}