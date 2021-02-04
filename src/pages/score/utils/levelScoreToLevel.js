
const levelScoreDiv = {
  '90': '优',
  '80': '良',
  '70': '中',
  '60': '及格',
  '0': '不及格',
}

export default (score) => {
  return levelScoreDiv[String(score)]
}
