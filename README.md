# grunt-gathercontent

> get content formt gathercontent

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gathercontent --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gathercontent');
```

## The "gathercontent" task

### Overview
In your project's Gruntfile, add a section named `gathercontent` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gathercontent: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options


#### accountName
Type: `String`

Your gathercontent.com account name

#### apiKey
Type: `String`

Your gathercontent.com api key

#### projectId
Type: `String`

The project to fetch data from

#### jsonDest
Type: `String`
Default value: `data/json`

The directory where the data (json) will be saved

#### fileDest
Type: `String`
Default value: `data/files`

The directory where the files will be saved

#### downloadFiles
Type: `Boolean`
Default value: `true`

Setting this to false will prevent the task from downloading the project's files

#### pageDir
Type: `Boolean`
Default value: `true`

Puts every file from a page in a directory named with the page_id (1288859/filename.jpg...))

### Usage Examples

```js
grunt.initConfig({
  gathercontent: {
    accountName: 'your_account_name',
    apiKey:'your_api_key',
    projectId: 'your_project_number',
    jsonDest: 'data/json',
    fileDest: 'data/files',
    downloadFiles: true,
    pageDir: true
  }
})
```

### To Do

Transform data for easier manipulation


## License
Copyright (c) 2014 signalkuppe. Licensed under the MIT license.
