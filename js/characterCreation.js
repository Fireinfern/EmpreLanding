(function (window) {
    const $ = window.$;
    const Handlebars = window.Handlebars;
    const Http = new XMLHttpRequest();
    const URL = "https://ddcompanion.herokuapp.com"

    const main = $('#app');

    var currentImage = 0;

    $(document).tooltip();

    const CharacterImages = {
        female: [
            'Female_01.png',
            'Female_02.png',
            'Female_03.png',
            'Female_04.png',
            'Female_05.png',
            'Female_06.png',
            'Female_07.png',
            'Female_08.png',
            'Female_09.png',
            'Female_10.png',
            'Female_11.png',
            'Female_12.png'
        ],
        male: [
            'Male_01.png',
            'Male_02.png',
            'Male_03.png',
            'Male_04.png',
            'Male_05.png',
            'Male_06.png',
            'Male_07.png',
            'Male_08.png',
            'Male_09.png',
            'Male_10.png',
            'Male_11.png',
            'Male_12.png',
            'Male_13.png',
            'Male_14.png',
            'Male_15.png'
        ]
    }

    main
        .on('click', 'a.nextCharacter', (e) => {
            let $this = $(this);
            let image = $('#CharacterImage');
            let gender = $('#CharacterGender').val();

            currentImage++;

            if (currentImage >= CharacterImages[gender].length) currentImage = 0;

            image.attr("src", "./assets/characters/" + CharacterImages[gender][currentImage]);
        })
        .on('click', 'a.backCharacter', (e) => {
            let $this = $(this);
            let image = $('#CharacterImage');
            let gender = $('#CharacterGender').val();

            currentImage--;

            if (currentImage < 0) currentImage = CharacterImages[gender].length - 1;

            image.attr("src", "./assets/characters/" + CharacterImages[gender][currentImage]);
        })
        .on('change', '#CharacterGender', (e) => {
            let val = $('#CharacterGender').val();
            currentImage = 0;
            let image = $('#CharacterImage');
            image.attr("src", "./assets/characters/" + CharacterImages[val][currentImage]);
        })
        .on('click', '.accion-mandar-mensaje', (e) => {
            let contact = {
                email: $("#contactCorreo").val(),
                subject: $("#contactTopic").val(),
                content: $("#contactMessage").val()
            };
            console.log(contact);
            Http.open("POST", URL + "/contact/send", true);
            Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            Http.send(JSON.stringify(contact));
        });



    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(Http.response);
        }
    }
})(window)