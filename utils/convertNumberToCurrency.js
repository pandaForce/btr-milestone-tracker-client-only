 const convertNumberToCurrency = (value) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD'
  }).format(value);


export default convertNumberToCurrency