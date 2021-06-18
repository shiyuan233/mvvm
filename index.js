class GVue extends EventTarget {
  constructor($options) {
    super()
    this.$options = $options;
    this.compile(document.querySelector(this.$options.el))
    this.observer(this.$options.data)
  }

  observer(data) {
    Object.keys(data).forEach(item => {
      this.bindWatch(data, item, data[item])
    })
  }
  bindWatch(data, key, value) {
    let that = this;
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        console.log('get...')
        return value
      },
      set(val) {
        console.log('set...', val)
        console.log(key)
        let event = new CustomEvent(key, {
          detail: {
            value: val,
            key,
          }
        })
        that.dispatchEvent(event);
        value = val
      }
    })
  }
  compile(el) {
    let childNodes = el.childNodes
    childNodes.forEach(item => {
      if (item.nodeType === 1) {
        // 标签
        for (let i of item.attributes) {
          switch (i.nodeName) {
            case 'v-model':
              item.value = this.$options.data[i.nodeValue]
              item.addEventListener('input', () => {
                this.$options.data[i.nodeValue] = item.value
              })
              break;
            default:
              break;
          }
        }
        if (item.childNodes.length > 0) {
          this.compile(item)
        }
      } else if (item.nodeType === 3) {
        // 文本
        let textContent = item.textContent;
        let reg = /\{\{\s*(\S+)\s*\}\}/g;
        if (reg.test(textContent)) {
          item.textContent = textContent.replace(reg, this.$options.data[RegExp.$1])
          this.addEventListener(RegExp.$1, (e) => {
            let r = new RegExp(this.$options.data[e.detail.key])
            item.textContent = item.textContent.replace(r, e.detail.value)
          })
        }
      }
    })
  }
}
// const Data = {
//   code: 1000,
//   desc: 'Success',
//   data: {
//     departments: [{
//         code: '001',
//         parentCode: '',
//         name: '???',
//         orgType: '1',
//         modifyTime: '1607405990',
//         deparmentsCount: '8',
//         domainId: '0',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001',
//         parentCode: '001',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1607405842',
//         deparmentsCount: '31',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: "001001001",

//         parentCode: "001001",

//         name: "孙子",

//         orgType: "1",

//         modifyTime: "1607405842",

//         deparmentsCount: "31",

//         domainId: "",

//         device: [],

//         channel: [],
//       },
//       {
//         code: "00100100100001",
//         parentCode: "001001001",
//         name: "重孙子",
//         orgType: "1",
//         modifyTime: "1607405842",
//         deparmentsCount: "31",
//         domainId: "",
//         device: [],
//         channel: [],
//       },
//       {
//         code: "001001001000010001",
//         parentCode: "00100100100001",
//         name: "重重孙子",
//         orgType: "1",
//         modifyTime: "1607405842",

//         deparmentsCount: "31",

//         domainId: "",

//         device: [],

