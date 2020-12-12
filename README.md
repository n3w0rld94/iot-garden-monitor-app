# iot-garden-monitor-app
IoT project

This project shows a dashboard of various charts, organised in a list fashion.

All development will happen in the __src/app/__ folder.

Models have been created under __models/__ to help visualising the kind of data used.

A chart component has been created under __src/app/pages/analytics/line-chart/__ and setup in the _analytics.component_ dashboard.

The charts library used is __ng2charts__. It is based on _chart.js_ which allows fine control of charts generation.

A guard against unauthorised navigation has been setup in _src/app/guards_ to restrict access without login.

firebase setup is done in _src/app/app.module.ts and the configuration data is in the _src/environments_

The first step is to clone this repo:
1. Open the Windows command prompt in the folder were you wish to pull the project.
2. Run _```git clone https://github.com/n3w0rld94/iot-garden-monitor-app.git```_


# Before You Start
In a command prompt, run the following commands:
1. Install Angular CLI: ```npm install --global @angular/cli@next```
2. Install Ionic CLI: ```npm install --global @ionic/cli```

Next, to install all the necessary dependencies:

1. Open the project folder in VSCode.
2. Open the vscode terminal through VSCode menu (_Terminal -> New Terminal_)
3. In the terminal, run ```npm install```.

To create a branch and start the development:  

1. Run ```git checkout -b 'name-of-your-branch'``` to create a new development branch locally.
2. Click on the cloud icon appearing on the bottom left corner of VSCode to create your branch also upstream (in the remote repository).

>__NOTE:__ It is important that you follow these steps as you will not be able to commit your changes otherwise.



DONE!

# Useful commands

The following commands will only work if the project folder is open in VSCode.  
They are meant to be executed in the vscode integrated terminal (_Terminal -> New Terminal_)

+ ```ng g c pages/analytics/my-component-name --module=app.module.ts```:  
   Generates a page in the __analytics__ folder.
+ ```ionic serve```:  
Runs the app in your default browser.
+ ```ng g class models/my-class-name```:  
Creates a class in the __models__ folder.

>__NOTE:__ If any of these commands doesn't work, make sure you are in the project folder.