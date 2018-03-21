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

var appName = 'IoT.js';

module.exports = {
  initData: {
    initialize: {
      id: appName,
      name: 'Smartthings on IoT.js',
      description: 'Creates devices in SmartThings',
      permissions: [
        'r:devices:*', 'w:devices:*',
        'r:schedules', 'w:schedules',
        'i:deviceprofiles',
      ],
      firstPage: '1',
    },
  },
  pageData: {
    page: {
      pageId: '1',
      name: 'page-example',
      nextPageId: null,
      previousPageId: null,
      complete: true,
      sections: [{
        name: 'Set somthing',
        settings: [{
          type: 'TEXT',
          id: 'myTextSetting',
          name: 'Enter some text',
          description: 'Tap to set',
          required: true,
          defaultValue: 'Some default value',
        }],
      }],
    },
  },
};
