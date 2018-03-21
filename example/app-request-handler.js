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

var Phase = require('./smartthing-phase');
var Server = require('./webserver').Server;
var model = require('./app-model');
var ctrl = require('./app-control');
var config = require('./app-phase-configuration');

var phase = new Phase(model, config, ctrl);

var log = {
  trace: function(msg) {
    console.log('TRACE - ' + msg);
  },
};

var send = Server.send;
Server.log.res = log.trace;

function smartthingsRequestHandler(req, res) {
  var evt = req.body;

  log.trace(evt.lifecycle + '\nREQUEST: ' + JSON.stringify(evt, null, 2));

  switch (evt.lifecycle) {
    case 'PING':
      send(res, 200, { pingData: { challenge: evt.pingData.challenge } });
      break;

    case 'CONFIGURATION':
      {
        var data = evt.configurationData;
        switch (data.phase) {
          case 'INITIALIZE':
            send(res, 200, { configurationData: phase.configuration.initData });
            break;
          case 'PAGE':
            send(res, 200, { configurationData: phase.configuration.pageData });
            break;
          default:
            break;
        }
      }
      break;

    case 'INSTALL':
      phase.install(evt.installData, []);
      send(res, 200, { installData: {} });
      break;

    case 'UPDATE':
      phase.update(evt.updateData);
      send(res, 200, { updateData: {} });
      break;

    case 'UNINSTALL':
      send(res, 200, { uninstallData: {} });
      break;

    case 'EVENT':
      {
        evt.eventData.events.forEach(function(event) {
          switch (event.eventType) {
            case 'DEVICE_EVENT':
              break;
            case 'TIMER_EVENT':
              break;
            case 'DEVICE_COMMANDS_EVENT':
              phase.event.deviceCommandsEvent(evt.eventData, event);
              break;
            default:
              break;
            }
          }
        );
        send(res, 200, { eventData: {} });
      }
      break;

    default:
      send(res, 404, 'no matched life-cycle');
      break;
  }
}

module.exports = smartthingsRequestHandler;
