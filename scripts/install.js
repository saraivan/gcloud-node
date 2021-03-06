/*!
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');

require('shelljs/global');

// Install NPM dependencies, in up to 5 directories at a time
var queue = async.queue(installForDirectory, 5);

var files = fs.readdirSync(path.join(__dirname, '../packages'));
files.forEach(function(file) {
  queue.push(file);
});

/**
 * Install NPM dependencies within a single directory.
 *
 * @param {string} directory The name of the directory in which to install
 * dependencies.
 * @param {function} callback The callback function.
 */
function installForDirectory(directory, callback) {
  console.log(directory + '...installing dependencies');

  exec('npm install', {
    async: true,
    cwd: path.join(__dirname, '../packages', directory)
  }, function(err) {
    console.log(directory + '...done');
    callback(err);
  });
}
