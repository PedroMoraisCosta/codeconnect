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
  if (!e.target.id === 'picker') return

  const svg = document.querySelector('.circle-svg')
  svg.style.color = e.target.value
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
