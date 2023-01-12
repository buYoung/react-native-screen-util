### API
1. Provider(react context)
   1. ScreenResponsiveProvider
         ##### It's a provider used in reactive design.
         ##### You can use this library if you have px instead of flex in UI/UX.

      1. Props
         1. option
            1. width : Please write down the width of the designed area of ui/ux!
            2. height : Please write down the height of the designed area of ui/ux! (This is the height with the status bar and bottom or navigation bar removed, not the total height of the designed device.)
            3. safeArea : deprecated ((This is a fact that I found out after 3 days of nonsense. iOS doesn't matter, but in Android, when the navigation bar has only _, the height is unknown))
            4. mainUI : deprecated
            5. safeAreaInset : deprecated
            6. debug : deprecated
            7. screenSize : deprecated (This value automatically obtains the size of the screen inside the provider. Size excluding top bar, navigation bar, or bottom bar)
            8. scaleByHeight : The default value for the ratio of the calculation formula is width, but when using height, give true. (The calculated value will be slightly larger.)
            9. minTextSize : The smallest value among width and height is used. (ratio)
            10. splitScreenMode : When used, the maximum height is fixed at 700, and a split screen mobile phone is supported.
            11. equality : subscribe or the areEqual algorithm to tell when a variable changes. shallow by default zustand
         2. loading (The loading indicator appears until the reactive setting is finished.)
         3. autoInset (IOS only) Android can be adjusted to the height value, but iOS is added because it has to be adjusted to top, left, bottom, and right.
   2. AreEqualProvider
      2. 1-1의 areEqual A "provider" that has the ability to change the algorithm.
2. context
   1.  useResponsiveContextStore The context of the responsive library
   2.  useAreEqualStore Context that changes the areaEqual algorithm of the responsive library
3. store
   1. ResponsiveContextApi It is used in a similar form to context, and is not used alone on the style page. There are alternatives.
   2. AreEqualApi is same context
   3. ResponsiveStore (ResponsiveContextApi) For more information on the store that eliminates the point of use only when there is a limit of "react context", see zustand's vanilaJS.
      1. "set" Don't touch the function. This is the internal function associated with the provider.
      2. "_____" A function with 5 underbars is for private, but you can use it yourself.
         1. _____getInset(orientation) : If you insert the orientation value, it automatically prints the safe area set value. However, safeArea must be true in option.
         2. _____getFont(value) : The value can only be number. The calculated font size ratio value is output.
         3. _____getWidth(value) : The value can only be number. The width size ratio calculated value is output.
         4. _____getHeight(value) : The value can only be number. The height size ratio calculated value is output.
         5. _____getSpacing(value) : The value can only be number. The margin, padding size ratio calculated value is output.
         6. _____getCircle(value) : The value can only be number. The borderWidth, The formula for this function is: ((scaleWidth * 2) + (scaleHeight * 2) / 2) Here's why. 1. To use the same size (eg icons) 2. To make a circle
         7. _____getMixin(value) : The value can only be number. This is the same as number 6. However, there is a possibility that the formula will be changed later, so it is made separately.

         ```md
         Special Tips!
         If width and height are the same in the same style,
         the same value is displayed, so it does not stretch
         to the left or to the right!
         ```
      3. getState() return current store state
      4. getAction() return current store Function. don't touch plz!!! copyData is same "set" function
4. Responsive extension(number only) Margin and padding have the same output value. However, do not use the same words for the quality of the code.
   1. w, width  ```ex) (number).w(); (number).width(); ```
   2. h, height ```ex) (number).h(); (number).height(); ```
   3. sp, fontSize ```ex) (number).sp(); (number).fontSize(); ```
   4. ml, marginLeft ```ex) (number).ml(); (number).marginLeft(); ```
   5. mr, marginRight  ```ex) (number).mr(); (number).marginRight(); ```
   6. mt, marginTop ```ex) (number).mt(); (number).marginTop(); ```
   7. mb, marginBottom ```ex) (number).mb(); (number).marginBottom(); ```
   8. pl, paddingLeft ```ex) (number).pl(); (number).paddingLeft(); ```
   9. pr, paddingRight```ex) (number).pr(); (number).paddingRight(); ```
   10. pt, paddingTop ```ex) (number).pt(); (number).paddingTop(); ```
   11. pb, paddingBottom ```ex) (number).pb(); (number).paddingBottom(); ```
5. Responsive function  These functions are output as ```{fontSize: value}``` when fontsize in object form.
- Only the value you put in is printed, and do not use both long form and abbreviations at the same time! and "typeGuard" is written. If you write "w" in "wh", don't write "width"
- There are too many examples of margins and padding. Try it on yourself I'm just going to show you a little bit...
- Margin and padding are ph, pv or mh, mv horizen, vertical, left and right.This content is in the RN, and is not supported by the Extension above, but is supported by the function. There is also a TypeGuard for margin padding, so there will be no errors.
   1. wh, dimension  ```ex) wh({w:10, h:10}) wh({width:10});dimension({w:1, h:2}) ```
   2. sp, fontSize ```ex) sp({sp:10}) sp({fontSize:10});fontSize({sp:10}) ```
   3. m, margin ```ex) m({m:10}) m({mh:10,mv:10});margin({mt:10,mb:20}) ```
   4. p, padding ```ex) p({pl:20,pr:40}) p({padding:20});padding({paddingTop: 10, paddingLeft: 40}) ```
6. utility (react-if)and React.memo is applied, and shallows is applied as an areaEqual algorithm.
   1. For more information, please search react-if and visit the official GitHub!
