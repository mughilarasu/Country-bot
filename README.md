- Auth0 domain and client id declared in .env file
- Used postbuild script (rimraf build/**/*.map) in package.json so that it will remove map files automatically 

# Not used files

- src\redux\actions\async.js    (sample login async method using redux thunk)
- src\endPoints\apiEndpoints.js (sample endpoints)

# Not used packages

- react-router-dom (partially)
- emotion          (not used)

## Components

- Index         : where Auth0, Redux, Router and App is connected
- App           : where error, isLoading, isAuthenticated is handled and based on that screens will be rendered
- AuthButton    : common button component for login and logout works based on isAuthenticated (used in 1st screen and App.js)
- Header        : Header component where it will use logout functionality to logout and store user data logic in redux store  (2nd screen) 
- LoginPage     : Login component where it will use login functionality to login (1st screen) 
- UserData      : User component where it will show user details (2nd screen)

## Redux

- created redux folder where i wrote store logic, reducers, normal actions to store user data in store

## Styling

- created individual component styling, common component styling (where we use same styles in multiple places in same component)



