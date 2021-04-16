$(document).ready(function(){
    $.getJSON('https://api.tfl.gov.uk/Line/Mode/tube/Status', function(result) {
        for (i = 0; i < result.length; i++){
            $("#lineInfo").append(
                `<p id="${result[i].id}">Line: ${result[i].name}<br>
                Status: ${result[i].lineStatuses[0].statusSeverityDescription}</p>`
            )
        }
    })
})