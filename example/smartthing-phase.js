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

var st = require('./smartthing');

function Phase(model, config, handler) {
  this.model = model;
  this.configuration = config;
  this.eventHandler = handler;

  this.event.deviceCommandsEvent = deviceCommandsEvent.bind(this);
}

function install(data) {
  // inputs from the configuration pages
  console.log('Configuration:\n%s', data.installedApp.config);

  updateDevices.call(this, data, []);
}


function update(data) {
  var self = this;
  var options = {
    authToken: data.authToken,
    locationId: data.installedApp.locationId,
  };

  st.device_list(options, function(err, list) {
    updateDevices.call(self, data, list);
  });
}


function deviceCommandsEvent(data, event) {
  var model = this.model;
  var eventHandler = this.eventHandler;
  var token = data.authToken;
  var deviceCommandsEvent = event.deviceCommandsEvent;
  var deviceId = deviceCommandsEvent.deviceId;

  var options = {
    authToken: token,
    deviceId: deviceId,
  };

  deviceCommandsEvent.commands.forEach(function(cmd) {
    eventHandler(cmd);
    st.device_events(options, model.cloud_attributes.create(model.device.states));
  });
}


function find(stDevices, id) {
  return stDevices.find(function(device) {
    return device.app.externalId == id;
  });
}

function updateDevices(data, existingDevices) {
  var model = this.model;
  var token = data.authToken;
  var installedAppId = data.installedApp.installedAppId;
  var locationId = data.installedApp.locationId;

  if (!find(existingDevices, model.device.id)) {
    var deviceData = {
      label: model.device.label,
      locationId: locationId,
      app: {
        profileId: model.device.smartthings.profileId,
        externalId: model.device.id,
        installedAppId: installedAppId,
      },
    };

    // create device
    st.device_install({ authToken: token }, deviceData, function(data, status_code) {
      console.log('Device installed (id: %s)', data.deviceId);

      // update the attributes of the device in cloud
      st.device_events({
        authToken: token,
        deviceId: data.deviceId,
      }, model.cloud_attributes.create(model.device.states));

    });
  }
}

Phase.prototype = {
  install: install,
  update: update,
  event: {
    deviceCommandsEvent: null,
  },
};

module.exports = Phase;
