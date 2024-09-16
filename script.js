function calculateMolarity() {
    // Get input values
    const mass = parseFloat(document.getElementById('mass').value);
    const molecularWeight = parseFloat(document.getElementById('molecular-weight').value);
    let volume = parseFloat(document.getElementById('volume').value);
    const volumeUnit = document.getElementById('volume-unit').value;

    // Validate inputs
    if (isNaN(mass) || mass <= 0) {
        alert('Please enter a valid mass of solute.');
        return;
    }
    if (isNaN(molecularWeight) || molecularWeight <= 0) {
        alert('Please enter a valid molecular weight.');
        return;
    }
    if (isNaN(volume) || volume <= 0) {
        alert('Please enter a valid volume of solution.');
        return;
    }

    // Convert volume to liters if necessary
    if (volumeUnit === 'mL') {
        volume = volume / 1000; // Convert mL to L
    }

    // Calculate molarity
    const moles = mass / molecularWeight;
    const molarity = moles / volume;

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `The molarity of the solution is <strong>${molarity.toFixed(4)} mol/L</strong>.`;
}
