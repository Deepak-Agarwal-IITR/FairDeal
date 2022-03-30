➢ A web application to track expenses and split payments between friends and to settle them. 
➢ Feature like Profile Images (with Default Images), Transaction History 
➢ You can see the net amount, you have paid to others or borrowed from others 
➢ Dashboard to make payments fast by directly entering in your groups. 
➢ You can see the group members before joining the group to ensure that you are joining your friends 
➢ The users who have paid money to someone are shown in GREEN. 
➢ The users who have borrowed money from someone are shown in RED. 
➢ You can ask for money from any borrowers (first priority 😁), but you can also ask others and it will settle the deal.
➢ Build Using NodeJS, ExpressJS, MongoDB, Mongoose, Cloudinary

To start the application: 
You should have Node, MongoDB, Terminal on your device.

Make a ".env" file in the root directory and paste the following lines:
(with your cloundinary credentials)
CLOUDINARY_CLOUD_NAME= <YOUR_CLOUD_NAME> 
CLOUDINARY_KEY=<YOUR_API_KEY> 
CLOUDINARY_SECRET=<YOUR_CLOUDINARY_SECRET>

Open MongoDB. 
Open the terminal and run,
npm install
node seeds/         // This will delete the data in database if exists and will create 3 users.
node app.js
Open localhost:8080 in your browser.