//         channel: [],
//       },
//       {
//         code: '001001002',
//         parentCode: '001001',
//         name: '4?',
//         orgType: '1',
//         modifyTime: '1607406644',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001003',
//         parentCode: '001001',
//         name: '10?',
//         orgType: '1',
//         modifyTime: '1607406648',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001004',
//         parentCode: '001001',
//         name: '2?',
//         orgType: '1',
//         modifyTime: '1607406651',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001005',
//         parentCode: '001001',
//         name: '201?',
//         orgType: '1',
//         modifyTime: '1607406665',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001006',
//         parentCode: '001001',
//         name: '216?',
//         orgType: '1',
//         modifyTime: '1607406682',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001007',
//         parentCode: '001001',
//         name: '??????',
//         orgType: '1',
//         modifyTime: '1607406703',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001008',
//         parentCode: '001001',
//         name: '39?',
//         orgType: '1',
//         modifyTime: '1607479984',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001009',
//         parentCode: '001001',
//         name: '109?',
//         orgType: '1',
//         modifyTime: '1607479987',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001010',
//         parentCode: '001001',
//         name: '113?',
//         orgType: '1',
//         modifyTime: '1607479991',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001011',
//         parentCode: '001001',
//         name: '71?',
//         orgType: '1',
//         modifyTime: '1607480006',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001012',
//         parentCode: '001001',
//         name: '102?',
//         orgType: '1',
//         modifyTime: '1607480012',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001013',
//         parentCode: '001001',
//         name: '135?',
//         orgType: '1',
//         modifyTime: '1607480019',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001014',
//         parentCode: '001001',
//         name: '52?',
//         orgType: '1',
//         modifyTime: '1607480027',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001015',
//         parentCode: '001001',
//         name: '65?',
//         orgType: '1',
//         modifyTime: '1607480032',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001016',
//         parentCode: '001001',
//         name: '133?',
//         orgType: '1',
//         modifyTime: '1607480039',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001017',
//         parentCode: '001001',
//         name: '58?',
//         orgType: '1',
//         modifyTime: '1607480043',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001018',
//         parentCode: '001001',
//         name: '16?',
//         orgType: '1',
//         modifyTime: '1607480065',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001019',
//         parentCode: '001001',
//         name: '1?',
//         orgType: '1',
//         modifyTime: '1607480068',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001020',
//         parentCode: '001001',
//         name: '11?',
//         orgType: '1',
//         modifyTime: '1607480077',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001021',
//         parentCode: '001001',
//         name: '14?',
//         orgType: '1',
//         modifyTime: '1607480079',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001022',
//         parentCode: '001001',
//         name: '17?',
//         orgType: '1',
//         modifyTime: '1607480083',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001023',
//         parentCode: '001001',
//         name: '76?',
//         orgType: '1',
//         modifyTime: '1607480091',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001024',
//         parentCode: '001001',
//         name: '??????',
//         orgType: '1',
//         modifyTime: '1607480105',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001025',
//         parentCode: '001001',
//         name: '15?',
//         orgType: '1',
//         modifyTime: '1607480123',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001026',
//         parentCode: '001001',
//         name: '12?',
//         orgType: '1',
//         modifyTime: '1607480140',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001027',
//         parentCode: '001001',
//         name: '??1???',
//         orgType: '1',
//         modifyTime: '1607480153',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001028',
//         parentCode: '001001',
//         name: '204?',
//         orgType: '1',
//         modifyTime: '1607480170',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001029',
//         parentCode: '001001',
//         name: '130?',
//         orgType: '1',
//         modifyTime: '1607480167',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001030',
//         parentCode: '001001',
//         name: '115?',
//         orgType: '1',
//         modifyTime: '1616399714',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001031',
//         parentCode: '001001',
//         name: '77?',
//         orgType: '1',
//         modifyTime: '1616926049',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001031gsy',
//         parentCode: '001001031',
//         name: '77?',
//         orgType: '1',
//         modifyTime: '1616926049',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001001031gsyhhhhh',
//         parentCode: '001001031gsy',
//         name: '77?',
//         orgType: '1',
//         modifyTime: '1616926049',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002',
//         parentCode: '001',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1607406289',
//         deparmentsCount: '31',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002001',
//         parentCode: '001002',
//         name: '221?',
//         orgType: '1',
//         modifyTime: '1607480290',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002002',
//         parentCode: '001002',
//         name: '55?',
//         orgType: '1',
//         modifyTime: '1607480328',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002003',
//         parentCode: '001002',
//         name: '??????',
//         orgType: '1',
//         modifyTime: '1607480338',
//         deparmentsCount: '5',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002003001',
//         parentCode: '001002003',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1619345752',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002003002',
//         parentCode: '001002003',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1619345768',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002003003',
//         parentCode: '001002003',
//         name: '??12?',
//         orgType: '1',
//         modifyTime: '1619345797',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002003004',
//         parentCode: '001002003',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1619346551',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002003005',
//         parentCode: '001002003',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1619346622',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002004',
//         parentCode: '001002',
//         name: '53?',
//         orgType: '1',
//         modifyTime: '1607480348',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002005',
//         parentCode: '001002',
//         name: '68?',
//         orgType: '1',
//         modifyTime: '1607480351',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002006',
//         parentCode: '001002',
//         name: '57?',
//         orgType: '1',
//         modifyTime: '1607480355',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002007',
//         parentCode: '001002',
//         name: '100?',
//         orgType: '1',
//         modifyTime: '1607480368',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002008',
//         parentCode: '001002',
//         name: '205?',
//         orgType: '1',
//         modifyTime: '1607480371',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002009',
//         parentCode: '001002',
//         name: '87?',
//         orgType: '1',
//         modifyTime: '1607480375',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002010',
//         parentCode: '001002',
//         name: '139?',
//         orgType: '1',
//         modifyTime: '1607480386',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002011',
//         parentCode: '001002',
//         name: '67?',
//         orgType: '1',
//         modifyTime: '1607480390',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002012',
//         parentCode: '001002',
//         name: '203?',
//         orgType: '1',
//         modifyTime: '1607480395',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002013',
//         parentCode: '001002',
//         name: '73?',
//         orgType: '1',
//         modifyTime: '1607480408',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002014',
//         parentCode: '001002',
//         name: '23?',
//         orgType: '1',
//         modifyTime: '1607480412',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002015',
//         parentCode: '001002',
//         name: '206?',
//         orgType: '1',
//         modifyTime: '1607480419',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002016',
//         parentCode: '001002',
//         name: '86?',
//         orgType: '1',
//         modifyTime: '1607480430',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002017',
//         parentCode: '001002',
//         name: '42?',
//         orgType: '1',
//         modifyTime: '1607480433',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002018',
//         parentCode: '001002',
//         name: '40?',
//         orgType: '1',
//         modifyTime: '1607480437',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002019',
//         parentCode: '001002',
//         name: '520?',
//         orgType: '1',
//         modifyTime: '1607480446',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002020',
//         parentCode: '001002',
//         name: '220?',
//         orgType: '1',
//         modifyTime: '1607480453',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002021',
//         parentCode: '001002',
//         name: '118?',
//         orgType: '1',
//         modifyTime: '1607480466',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002022',
//         parentCode: '001002',
//         name: '302?',
//         orgType: '1',
//         modifyTime: '1607480474',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002023',
//         parentCode: '001002',
//         name: '131?',
//         orgType: '1',
//         modifyTime: '1616564327',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002024',
//         parentCode: '001002',
//         name: '138?',
//         orgType: '1',
//         modifyTime: '1616565899',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002025',
//         parentCode: '001002',
//         name: '223?',
//         orgType: '1',
//         modifyTime: '1616566345',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002026',
//         parentCode: '001002',
//         name: '83?',
//         orgType: '1',
//         modifyTime: '1616567572',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002027',
//         parentCode: '001002',
//         name: '218?',
//         orgType: '1',
//         modifyTime: '1616572613',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002028',
//         parentCode: '001002',
//         name: '46?',
//         orgType: '1',
//         modifyTime: '1616926511',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002029',
//         parentCode: '001002',
//         name: '70?',
//         orgType: '1',
//         modifyTime: '1616931627',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002030',
//         parentCode: '001002',
//         name: '5?',
//         orgType: '1',
//         modifyTime: '1619244432',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001002031',
//         parentCode: '001002',
//         name: '??',
//         orgType: '1',
//         modifyTime: '1619400060',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003',
//         parentCode: '001',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1607406316',
//         deparmentsCount: '24',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003001',
//         parentCode: '001003',
//         name: '19?',
//         orgType: '1',
//         modifyTime: '1607480586',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003002',
//         parentCode: '001003',
//         name: '213?',
//         orgType: '1',
//         modifyTime: '1607480591',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003003',
//         parentCode: '001003',
//         name: '215?',
//         orgType: '1',
//         modifyTime: '1607480595',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003004',
//         parentCode: '001003',
//         name: '3?',
//         orgType: '1',
//         modifyTime: '1607480602',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003005',
//         parentCode: '001003',
//         name: '20?',
//         orgType: '1',
//         modifyTime: '1607480605',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003006',
//         parentCode: '001003',
//         name: '??????',
//         orgType: '1',
//         modifyTime: '1607480615',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003007',
//         parentCode: '001003',
//         name: '59?',
//         orgType: '1',
//         modifyTime: '1607480623',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003008',
//         parentCode: '001003',
//         name: '62?',
//         orgType: '1',
//         modifyTime: '1607480626',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003009',
//         parentCode: '001003',
//         name: '8?',
//         orgType: '1',
//         modifyTime: '1607480630',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003010',
//         parentCode: '001003',
//         name: '79?',
//         orgType: '1',
//         modifyTime: '1607480637',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003011',
//         parentCode: '001003',
//         name: '72?',
//         orgType: '1',
//         modifyTime: '1607480641',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003012',
//         parentCode: '001003',
//         name: '?????',
//         orgType: '1',
//         modifyTime: '1607480662',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003013',
//         parentCode: '001003',
//         name: '85?',
//         orgType: '1',
//         modifyTime: '1607480670',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003014',
//         parentCode: '001003',
//         name: '9?',
//         orgType: '1',
//         modifyTime: '1607480672',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003015',
//         parentCode: '001003',
//         name: '101?',
//         orgType: '1',
//         modifyTime: '1607480677',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003016',
//         parentCode: '001003',
//         name: '81?',
//         orgType: '1',
//         modifyTime: '1607480686',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003017',
//         parentCode: '001003',
//         name: '82?',
//         orgType: '1',
//         modifyTime: '1607480690',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003018',
//         parentCode: '001003',
//         name: '212?',
//         orgType: '1',
//         modifyTime: '1607480696',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003019',
//         parentCode: '001003',
//         name: '28?',
//         orgType: '1',
//         modifyTime: '1607480703',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003020',
//         parentCode: '001003',
//         name: '132?',
//         orgType: '1',
//         modifyTime: '1607480710',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003021',
//         parentCode: '001003',
//         name: '211?',
//         orgType: '1',
//         modifyTime: '1607480717',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003022',
//         parentCode: '001003',
//         name: '60?',
//         orgType: '1',
//         modifyTime: '1607480720',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003024',
//         parentCode: '001003',
//         name: '208?',
//         orgType: '1',
//         modifyTime: '1616573003',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001003025',
//         parentCode: '001003',
//         name: '29?',
//         orgType: '1',
//         modifyTime: '1617180061',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001005',
//         parentCode: '001',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1607406331',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001007',
//         parentCode: '001',
//         name: '??',
//         orgType: '1',
//         modifyTime: '1607406343',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001008',
//         parentCode: '001',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1607406350',
//         deparmentsCount: '2',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001008001',
//         parentCode: '001008',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1607480829',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [{
//             id: '1000535',
//             sort: '0'
//           },
//           {
//             id: '1000536',
//             sort: '0'
//           },
//           {
//             id: '1000537',
//             sort: '0'
//           },
//           {
//             id: '1000538',
//             sort: '0'
//           }
//         ],
//         channel: [{
//             id: '1000535$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000535$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000535$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000535$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000536$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000536$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000536$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000536$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000537$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000537$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000537$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000537$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000538$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000538$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000538$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000538$1$0$3',
//             sort: '0'
//           }
//         ]
//       },
//       {
//         code: '001008002',
//         parentCode: '001008',
//         name: '????',
//         orgType: '1',
//         modifyTime: '1607480834',
//         deparmentsCount: '5',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001008002001',
//         parentCode: '001008002',
//         name: '605',
//         orgType: '1',
//         modifyTime: '1607480873',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [{
//             id: '1000559',
//             sort: '0'
//           },
//           {
//             id: '1000560',
//             sort: '0'
//           },
//           {
//             id: '1000561',
//             sort: '0'
//           },
//           {
//             id: '1000562',
//             sort: '0'
//           },
//           {
//             id: '1000563',
//             sort: '0'
//           },
//           {
//             id: '1000564',
//             sort: '0'
//           },
//           {
//             id: '1000566',
//             sort: '0'
//           },
//           {
//             id: '1000567',
//             sort: '0'
//           },
//           {
//             id: '1000568',
//             sort: '0'
//           },
//           {
//             id: '1000569',
//             sort: '0'
//           },
//           {
//             id: '1000570',
//             sort: '0'
//           }
//         ],
//         channel: [{
//             id: '1000559$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000559$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000559$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000559$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000560$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000560$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000560$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000560$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000561$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000561$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000561$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000561$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000562$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000562$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000562$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000562$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000563$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000563$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000563$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000563$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000564$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000564$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000564$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000564$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000566$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000566$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000566$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000566$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000567$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000567$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000567$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000567$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000568$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000568$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000568$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000568$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000569$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000569$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000569$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000569$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000570$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000570$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000570$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000570$1$0$3',
//             sort: '0'
//           }
//         ]
//       },
//       {
//         code: '001008002002',
//         parentCode: '001008002',
//         name: '606',
//         orgType: '1',
//         modifyTime: '1607480876',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [{
//             id: '1000554',
//             sort: '0'
//           },
//           {
//             id: '1000555',
//             sort: '0'
//           },
//           {
//             id: '1000556',
//             sort: '0'
//           },
//           {
//             id: '1000557',
//             sort: '0'
//           },
//           {
//             id: '1000558',
//             sort: '0'
//           }
//         ],
//         channel: [{
//             id: '1000554$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000554$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000554$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000554$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000555$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000555$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000555$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000555$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000556$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000556$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000556$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000556$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000557$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000557$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000557$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000557$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000558$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000558$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000558$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000558$1$0$3',
//             sort: '0'
//           }
//         ]
//       },
//       {
//         code: '001008002003',
//         parentCode: '001008002',
//         name: '633',
//         orgType: '1',
//         modifyTime: '1607480878',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [{
//             id: '1000549',
//             sort: '0'
//           },
//           {
//             id: '1000550',
//             sort: '0'
//           },
//           {
//             id: '1000551',
//             sort: '0'
//           },
//           {
//             id: '1000552',
//             sort: '0'
//           },
//           {
//             id: '1000553',
//             sort: '0'
//           }
//         ],
//         channel: [{
//             id: '1000549$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000549$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000549$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000549$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000550$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000550$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000550$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000550$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000551$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000551$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000551$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000551$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000552$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000552$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000552$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000552$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000553$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000553$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000553$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000553$1$0$3',
//             sort: '0'
//           }
//         ]
//       },
//       {
//         code: '001008002004',
//         parentCode: '001008002',
//         name: '622',
//         orgType: '1',
//         modifyTime: '1607480883',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [{
//             id: '1000544',
//             sort: '0'
//           },
//           {
//             id: '1000545',
//             sort: '0'
//           },
//           {
//             id: '1000546',
//             sort: '0'
//           },
//           {
//             id: '1000547',
//             sort: '0'
//           },
//           {
//             id: '1000548',
//             sort: '0'
//           }
//         ],
//         channel: [{
//             id: '1000544$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000544$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000544$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000544$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000545$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000545$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000545$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000545$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000546$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000546$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000546$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000546$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000547$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000547$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000547$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000547$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000548$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000548$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000548$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000548$1$0$3',
//             sort: '0'
//           }
//         ]
//       },
//       {
//         code: '001008002005',
//         parentCode: '001008002',
//         name: '611',
//         orgType: '1',
//         modifyTime: '1607480885',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [{
//             id: '1000539',
//             sort: '0'
//           },
//           {
//             id: '1000540',
//             sort: '0'
//           },
//           {
//             id: '1000541',
//             sort: '0'
//           },
//           {
//             id: '1000542',
//             sort: '0'
//           },
//           {
//             id: '1000543',
//             sort: '0'
//           }
//         ],
//         channel: [{
//             id: '1000539$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000539$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000539$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000539$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000540$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000540$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000540$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000540$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000541$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000541$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000541$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000541$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000542$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000542$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000542$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000542$1$0$3',
//             sort: '0'
//           },
//           {
//             id: '1000543$1$0$0',
//             sort: '0'
//           },
//           {
//             id: '1000543$1$0$1',
//             sort: '0'
//           },
//           {
//             id: '1000543$1$0$2',
//             sort: '0'
//           },
//           {
//             id: '1000543$1$0$3',
//             sort: '0'
//           }
//         ]
//       },
//       {
//         code: '001009',
//         parentCode: '001',
//         name: 'ceshi',
//         orgType: '1',
//         modifyTime: '1607406355',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       },
//       {
//         code: '001010',
//         parentCode: '001',
//         name: '??',
//         orgType: '1',
//         modifyTime: '1618410268',
//         deparmentsCount: '0',
//         domainId: '',
//         device: [],
//         channel: []
//       }
//     ]
//   }
// }
// const Data = {
//   code: 1000,

