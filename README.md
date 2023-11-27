# express-social-react-native

This is the react native frontend for a social network using a ExpressJS backend server (linked below) <br>
Based on Ed Roh's Full Stack Course with my own additions such as a refined **Comments section**, **User search** from searchbar, **Cloud hosting for images**, fixes and more.

[**Link**](https://github.com/SilverMarcs/express-social-server) to backend repository <br>
[**Link**](https://github.com/SilverMarcs/express-social-client) to web frontend repository <br>

## Usage

\*Requires sign-up but feel free to use the dummy email and password. <br>
**Sample account**: ``tester@tester.com`` and ``12345678``

## Screenshots:

<img src="https://github.com/SilverMarcs/express-social-react-native/assets/77480421/d795a49b-7a25-4347-99e3-5e6ce14dcda9" width="300">

<img src="https://github.com/SilverMarcs/express-social-react-native/assets/77480421/6bd26dc2-c8ee-49cc-855b-bfe62f964cd9" width="300">

<img src="https://github.com/SilverMarcs/express-social-react-native/assets/77480421/041a741a-73f1-4394-ad00-8f3fe25f1a58" width="300">

<img src="https://github.com/SilverMarcs/express-social-react-native/assets/77480421/8a6edddf-75b3-41ed-9335-3b4f035b802b" width="300">

### Notable Stack used:

- **React Native Exoi**
- **React Native Paper** for Styling/Styled Components
- **Redux** for state management


## Running

- Git clone the repository from terminal

```
git clone https://github.com/SilverMarcs/express-social-react-native.git
```

- Move to the cloned folder

```
cd express-social-react-native
```

- Install node dependencies and wait until they get installed

```
npm install
```

- Rename .env.example file to .env and paste `EXPO_PUBLIC_API_URL=https://express-social-server.vercel.app`

- Start the project. It should show a terminal interface with a QR code.
- Use the QR code scanner on your phone to scan it which downloads the Expo Go app and launches the app inside its container

```
npx expo start
```

<br>
