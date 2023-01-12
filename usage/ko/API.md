### API
1. Provider(react context)
   1. ScreenResponsiveProvider
        ###### 반응형 디자인에 쓰이는 Provider입니다.
        ###### UI/UX에서 flex대신 px로 잡은경우 이 라이브러리를 사용하면 됩니다.
      1. Props
         1. option (반응형의 설정값입니다.)
            1. width : ui/ux의 디자인된 영역의 넓이를 적어주세요!
            2. height : ui/ux의 디자인된 영역의 높이를 적어주세요! (디자인된 기기의 전체 높이가 아닌 상태바와 바텀 또는 네비게이션바가 제거된 높이입니다.)
            3. safeArea : deprecated (3일간의 뻘짓으로 알게된 사실입니다. ios는 상관없지만, 안드에서는 네비게이션바의 상태가 _만 있을때 높이를 모릅니다)
            4. mainUI : deprecated
            5. safeAreaInset : deprecated
            6. debug : deprecated
            7. screenSize : deprecated (이 값은 provider 내부에서 자동으로 화면의 크기를 구합니다. 상단바, 네비게이션바 또는 하단바를 제외한 크기)
            8. scaleByHeight : 계산식의 비율을 기본값은 넓이지만, 높이를 사용할때 true를 줍니다. (계산된 값이 조금 더 커집니다.)
            9. minTextSize : width와 height중 제일 작은값을 사용합니다. (비율)
            10. splitScreenMode : 사용시 최대높이가 700으로 고정되고, split 화면인 핸드폰을 지원하게 됩니다.
            11. equality : subscribe 또는 변수가 바뀔때를 알려주는 areEqual 알고리즘. 기본값 zustand의 shallow
         2. loading (반응형 설정이 끝날때까지 loading창이 나타납니다.)
         3. autoInset (IOS용) 안드로이드는 height값으로 조절이 가능하지만, ios는 top, left 또는 bottom, right로 조절해야해서 추가된 기능입니다.
   2. AreEqualProvider
      2. 1-1의 areEqual 알고리즘을 변경 할 수 있는 기능을 가지고있는 provider 입니다.
2. context
   1.  useResponsiveContextStore 반응형 라이브러리의 context입니다
   2.  useAreEqualStore 반응형 라이브러리의 areEqual 알고리즘을 변경해주는 context입니다
3. store
   1. ResponsiveContextApi context와 비슷한 형태로 쓰이며, 단독으로 style 페이지에서 사용 안됩니다. 대안책은 있습니다.
   2. AreEqualApi context와 같습니다.
   3. ResponsiveStore (ResponsiveContextApi)의 한계 react context가 있어야 사용가능점을 없앤 store 자세한 내용은 zustand의 vanilaJS 를 참조해주세요.
      1. set 함수 건들지 마세요 provider와 연결된 내부함수용입니다.
      2. "_____" 언더바가 5개 들어간 함수는 private용 함수이지만 직접 사용하셔도 상관없습니다.
         1. _____getInset(orientation) : orientation값을 넣어주면 자동으로 safeAreaInset값을 출력해줍니다. 단, option에서 safeArea가 true여야합니다.
         2. _____getFont(value) : value는 숫자만 가능합니다. 폰트 사이즈 비율 계산된 값이 출력됩니다.
         3. _____getWidth(value) : value는 숫자만 가능합니다. 넓이 사이즈 비율 계산된 값이 출력됩니다.
         4. _____getHeight(value) : value는 숫자만 가능합니다. 높이 사이즈 비율 계산된 값이 출력됩니다.
         5. _____getSpacing(value) : value는 숫자만 가능합니다. margin,padding용 사이즈 비율 계산된 값이 출력됩니다.
      3. getState() store의 현재 상태값을 출력합니다.
      4. getAction() store의 현재 action용 함수를 출력합니다. copyData는 절대 건들지 마세요
4. Responsive extension(number 전용) margin, padding은 출력값이 같습니다. 단, 코드의 퀄리티를 위해 같은 단어만 쓰지 마세요.
   1. w, width 넓이  ```ex) (number).w(); (number).width(); ```
   2. h, height 높이 ```ex) (number).h(); (number).height(); ```
   3. sp, fontSize 폰트사이즈 ```ex) (number).sp(); (number).fontSize(); ```
   4. ml, marginLeft 마진 왼쪽 ```ex) (number).ml(); (number).marginLeft(); ```
   5. mr, marginRight 마진 오른쪽 ```ex) (number).mr(); (number).marginRight(); ```
   6. mt, marginTop 마진 위```ex) (number).mt(); (number).marginTop(); ```
   7. mb, marginBottom 마진 아래```ex) (number).mb(); (number).marginBottom(); ```
   8. pl, paddingLeft 패딩 왼쪽```ex) (number).pl(); (number).paddingLeft(); ```
   9. pr, paddingRight 패딩 오른쪽```ex) (number).pr(); (number).paddingRight(); ```
   10. pt, paddingTop 패딩 탑```ex) (number).pt(); (number).paddingTop(); ```
   11. pb, paddingBottom 패딩 바텀```ex) (number).pb(); (number).paddingBottom(); ```
5. Responsive function 이 함수들은 object형태로 fontsize면 ```{fontSize: value}```로 출력이 됩니다.
- 넣은 값만 출력되고, 축어 약어를 동시 못 쓰도록 typeGuard해놨습니다. wh에서 w를 썻으면 width는 쓰지마세요
- 마진, 패딩은 예제가 너무 많습니다. 직접 써보세요 간단하게만 보여드릴껍니다...
- 마진, 패딩은 ph,pv 또는 mh, mv horizen, vertical인경우인데, 좌우, 상하 입니다.RN에 있는 내용이며, 위의 Extention에서는 지원하지않지만 함수에서는 지원합니다. 마진 패딩 역시 TypeGuard가 있으므로, 왠만하면 오류 없을껍니다.
   1. wh, dimension 넓이 높이 ```ex) wh({w:10, h:10}) wh({width:10});dimension({w:1, h:2}) ```
   2. sp, fontSize 폰트```ex) sp({sp:10}) sp({fontSize:10});fontSize({sp:10}) ```
   3. m, margin 마진```ex) m({m:10}) m({mh:10,mv:10});margin({mt:10,mb:20}) ```
   4. p, padding 패딩```ex) p({pl:20,pr:40}) p({padding:20});padding({paddingTop: 10, paddingLeft: 40}) ```
6. utility (react-if)가 있으며, React.memo가 적용되어 있고 areEqual 알고리즘으로 shallow가 적용되어있습니다.
   1. 자세한 내용은 react-if를 검색해서 공식 깃허브를 방문해주시기 바랍니다!
