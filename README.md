# react-native-screen-utill

react native responsive ui for design size

### Firstly
 it is library [flutter_screenutil](https://pub.dev/packages/flutter_screenutil) migration for react_native
Thx!
## thispage is Editing.....
## Installation

```sh
npm install react-native-screen-utill
Probably not on the npm yet.

If you've seen this git in advance and you're going to use it, please use the code yourself.
Please leave the source!
```
### Comment
1. current Version Work 100% android only ios is not Checking
2. currently android Support Minimum 29 :< (reason: screen inset)
3. running exmaple for android :>
## Usage

```js
import 'react-native-screen-utill';
import { initializePromise, ScreenUtilInstall } from 'react-native-screen-utill';
// ...
setImmediate(async () => {
    await ScreenUtilInstall({
        width        : 390,
        height       : 750,
        safeArea     : true,
        minTextSize  : true,
        scaleByHeight: false,
        screenSize   : Dimensions.get("window")
    });
    await initializePromise();
    setResponsiveLoading(true);
});

or

InteractionManager.runAfterInteractions(async () => {
  await initializePromise();
  ...set Style code here or ui code
});

(number).w(); // Responsive Width
(number).width(); // Responsive Width
(number).h(); //  Responsive height
(number).height(); //  Responsive height
(number).sp(); //  Responsive fontSize
(number).fontSize(); //  Responsive fontSize
(number).ml(); //  Responsive margin (CharGPT is Say it is Spaci or gutter :D)
(number).mr();//  Responsive margin (CharGPT is Say it is Spaci or gutter :D)
(number).mt();//  Responsive margin (CharGPT is Say it is Spaci or gutter :D)
(number).mb();//  Responsive margin (CharGPT is Say it is Spaci or gutter :D)
(number).pl(); //  Responsive padding (CharGPT is Say it is Spaci or gutter :D)
(number).pr();//  Responsive padding (CharGPT is Say it is Spaci or gutter :D)
(number).pt();//  Responsive padding (CharGPT is Say it is Spaci or gutter :D)
(number).pb();//  Responsive padding (CharGPT is Say it is Spaci or gutter :D)
number .w() // it is possible
10.0.w() // also it is possible!
// padding / margin is Same Result but i dont need ur code chaos
//So I worked a little hard
//And are planning to add a more convenient margin and padding API than this in the future


// ScreenUtilInstall option list
//  width        : 390, // << UI Design Size Width
//  height       : 750, // << UI Design Size Height(statusbar and bottom inset removed size)
//  safeArea     : true, // use Get insets info for android, ios
//  minTextSize  : true, // check if (true)campare calc width or height for minimum (false)
//  scaleByHeight: false, // default Scale Calc width this option is Hight calc
//  screenSize   : Dimensions.get("window") // react_native Dimension
//  splitScreenMode?: boolean; // It's an option for Samsung's Fold-like phones this option height lock maximum 700
//  debug?: boolean, // It's not working yet

// api List
// ScreenUtilInstall / load for native commutication for insets and calc responsive Style it is promise result void
// initializePromise / it's usage only style codepage  promise result void
// const
// scaleConst // all info saved Dimensions, screen Inset, options...
// defaultDesignSize // default Setting but I don't recommend using it
```

# Futures
1. make for Margin
   1. this fully typed and return styleCode marginLeft,Top,Bottom...
2. make for Padding
   1. 1-1 is same
3. Checking IOS
4. Android Inset Checking Currently unsafe(program is not deadlock but result is 0)
5. how to use Border
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
