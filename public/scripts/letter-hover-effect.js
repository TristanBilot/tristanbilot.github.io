function substituteDivsBySpans() {
    const divs = $('.animate-letters, .animate-letters-accent')
    $.each(divs, function (index, div) {
        const text = $(this).text()
        const isAccent = $(this).prop("classList").contains('animate-letters-accent')
        const animatedClass = isAccent ? "animate-letter-accent" : "animate-letter"
        $(this).text('')
        for (var j = 0; j < text.length; j++) {
            if (text[j] == ' ')
                $(this).append('<span>&nbsp;</span>')
            else
                $(this).append(`<span class="${animatedClass}" data-letter="${text[j]}">${text[j]}</span>`)
        }
    })
}

$(function($) {
    substituteDivsBySpans()
})