class GVue {
  constructor($options) {
    this.$options = $options;
    this.compile(document.querySelector(this.$options.el))
  }

  compile(el) {
    let childNodes = el.childNodes
    childNodes.forEach(item => {
      if (item.nodeType === 1) {
        // 标签
        if (item.childNodes.length > 0) {
          this.compile(item)
        }
      } else if (item.nodeType === 3) {
        // 文本
        let textContent = item.textContent;
        let reg = /\{\{\s*(\S+)\s*\}\}/g;
        if (reg.test(textContent)) {
          console.log(this.$options.data[RegExp.$1])
          item.textContent = textContent.replace(reg, this.$options.data[RegExp.$1])
        }
      }
    })
  }
}