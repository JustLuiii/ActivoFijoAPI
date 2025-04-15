export const CheckDocument = (document: string) => {

    const cleanDocument = document.replace(/\D/g, "");

    if (cleanDocument.length !== 11) return "La cédula debe tener 11 dígitos.";

    let suma = 0;
    const multiplicador = [1, 2];

    for (let i = 0; i < 10; i++) {
        const num = parseInt(cleanDocument[i]) * multiplicador[i % 2];
        suma += num > 9 ? num - 9 : num;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;
    
    if (digitoVerificador !== parseInt(cleanDocument[10])) {
        return "La cédula no es válida.";
    }

    return true;
}