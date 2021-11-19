# 后台管理系统

### 技术栈

- vue-cli
- vite2.x
- vue3.x
- antd-design-vue2.x
- typescript4.x

## 2021-10-20

1. 登录页 注册

2. 信息发布页

   "theme": "主题", 下拉框
   "keyWord ": "关键字", 输入框
   "category": "类别", 多级下拉
   "sentenceLibrary": "语句库", 大的输入框 最多限制 30 个字
   "originalLink": "原文链接", 输入框
   "originalTitle": "原文标题", 输入框
   "originalDate": "原文发布时间", 时间控件 到小时
   "visitNumber": "访问次数" 不能修改 新增 没有这个字段

可以删除 新增 查询 分页前端自己分

3. 语句页 /sentence/list
   "sentenceNumber": "语句编号", 系统生成
   "sentenceContent": "语句内容", 输入框
   "wordCount": "字数统计", 系统生成
   "syntaxTree": "语法树", 系统生成
   "visitNumber": "访问次数" 系统生成

   是否收藏

可以删除 新增 查询 分页前端自己分

4. 语句收藏页

   "sentence_id": "语句 ID",
   "notes": "笔记", 富文本
   "last_visit_date": "最近一次访问时间",
   "visit_number": "访问次数"

可以删除 新增 查询 分页前端自己分

5. 首页
   上面有广告区域
   输入框 + - 语法分析
   下面展示的接口数据

## 2021-10-24

主题 类别 列表值？

关键字 类别 语句库 加宽 必填

语句库 原文链接 可以添加多个

## 2021-10-28

首页 输入框 加号 减号开发 接口联调
token 获取接口 返回值需要返回字符串

## 2021-11-1

82.157.114.215:8080/token
82.157.114.215:8080/checkToken
82.157.114.215:8080/analysis
