let selectedForm = 1;
let resultDiv = document.getElementById("result");

//onInit
document.getElementById(`form-${selectedForm}`).style.display = "block";
document.getElementById("M/M/1").className = "option option-selected";

function clear() {
    resultDiv.innerHTML = "";
    document.getElementById(`form-${selectedForm}`).reset();
}

function showForm() {
    document.getElementById(`form-${selectedForm}`).style.display = "block";
}

function hideForm() {
    document.getElementById(`form-${selectedForm}`).style.display = "none";
}

function focusOption() {
    switch (selectedForm) {
        case 1:
            document.getElementById("M/M/1").className = "option option-selected";
            break;
        case 2:
            document.getElementById("M/M/1-finite").className = "option option-selected";
            break;
        case 3:
            document.getElementById("M/M/m").className = "option option-selected";
            break;
        case 4:
            document.getElementById("M/D/1").className = "option option-selected";
            break;
    }
}

function unFocusOption() {
    switch (selectedForm) {
        case 1:
            document.getElementById("M/M/1").className = "option";
            break;
        case 2:
            document.getElementById("M/M/1-finite").className = "option";
            break;
        case 3:
            document.getElementById("M/M/m").className = "option";
            break;
        case 4:
            document.getElementById("M/D/1").className = "option";
            break;
    }
}

function fact(num) {
    let factorial = 1;
    for (let i = 1; i <= num; i++) {
        factorial = factorial * i;
    }
    return factorial;
}

//FORM #1
function calculateMM1 () {
    const m = 1;
    let mu = parseFloat(document.getElementById("mu1").value);
    let lambda = parseFloat(document.getElementById("lambda1").value);
    let K = parseFloat(document.getElementById("K1").value);
    let time = parseFloat(document.getElementById("time1").value);
    let Cw = parseFloat(document.getElementById("cw1").value);
    let Cs = parseFloat(document.getElementById("cs1").value);

    let L = lambda / (mu-lambda);
    let w = m / (mu-lambda);
    let Lq = Math.pow(lambda, 2) / (mu * (mu - lambda));
    let Wq = lambda /(mu * (mu-lambda))
    let Ro = (lambda / mu)*100;
    let PO = (1 - (lambda / mu))*100;
    let pnK = Math.pow(lambda/mu, K+1);

    let totalWaitingCost = time * lambda * Wq * Cw;
    let totalServiceCost = Cs * m * time;
    let totalCost = totalWaitingCost + totalServiceCost;

    resultDiv.innerHTML = "" +
        "<b>Costo total espera:</b> " + totalWaitingCost + "<br>" +
        "<b>Costo total servicio:</b> </b> " + totalServiceCost + "<br>" +
        "<b>Costo total:</b> " + totalCost + "<br><br>" +
        "<b>L:</b> " + L + "<br>" +
        "<b>w:</b> " + w + " <b>Tiempo sistema promedio:</b> " + (w * 60) + "<br>" +
        "<b>Lq:</b> " + Lq + "<br>" +
        "<b>Wq:</b> " + Wq + " <b>Tiempo promedio espera:</b> " + (Wq * 60) + "<br>" +
        "<b>Ro:</b> " + Ro + "%" + "<br>" +
        "<b>PO:</b> " + PO + "%" + "<br>" +
        "<b>pn>K:</b> " + pnK + "%" + "<br>";
}

//FORM #2
function calculateMM1Finite () {
    const m = 1;
    let mu = parseFloat(document.getElementById("mu2").value);
    let lambda = parseFloat(document.getElementById("lambda2").value);
    let n = parseFloat(document.getElementById("n2").value);
    let time = parseFloat(document.getElementById("time2").value);
    let Cw = parseFloat(document.getElementById("cw2").value);
    let Cs = parseFloat(document.getElementById("cs2").value);

    let PO = 0;

    for (let i=0; i <= n; i++) {
        PO += (fact(n))/(fact(n-i))*Math.pow(lambda/mu,i);
    }

    PO = 1/PO;

    let Lq = n-((lambda+mu)/lambda)*(m-PO);
    let L = Lq+(m-PO);
    let Wq = Lq/((n-L)*lambda)

    let totalWaitingCost = time * lambda * Wq * Cw;
    let totalServiceCost = Cs * m * time;
    let totalCost = totalWaitingCost + totalServiceCost;

    resultDiv.innerHTML = "" +
        "<b>Costo total espera:</b> " + totalWaitingCost + "<br>" +
        "<b>Costo total servicio:</b> </b> " + totalServiceCost + "<br>" +
        "<b>Costo total:</b> " + totalCost + "<br><br>" +
        "<b>L:</b> " + L + "<br>" +
        "<b>Lq:</b> " + Lq + "<br>" +
        "<b>Wq:</b> " + Wq + " <b>Tiempo promedio espera:</b> " + (Wq * 60) + "<br>" +
        "<b>PO:</b> " + PO + "<br>"
}

