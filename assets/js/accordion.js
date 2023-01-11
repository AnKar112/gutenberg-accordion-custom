window.onload = () => {
    let openTab = document.querySelectorAll('.accordion .open_button')
    openTab.forEach(item => {
        item.onclick = () => {
            if (item.closest('.accordion_item').classList.contains('active')) {
                item.closest('.accordion_item').classList.remove('active')
                item.closest('.accordion_item').querySelector('.item_content').style.maxHeight = ''
            } else {
                if (item.closest('.accordion').querySelector('.accordion_item.active')) {
                    item.closest('.accordion').querySelector('.accordion_item.active .item_content').style.maxHeight = ''
                    item.closest('.accordion').querySelector('.accordion_item.active').classList.remove('active')
                }
                item.closest('.accordion_item').classList.add('active')
                let height = item.closest('.accordion_item').querySelector('.item_content p').offsetHeight
                item.closest('.accordion_item').querySelector('.item_content').style.maxHeight = height + 'px'
            }
        }
    })
    let tab = document.querySelectorAll('.accordion_item')
    tab.forEach(item => {
        item.onkeydown = (e) => {
            if (e.keyCode == 32) {
                e.preventDefault()
                if (item.classList.contains('active')) {
                    item.classList.remove('active')
                    item.querySelector('.item_content').style.maxHeight = ''
                } else {
                    if (item.closest('.accordion').querySelector('.accordion_item.active')) {
                        item.closest('.accordion').querySelector('.accordion_item.active .item_content').style.maxHeight = ''
                        item.closest('.accordion').querySelector('.accordion_item.active').classList.remove('active')
                    }
                    item.classList.add('active')
                    let height = item.querySelector('.item_content p').offsetHeight
                    item.querySelector('.item_content').style.maxHeight = height + 'px'
                }
            }
        }
    })
}

