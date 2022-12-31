# react-native-screen-util

react native 반응형 실제 디자인 크기를 적용해서 사용하는 라이브러리

### 첫번째로
 이 라이브러리는 [flutter_screenutil](https://pub.dev/packages/flutter_screenutil)를 리액트 네이티브로 마이그레이션 한 코드입니다
1. flutter_screenutil
2. [react-if](https://github.com/romac/react-if) React.Memo 기능을 추가한 버전입니다.
3. [qcompare](https://www.npmjs.com/package/qcompare) state areEqual Algorithms
4. [fast-equals](https://www.npmjs.com/package/fast-equals) state areEqual Algorithms
5. [zustand](https://www.npmjs.com/package/zustand) state library and areEqual Algorithms
6. [react-if](https://www.npmjs.com/package/react-if) 엄청편한 라이브러이에요!!! 코드가 깔끔해지졌어요 ㅎㅎ 3항식따위!! ( 리팩토링을 했고, React.memo를 사용했으며, areEqual 알고리즘에 shallow를 넣었습니다.)

## 설치방법
```sh
npm install react-native-screen-util
yarn add react-native-screen-util
```
### Comment
1. 현재 마지막으로 올라간 버전은 안드로이드에서 100% 작동을 확인했습니다.
2. 현재 안드로이드 버전 최소 29부터 지원됩니다 :< (이유는 inset 때문에..)
3. 아직까지는 android만 확인해봤습니다. :>
4. 2022/12/28 ios 14기기에서 정상작동 확인했습니다 100% !!
5. ios 는 최소 ios버전 이후부터 지원 됩니다. 11버전까지는 아마 안될껍니다. :<
6. 2023/01/01 rework completely! Ver1 start

### 디자인 적용 사진
디자인 파일
1. 원본 png (390 x 844)
   1. [링크](http://livteam.in:5000/d/s/rjF8YpguyRITa3amuaquDoHPpxDaus6j/yK-0XMcGvioLkOug7vVWnaYRwA5-h6hn-Mr1gf3kWGAo)
2. 원본 svg (390 x 844)
   1. [링크](http://livteam.in:5000/d/s/rjFF5DGtp1NNNBlnE5BeC03I8Wbawycl/FbtgCrf_oLedb89v37uDyWOJJZXPoNRf-Vr1AAZQWGAo)
3. ios 14
   1. [링크](http://livteam.in:5000/d/s/rjGgUMaY8yQ5TVWP6aUtp7cTICozgGAc/aRlzIIzlOqvjwaJcQQyNVSfaGTluH-dk-fb3g-6oWGAo)
4. android
   1. [링크](http://livteam.in:5000/d/s/rjGkffaGo2kdheF1lmYlAjb1H3bmJqaS/NNTh56mN22Li4duFvTRdV2U1sMpzxdvI-pL0gWL8WGAo)

# Futures
1.  - [x] 마진을 조금더 쉽고 간편하게 사용하기위한 API추가
   1. type을 지원할 예정이며, 넣은 값만 출력될 예정입니다. style에 바로 사용 가능하도록
2.  - [x] 패딩을 조금더 쉽고 간편하게 사용하기위한 API추가
   1. 1-1와 같음
3.  - [x] ios 기기 확인
4.  - [x] 안드로이드 기기에서 Inset값이 마지막으로 확인했을때 0으로 나왔던점을 다시한번 확인해야합니다.(프로그램이 꺼지지는 않지만, 값이 0으로 출력됩니다)
5.  - [ ] border에는 뭘쓸지 생각중
6. - [ ] npm, yarn 업로드 아마도 23년1월1일 ?
7. - [x] context, provider 추가 react에 대해 자세히 아는게 아니라 생명주기 등등 조사가 많이 필요했었네요 ㅋㅋ.. store가 react life cycle을 쓰고있었다니...
8. - [x] responseiveApi에 대한 areEqual 알고리즘을 변경 할 수 있는 context 및 provider를 추가했습니다.
9. - [x] react-if를 추가했습니다. 단, 재랜더링에 대해 방책이 없었고, pureComponent도 아니여서 React.memo를 사용하여 리팩토링 했습니다.
   1. 사용방법은 react-if와 완전히 같습니다
10. - [x] react-native의 StyleSheet와 똑같은 클래스형 함수를 만들었습니다.
    - 숫자만 적으면 자동으로 변환됩니다.
    - 단, width, height, fontSize, padding, margin만 적용됩니다.
    - style코드는 자동으로 Object.freeze로 만듭니다.
11. - [x] ResponsiveStore(zustand)에서 사용하는 areEqual을 변경할 수 있는 context를 추가했습니다.
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
