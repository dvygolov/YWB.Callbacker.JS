class Callbacker {
    constructor(params) {
        this.params = params;

        this.init();
    }

    init() {
        const css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', 'ywbcallbacker.css');
        document.querySelector('head').append(css);

        this.createModal();
        this.createButton();

        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    createModal() {
        const callbackerBlock = document.createElement('div');
        callbackerBlock.setAttribute('id', 'callbacker');
        callbackerBlock.classList.add('modal-callbacker');
        document.body.appendChild(callbackerBlock);

        callbackerBlock.innerHTML = `
            <div class="modal-callbacker-block">
                <div class="icon-close-callbacker"></div>
                <div class="title-callbacker">${this.params.texts.title}</div>
                <div class="content-callbacker">
                    <div class="padding-callbacker">
                        <p>${this.params.texts.mainText}</p>
                        <form id="callbackerForm" action="" method="post">
                            <input type="text" name="name" value="" placeholder="${this.params.texts.inputName}" required autocomplete="on"/>
                            <input type="tel" name="phone" value="" placeholder="${this.params.texts.inputPhone}" required autocomplete="on"/>
                            <input type="submit" value="${this.params.texts.button}" />
                        </form>
                    </div>
                </div>
            </div>
        `;

        const forms = document.querySelector('form');
        const inputs = forms.querySelectorAll("input[type=hidden]");
        const callbackerForm = document.querySelector("#callbackerForm");
        inputs.forEach(input => {
            const newInput = document.createElement('input');
            newInput.type = input.type;
            newInput.name = input.name;
            newInput.value = input.value;
            callbackerForm.appendChild(newInput);
        });
        callbackerForm.action = forms.action;
    }

    createButton() {
        const callbackerButton = document.createElement('div');
        callbackerButton.id = 'callbacker-design';
        callbackerButton.innerHTML = `
            <a href="#" data-modal="callbacker">
                <div class="callbacker-design-circle"></div>
                <div class="callbacker-design-circle-fill"></div>
                <div class="callbacker-design-img-circle"></div>
            </a>
        `;

        setTimeout(() => document.body.appendChild(callbackerButton), this.params.timeout);
    }

    modalHide() {
        const modal = document.querySelector('.modal-callbacker');

        if (window.getComputedStyle(modal).display !== 'none') {
            modal.style.display = 'none';
            document.body.classList.remove('modal-callbacker-show');
        }
    }

    modalRefresh() {
        const modalBlock = document.querySelector('.modal-callbacker .modal-callbacker-block');

        if (modalBlock) {
            const width = modalBlock.offsetWidth;
            const height = modalBlock.offsetHeight;

            // Calculate offsets to center the modal
            const topOffset = (window.innerHeight - height) / 2;
            const leftOffset = (window.innerWidth - width) / 2;

            // Apply offsets to the modal block
            modalBlock.style.top = `${topOffset}px`;
            modalBlock.style.left = `${leftOffset}px`;
        }
    }


    handleClick(event) {
        // Handle modal opening
        if (event.target.closest('a[data-modal]')) {
            const modalId = event.target.closest('a[data-modal]').dataset.modal;
            const modalWindow = document.querySelector(`div#${modalId}`);
            if (modalWindow) {
                modalWindow.style.display = 'block';
                document.body.classList.add('modal-callbacker-show');
                this.modalRefresh();
                event.preventDefault();
            }
        }
        // Handle modal closing
        else if (event.target.matches('.icon-close-callbacker') ||
            (!event.target.closest('.modal-callbacker-block') && event.target.matches('.modal-callbacker'))) {
            this.modalHide();
        }
    }

    handleKeydown(event) {
        console.log(`Key pressed! ${event.key}`);
        if (event.key == "Escape") {
            this.modalHide();
        }
    }
}

