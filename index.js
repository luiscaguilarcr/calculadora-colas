document.getElementById('M/M/1').addEventListener('click', function() {
    console.log('M/M/1');
});

document.getElementById('M/M/m').addEventListener('click', function() {
    console.log('M/M/m');
});

document.getElementById('M/D/1').addEventListener('click', function() {
    console.log('M/D/1');
});

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let m = document.getElementsByName("m")[0].value;
    let mu = document.getElementsByName("μ")[0].value;
    let lambda = document.getElementsByName("λ")[0].value;
    let K = document.getElementsByName("K")[0].value;
    let time = document.getElementsByName("time")[0].value;
    let Cw = document.getElementsByName("cw")[0].value;
    let Cs = document.getElementsByName("cs")[0].value;

    let L = mu / (lambda - mu);
    let w = 1 / (mu / lambda);
    let lambdaRaised2 = Math.pow(lambda, 2);
    let Lq = (lambdaRaised2 / (mu * (mu - lambda)));
    let Wq = (lambda / mu) * (mu - lambda);
    let Ro = lambda / mu;
    let PO = 1 - (lambda / mu);
    let pnK = Math.pow((lambda / mu), (parseInt(K) + 1));
    let dailyWaitingCost = time * lambda * Wq * Cw;
    let totalServiceCost = Cs * m * time;
    let totalCost = dailyWaitingCost + totalServiceCost;

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "" +
        "<b>Costo espera diario:</b> " + dailyWaitingCost + "<br>" +
        "<b>Costo total servicio diario:</b> </b> " + totalServiceCost + "<br>" +
        "<b>Costo total:</b> " + totalCost + "<br><br>" +
        "<b>L:</b> " + L + "<br>" +
        "<b>w:</b> " + w + " <b>Tiempo sistema promedio:</b> " + (w * 60) + "<br>" +
        "<b>Lq:</b> " + Lq + "<br>" +
        "<b>Wq:</b> " + Wq + " <b>Tiempo promedio espera:</b> " + (Wq * 60) + "<br>" +
        "<b>Ro:</b> " + Ro + "% se quita 0" + "<br>" +
        "<b>PO:</b> " + PO + "<br>" +
        "<b>pn>K:</b> " + pnK + "<br>";
});