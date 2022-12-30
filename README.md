# react-native-screen-utill

react native responsive ui for design size

### Firstly
 it is library [flutter_screenutil](https://pub.dev/packages/flutter_screenutil) migration for react_native
 used Library List
1. flutter_screenutil
2. [react-if](https://github.com/romac/react-if) React.Memo Add areEqual Algorithms I used shallow Algorithms reason its I think so usage data is simply
3. [qcompare](https://www.npmjs.com/package/qcompare) state areEqual Algorithms
4. [fast-equals](https://www.npmjs.com/package/fast-equals) state areEqual Algorithms
5. [zustand](https://www.npmjs.com/package/zustand) state library and areEqual Algorithms
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
1. current Version Work 100% android
2. currently android Support Minimum 29 :< (reason: screen inset)
3. running exmaple for android :>
4. 2022/12/28 ios example is work 100% !!
5. ios work ios minimum 11 :<

### design file
1. original png (390 x 844)
    1. [Link](http://livteam.in:5000/d/s/rjF8YpguyRITa3amuaquDoHPpxDaus6j/yK-0XMcGvioLkOug7vVWnaYRwA5-h6hn-Mr1gf3kWGAo)
2. original svg (390 x 844)
    1. [Link](http://livteam.in:5000/d/s/rjFF5DGtp1NNNBlnE5BeC03I8Wbawycl/FbtgCrf_oLedb89v37uDyWOJJZXPoNRf-Vr1AAZQWGAo)
3. ios 14
    1. [Link](http://livteam.in:5000/d/s/rjGgUMaY8yQ5TVWP6aUtp7cTICozgGAc/aRlzIIzlOqvjwaJcQQyNVSfaGTluH-dk-fb3g-6oWGAo)
4. android
    1. [Link](http://livteam.in:5000/d/s/rjGkffaGo2kdheF1lmYlAjb1H3bmJqaS/NNTh56mN22Li4duFvTRdV2U1sMpzxdvI-pL0gWL8WGAo)

## Usage

```js
import 'react-native-screen-utill';
import { initializePromise, ScreenUtilInstall } from 'react-native-screen-utill';
// ...
setImmediate(async () => {
    await ScreenUtilInstall({
        width        : 390,
        height       : 844,
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
//  height       : 844, // << UI Design Size Height(if not use safe inset statusbar and bottom inset removed size) (if use safe inset set ui full height)
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
// safeArea // check if style sheet for safeInset future this const change useContext
```

# Futures
1. - [x] make for Margin
   1. this fully typed and return styleCode marginLeft,Top,Bottom...
2. - [x] make for Padding
   1. 1-1 is same
3. - [X] Checking IOS
5. - [X] Android Inset Checking Currently unsafe(program is not deadlock but result is 0)
6. - [ ] how to use Border
7. - [ ] npm, yarn upload Probably 23/1/1 ?
8. - [ ] context Add (It's hard work, but it's almost over)
9. - [x] Add context for multiple areEquals Algorithms
10. - [x] Add React-If Add for loading option and customize React.memo
    1. The usage is exactly the same as react-if.
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
