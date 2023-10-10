
function formatCurrency(number) {
    if (typeof number !== 'number') {
      throw new Error('El valor proporcionado no es un número.');
    }
  
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'US',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  
 
  function formatDecimal(number) {
    if (typeof number !== 'number') {
      throw new Error('El valor proporcionado no es un número.');
    }
  
    return number.toFixed(2);
  }
  

  