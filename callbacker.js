function initCallbacker(params) {
    document.addEventListener('DOMContentLoaded', function () {
        css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', 'callbacker.css');
        document.querySelector('head').append(css);

        let callbackerBlock = document.createElement('div');
        callbackerBlock.setAttribute('id', 'callbacker');
        callbackerBlock.setAttribute('class', 'modal-callbacker');
        document.body.appendChild(callbackerBlock);
        callbackerBlockCode = `
        <div id="callbacker" class="modal-callbacker">
            <div class="modal-callbacker-block">
                <div class="icon-close-callbacker"></div>
                <div class="title-callbacker">`+params.texts.title+`</div>
                <div class="content-callbacker">
                    <div class="padding-callbacker">
                        <p>`+ params.texts.mainText +`</p>
                        <form id="callbackerForm" action="" method="post">
                            <input type="text" name="name" value="" placeholder="`+ params.texts.inputName +`" required autocomplete="on"/>
                            <input type="tel" name="phone" value="" placeholder="`+ params.texts.inputPhone +`" required autocomplete="on"/>
                            <input type="submit" value="`+ params.texts.button +`" />
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
        callbackerBlock.insertAdjacentHTML("afterbegin", callbackerBlockCode);

        let callbackerButton = document.createElement('div');
        callbackerButton.setAttribute('id', 'callbacker-design')
        callbackerButton.innerHTML = `
            <a href="#" modal="callbacker">
                <div class="callbacker-design-circle"></div>
                <div class="callbacker-design-circle-fill"></div>
                <div class="callbacker-design-img-circle"></div>
            </a>
        `;

        let forms = document.querySelector('form');
        let inputs = forms.querySelectorAll("form input[type=hidden]");
        let callbackerForm = document.querySelector("#callbackerForm");
        inputs.forEach(input => {
            newInput = document.createElement('input');
            newInput.type = input.type;
            newInput.name = input.name;
            newInput.value = input.value;
            callbackerForm.appendChild(newInput);
        });
        callbackerForm.action = forms.action;

        setTimeout(()=> document.body.appendChild(callbackerButton), params.timeout); //Количество милисекунд до появления кнопки
    });

    document.addEventListener('resize',()=>ModalRefresh());
}

function ModalHide() {
    $('.modal-callbacker:visible').fadeOut('fast', function () {
        $('body').removeClass('modal-callbacker-show');
    });
}

function ModalRefresh() {
    if ($('.modal-callbacker').is(':visible')) {
        var modalBlock = $('.modal-callbacker:visible .modal-callbacker-block'),
            width = parseInt(modalBlock.width()),
            height = parseInt(modalBlock.height());
        if ($(window).height() > height + 20) {
            modalBlock.addClass('modal-callbacker-top').removeClass('margin-t-b-callbacker').css('margin-top', -1 * (height / 2));
        }
        else {
            modalBlock.addClass('margin-t-b-callbacker').removeClass('modal-callbacker-top');
        }
        if ($(window).width() > width) {
            modalBlock.addClass('modal-callbacker-left').removeClass('margin-l-callbacker').css('margin-left', -1 * (width / 2));
        }
        else {
            modalBlock.addClass('margin-l-callbacker').removeClass('modal-callbacker-left');
        }
    }
}

$(document)
    .on('click', 'a[modal]', function () {
        var modalWindow = $('div#' + $(this).attr('modal'));
        if (modalWindow.length) {
            modalWindow.fadeIn('fast');
            $('body').addClass('modal-callbacker-show');
            ModalRefresh();
            return false;
        }
    })
    .on('click', '.icon-close-callbacker, .modal-callbacker', function (event) {
        if (event.target != this)
            return false;
        else
            ModalHide();
    })
    .on('keydown', function (key) {
        if (key.keyCode == 27)
            ModalHide();
    })
    .on('click', '.modal-callbacker > *', function (event) {
        event.stopPropagation();
        return true;
    });
