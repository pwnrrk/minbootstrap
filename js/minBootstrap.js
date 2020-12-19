class MinBoostrap {
    initnavbar() {
        document.querySelectorAll('.navbar-toggler').forEach(e => {
            e.addEventListener('click', ev => this.toggleCollapse(e.dataset.target))
        })
    }

    toggleCollapse(target) {
        document.querySelectorAll(target).forEach(e => {
            if (e.classList.contains('opened')) {
                this.slideUpElement(e)

                function slideRemove() {
                    if (e.classList.contains('opened')) {
                        e.classList.remove('opened')
                    }
                    removeSlideHandler(e)
                }

                function removeSlideHandler() {
                    e.removeEventListener('animationend', slideRemove)
                    e.removeEventListener('webkitAnimationEnd', slideRemove)
                }

                e.addEventListener('animationend', slideRemove)
                e.addEventListener('webkitAnimationEnd', slideRemove)
            } else {
                e.classList.add('opened')
                this.slideDownElement(e)
            }
        })
    }

    initCollapse() {
        document.querySelectorAll('a,.btn').forEach(e => {
            if (e.dataset.toggle == 'collapse') {
                e.addEventListener('click', ev => this.toggleCollapse(e.dataset.target))
            }
        })
    }



    initAnimateSlideStyle() {
        let style = document.createElement('style')
        style.id = 'mb-slide-elm'
        document.querySelectorAll('head').forEach(h => {
            h.append(style)
        })
    }

    slideDownElement(e) {
        document.querySelectorAll('#mb-slide-elm').forEach(slide => {
            slide.innerHTML = `
            @keyframes slide-elm-down {
                from{
                    max-height: 0px;   
                }
                to{
                    max-height: ${e.offsetHeight}px;
                }
            }
            `
        })
        e.setAttribute('style', 'animation: slide-elm-down .3s ease;will-change:height;')
        e.addEventListener('animationend', () => {
            e.removeAttribute('style')
        })
    }

    
    slideUpElement(e) {
        document.querySelectorAll('#mb-slide-elm').forEach(slide => {
            slide.innerHTML = `
            @keyframes slide-elm-up {
                from{
                    max-height: ${e.offsetHeight}px;
                }
                to{
                    max-height: 0px;
                }
            }
            `
        })
        e.setAttribute('style', 'animation: slide-elm-up .3s ease;')
        e.addEventListener('animationend', () => {
            e.removeAttribute('style')
        })
    }

    
    initmodal() {
        document.querySelectorAll('.btn,.close,.modal').forEach(e => {
            if (e.classList.contains('modal')) {
                e.addEventListener('click', ev => {
                    if (ev.target == e) {
                        this.closeModal()
                    }
                })
            }
            if (e.dataset.toggle == 'modal') {
                e.addEventListener('click', ev => this.openModal(e.dataset.target))
            }
            if (e.dataset.dismiss == 'modal') {
                e.addEventListener('click', this.closeModal)
            }
        })
    }


    openModal(target) {
        document.querySelectorAll(target).forEach(modal => {
            modal.classList.add('showing')
            document.body.classList.add('modal-open')
            document.addEventListener('keyup', this.closeModalEsc)
        })
    }

    
    closeModalEsc(ev) {
        if (ev.key == 'Escape') {
            this.closeModal()
        }
    }

    
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.classList.contains('showing')) {
                modal.classList.add('goingout')
                document.removeEventListener('keyup', this.closeModalEsc)
                modal.addEventListener('animationend', () => {
                    if (modal.classList.contains('goingout')) {
                        modal.classList.remove('goingout')
                        modal.classList.remove('showing')
                        document.body.classList.remove('modal-open')
                    }
                })
            }
        })
    }

    
    initpopup() {
        document.querySelectorAll('.btn,a').forEach(e => {
            if (e.dataset.toggle == 'popup') {
                e.addEventListener('click', ev => this.openPopup(e, e.dataset.target))
            }
        })
    }

    
    openPopup(source, target) {
        this.closePopup()
        document.querySelectorAll(target).forEach(popup => {
            if (!popup.classList.contains('showing')) {
                popup.classList.add('showing')
                if (popup.classList.contains('dash-right')) {
                    popup.setAttribute('style', `left: ${source.offsetLeft + source.offsetWidth}px;top: ${source.offsetTop}px`)
                } else {
                    popup.setAttribute('style', `right: ${(document.body.offsetWidth - source.offsetLeft)-source.offsetWidth}px;top: ${source.offsetTop+source.offsetHeight+10}px`)
                }
                popup.addEventListener('animationend', this.addPopDismiss)
            }
        })
    }

    
    addPopDismiss() {
        document.addEventListener('click', this.closePopupTrigger)
        document.querySelectorAll('.popup').forEach(popup => {
            this.removePopupListener(popup)
        })
    }

    
    removePopupListener(popup) {
        popup.removeEventListener('animationend', this.addPopDismiss)
    }

    
    closePopupTrigger(ev) {
        document.querySelectorAll('.popup').forEach(popup => {
            if (ev.target != popup) {
                Array().forEach.call(popup.children, child => {
                    if (ev.target != child) {
                        if (popup.classList.contains('showing')) {
                            this.closePopup()
                        }
                    }
                })
            }
        })
    }

    
    closePopup() {
        document.querySelectorAll('.popup').forEach(popup => {
            if (popup.classList.contains('showing')) {
                popup.classList.add('goingout')
                document.removeEventListener('click', this.closePopupTrigger)
                popup.addEventListener('animationend', () => {
                    if (popup.classList.contains('goingout')) {
                        popup.classList.remove('goingout')
                        popup.classList.remove('showing')
                    }
                })
            }
        })
    }
}

window.onload = () => {
    let MinB = new MinBoostrap()
    MinB.initnavbar()
    MinB.initmodal()
    MinB.initpopup()
    MinB.initAnimateSlideStyle()
    MinB.initCollapse()
}

export  default MinBoostrap;