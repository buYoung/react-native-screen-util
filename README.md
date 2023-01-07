# react-native-screen-util

react native responsive ui for design size

### Firstly
 it is library [flutter_screenutil](https://pub.dev/packages/flutter_screenutil) migration for react_native
 used Library List
1. flutter_screenutil
2. [react-if](https://github.com/romac/react-if) React.Memo Add areEqual Algorithms I used shallow Algorithms reason its I think so usage data is simply
3. [qcompare](https://www.npmjs.com/package/qcompare) state areEqual Algorithms
4. [fast-equals](https://www.npmjs.com/package/fast-equals) state areEqual Algorithms
5. [zustand](https://www.npmjs.com/package/zustand) state library and areEqual Algorithms
6. [react-if](https://www.npmjs.com/package/react-if) nice utility component!!!!!! Thx!!  (add memo zustand shallow areEqual)

## Installation

```sh
npm install react-native-screen-util
```
```sh
yarn add react-native-screen-util
```
### Comment
1. current Version Work 100% android
2. currently android Support Minimum 29 :< (reason: screen inset)
3. running exmaple for android :>
4. 2022/12/28 ios example is work 100% !!
5. ios work ios minimum 11 :<
6. 2023/01/01 rework completely! Ver1 start
7. 2023/01/05 patchd! ui/ux working size only input please! (status bar, navigation bar or bottom bar? exclude exactly height?)

### design file
1. original png (390 x 844)
    1. [Link](http://livteam.in:5000/d/s/rjF8YpguyRITa3amuaquDoHPpxDaus6j/yK-0XMcGvioLkOug7vVWnaYRwA5-h6hn-Mr1gf3kWGAo)
2. original svg (390 x 844)
    1. [Link](http://livteam.in:5000/d/s/rjFF5DGtp1NNNBlnE5BeC03I8Wbawycl/FbtgCrf_oLedb89v37uDyWOJJZXPoNRf-Vr1AAZQWGAo)
3. ios 14
    1. [Link](http://livteam.in:5000/d/s/rjGgUMaY8yQ5TVWP6aUtp7cTICozgGAc/aRlzIIzlOqvjwaJcQQyNVSfaGTluH-dk-fb3g-6oWGAo)
4. android
    1. [Link](http://livteam.in:5000/d/s/rjGkffaGo2kdheF1lmYlAjb1H3bmJqaS/NNTh56mN22Li4duFvTRdV2U1sMpzxdvI-pL0gWL8WGAo)


# Futures
1. - [x] make for Margin
   1. this fully typed and return styleCode marginLeft,Top,Bottom...
2. - [x] make for Padding
   1. 1-1 is same
3. - [X] Checking IOS
4. - [X] Android Inset Checking Currently unsafe(program is not deadlock but result is 0)
5. - [X] how to use Border? - used mixin  value * ((scaledWidth + scaledHeight) /2)
   1. just usage ResponsiveStyleSheet.create !!!!! ur StytleSheet.create
6. - [X] npm, yarn upload Probably 23/1/1 ?
7. - [x] context Add (It's hard work, but it's almost over)
8. - [x] Add context for multiple areEquals Algorithms
9. - [x] Add React-If Add for loading option and customize React.memo
   1. The usage is exactly the same as react-if.
   2. memolized react-if Component Usage just add feature React.memo and shallow areEqual Algorithms
10. - [x] add styleSheet.create Style Function class
    - Now just write down the numbers!
    - The specified content is applied automatically.
    - Style contents automatically become "object.freeze" state!
11. - [x] ResponsiveStore(zustand) areEqual Algorithms Context Add
    - object.is
    - shallow
    - fasteEquals(shallow)
    - fasteEquals(deep)
    - qcompare
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
