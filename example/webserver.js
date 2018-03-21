/* Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var http = require('http');

var log = {
  req: null,
  res: null,
};

function isObject(arg) {
  return typeof arg === 'object' && arg != null;
}

function safeParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return;
  }
}

function send(res, code) {
  var obj, str;

  if (arguments.length > 2 && arguments[2] !== undefined) {
    obj = arguments[2];
  }

  if (isObject(obj)) {
    str = JSON.stringify(obj, null, 2);
    res.setHeader('Content-Type', 'application/json');
  }

  if (!res.getHeader('Content-Type') && obj) {
    str = obj.toString();
    res.setHeader('Content-Type', 'text/plain');
  }

  if (str) {
    res.setHeader('Content-Length', str.length);

    log.res && log.res('RESPONSE: ' + str, code);
  }

  res.writeHead(code, code);
  res.end(str);
}

var handler = function(req, res, callback) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    var parsed = safeParseJSON(body);
    req.body = parsed ? parsed : body;

    log.req && log.req('REQUEST: ' + req.body);

    callback(req, res);
  });

  res.on('error', function(err) {
    callback(err);
  });
};

function Server(callback) {
  return http.createServer(function(req, res) {

    if (req.method == 'POST' && req.url == '/') {
      handler(req, res, callback);
    } else {
      send(res, 404, 'no content');
    }
  });
}

Server.send = send;
Server.log = log;

module.exports = {
  Server: Server,
  send: send,
  log: log,
};
