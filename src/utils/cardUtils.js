export const isValidCardNumber = (formattedCardNumber) => {
    const digits = formattedCardNumber.replace(/\D/g, '');

    if (digits.length < 13 || digits.length > 19) {
        return false;
    }

    const reversedDigits = digits.split('').reverse().map(Number);

    const doubledDigits = reversedDigits.map((digit, index) => {
        return index % 2 === 1 ? digit * 2 : digit;
    });

    const sum = doubledDigits.reduce((acc, digit) => {
        return acc + (digit > 9 ? digit - 9 : digit);
    }, 0);

    return sum % 10 === 0;
};

export const isValidCardHolder = (cardHolder) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(cardHolder);
};

export const isValidExpiryDate = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(expiryDate)) {
        return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    const expiryYear = parseInt(year, 10);
    const expiryMonth = parseInt(month, 10);

    if (expiryYear < currentYear) {
        return false;
    }

    if (expiryYear == currentYear && expiryMonth < currentMonth) {
        return false;
    }

    if (expiryMonth == 2 && expiryYear % 4 !== 0) {
        return false;
    }

    const thirtyDaysMonths = [4, 6, 9, 11];
    if (thirtyDaysMonths.includes(expiryMonth)) {
        return false;
    }

    return true;
};

export const isValidCVC = (cvc) => {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvc);
};