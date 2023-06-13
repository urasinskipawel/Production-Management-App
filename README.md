# Production Management Application

A simple, online and friendly system for planning, controlling and reporting the production.

## Demo 🎥

Link to the demo video: [here](https://youtu.be/pz6dt1tZCPA).

## Table of Contents 📖

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Testing an App](#testing-an-app)
- [Screenshots](#screenshots)
- [Ideas & Improvements](#ideas-improvements)

## General Information <a name="general-information"/> ℹ️

A project was created to practice technologies such as Express JS, TypeScript and SQL. My inspiration to create this application was to solve the problem of production planning in my current job which is done in multiple spreadsheets.

The entire application is divided into individual sections. The home page presents the main idea and purpose of the application. The support section is a kind of tutorial and familiarizes the user with the possibilities of the application. The next section is the admin panel which is intended for supervisors. It enables easy production management by adding employees, assigning tasks to them and updating individual stages of the technological process of a given task. The last section is an individual panel for each employee that was created in the administration panel. In this way, each worker can easily report his work

## Technologies Used <a name="technologies-used"/> 💻

- Node JS
- Express JS
- Handlebars JS
- Typescript
- SQL (MariaDB or MySQL)
- REST
- CSS
- Eslint + airbnb

## Installation <a name="installation"/> 💾

> Clone the repository

> Go to it using the terminal

$ cd foldername

> Install dependencies

$ npm i

> Run the App

$ npm run start:dev

## Testing an App <a name="testing-an-app"/> 🧪

If you want to test this app you have to follow the steps below :

1. Set an example database connection in config/db.ts

<a href="https://ibb.co/hV02C3m"><img src="https://i.ibb.co/JHZrCDs/db.png" alt="db" border="0" width = "600px"/></a>

2. Delete "process.env.ADMIN_LOGIN" and "process.env.ADMIN_LOGIN" to avoid authorization

<a href="https://ibb.co/fNhPr61"><img src="https://i.ibb.co/HPWkGwF/admin.png" alt="admin" border="0" width = "600px" /></a>

3. Start XAMPP client with Apache and MySql actions

<a href="https://imgbb.com/"><img src="https://i.ibb.co/3W0sPkb/xampp.png" alt="xampp" border="0" width = "300px" /></a>

4. Set the hostname and username in any SQL client according to the data from pt.1 (e.g. HeidiSql)

<a href="https://imgbb.com/"><img src="https://i.ibb.co/7gs52Jd/heidi.png" alt="heidi" border="0" width = "400px" /></a>

5. Download the database dump from [here](https://files.fm/u/tcrzaac49).

6. Import the file. Use RMB and select "Run"

<a href="https://ibb.co/SK5LWTC"><img src="https://i.ibb.co/0fmw8Nb/heidiimp.png" alt="heidiimp" border="0" width = "400px" /></a>

Enjoy! 

## Screenshots <a name="screenshots"/> 📸

- Home page

<a href="https://ibb.co/y87Wrsb"><img src="https://i.ibb.co/30QBnhL/home.png" alt="home" border="0" width = "400px" /></a>
<a href="https://ibb.co/BjVFrjp"><img src="https://i.ibb.co/tcMFxcG/home2.png" alt="home2" border="0" width = "400px" /></a>

- Support section 

<a href="https://ibb.co/YWQX20V"><img src="https://i.ibb.co/W350nVR/support.png" alt="support" border="0" width = "400px" /></a>
<a href="https://ibb.co/WvWFLGf"><img src="https://i.ibb.co/whNCfB4/support2.png" alt="support2" border="0" width = "400px" /></a>

- Admin panel

<a href="https://imgbb.com/"><img src="https://i.ibb.co/4Vwhxfc/admin-login.png" alt="admin-login" border="0" width = "211px" /></a>
<a href="https://ibb.co/VHdHNX7"><img src="https://i.ibb.co/cbPbvzG/admin-panel.png" alt="admin-panel" border="100px" width = "530px" /></a>

- Worker panel

<a href="https://imgbb.com/"><img src="https://i.ibb.co/5nJCCTw/worker-login.png" alt="worker-login" border="0" width = "211px" /></a>
<a href="https://ibb.co/VQyJ9wn"><img src="https://i.ibb.co/mXsbTNZ/worker-panel.png" alt="worker-panel" border="0" width = "554px" /></a>


## Ideas & Improvements <a name="ideas-improvements"/> 🚀

Currently, the application is at the stage of a working prototype that can be used.
I am gradually implementing improvements and fixing bugs.

The first improvement I'm going to implement is the ability to assign multiple tasks to one worker. It will allow planning work more dynamically. I'm also going to improve application error handling, which will simplify program maintenance

I am open to contact, suggestions and cooperation. If you have any ideas or encounter a problem, please email me at: uraspawel@gmail.com
