
export default (score, scoreDigits) => {
  if (typeof score === 'number') {
    return score.toFixed(scoreDigits)
  } else {
    return score
  }
}
