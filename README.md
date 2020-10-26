# Client Manager

This is a small client managing application to keep records of peoples depths with some personal data regarding to them. The application back end is a Java String Boot API connected with the H2 in memory database and the front end is a React application.

<div class="button-group">
  <a href="#screenshot" class="button">Screenshot</a> |
  <a href="#getting-started" class="button">Getting Started</a> |
  <a href="#available-scripts" class="button">Available Scripts</a> |
  <a href="#built-with" class="button">Built With</a> |
  <a href="#assets" class="button">Assets</a> |
  <a href="#authors" class="button">Authors</a> |
  <a href="#license" class="button">License</a>
</div>

## Screenshot

![Screenshot of the webpage](/client-manager.gif)

## Getting Started

Clone the repository into your local computer. For animations to work you need to have the Club GreenSock module from their [webpage](https://greensock.com/docs/v3/Installation) and put it in the project "/src/client" directory where the React application is.

### Installing

At first you will need to install [IntelliJ IDEA](https://www.jetbrains.com/idea/), [Eclipse](https://www.eclipse.org/ide/) or some other IDE which is capable to run Java projects. Secondly you will have to install the newest version of [Node](https://nodejs.org/en/download/). Then move from the project root directory to the "/src/client" directory through terminal and follow the instructions below. 

Install all the necessary JavaScript packages:

```
$ npm run install
```

If it causes problems, make sure, that the NPM is able to run scripts, lets set the `ignore-scripts` configuration key to false:

```
$ npm config set ignore-scripts false
```

> You can find the scripts in the `package.json` file in the `scripts` section in the "/src/client" directory.

## Available Scripts

First run the Java back end API in the IDE and then in the "/src/client" directory from the terminal you can run:

### `npm start`

Runs the application in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Built With

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - A predictable state container for JS apps
* [GreenSock](https://greensock.com/gsap/) - Professional-grade JavaScript animation tool for the modern web
* [JavaScript](https://www.javascript.com/) - Programming language used for the front end
* [Spring Boot](https://spring.io/projects/spring-boot) - Java framework used for the back end
* [Java](https://www.java.com/en/) - Programming language used for the back end
* [H2](http://www.h2database.com/html/features.html) - In memory database used for the back end
* [HTML](https://en.wikipedia.org/wiki/HTML) - HyperText Markup Language
* [SCSS](https://sass-lang.com/) - Sassy CSS
* [VS Code](https://code.visualstudio.com/) - Code editor used
* [IntelliJ IDEA](https://www.jetbrains.com/idea/) - IDE used
* [Adobe Illustrator](https://www.adobe.com/ee/products/illustrator.html?gclid=Cj0KCQjwxNT8BRD9ARIsAJ8S5xaA1ngovLIMzqxCsiZtiyX33a3P7FYeiHswOzUsIRnMwPwcY_HwIFEaArEDEALw_wcB&sdid=8JD95K3P&mv=search&ef_id=Cj0KCQjwxNT8BRD9ARIsAJ8S5xaA1ngovLIMzqxCsiZtiyX33a3P7FYeiHswOzUsIRnMwPwcY_HwIFEaArEDEALw_wcB:G:s&s_kwcid=AL!3085!3!340839992350!e!!g!!adobe%20illustrator!1480122690!60147184474) - Program used for vector graphics

## Assets

* [Kaushan Script](https://fonts.google.com/specimen/Kaushan+Script?query=kausha) - Font used
* [Fredericka the Great](https://fonts.google.com/specimen/Fredericka+the+Great) - Font used
* [Montserrat Alternates](https://fonts.google.com/specimen/Montserrat+Alternates?query=montser) - Font used

## Authors

👤 **Jaak Kivinukk**

<a href="https://github.com/Jaakal" target="_blank">

  ![Screenshot Image](/jaak-profile.png) 

</a>

- Github: [@Jaakal](https://github.com/Jaakal)
- Twitter: [@JKivinukk](https://twitter.com/JKivinukk)
- Linkedin: [Jaak Kivinukk](https://www.linkedin.com/in/jaak-kivinukk)
- Email: [jaak.kivinukk@gmail.com](jaak.kivinukk@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details