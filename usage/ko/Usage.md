### 사용법
1. react의 root app.jsx 또는 app.tsx쪽에 ResponsiveProvider 를 추가해주세요
   1. 옵션은 아래에서 봐주세요.
2. ResponsiveProviderd의 option에 값을 넣어주세요 example을 보고 따라하셔도 됩니다!
    1. 왠만하면 option값에 screenSize는 Dimensions.get("window")로 넣어주세요.
2. style 코드가 있는 곳에서 ResponsiveStyleSheet.create를 써서 기존에 사용하던 StyleSheet을 대신해주세요
   1. 자동으로 반응형으로 변경됩니다.
   2. 단, width, height, fontsize, margin, padding 값 들만 바뀝니다. border와 top, bottom left right는 아직 확실하지 않아서 추가안했습니다. 이것에 대한 내용도 아래에 설명하겠습니다.
3. 끝!

주의. 스타일 코드는 왠만하면 따로 작성해주세요! UI에 적는 inline코드는 위험성이 존재하며 무겁습니다, 해당 라이브러리는 유동적인 store를 사용하기 때문에 렌더링이 일어 날 수도 있습니다.