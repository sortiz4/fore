const { promises: fs } = require('fs');

const PATCHES = [
  async () => {
    const patch = {
      file: 'platforms/android/app/src/main/java/org/apache/cordova/splashscreen/SplashScreen.java',
      search: 'android.R.style.Theme_Translucent_NoTitleBar',
      replace: 'cordova.getActivity().getResources().getIdentifier("SplashTheme", "style", cordova.getActivity().getPackageName())',
    };

    // Patch the Android splash screen theme
    await runSearchAndReplace(patch.file, patch.search, patch.replace);
  },
];

async function runSearchAndReplace(file, search, replace) {
  const oldContent = await fs.readFile(file, 'utf-8');
  const newContent = oldContent.replace(search, replace);

  if (oldContent !== newContent) {
    await fs.writeFile(file, newContent);
  }
}

module.exports = async () => {
  for (const patch of PATCHES) {
    try {
      await patch();
    } catch (error) {
      console.error(error);
    }
  }
};
