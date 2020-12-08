type StringObj = { [k: string]: string }
type UrlParamBack = null | string | StringObj;

/**
 * 获取数据类型
 * @param {any} value 需要判断的值
 * @return "String","Object","Array"...
 */
export function getType(value: any) {
    return Object.prototype.toString.call(value).slice(8, -1)
  }
  
  export function isDef(val: unknown): boolean {
    return val !== undefined && val !== null;
  }
  
  export function isObject(val: unknown): val is Record<any, any> {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Object';
  }
  
  export function isArray(val: unknown): boolean {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Array';
  }
  
  export function isString(val: unknown): boolean {
    return Object.prototype.toString.call(val).slice(8, -1) === 'String';
  }

  /**
 * 获取url参数值
 * @param {String} name 参数名称(不传则返回一个全部参数对象)
 */
export function getUrlParam(name: string = ''): UrlParamBack {
    let href = window.location.href, i = href.indexOf("?");
    if (i < 0) return null;
    let str = href.slice(i);
    if (!str) return null;
    let arr = str.match(/([^?&=#]+)=([^?&=#/]*)/g);
    if (!arr) return null;
    let obj: StringObj = {}
    arr.forEach(v => {
      let temp = v.split('=');
      if (temp.length > 0) {
        obj[temp[0]] = temp[1];
      }
    })
    if (name) return obj[name]
    return obj
  }


  Function.prototype.call = function (context: any) {
    context = context || window; 
    let args = [];
    context.fn = this;
    for(let i=1, len=arguments.length; i<len; i++) {
        args.push(arguments[i]);
    };

    const result = context.fn(...args);
    return result;
  }

  Function.prototype.apply = function(context: any, arr: any) {
    context = context || window;
    context.fn = this;
    let result;
    if(!arr) {
        result = context.fn();
    } else {
        if(!(arr instanceof Array)) throw new Error('params must be array');
        result = context.fn(...arr);
    }

    delete context.fn;
    return result;
  }

  Function.prototype.bind = function(context) {
    if(typeof this !== 'function') { throw new TypeError('what is trying to be bound is not callback') };
    let args = Array.prototype.slice.call(arguments, 1);
    let fn = this,
        _fn = function(){};
    let bound = function() {
        let params = Array.prototype.slice.call(arguments);
        fn.apply(this.constructor === fn ? this : context, args.concat(params));
    }

    _fn.prototype = fn.prototype;
    bound.prototype = new _fn();

    return bound;
  }