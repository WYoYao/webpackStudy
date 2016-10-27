
// 我们引用样式文件require("!style!css!./style.css");，webpack会按前缀应用合适loader，但这样写比较敏锁，我们可以根据模块类型（扩展名）来自动绑定需要的 loader。
require('!style!css!./class.css');
document.write(require('./content.js'));