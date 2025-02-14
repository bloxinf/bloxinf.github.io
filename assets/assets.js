const Assets = {
  init() {
    const images = [
      { name: "bgButtonIcon", src: "assets/bg_button_icon.svg" },
      { name: "gridButtonIcon", src: "assets/grid_button_icon.svg" },
      { name: "bloxButtonIcon", src: "assets/blox_button_icon.svg" },
      { name: "homeButtonIcon", src: "assets/home_button_icon.svg" },
    ];
    const promises = images.map(
      (image) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.src = image.src;
          this[image.name] = function () {
            return img;
          };
        })
    );
    return Promise.all(promises);
  },
};

export default Assets;
