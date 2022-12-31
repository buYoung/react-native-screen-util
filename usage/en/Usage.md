### usage
1. Add "ResponsibleProvider" to the root "app.jsx" or "app.tsx" of "react native"
   1. Please see the file "api.md" for the option of "ResponsibleProvider"
2. Please put the value in the option of ResponsiveProvider You can look at the example and follow it!
    1. If possible, put screenSize as Dimension.get("window") in option value.
2. Change the code that writes "StyleSheet.create" where there is a style code by using ResponsiveStyleSheet.create without changing the existing code!
   1. Automatically changes to responsive. However, the ResponsibleProvider must be in root.
   2. However, only the values of width, height, fontsize, margin, and padding are changed. I didn't add border, top, and bottom left right because I'm not sure yet. For information on this, please see the API with 5 _______ contents of the store
3. done!

Caution. If possible, please fill out the style code separately! The inline code you write in the UI is risky and heavy, and because the library uses store, rendering may occur.