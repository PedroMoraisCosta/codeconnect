document.addEventListener('click', event => {
  const box = event.target.closest('.color-box')
  if (!box) return

  const palette = box.closest('.palette')
  if (!palette) return

  const targetId = palette.dataset.target
  const targetImage = document.getElementById(targetId)

  if (!targetImage) return

  targetImage.src = 'img/' + box.dataset.img
})