//FORM #3
function calculateMMM () {
    let m = parseFloat(document.getElementById("m3").value);
    let mu = parseFloat(document.getElementById("mu3").value);
    let lambda = parseFloat(document.getElementById("lambda3").value);
    let n = parseFloat(document.getElementById("n3").value);
    let time = parseFloat(document.getElementById("time3").value);
    let Cw = parseFloat(document.getElementById("cw3").value);
    let Cs = parseFloat(document.getElementById("cs3").value);

    let res = m - 1;

    let PO = 1 / ((1 / fact(n) + Math.pow(lambda / mu, n)) + (1 / fact(m)) * Math.pow(lambda / mu, m) * ((m * mu) / (m * mu - lambda)));
    let L = (((lambda * mu) * (Math.pow(lambda / mu, m))) / ((fact(res) * (Math.pow(m * mu - lambda, 2))))) * PO + (lambda / mu);
    let w = L / lambda;
    let Lq = L - (lambda / mu);
    let Wq = Lq / lambda;
    let Ro = (L - (lambda / mu))*100;

    PO = PO*100;

    let totalWaitingCost = time * lambda * Wq * Cw;
    let totalServiceCost = Cs * m * time;
    let totalCost = totalWaitingCost + totalServiceCost;

    document.getElementById("result").innerHTML =
        "<b>Costo total espera:</b> " + totalWaitingCost + "<br>" +
        "<b>Costo total servicio:</b> </b> " + totalServiceCost + "<br>" +
        "<b>Costo total:</b> " + totalCost + "<br><br>" +
        "<b>L:</b> " + L + "<br>" +
        "<b>w:</b> " + w + " <b>Tiempo sistema promedio:</b> " + w * 60 + "<br>" +
        "<b>Lq:</b> " + Lq + "<br>" +
        "<b>Wq:</b> " + Wq + " <b>Tiempo promedio espera:</b> " + Wq * 60 + "<br>" +
        "<b>Ro:</b> " + Ro + "%" + "<br>" +
        "<b>PO:</b> " + PO + "%";
}

//FORM #4
function calculateMD1 () {
    let m = 1;
    let mu = parseFloat(document.getElementById("mu4").value);
    let lambda = parseFloat(document.getElementById("lambda4").value);
    let time = parseFloat(document.getElementById("time4").value);
    let Cw = parseFloat(document.getElementById("cw4").value);
    let Cs = parseFloat(document.getElementById("cs4").value);

    let Lq = (Math.pow(lambda, 2)) / (2 * mu * (mu - lambda));
    let Wq = lambda / (2 * mu * (mu - lambda));
    let L = Lq + (lambda / mu);
    let w = Wq + (1 / mu);

    let totalWaitingCost = time * lambda * Wq * Cw;
    let totalServiceCost = Cs * m * time;
    let totalCost = totalWaitingCost + totalServiceCost;

    document.getElementById("result").innerHTML = "" +
        "<b>Costo total espera:</b> " + totalWaitingCost + "<br>" +
        "<b>Costo total servicio:</b> </b> " + totalServiceCost + "<br>" +
        "<b>Costo total:</b> " + totalCost + "<br><br>" +
        "<b>L:</b> " + L + "<br>" +
        "<b>w:</b> " + w + " <b>Tiempo sistema promedio:</b> " + w * 60 + "<br>" +
        "<b>Lq:</b> " + Lq + "<br>" +
        "<b>Wq:</b> " + Wq + " <b>Tiempo promedio espera:</b> " + Wq * 60;
}

document.getElementById('M/M/1').addEventListener('click', function() {
    if (selectedForm !== 1) {
        document.getElementById("M/M/1").className = "option option-selected";
        clear();
        unFocusOption();
        hideForm();
        selectedForm = 1;
        focusOption();
        showForm();
    }
});

document.getElementById('M/M/1-finite').addEventListener('click', function() {
    if (selectedForm !== 2) {
        document.getElementById("M/M/1-finite").className = "option option-selected";
        clear();
        unFocusOption();
        hideForm();
        selectedForm = 2;
        focusOption();
        showForm();
    }
});

document.getElementById('M/M/m').addEventListener('click', function() {
    if (selectedForm !== 3) {
        clear();
        unFocusOption();
        hideForm();
        selectedForm = 3;
        focusOption();
        showForm();
    }
});

document.getElementById('M/D/1').addEventListener('click', function() {
    if (selectedForm !== 4) {
        clear();
        unFocusOption();
        hideForm();
        selectedForm = 4;
        focusOption();
        showForm();
    }
});

function checkSelectedForm () {
    switch (selectedForm) {
        case 1:
            calculateMM1();
            break;
        case 2:
            calculateMM1Finite();
            break;
        case 3:
            calculateMMM();
            break;
        case 4:
            calculateMD1();
            break;
    }
}
document.getElementById("form-1").addEventListener("submit", function(event) {
    event.preventDefault();
    checkSelectedForm();
});

document.getElementById("form-2").addEventListener("submit", function(event) {
    event.preventDefault();
    checkSelectedForm();
});

document.getElementById("form-3").addEventListener("submit", function(event) {
    event.preventDefault();
    checkSelectedForm();
});

document.getElementById("form-4").addEventListener("submit", function(event) {
    event.preventDefault();
    checkSelectedForm();
});