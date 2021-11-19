export const stOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]

export const mockData = [
  {
    theme: '哈哈',
    key_word: '烦烦烦',
    cetegory: ['zhejiang', 'Hangzhou', 'xihu'],
    sentence_library: [
      {
        sentence_library_name: '语句库',
        original_link: 'www.baidu.com',
        original_title: '百度就是号',
        sententce: [
          { sentence_content: 'jijijojo叽叽叽叽' },
          { sentence_content: '方法烦烦烦丹丹' }
        ]
      }
    ]
  },
  {
    theme: 'fdfd',
    key_word: '22fff烦烦',
    cetegory: ['zhejiang', 'Hangzhou', 'xihu'],
    sentence_library: [
      {
        sentence_library_name: '语句库1',
        original_link: '2www.baidu.com',
        original_title: '2百度就是号',
        sententce: [
          { sentence_content: '2jijijojo叽叽叽叽' },
          { sentence_content: '2方法烦烦烦丹丹' }
        ]
      }
    ]
  }
]
