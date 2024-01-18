let hoverDurations = {};

onmessage = function (event) {
  const { action, rowId } = event.data;

  if (action === "start") {
    hoverDurations[rowId] = hoverDurations[rowId] || { start: null, total: 0 };
    hoverDurations[rowId].start = Date.now();
  } else if (action === "end") {
    const durationObj = hoverDurations[rowId];
    if (durationObj && durationObj.start !== null) {
      durationObj.total += Date.now() - durationObj.start;
      durationObj.start = null;

      postMessage({
        type: "duration",
        rowId: rowId,
        duration: durationObj.total,
      });
    }
  }
};
