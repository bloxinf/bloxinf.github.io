const Creator = {
  terminateCb: null,

  launch(terminateCb) {
    this.terminateCb = terminateCb;
  },
};

export default Creator;
