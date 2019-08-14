const isValidPos = pos => {
  const cellX = pos.charCodeAt(0) - 'A'.charCodeAt(0);
  const cellY = pos.charCodeAt(1) - '1'.charCodeAt(0);
  if (cellX < 0 || cellX > 8 || cellY < 0 || cellY > 8) return false;
  return true;
};

const getNextMovePos = (pos, move) => {
  const cellX = pos.charCodeAt(0) + move[0];
  const cellY = pos.charCodeAt(1) + move[1];
  const cellXDelta = pos.charCodeAt(0) + move[0] - 'A'.charCodeAt(0);
  const cellYDelta = pos.charCodeAt(1) + move[1] - '1'.charCodeAt(0);

  if (cellXDelta < 0 || cellXDelta > 8 || cellYDelta < 0 || cellYDelta > 8) return null;
  
  return String.fromCharCode(cellX) + String.fromCharCode(cellY);
}

module.exports = (req, res) => {
  const { pos } = req.body;
  
  if (!pos || !isValidPos(pos)) {
    res.status(400).json({
      success: false,
      message: 'Invalid position requested!',
    });
    return;
  }

  const movement = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  const results = [];
  const semiResults = [];

  movement.forEach(move => {
    const next = getNextMovePos(pos, move);

    if (next) {
      results.push(next);
    }
  });

  results.forEach(one => {
    movement.forEach(move => {
      const next = getNextMovePos(one, move);

      if (next && !semiResults.includes(next)) {
        semiResults.push(next);
      }
    })
  })

  res.status(200).json({
    success: true,
    data: {
      first: results,
      second: semiResults,
    },
  });
};
