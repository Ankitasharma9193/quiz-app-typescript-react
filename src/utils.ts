export const shuffleArray = (array: any[]) =>
    {
        console.log(array);
   return  [...array].sort(() => Math.random() - 0.5);
    }