var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  // 以下方法会按顺序被执行
  // 应用：可以使用 prompt 来收集用户输入的信息，copyTpl将收集的信息填到模版上

  initPackage() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your Project Name",
        default: this.appname
      }
    ])
    const packagejson = {
      "name": answers.name,
      "version": "1.0.0",
      "description": "",
      "main": "generator/app/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
      },
      "dependencies": {
      }
    }
    this.fs.extendJSON(this.destinationPath("package.json"), packagejson);
    this.npmInstall(["vue"], { "save-dev": false });
    this.npmInstall(["webpack", "vue-loader", "vue-style-loader", "copy-webpack-plugin",
      "css-loader", "vue-template-compiler"], { "save-dev": true });
  }

  // 文件模版
  async copyFile() {
    this.fs.copyTpl(
      this.templatePath('HelloWord.vue'),
      this.destinationPath('src/HelloWord.vue')
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answers.name }
    )
  }
};