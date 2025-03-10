type DateItem = {
    date: string;
    day: string;
    past: boolean;
    current: boolean;
    future: boolean;
  };
  
  const generateThreeMonthsDates = (): DateItem[] => {
    const today = new Date();
    const datesArray: DateItem[] = [];
  
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - 1); // Start from last month
    startDate.setDate(1); // Start from the 1st of that month
  
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 1); // End at next month
    endDate.setDate(new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()); // Last day of next month
  
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const isPast = currentDate < today && !isSameDay(currentDate, today);
      const isCurrent = isSameDay(currentDate, today);
      const isFuture = currentDate > today;
  
      datesArray.push({
        date: currentDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
        day: getSpanishDay(currentDate.getDay()), // Spanish Day Name
        past: isPast,
        current: isCurrent,
        future: isFuture,
      });
  
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }
  
    return datesArray;
  };
  
  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  // Helper function to get the Spanish day name
  const getSpanishDay = (dayIndex: number): string => {
    const daysInSpanish = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    return daysInSpanish[dayIndex];
  };
   
 export default generateThreeMonthsDates();
