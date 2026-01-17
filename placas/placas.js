function updateMaxLength () {
  const charInfo = document.getElementById('charInfo')
  const input = document.getElementById('name')

  if (charInfo === null || input === null) return

  input.maxLength = 45

  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0, input.maxLength)
    const el = document.getElementById('titlepremiumcolor')
    el.textContent = input.value
    const el2 = document.getElementById('titleringcolor')
    el2.textContent = input.value
  }

  const charInfos = document.querySelectorAll('.charInfoClassInJS')

  charInfos.forEach(charInfo => {
    charInfo.textContent = `Max ${input.maxLength}`
  })
}

document.addEventListener('click', event => {
  const box = event.target.closest('.color-box')
  if (!box) return

  const palette = box.closest('.palette')
  if (!palette) return

  const targetId = palette.dataset.target
  const targetImage = document.getElementById(targetId)

  if (!targetImage) return

  targetImage.src = 'img/' + box.dataset.img

  if (targetImage.id === 'backgroundImage') {
    const targetQrCode = document.getElementById('othersImage')
    if (!targetQrCode) return
    let qrcodeimage = ''

    const titlepremiumcolorElement =
      document.getElementById('titlepremiumcolor')

    if (box.dataset.img === 'Base_Fundo_2.png') {
      qrcodeimage = 'PlacaSemCor_2.png'
      titlepremiumcolorElement.classList.remove('text-black')
      titlepremiumcolorElement.style.color = 'white'
    } else {
      qrcodeimage = 'PlacaSemCor_3.png'
      titlepremiumcolorElement.classList.add('text-black')
    }
    targetQrCode.src = 'img/' + qrcodeimage
  }
})

document.addEventListener('input', e => {
  if (
    e.target.id !== 'pickerringcolor' &&
    e.target.id !== 'pickerpremiumcolor' &&
    e.target.id !== 'name' &&
    e.target.id !== 'starpickercolor' &&
    e.target.id !== 'handspickercolor'
  )
    return

  if (e.target.id === 'name' || e.target.id === 'name') {
    updateMaxLength()
    const el = document.getElementById('titlepremiumcolor')
    el.textContent = e.target.value
    const el2 = document.getElementById('titleringcolor')
    el2.textContent = e.target.value
    const titleinputs = document.querySelectorAll('.nametitleinputInJS')

    titleinputs.forEach(name => {
      name.value = e.target.value
    })

    return
  }

  if (
    e.target.id === 'pickerringcolor' ||
    e.target.id === 'pickerpremiumcolor'
  ) {
    document
      .querySelectorAll('.circle-svg')
      .forEach(el => (el.style.color = e.target.value))

    const ringcolorelement = document.getElementById('pickerringcolor')
    const premiumcolorelement = document.getElementById('pickerpremiumcolor')
    ringcolorelement.value = e.target.value
    premiumcolorelement.value = e.target.value

    return
  }

  if (e.target.id === 'starpickercolor') {
    document.querySelector('.stars-svg').style.color = e.target.value
    return
  }

  if (e.target.id === 'handspickercolor') {
    document.querySelector('.hands-svg').style.color = e.target.value
    return
  }
})

document.addEventListener('click', e => {
  if (!e.target.classList.contains('icon')) return
  const uploads = document.querySelectorAll('.imageUpload')
  uploads.forEach(input => input.click())
})

document.addEventListener('change', e => {
  if (!e.target.classList.contains('imageUpload')) return

  const file = e.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showToast('Invalid image type', 'danger')
    e.target.value = ''
    return
  }

  const premium = document.getElementById('iconpremiumcolor')
  premium.src = URL.createObjectURL(file)
  const ring = document.getElementById('iconringcolor')
  ring.src = URL.createObjectURL(file)
})

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', updateMaxLength)
  updateMaxLength()
})
