# FairDeal
➢ A web application to track expenses and split payments between friends and to settle them. </br>
## Features
➢ Feature like Profile Images (with Default Images), Transaction History </br>
➢ You can see the net amount, you have paid to others or borrowed from others </br>
➢ Dashboard to make payments fast by directly entering in your groups. </br>
➢ You can see the group members before joining the group to ensure that you are joining your friends </br>
➢ The users who have paid money to someone are shown in GREEN. </br>
➢ The users who have borrowed money from someone are shown in RED. </br>
➢ You can ask for money from any borrowers (first priority 😁), but you can also ask others and it will settle the deal.</br>
➢ Build Using NodeJS, ExpressJS, MongoDB, Mongoose, Cloudinary</br>

## SetUp Instructions
To start the application: </br>
You should have Node, MongoDB, Terminal on your device.</br>

Make a ".env" file in the root directory and paste the following lines:</br>
(with your cloundinary credentials)</br>
```
CLOUDINARY_CLOUD_NAME= <YOUR_CLOUD_NAME> 
CLOUDINARY_KEY=<YOUR_API_KEY> 
CLOUDINARY_SECRET=<YOUR_CLOUDINARY_SECRET>
```
</br>
Open MongoDB. </br>
Open the terminal and run,</br>

```
npm install
node seeds/         // This will delete the data in database if exists and will create 3 users.
node app.js
```

Open localhost:8080 in your browser.
