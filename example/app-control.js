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

var states = require('./app-model').device.states;

function eventHandler(cmd) {
  switch (cmd.command) {
    case 'on':
      states.power = 'on';
      break;
    case 'off':
      states.power = 'off';
      break;
    case 'setLevel':
      states.brightness = cmd.arguments[0];
      break;
    case 'setHue':
      states.color.hue = cmd.arguments[0];
      break;
    case 'setSaturation':
      states.color.saturation = cmd.arguments[0];
      break;
    case 'setColorTemperature':
      states.color.kelvin = cmd.arguments[0];
      break;
    case 'setColor':
      states.color.hue = cmd.arguments[0].hue;
      states.color.saturation = cmd.arguments[0].hue;
      break;
    default:
      break;
  }
}

module.exports = eventHandler;
