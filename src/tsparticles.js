(async () => {
    await loadFireworksPreset(tsParticles);

    window.tsParticles = tsParticles
  
    // const container = await tsParticles.load({
    //   id: "tsparticles",
    //   options: {
    //     preset: "fireworks",
    //   },
    // });

    // setTimeout(() => {
    //     container.destroy("tsparticles"); // 销毁实例
    // }, 5000); // 5 秒后停止

  })();