export default function calculateDDay(dateString: string) {
  const dDate = new Date(dateString + 'T00:00:00');
  const nowDate = new Date();
  const diff = Number(nowDate) - Number(dDate);
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  let dDayText;
  if (diffDay === 0) {
    dDayText = 'D-Day';
  } else if (diffDay > 0) {
    dDayText = `D+${diffDay}`;
  } else {
    dDayText = `D${diffDay}`;
  }
  return dDayText;
}
