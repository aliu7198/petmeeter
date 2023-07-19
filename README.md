# Petmeeter

Petmeeter is a soft clone of Petfinder, with a twist. It is a website where users can post animals that they are rehoming, search for and favorite animals matching their home's needs, and ultimately find a cute animal companion to bring into their families and hearts. 💜

Check out [Petmeeter](https://petmeeter.onrender.com/)

## Index

[MVP Feature List](https://github.com/aliu7198/petmeeter/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/aliu7198/petmeeter/wiki/Database-Schema) |
[User Stories](https://github.com/aliu7198/petmeeter/wiki/User-Stories) |
[Wire Frames](https://github.com/aliu7198/petmeeter/wiki/Wireframes)

## Technologies Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Splash Page
![splash page](image.png)

## Animals Search Results
![animals search page](image-1.png)

## Animal Details Page
![animal details page 1](image-2.png)
![animal details page 2](image-3.png)

## Animal Creation Form
![animal form](image-4.png)

## My Animal Listings Page
![my animal listings](image-5.png)

## My Favorites Page
![my favorites](image-6.png)

## My Saved Searches Page
![my saved searches](image-7.png)

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the provided **.env.example** with proper settings for your development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features

### Animals
* Logged in users can create animals that they are putting up for adoption.
* Logged in users can edit and delete the animals that they put up for adoption.
* All users can view animals based on search criteria.

### Favorites
* Logged in users can add and remove animals from their favorites list.
* Logged in users can view the animals they have favorited.

### Saved Searches
* Logged in users can create, update, and delete saved searches.
* Logged in users can view their saved searches.

### AWS
* Logged in users can upload multiple images of their spot to AWS S3

## Future Features

### Live Chat with Web Sockets
* Logged in users can chat with other users regarding potential adoptions.
