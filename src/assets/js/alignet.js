const alignetTokenize = (key, tokenRequest, elemId, scope) => {
    var capture = new FlexCapture({
        "key": key,
        "payload": tokenRequest,
        "additionalFields": []
    });

    debugger;
    const scoping = scope;
    capture.init(document.querySelector(elemId), responseCallback, startCallback, errorOnPayCallback);

    function responseCallback(response) {
        scoping.guardarLog('Fin de llamada PAGO ALIGNET, inicio sendToken', scoping);
        scoping.sendToken(response, scoping);
        document.querySelector(elemId).innerHTML = "";
        return;
    }

    function startCallback() {
        scoping.guardarLog('Inicio de llamada PAGO ALIGNET', scoping);
        // scoping.spinner.show('spinnerAllPage');
    }

    function errorOnPayCallback() {
        scoping.guardarLog('Error de llamada PAGO ALIGNET', scoping);
        scoping.sendToken(null, scoping);
        return;
    }
}