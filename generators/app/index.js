// 此文件做
const path = require('path')
const fs = require('fs')
const Generators = require('yeoman-generator')

/**
    initializing -您的初始化方法（检查当前项目状态，获取配置等）
    prompting-在提示用户输入选项的位置（您要致电的位置this.prompt()）
    configuring-保存配置并配置项目（创建.editorconfig文件和其他元数据文件）
    default -如果方法名称与优先级不匹配，它将被推送到该组。
    writing -在其中写入生成器特定文件（路由，控制器等）的位置
    conflicts -处理冲突的地方（内部使用）
    install -运行安装的位置（npm，凉亭）
    end-最后一次打扫，打扫，说再见等
 */

module.exports = class extends Generators {
  constructor(args, opts) {
    super(args, opts);
  }
  async prompting() {
    // yeoman 在询问用户环节会自动调用此方法
    // 在此方法中调用父类的 prompt 方法发出对用户的询问

    // { name: xxxx }
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: '项目名称：',
        default: this.appname
      }
    ])
  }

  async getDirectoryFile(tmpPath) {
    if (!tmpPath) {
      return []
    }

    let filesArr = []
    const files = await fs.promises.readdir(tmpPath);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${tmpPath}/${file}`
      const isDirectory = fs.lstatSync(filePath).isDirectory()

      if (isDirectory) {
        const dirFiles = await this.getDirectoryFile(filePath)
        filesArr = filesArr.concat(dirFiles)
      } else {
        const newPath = filePath.replace(`${this.tempPath}/`, '')
        filesArr.push(newPath)
      }
    }
    return filesArr
  }

  writing() {
    /**
     * 手动输出文件
     */
    // 输出文件
    // this.fs.write(
    //   this.destinationPath('temp.txt'),
    //   Math.random().toString()
    // )


    // this.log("app", this.answers.name); // 必须 this.answers.name 才能拿到值

    /**
     * 手动遍历
     */
    // try {
    //   this.tempPath = path.resolve(__dirname, './templates')

    //   const allFiles = await this.getDirectoryFile(this.tempPath)

    //   allFiles.forEach((v) => {
    //     const tmp = this.templatePath(v)
    //     const output = this.destinationPath(v);

    //     this.fs.copyTpl(tmp, output, this.answers)
    //   })
    //   // console.log(files, templatePath)
    // } catch (error) {
    //   console.log('读取获取文件信息失败：', error)
    // }

    /**
     * 根据模板文件以及用户录入的内容输出文件
     */
    // 模板文件的路径，默认是 templates 下的文件路径
    const tmp = this.templatePath('bar.html');
    // 输出目标路径
    const output = this.destinationPath('bar.html');
    // 模板上下文
    // const context = { title: 'hello', success: false };
    const context = this.answers
    this.fs.copyTpl(tmp, output, context)
  }
}