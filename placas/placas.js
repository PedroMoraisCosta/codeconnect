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
