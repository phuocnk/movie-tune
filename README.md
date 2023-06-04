# General Information

The "movie-tune" project is a web application developed using React that allows users to search for information about movies and TV shows. It leverages the themoviedb.org API to fetch data and provide a rich user experience for discovering details about various films and television series.

# Live demo

https://movie-tune.netlify.app/

# Technologies 

- React, Redux, Redux Toolkit
- MUI v5, styled component
- React Testing Library, Jest 

# Setup
- Clone the project repository
- Run command to install the project dependencies: `npm install` or `yarn`
- Starts the development server: `npm run dev` or `yarn dev`
- Runs the tests: `npm run test` or `yarn test`
coverage: Runs the tests with coverage using Vitest.
- Transpiles TypeScript files and builds the production-ready bundle:  `npm run build` or  `yarn build`

# Features

- Search Functionality: The web app enables users to enter keywords and search for specific movies or TV shows. The search query is sent to the themoviedb.org API, and the results are displayed on the app's interface.
- Movie and TV Show Details: Users can access comprehensive information about movies and TV shows, including title, release date, plot summary, cast members, genres, ratings, and more. This data is retrieved from the themoviedb.org API and presented in an organized manner.
-Responsive Design: The web app is designed to be responsive and accessible across different devices and screen sizes, ensuring a consistent user experience on desktops, tablets, and mobile devices.
- Integration with themoviedb.org API: The project integrates with the themoviedb.org API to fetch movie and TV show data, including metadata, images, and other related information. This API connection allows the app to stay up-to-date with the latest movie and TV show releases and provide accurate and detailed information.

# Screenshots

![image](https://github.com/phuocnk/movie-tune/assets/108504671/a8a1eec9-d0a8-4e60-b5a9-2126c19d949d)
![image](https://github.com/phuocnk/movie-tune/assets/108504671/6d5d1f98-48b8-4fc3-8dde-ed94b7b980ed)
![image](https://github.com/phuocnk/movie-tune/assets/108504671/d223f334-c53e-4a25-aa74-d6bafb5d6d1e)

# Improvements

- Refactor and Modularize: make the code more modular, maintainable, and easier to test, split complex components into smaller, reusable ones and extract business logic into separate functions or modules.
- Add more unit test: validate the rendering, behavior, and props of individual components. Writing unit tests for API, Redux actions and reducers
- Test Performance and Edge Cases