//   desc: "Success",

//   data: {
//     departments: [
//       {
//         code: "001001001",

//         parentCode: "001001",

//         name: "孙子",

//         orgType: "1",

//         modifyTime: "1607405842",

//         deparmentsCount: "31",

//         domainId: "",

//         device: [],

//         channel: [],
//       },
//       {
//         code: "00100100100001",

//         parentCode: "001001001",

//         name: "重孙子",

//         orgType: "1",

//         modifyTime: "1607405842",

//         deparmentsCount: "31",

//         domainId: "",

//         device: [],

//         channel: [],
//       },
//       {
//         code: "001001001000010001",

//         parentCode: "00100100100001",

//         name: "重重孙子",

//         orgType: "1",

//         modifyTime: "1607405842",

//         deparmentsCount: "31",

//         domainId: "",

//         device: [],

//         channel: [],
//       },
//       {
//         code: "0010010010000100010001",

//         parentCode: "001001001000010001",

//         name: "重重孙子",

//         orgType: "1",

//         modifyTime: "1607405842",

//         deparmentsCount: "31",

//         domainId: "",

//         device: [],

//         channel: [],
//       },
//     ],
//   },
// };


// function treeData(arr) {
//   let temp = {};
//   let obj = [];
//   arr.forEach((item, index) => {
//     temp[arr[index]['code']] = item
//   })
//   arr.forEach((item, index) => {
//     let current = item;
//     let tempCurrent = temp[item.parentCode]; // 找到当前父级
//     if (tempCurrent) {
//       if (!tempCurrent.children) {
//         tempCurrent.children = [] // 当前父级无children 就加个进去
//       }
//       tempCurrent.children.push(current) // 在当前父级插入
//     } else {
//       current.children = []
//       obj.push(current) // 如果没有父级单独为一级
//     }
//   })
//   console.log(temp)
//   console.log(obj)
// }
// // console.log(Data.data.departments)
// treeData(Data.data.departments)