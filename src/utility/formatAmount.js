export const formatAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2
});
