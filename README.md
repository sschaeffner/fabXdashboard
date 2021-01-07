# fabXdashboard

A web frontend written using AngularJS for [fabXaccess](https://github.com/sschaeffner/fabXaccess).

## Screenshots

### User Management

![Users List](screenshots/users-list.png?raw=true)

List of all users including badges for each qualifications they have. Clicking on the user's row, their details are revealed.

![Users Details](screenshots/users-details.png?raw=true)

User details. Ticking/Un-Ticking a qualifications adds/removes the qualification for the user. 

![User Edit](screenshots/users-edit.png?raw=true)

Editing a user's details.

### Devices

![Devices List](screenshots/devices-list.png?raw=true)

List of all devices. Clicking on the device's row, reveals the details and allows for editing.

### Tools

![Tools List](screenshots/tools-list.png?raw=true)

List of all tools. 

![Tools Details](screenshots/tools-details.png?raw=true)

Tool details.

![Tools Create](screenshots/tools-create.png?raw=true)

Creating a new tool. 

### Qualifications

![Qualifications List](screenshots/qualifications-list.png?raw=true)

List of qualifications.

![Qualification Details](screenshots/qualifications-details.png?raw=true)

Qualification details.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy with Netlify
* Fork this repo
* Login to Netlify with Github
* Create a new site from Git
* Authorize and install Netlify for Github
* Select your forked dashboard repo
* Setup master/main branch for deployment
* replace the build command with ```ng build --configuration=production```
* replace the publish directory with ```dist/fabx-dashboard ```
* Under the Site settings tab, the site name can be changed
* The site can be accessed under https://[sitename].netlify.app

Netlify deployment is done.
