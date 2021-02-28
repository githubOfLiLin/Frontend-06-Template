var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    // this.option('babel'); // This method adds support for a `--babel` flag
  }
  // 以下方法会按顺序被执行

  // 输入输出
  async method1() {
    this.log('method1');
    // prompt 允许输入
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your Project Name",
        default: this.appname
      }, {
        type: "confirm",
        name: "cool",
        message: "Would you like to enable the Cool feature?"
      }
    ])
    this.log("app name", answers.name);
    this.log("cool feature", answers.cool);
  }

  // 文件模版
  async method2() {
    this.fs.copyTpl(
      this.templatePath('t.html'),
      this.destinationPath('public/index.html'),
      { title: 'Template with Yeoman' }
    )
  }
  // 应用：可以使用 prompt 来收集用户输入的信息，copyTpl将收集的信息填到模版上

  initPackage() {
    const packagejson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    }
    this.fs.extendJSON(this.destinationPath("package.json"), packagejson);
    this.npmInstall();
  }
};