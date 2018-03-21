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

module.exports = {
  device: {
    id: '1',
    label: 'Color Bulb #0',
    states: {
      power: 'off',
      brightness: 0,
      color: {
          kelvin: 0,
          hue: 0,
          saturation: 0,
      },
    },
    smartthings: {
      profileId: 'REPLACE WITH YOUR DEVICE PROFILE ID FROM DEV WORKSPACE',
    },
  },
  cloud_attributes: {
    create: function(states) {
      return [
        {
            component: 'main',
            capability: 'switch',
            attribute: 'switch',
            value: states.power,
        },
        {
            component: 'main',
            capability: 'switchLevel',
            attribute: 'level',
            value: states.brightness,
        },
        {
            component: 'main',
            capability: 'colorTemperature',
            attribute: 'colorTemperature',
            value: states.color.kelvin,
        },
        {
            component: 'main',
            capability: 'colorControl',
            attribute: 'hue',
            value: states.color.hue,
        },
        {
            component: 'main',
            capability: 'colorControl',
            attribute: 'saturation',
            value: states.color.saturation,
        },
      ];
    },
  },
};
