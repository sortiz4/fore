const fs = require('fs');

const PATH = './platforms/android/app/src/main/java/org/apache/cordova/splashscreen/SplashScreen.java';
const OLD_TEXT = 'android.R.style.Theme_Translucent_NoTitleBar';
const NEW_TEXT = 'cordova.getActivity().getResources().getIdentifier("SplashTheme", "style", cordova.getActivity().getPackageName())';

module.exports = async function () {
  try {
    const oldContent = await fs.promises.readFile(PATH, 'utf-8');
    const newContent = oldContent.replace(OLD_TEXT, NEW_TEXT);
    if (oldContent !== newContent) {
      await fs.promises.writeFile(PATH, newContent);
    }
  } catch {
  }
};
