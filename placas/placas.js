function updateMaxLength () {
  const charInfo = document.getElementById('charInfo')
  const input = document.getElementById('name')

  if (charInfo === null || input === null) return

  input.maxLength = 45

  if (input.value.length > input.maxLength) {
    input.value = input.value.slice(0, input.maxLength)
    const el = document.getElementById('title')
    el.textContent = input.value
  }

  charInfo.textContent = `Max ${input.maxLength} chars`
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

    if (box.dataset.img === 'Base_Fundo_2.png') {
      qrcodeimage = 'PlacaSemCor_2.png'
    } else {
      qrcodeimage = 'PlacaSemCor_3.png'
    }
    targetQrCode.src = 'img/' + qrcodeimage
  }
})

document.addEventListener('input', e => {
  if (
    !e.target.id === 'pickerringcolor' ||
    !e.target.id === 'pickerpremiumcolor' ||
    !e.target.id === 'name' ||
    !e.target.id === 'name'
  )
    return

  if (e.target.id === 'name' || e.target.id === 'name') {
    updateMaxLength()
    const el = document.getElementById('title')
    el.textContent = e.target.value

    return
  }

  document
    .querySelectorAll('.circle-svg')
    .forEach(el => (el.style.color = e.target.value))

  const ringcolorelement = document.getElementById('pickerringcolor')
  const premiumcolorelement = document.getElementById('pickerpremiumcolor')
  ringcolorelement.value = e.target.value
  premiumcolorelement.value = e.target.value
})

document.addEventListener('click', e => {
  if (!e.target.classList.contains('preview')) return

  e.target.closest('.palette').querySelector('.imageUpload').click()
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

  // get target from palette
  const palette = e.target.closest('.palette')
  const targetId = palette.dataset.target

  // find the image with that ID
  const targetImage = document.getElementById(targetId)

  targetImage.src = URL.createObjectURL(file)
})

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('resize', updateMaxLength)
  updateMaxLength()
})
