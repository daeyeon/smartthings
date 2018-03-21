# Smartthings on IoT.js

## IoT.js

- http://iotjs.net

## Smartthings

### SmartApp
- https://smartthings.developer.samsung.com/develop/guides/smartapps/basics.html
- https://smartthings.developer.samsung.com/develop/api-ref/st-api.html

### Cloud-to-Cloud
- https://smartthings.developer.samsung.com/develop/guides/cloud2cloud/c2c-basics.html

---

## Example

The example in `/example` covers the following cases:

- [x] App installation and configuration flow.
- [x] Actuating devices using the SmartThings API.
- [ ] HTTP Signature verification.

### Prerequisites

- Globally available URL for registering webhook url.
- A [Samsung account](https://account.samsung.com/membership/index.do) and the SmartThings mobile application.
- Make sure you open an account (it is free) on [Developer Workspace](https://devworkspace.developer.samsung.com/smartthingsconsole/iotweb/site/index.html#/home).

### Steps

1. Clone or download this repository.

2. Start the app in `/example` folder: `./iotjs app.js`.

3. Go to the **SmartThings Device > Cloud-to-Cloud** section of the [Developer Workspace](https://devworkspace.developer.samsung.com/smartthingsconsole/iotweb/site/index.html#/main) and create a Cloud-to-Cloud device. You need to fill out the device information.
  - In `Device Info.`
    - Write your connector name, and then, add a device profiles which are managed by your connector.
    - Select Light for the Device Type. Click the + button and select the following capabilities: Color control, Color temperature, Switch, and Switch Level. For the Main State and Main Action, select Switch:main.
  - In `Connector Info.`
    - For the Multi Instance, select Single. For the **Connector Type**, select `WebHook endpoint` and enter the https: URL you will use. For the **Scope**, click on Settings and select the following scopes: **r:devices:***, **w:devices:***, **r:schedules**, **w:schedules**, and **i:deviceprofiles** (described in `app-phase-configuration.js`).
    - When clicking SAVE AND NEXT, you will notice messages in your server log indicating that it received the **PING** lifecycle event.
  - In `Self-publish`
    - The page will be presented with the **Public Key**. This will be used for HTTP Signature verification which ensure that the incoming requests are from SmartThings.
    - Click on your entry in the list and select the Device info. tab and paste the **Device profile ID** field into the `app-model.js` file in the `'smartthings': {'profileId': 'REPLACE WITH YOUR DEVICE PROFILE ID FROM DEV WORKSPACE'}` entry.
    - Click **CONFIRM** to register your connector in self-publishing mode.

4. Enable Developer Mode in the SmartThings app and then [add your device](https://smartthings.developer.samsung.com/develop/guides/testing/developer-mode.html#Enable-Developer-Mode).

### Example Credits

The concept of a SmartThings-connected color bulb that changes its color is original from this example, https://github.com/SmartThingsCommunity/example-lifx-nodejs-web-connector.

### Tunneling

When your connector is in local, you can expose it via a secure tunnel. The following tools could be used for that, although these tools are known not to be intended for use in production.

  - [localtunnel](https://localtunnel.github.io/www/) : `lt --port 3005 --subdomain hello`.
  - [ngrok](https://ngrok.com/) : `ngrok http 3005`. Getting a consistent subdomain isn't allowed unless you pay.
