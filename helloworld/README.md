To get this project working:

Packages that need to be installed:
- npx create-react-app
- npm install react-bootstrap bootstrap
- npm install -g firebase-tools


Once all of these have been installed, you can run 
>npm run build
to create a build folder that firebase will use. Then run
>firebase init
and select a hosting option. Be sure to set the build folder as the public directory. Then you just need to run 
>firebase deploy
and the web page should be up and running.

OR 

To run locally,
Just run
>npm run start
after adding everything needed to the App.js file.