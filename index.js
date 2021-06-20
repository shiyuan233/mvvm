class GVue extends EventTarget {
  constructor($options) {
    super()
    this.$options = $options;
    this.compile(document.querySelector(this.$options.el))
    this.init()
  }
  init() {
    for (let key in this.$options.data) {
      this.observer(this.$options.data, key, this.$options.data[key])
    }
  }
  observer(obj, key, value) {
    let that = this
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        console.log('get...')
        return value
      },
      set(newValue) {
        console.log('set...');
        let event = new CustomEvent(key, {
          detail: newValue
        })
        that.dispatchEvent(event)
        value = newValue
      }
    })
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
          item.textContent = textContent.replace(reg, this.$options.data[RegExp.$1])
        }
        this.addEventListener(RegExp.$1, e => {
          console.log('触发了', e);
          let oldValue = this.$options.data[RegExp.$1];
          let reg = new RegExp(oldValue);
          item.textContent = item.textContent.replace(reg, e.detail);
        })
      }
    })
  }
}