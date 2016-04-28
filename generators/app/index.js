'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }, function(answers) {
      this.props = answers
      this.log(answers.name);
      done();
    }.bind(this));
  },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function () {
          var projectName = this.props.name.replace(' ','-');
          this.fs.copyTpl(
              this.templatePath('_package.json'),
              this.destinationPath('package.json'), {
                  name: projectName
              }
          );
          this.fs.copyTpl(
              this.templatePath('_bower.json'),
              this.destinationPath('bower.json'), {
                  name: projectName
              }
          );
          this.fs.copy(
            this.templatePath('bowerrc'),
            this.destinationPath('.bowerrc')
          );
      },
    //Copy application files
    app:function(){
      var projectName = this.props.name.replace(' ','-');
        this.fs.copy(
          this.templatePath('css/_main.css'),
          this.destinationPath('css/main.css')
        );
        this.fs.copy(
          this.templatePath('js/_main.js'),
          this.destinationPath('js/main.js')
        );
        this.fs.copy(
            this.templatePath('scss/_main.scss'),
            this.destinationPath('scss/main.scss')
          );
        this.fs.copyTpl(
          this.templatePath('_index.html'),
          this.destinationPath('index.html'),{
            name: projectName
          }
        );
        this.fs.copy(
          this.templatePath('_Gruntfile.js'),
          this.destinationPath('Gruntfile.js')
        );
    },

    //Install Dependencies
    install: function() {
      this.installDependencies();
    }
  },
});
