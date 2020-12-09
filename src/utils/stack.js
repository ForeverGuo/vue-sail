// 函数递归累加 + 闭包
function fun(a) {
    let args = [], sum = a || 0;
    let str = /^[A-Za-z]*$/;
    if(a) {
        if(str.test(a)) {
            sum = +a.charCodeAt();
            a = -1;
        }
        if(typeof(a) === 'string') {
            sum = +a;
            a = -1;
        }
        if(typeof(a) === 'object') {
            args = args.concat(Object.values(a));
            sum = 0;
            a = -1;
        }
        if(Array.isArray(a)) {
            args = args.concat(a);
            sum = 0;
            a = -1;
        }
    }
    return function(b) {
        if(b) {
            if(str.test(b)) {
                args.push(+b.charCodeAt())
                return arguments.callee;
            }
            if(typeof(b) === 'object') {
                args = args.concat(Object.values(b));
                return arguments.callee;
            }
            args = args.concat([].slice.call(arguments));
            return arguments.callee

        } else {
            let temp = 0, ti = 0;
            //console.log(sum,args);
            args.forEach((item) => {
                if(Array.isArray(item)) {
                    temp = item.reduce((pre, curr) => pre + (+curr), 0);
                } else {
                    /*检查浮点数，也可以去掉，最后保留指定小数*/
                    if(!isInteger(item)) {
                        let intNum = toInteger(item);
                        item = intNum.num;
                        ti += intNum.times;
                    }
                    /*-------*/
                    temp = +item;
                }
                sum += temp;
            })
            
            return ti ? sum/ti : sum;
        }
    }
}

export {
    fun,
}