/*
 * grunt-gathercontent
 * 
 *
 * Copyright (c) 2014 signalkuppe
 * Licensed under the MIT license.
 */



var fs= require('fs'),
    request = require('request'),
    path= require('path'),
    _= require('underscore'),
    async = require('async'),
    mkdirp = require('mkdirp'),
    files = [];

module.exports = function (grunt) {

  var defaultOptions = {
        jsonDest: 'data/json',
        fileDest: 'data/files',
        downloadFiles: true,
        pageDir: true
      },
      config= _.extend(defaultOptions,grunt.config('gathercontent')),
      apiUrl = 'https://'+config.accountName+'.gathercontent.com/api/0.3/',
      options =
      {
        method: "POST",
        'auth': {
          'user': config.apiKey,
          'pass': 'x',
          'sendImmediately': false
        },
        headers: {
          "Content-Type":"application/x-www-form-urlencoded"
        }
      },
      _decodePages = function (json)
      {
        _.map(json, function (obj)
        {
          var dec = new Buffer(obj.config, 'base64');
          obj.config = JSON.parse(dec)
        });
        return json;
      },
      _cleanJson = function (json, name)
      {
        if(name=='logged_user.json')
          return json.user;
        if(name=='users.json')
          return json.users;
        if(name=='group.json')
          return json.group;
        if(name=='groups.json')
          return json.groups;
        if(name=='projects.json')
          return json.projects;
        if(name=='project.json')
          return json.project;
        if(name=='pages.json')
          return _decodePages(json.pages);
        if(name=='files.json')
          return json.files;
        if(name=='states.json')
          return json.custom_states;
        else
          return json;
      },
      _writeJson = function (json,name)
      {
          var output = config.jsonDest+'/'+name;
          if(grunt.file.write(output,JSON.stringify(_cleanJson(_.omit(JSON.parse(json),'success'),name),null,2)))
          {
            grunt.log.ok('Generated '+output);
          };
      };

  // get logged in user
  grunt.registerTask('gathercontent-get_me', 'get logged in user', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_me'}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'logged_user.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // get all visible users for given API key
  grunt.registerTask('gathercontent-get_users', 'get all visible users for given API key', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_users'}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'users.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // group that API user belongs to

  grunt.registerTask('gathercontent-get_my_group', 'get group that API user belongs to', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_my_group'}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'group.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // get all visible groups for given API key

  grunt.registerTask('gathercontent-get_groups', 'all visible groups for given API key', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_groups'}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'groups.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // get all visible projects for given API key

  grunt.registerTask('gathercontent-get_projects', 'get all visible projects for given API key', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_projects'}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'projects.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // get project by id

  grunt.registerTask('gathercontent-get_project', 'get project with specified id', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_project',form:{ id: config.projectId }}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'project.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  }); 

  // get all pages belonging to project with specified id

  grunt.registerTask('gathercontent-get_pages_by_project', 'get all pages belonging to project with specified id', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_pages_by_project',form:{ id: config.projectId }}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'pages.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // get all files belonging to project with specified id

  grunt.registerTask('gathercontent-get_files_by_project', 'get all files belonging to project with specified id', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_files_by_project',form:{ id: config.projectId }}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function () {
            _writeJson(json,'files.json');
            files = JSON.parse(json).files;
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // get custom states by project

  grunt.registerTask('gathercontent-get_custom_states_by_project', 'get custom states by project', function () {

    var done= this.async(),
        json = '';

        request(_.extend(options,{uri:apiUrl+'get_custom_states_by_project',form:{ id: config.projectId }}))
        .on('data', function (data)
        {
            json += data;
        })
        .on('end', function (data) {
            _writeJson(json,'states.json');
            done();
        })
        .on('error', function (e) {
              throw e;
        });
  });

  // download files

  grunt.registerTask('gathercontent-downloadfiles', 'download files', function () {
      var done= this.async(),
          dest = config.fileDest;
      var files = grunt.file.readJSON(config.jsonDest + "/files.json");
      if(config.downloadFiles)
      {
        if (!fs.existsSync(config.fileDest) && !config.pageDir)
            fs.mkdirSync(config.fileDest);
        var i = 0;
        var completed = 0;
        async.eachSeries(
          files,
          function (item,cb)
          {
            grunt.log.write('Downloading',item.original_filename+'\n');
            var _requestFile = function (dest)
            {
                var file = fs.createWriteStream(dest+'/'+item.original_filename);
                request('https://gathercontent.s3.amazonaws.com/'+item.filename, function(error, response, body){
                        completed++;
                    grunt.log.success('Downloaded '+item.original_filename+'\n');
                    if(i === completed) {
                        grunt.log.success('Completed Downloading '+completed+' files');
                        done();
                    }
                }).pipe(file);
            }
            if(config.pageDir)
            {
              var pageDirectory = dest+'/'+item.page_id;
              mkdirp(pageDirectory, function (err) {
                  if (err)
                    throw err;
                  else
                    _requestFile(pageDirectory);
              });
            }
            else
            {
              _requestFile(dest);
            }
            i++;
            cb();
          },
          function (err){
                
          }
        );
      }
      else
      {
        grunt.log.write('No files were downloaded')
      }
  });

  grunt.registerTask('gathercontent',
  [
    'gathercontent-get_me',
    'gathercontent-get_users',
    'gathercontent-get_my_group',
    'gathercontent-get_groups',
    'gathercontent-get_projects',
    'gathercontent-get_project',
    'gathercontent-get_pages_by_project',
    'gathercontent-get_files_by_project',
    'gathercontent-get_custom_states_by_project',
    'gathercontent-downloadfiles'
  ]);
};