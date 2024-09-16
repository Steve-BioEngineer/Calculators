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
function calculatePEI() {
    // Get input values
    const numReactions = parseInt(document.getElementById('num-reactions').value);
    const packagingConc = parseFloat(document.getElementById('packaging-conc').value); // µg/µL
    const transferConc = parseFloat(document.getElementById('transfer-conc').value); // µg/µL
    const wellPlate = document.getElementById('well-plate').value;

    // Validate inputs
    if (isNaN(numReactions) || numReactions <= 0) {
        alert('Please enter a valid number of reactions.');
        return;
    }
    if (isNaN(packagingConc) || packagingConc <= 0) {
        alert('Please enter a valid packaging plasmid concentration.');
        return;
    }
    if (isNaN(transferConc) || transferConc <= 0) {
        alert('Please enter a valid transfer plasmid concentration.');
        return;
    }
    if (!wellPlate) {
        alert('Please select a well plate type.');
        return;
    }

    // Define DNA amounts and volumes based on well plate type
    let dnaPerWell; // µg per well
    let transfectionVolume; // µL per well

    switch (wellPlate) {
        case '6':
            dnaPerWell = 2.0;
            transfectionVolume = 200;
            break;
        case '12':
            dnaPerWell = 1.0;
            transfectionVolume = 100;
            break;
        case '24':
            dnaPerWell = 0.5;
            transfectionVolume = 50;
            break;
        case '96':
            dnaPerWell = 0.2;
            transfectionVolume = 10;
            break;
        default:
            alert('Invalid well plate type.');
            return;
    }

    // Total DNA per reaction
    const totalDNAperReaction = dnaPerWell; // µg

    // PEI:DNA ratio
    const peiToDnaRatio = 3; // Mass ratio

    // PEI concentration (assuming 1 mg/mL stock)
    const peiConc = 1; // µg/µL

    // Calculations per reaction
    const volumePackagingDNA = (totalDNAperReaction / 2 / packagingConc).toFixed(2); // µL
    const volumeTransferDNA = (totalDNAperReaction / 2 / transferConc).toFixed(2); // µL
    const totalDNAvolume = parseFloat(volumePackagingDNA) + parseFloat(volumeTransferDNA); // µL

    const massPEI = totalDNAperReaction * peiToDnaRatio; // µg
    const volumePEI = (massPEI / peiConc).toFixed(2); // µL

    const volumeOptiMEM = (transfectionVolume - totalDNAvolume - volumePEI).toFixed(2); // µL

    // Total volumes for all reactions
    const totalVolumePackagingDNA = (volumePackagingDNA * numReactions).toFixed(2);
    const totalVolumeTransferDNA = (volumeTransferDNA * numReactions).toFixed(2);
    const totalVolumePEI = (volumePEI * numReactions).toFixed(2);
    const totalVolumeOptiMEM = (volumeOptiMEM * numReactions).toFixed(2);

    // Display results
    const resultDiv = document.getElementById('pei-result');
    resultDiv.innerHTML = `
        <h3>Reagent Volumes Needed</h3>
        <p><strong>For ${numReactions} reaction(s):</strong></p>
        <p>Volume of Packaging Plasmid DNA: ${totalVolumePackagingDNA} µL</p>
        <p>Volume of Transfer Plasmid DNA: ${totalVolumeTransferDNA} µL</p>
        <p>Volume of PEI: ${totalVolumePEI} µL</p>
        <p>Volume of OptiMEM: ${totalVolumeOptiMEM} µL</p>
    `;
}
