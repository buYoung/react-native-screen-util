# react-native-screen-utill

react native 반응형 실제 디자인 크기를 적용해서 사용하는 라이브러리

### 첫번째로
 이 라이브러리는 [flutter_screenutil](https://pub.dev/packages/flutter_screenutil)를 리액트 네이티브로 마이그레이션 한 코드입니다
Thx!
## 이 페이지는 아직 수정중입니다..
## 설치방법
```sh
npm install react-native-screen-utill

아직 npm에 올리지 않았기 때문에 npm에 안나올껍니다.
직접 코드를 다운로드 해서 사용해야합니다.
단, 출처는 남겨주세요!
```
### Comment
1. 현재 마지막으로 올라간 버전은 안드로이드에서 100% 작동을 확인했습니다.
2. 현재 안드로이드 버전 최소 29부터 지원됩니다 :< (이유는 inset 때문에..)
3. 아직까지는 android만 확인해봤습니다. :>
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

또는

InteractionManager.runAfterInteractions(async () => {
  await initializePromise();
  ...여가에 style code가 한번 더 갱신되도록 해주세요!
});

(number).w(); // 반응형 넓이
(number).width(); // 반응형 넓이
(number).h(); //  반응형 높이
(number).height(); //  반응형 높이
(number).sp(); //  반응형 폰트크기
(number).fontSize(); //  반응형 폰트크기
(number).ml(); //  반응형 마진 왼쪽 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
(number).mr();//  반응형 마진 오른쪽 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
(number).mt();//  반응형 마진 위 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
(number).mb();//  반응형 마진 아래 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
(number).pl(); //  반응형 패딩 왼쪽 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
(number).pr();//  반응형 패딩 오른쪽 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
(number).pt();//  반응형 패딩 위 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
(number).pb();//  반응형 패딩 아래 (CharGPT 에게 추천받기를 spacing 또는 gutter로 받아서 spacing으로 파일정의 했습니다  :D)
number .w() // 이것도 가능
10.0.w() // 이것또한 가능! 자바스크립트 코드라서
// 마진과 패딩은 값이 같습니다. 그래서 한가지 코드로 사용해도 되지만 별로 추천은 드리지 않습니다.
// 이유는 코드가 혼란스러워지고 인수인계 받는 사람이 화가 납니다 ^^
// 위의 사유를 해결하기위해 조금 노가다좀 했습니다.
// 추후에 마진과 패딩을 조금더 간단하게 사용할 수 있는 API를 추가할 예정입니다.


// ScreenUtilInstall 옵션 목록
//  width        : 390, // << ui 디자인 넓이
//  height       : 750, // << UI 디자인 높이(상태바, 하단 버튼? (ios경우)는 무시한 ui 작업 영역만 높이로 지정해야합니다.)
//  safeArea     : true, // native 코드로 부터 inset 정보를 받아옵니다.
//  minTextSize  : true, // true인경우 계산된 크기중 넓이, 높이의 비율중 더 낮은걸 시용합니다. false면 width비율 사용
//  scaleByHeight: false, // true인경우 높이를 기준으로 계산식이 바뀌며, 넓이, 높이 값이 살짝 더 커집니다.
//  screenSize   : Dimensions.get("window") // 리액트 네이티브의 Dimension API이며 window로 넘겨주셔야합니다.
//  splitScreenMode?: boolean; // 삼성 폴드 같은 기기를 지원하는 기능이며, true인경우 최대 높이가 700으로 제한됩니다. (왜그런지 모름)
//  debug?: boolean, // 아무런 작동안함

// api List
// ScreenUtilInstall / native로 부터 inset정보를 받고, option값으로 부터 화면의 비율을 계산합니다. promise의 결과값을 가지고 있으며 void 입니다.
// initializePromise / style 코드페이지에 사용할려고 만든 API입니다. Promise의 결과값을 가지고 있으며 void 입니다.
// const
// scaleConst // 모든 정보가 저장되어있습니다. inset(display cutout), 계산된 비율, 옵션 등등
// defaultDesignSize // 기본값입니다. 사용은 하지마세요
```

# Futures
1. 마진을 조금더 쉽고 간편하게 사용하기위한 API추가
   1. type을 지원할 예정이며, 넣은 값만 출력될 예정입니다. style에 바로 사용 가능하도록
2. 패딩을 조금더 쉽고 간편하게 사용하기위한 API추가
   1. 1-1와 같음
3. ios 기기 확인
4. 안드로이드 기기에서 Inset값이 마지막으로 확인했을때 0으로 나왔던점을 다시한번 확인해야합니다.(프로그램이 꺼지지는 않지만, 값이 0으로 출력됩니다)
5. border에는 뭘쓸지 생각중
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
