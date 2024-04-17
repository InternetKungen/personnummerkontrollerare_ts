function validatePersonnummer(personnummer: string): boolean {
    // Ta bort eventuella bindestreck från personnumret
    personnummer = personnummer.replace(/-/g, '');

    // Kontrollera att personnumret är i rätt format (10 siffror)
    if (!/^\d{10,12}$/.test(personnummer)) {
        console.error('Ogiltigt personnummer: Måste vara 10 elle 12 siffror');
        return false;
    }

    // Om personnumret är längre än 10 siffror, ta bort de två första siffrorna
    if (personnummer.length > 10) {
        personnummer = personnummer.slice(2);
    }

    // Dela upp personnumret i en array av siffror
    const digits = personnummer.split('').map(Number);

    // Gå igenom varje siffra och multiplicera med 2 varannan gång, och sedan summera
    let totalSum = 0;
    for (let i = 0; i < digits.length - 1; i++) {
        const digit = digits[i];
        if (i % 2 === 0) {
            let multiplied = digit * 2;
            if (multiplied > 9) {
                multiplied -= 9; // Om produkten är tvåsiffrig, subtrahera 9
            }
            totalSum += multiplied;
        } else {
            totalSum += digit;
        }
    }

    // Kontrollera om personnumret är giltigt genom att jämföra med kontrollsiffran
    const lastDigit = digits[digits.length - 1];
    const calculatedLastDigit = (10 - (totalSum % 10)) % 10;

    // Returnera true om sista siffran i personnumret är korrekt, annars false
    return lastDigit === calculatedLastDigit;
}

// Hämta DOM-elementen
const personnummerInput = document.getElementById('personnummer-input') as HTMLInputElement;
const submitButton = document.getElementById('personnummer-submit-button') as HTMLInputElement;
const personnummerOutput = document.getElementById ('personnummer-output') as HTMLElement;

// Funktion för att skapa och lägga till ett p-element i personnummerOutput
function appendMessage(message: string, isValid: boolean) {
    personnummerOutput.innerHTML = '';
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    if (isValid) {
        paragraph.classList.add('valid');
    } else {
        paragraph.classList.add('invalid');
    }
    personnummerOutput.appendChild(paragraph);
}

// Lägg till händelselyssnare på knappen för att validera personnumret vid klick
submitButton.addEventListener('click', () => {
    const personnummer = personnummerInput.value.trim();
    if (validatePersonnummer(personnummer)) {
        console.log('Personnumret är giltigt.');
        appendMessage('Personnumret är giltigt.', true);
    } else {
        console.error('Ogiltigt personnummer.');
        appendMessage('Ogiltigt personnummer.', false);
    }
});

// Lägg till händelselyssnare på personnummerInput för att kontrollera personnumret vid "Enter"
personnummerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Förhindra standardbeteendet för "Enter"
        submitButton.click(); // Klicka på knappen för att utföra valideringen
    }
});