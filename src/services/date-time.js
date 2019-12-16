const getFormattedDate = (date) => {
    return `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())} ${padNumber(date.getHours())}:${padNumber(date.getMinutes())}:${padNumber(date.getSeconds())}`;
  }
  
  const padNumber = (number) => {
    return number < 10 ? "0" + number : number;
  }
  
  module.exports = {
    format:(date)=>{
        return getFormattedDate(date);
    }
  }