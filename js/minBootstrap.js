window.onload = () => {
    initnavbar()
    initmodal()
    initpopup()
    initAnimateSlideStyle()
    initCollapse()
    initForm()
}

function initnavbar() {
    document.addEventListener('click', (ev) => {
        document.querySelectorAll('.navbar-toggler').forEach(e => {
            if (ev.target == e || ev.target.parentElement == e) {
                toggleCollapse(e.dataset.target)
            }
        })
    })

}

function toggleCollapse(target) {
    document.querySelectorAll(target).forEach(e => {
        if (e.classList.contains('opened')) {
            slideUpElement(e)

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
            slideDownElement(e)
        }
    })
}

function initCollapse() {
    document.addEventListener('click', (ev) => {
        document.querySelectorAll('a,.btn').forEach(e => {
            if (ev.target == e || ev.target.parentElement == e) {
                if (e.dataset.toggle == 'collapse') {
                    toggleCollapse(e.dataset.target)
                }
            }
        })
    })
}

function initAnimateSlideStyle() {
    let style = document.createElement('style')
    style.id = 'mb-slide-elm'
    document.querySelectorAll('head').forEach(h => {
        h.append(style)
    })
}

function slideDownElement(e) {
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

function slideUpElement(e) {
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

function initmodal() {
    document.addEventListener('click', (ev) => {
        document.querySelectorAll('.btn,.close,.modal,a').forEach(e => {
            if (ev.target == e || ev.target.parentElement == e) {
                if (e.dataset.toggle == 'modal') {
                    openModal(e.dataset.target)
                } else if (e.dataset.dismiss == 'modal') {
                    closeModal()
                } else if (e.classList.contains('modal')) {
                    if (e.classList.contains('static')) {
                        e.setAttribute('style', 'transform:scale(1.02);will-change:transform;')
                        e.addEventListener('transitionend', () => {
                            e.removeAttribute('style')
                        })
                    } else {
                        closeModal()
                    }
                }
            }
        })
    })
    document.addEventListener('keyup', closeModalEsc)
}

function openModal(target) {
    document.querySelectorAll(target).forEach(modal => {
        modal.classList.add('showing')
        document.body.classList.add('modal-open')
    })
}

function closeModalEsc(ev) {
    if (ev.key == 'Escape') {
        let close = true
        document.querySelectorAll('.modal.showing').forEach(e => {
            if (e.classList.contains('static')) {
                e.setAttribute('style', 'transform:scale(1.02);will-change:transform;')
                e.addEventListener('transitionend', () => {
                    e.removeAttribute('style')
                })
                close = false
                return false
            }
        })
        if(close){
            closeModal()
        }
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        if (modal.classList.contains('showing')) {
            modal.classList.add('goingout')
            document.removeEventListener('keyup', closeModalEsc)
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

function initpopup() {
    document.addEventListener('click', (ev) => {
        document.querySelectorAll('.btn,a').forEach(e => {
            if (ev.target == e || ev.target.parentElement == e) {
                if (e.dataset.toggle == 'popup') {
                    openPopup(e, e.dataset.target)
                }
            }
        })
    })

}

function openPopup(source, target) {
    closePopup()
    document.querySelectorAll(target).forEach(popup => {
        if (!popup.classList.contains('showing')) {
            popup.classList.add('showing')
            if (popup.classList.contains('dash-right')) {
                popup.setAttribute('style', `left: ${source.offsetLeft + source.offsetWidth}px;top: ${source.offsetTop}px`)
            } else {
                popup.setAttribute('style', `right: ${(document.body.offsetWidth - source.offsetLeft)-source.offsetWidth}px;top: ${source.offsetTop+source.offsetHeight+10}px`)
            }
            popup.addEventListener('animationend', addPopDismiss)
        }
    })
}

function addPopDismiss() {
    document.addEventListener('click', closePopupTrigger)
    document.querySelectorAll('.popup').forEach(popup => {
        removePopupListener(popup)
    })
}

function removePopupListener(popup) {
    popup.removeEventListener('animationend', addPopDismiss)
}

function closePopupTrigger(ev) {
    document.querySelectorAll('.popup').forEach(popup => {
        if (ev.target != popup) {
            Array().forEach.call(popup.children, child => {
                if (ev.target != child) {
                    if (popup.classList.contains('showing')) {
                        closePopup()
                    }
                }
            })
        }
    })
}

function closePopup() {
    document.querySelectorAll('.popup').forEach(popup => {
        if (popup.classList.contains('showing')) {
            popup.classList.add('goingout')
            document.removeEventListener('click', closePopupTrigger)
            popup.addEventListener('animationend', () => {
                if (popup.classList.contains('goingout')) {
                    popup.classList.remove('goingout')
                    popup.classList.remove('showing')
                }
            })
        }
    })
}

function initForm() {
    toggle()

    function toggle() {
        document.querySelectorAll('.valid').forEach(e => {
            e.parentElement.querySelectorAll('.form-item-invalid-message').forEach(invalid => {
                invalid.classList.remove('showing')
            })
            e.parentElement.querySelectorAll('.form-item-valid-message').forEach(valid => {
                valid.classList.add('showing')
            })
        })
        document.querySelectorAll('.invalid').forEach(e => {
            e.parentElement.querySelectorAll('.form-item-invalid-message').forEach(invalid => {
                invalid.classList.add('showing')
            })
            e.parentElement.querySelectorAll('.form-item-valid-message').forEach(valid => {
                valid.classList.remove('showing')
            })
        })
    }
    document.addEventListener('input', (ev) => {
        toggle()
    })
    document.addEventListener('change', (ev) => {
        toggle()
    })
    document.addEventListener('click', (ev) => {
        toggle()
    })
}