// Plop 入口文件，要导出一个函数
// 此函数接收一个 plop 对象

module.exports = plop => {
  plop.setGenerator('component', {
    description: '创建一个组件',
    prompts: [{
      type: 'input',
      name: 'name',
      message: '组件名称',
      default: 'MyComponent'
    }],
    actions: [
      {
        type: 'add', // 代表添加文件
        path: 'src/components/{{name}}/index.js', // 此处的 name 表示 prompts里面的 name 
        templateFile: 'plop-templates/components.hbs'
      }
    ]
  })
}
