function isReserveWords(name) {
    const reserveWords = ["var"];
    return reserveWords.includes(name);
}

function tokenizer(input) {
    let tokens = [],
        current = 0;
    while(current < input.length) {
        let char = input[current];
        if(char === "(") {
            tokens.push({
                type: "paren",
                value: "("
            })
            current++;
            continue;
        }

        if(char === ")") {
            tokens.push({
                type: "paren",
                value: ")"
            })
            current++;
            continue;
        }

        if(char === ":") {
            tokens.push({
                type: "colon",
                value: ":"
            })
            current++;
            continue;
        }
 
        if(char === ",") {
            tokens.push({
                type: "comma",
                value: ","
            })
            current++;
            continue;
        }
        
        if(char === ";") {
            // tokens.push({
            //     type: "semicolon",
            //     value: ";"
            // })
            current++;
            continue;
        }

        // 去除空格
        let WHITESPACE = /\s/;
        if(WHITESPACE.test(char)) {
            current++;
            continue;
        }
        let NUMBERS = /[0-9]/;
        if(NUMBERS.test(char)) {
            let value = "";
            
            while(NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({
                type: "number",
                value
            })

            continue;
        }

        // 解析字符串，这里只处理了双引号的字符串
        if(char === '"') {
            let value = "";
            char = input[++current];
            while(char !== '"') {
                value += char;
                char = input[++current];
            }
            current++;
            tokens.push({
                type: "string",
                value
            })
            continue;
        }

        // 处理函数，变量名，除开上面的字面量后，只有保留字和函数变量了
        
        let LETTERS = /[a-z]/i;
        if(LETTERS.test(char)) {
            let value = "";
            while(LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }
            if(isReserveWords(value)) {
                tokens.push({
                    type: "reserveWords",
                    value
                })
            } else {
                tokens.push({
                    type: "name",
                    value
                })
            }
        }
        try {
            char
        }catch(e) {
            throw new TypeError("I donot know what this character is :" + char);
        }
        
    }

    return tokens;
}

// 将词法分析获得的tokens解析成AST
function parser(tokens) {
    let current = 0;
    let ast = {
        type: "Program",
        body: []
    };

    while(current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;

    function walk() {
        let token = tokens[current];
        if(token.type === "string") {
            current++;
            return {
                type: "StringLiteral",
                value: token.value
            }
        }
        if(token.type === "semicolon") {
            current++;
            return {
                type: "LineEnd",
                value: token.value
            }
        }
        if(token.type === "comma" || token.type === "colon") {
            current++;
            return walk();
        }

        if(token.type === "name") {
            let next = tokens[current + 1];
            // 函数调用型
            if(next.type === "paren" && next.value === "(") {
                let node = {
                    type: "CallExpression",
                    name: token.value,
                    params: []
                };
                token = tokens[++current];
                ++current;
                while(token.type !== "paren" || token.value !== ")") {
                    let param = walk();
                    if(param) {
                        node.params.push(param);
                    }
                    token = tokens[current];
                }
                ++current;
                return node;
            } else if (next.type === 'colon') {
                ++current;
                // 命名参数
                let node = {
                    type: "NameParam",
                    name: token.value,
                    value: walk()
                };
                return node;
            }
        }
    
    }

}

// 根据ast拼接新的代码字符串

function codeGenerator(node, index, nodeList) {
    switch (node.type) {
        case "Program":
            return node.body.map(codeGenerator).join("\n");
        case "CallExpression":
            return `${node.name}(${node.params.map(codeGenerator).join(", ")})`;
        // 处理命名参数形式
        case "NameParam":
            let str = "";
            if(index === 0) {
                str += "{";
            }
            str += node.name + ":" + codeGenerator(node.value);
            if(index === nodeList.length - 1) {
                str += "}";
            }
            return str;
        case "StringLiteral":
            return '"' + node.value + '"';
        default:
            console.log("node", node);
            // throw new TypeError(node.type);
    }
}

function compiler(input) {
    let tokens = tokenizer(input);
    let ast = parser(tokens);
    let output = codeGenerator(ast);

    return output;
}

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
            args.concat(Object.values(a));
            a = -1;
        }
        if(Array.isArray(a)) {
            args.concat(a);
            a = -1;
        }
    }

    return function(b) {
        console.log(b);
        if(arguments.length) {
            args = args.concat([].slice.call(arguments));
            console.log(args);
            return arguments.callee
        } else {
            let temp = 0;
            args.forEach((item) => {
                if(Array.isArray(item)) {
                    temp = item.reduce((pre, curr) => pre + curr, 0);
                }
                sum += temp;
            }) 
            return sum;
        }
    }
}

export {
    tokenizer,
    parser, 
    compiler,
}