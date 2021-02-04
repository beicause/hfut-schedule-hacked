
const gradeList = [
  '大一上',
  '大一下',
  '大二上',
  '大二下',
  '大三上',
  '大三下',
  '大四上',
  '大四下',
  '大五上',
  '大五下',
  '大六上',
  '大六下',
]

export default (username, term) => {
  const enterYear = parseInt(String(username).slice(0, 4))
  const termYear = parseInt(String(term).slice(0, 4))
  const termNumber = parseInt(String(term).slice(4))
  
  const years = termYear - enterYear
  return gradeList[years * 2 + termNumber - 1]
}
