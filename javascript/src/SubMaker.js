var items = ["red", "green", "blue"]
var translatedParts

$(document).ready(function() {
    //$('#sub tr:last').after('<tr id="1"><td>Hello</td><td>Ahoj</td></tr>');
    $('#addBTN').click(function() {
        //         $('#sub tr:last').after('<tr id="1"><td>Hello</td><td>abc</td></tr>');
        //         items.forEach(function(item) {
        //             console.log(item)
        //         })
        text = readTextFile("file:///home/apodhrad/Temp/foo.srt")
        colsole.log(text)
    });
    $('#fooBTN').click(function() {
        $('#srtTable tr').each(function(x) {
            console.log($(this).find("td span.id").text())
            console.log($(this).find("td span.time").text())
            console.log($(this).find("td textarea").val())
            console.log("")
        })
    })
    $('#originalFile').on('change', readOriginalFile);
    $('#translatedFile').on('change', readTranslatedFile)
})

function readOriginalFile(event) {
    readTextFile(event.target.files[0], initTable)
}

function readTranslatedFile(event) {
    readTextFile(event.target.files[0], updateTable)
}

function initTable(content) {
    var index = 1
    var parts = content.split(/\s*[\r\n][0-9]+\s*[\r\n]/)
    parts.forEach(function(part) {
        var lines = part.split("\n")
        // var id = lines[0]
        var time = lines[0]
        lines.splice(0, 1)
        // lines.splice(0, 1)
        $('#srtTable tr:last').after('<tr id="' + index++ + '"><td><span class="time">' + time + '</span><pre>' + lines.join("\n") + '</pre></td><td><textarea/></td><td><button type="button" class="moveDown" id="'+index+'">moveDown</button><button type="button" class="edit" id="'+index+'">edit</button></td></tr>');
    })
    
    $('.moveDown').click(function() {
        translatedParts.splice($(this).attr("id") -1, 0, "")
        updateTable("")
    })
    $('.edit').click(function() {
        translatedParts[$(this).attr("id")-1] = $("#srtTable tr#"+$(this).attr("id")+" textarea").val()
        updateTable("")
    })
}

function updateTable(content) {
    if (translatedParts == null || translatedParts == undefined || translatedParts.length == 0) {
        translatedParts = content.split(/\s*[\r\n][0-9]+\s*[\r\n]/)
        for (i = 0; i < translatedParts.length; i++) {
            var lines = translatedParts[i].split("\n")
            var id = lines[0]
            var time = lines[1]
            lines.splice(0, 1)
            lines.splice(0, 1)
            translatedParts[i] = lines.join("\n")
        }
    }
    var index = 0
    $('#srtTable tr').each(function(x) {
        if ($(this).find("td textarea").val() == undefined) {
            return
        }
        if (index >= translatedParts.length) {
            $(this).find("td textarea").val("")
            return
        }
        $(this).find("td textarea").val(translatedParts[index++])
    })
}

function readTextFile(file, foo) {
    var content
    if (file) {
        var r = new FileReader()
        r.onload = function(e) {
            content = e.target.result
            foo(content)
        }
        r.readAsText(file);
    } else {
        alert("Failed to load file")
    }
    return content
}

function parseSub(content) {
    var subs = []
    var sub = {
        time: "00:02:46",
        text: "Hello World"
    }
    subs.push(sub)
    return subs
}