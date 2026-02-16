function PreencherModal (file) {
  const images = []
  const maxImages = 7
  let checkedCount = 0 // how many images have been checked

  for (let i = 1; i <= maxImages; i++) {
    const imgPath = `attachments/${file}/${i}.webp`
    const img = new Image()

    img.onload = () => {
      images.push(imgPath)
      checkedCount++
      if (checkedCount === maxImages) setupModal(images)
    }

    img.onerror = () => {
      // console.warn(`Imagem ${imgPath} não encontrada.`)
      checkedCount++
      if (checkedCount === maxImages) setupModal(images)
    }

    img.src = imgPath
  }
}

function setupModal (images) {
  if (!images || images.length === 0) return

  images = images.sort((a, b) => {
    const numA = parseInt(a.match(/\/(\d+)\.webp$/)[1], 10)
    const numB = parseInt(b.match(/\/(\d+)\.webp$/)[1], 10)
    return numA - numB
  })

  const modal = document.getElementById('imageModal')
  const modalImg = document.getElementById('modalImage')
  const openBtn = document.getElementById('abrirAnexos')
  const closeBtn = document.querySelector('.close')
  const prevBtn = document.querySelector('.prev')
  const nextBtn = document.querySelector('.next')

  if (!openBtn) return // safety check

  let currentIndex = 0

  openBtn.addEventListener('click', () => {
    if (images.length === 0) return
    currentIndex = 0
    modal.style.display = 'flex'
    modalImg.src = images[currentIndex]
  })

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  nextBtn.addEventListener('click', () => {
    if (currentIndex >= images.length - 1) return
    currentIndex++
    modalImg.src = images[currentIndex]
    updateArrows()
  })

  prevBtn.addEventListener('click', () => {
    if (currentIndex <= 0) return
    currentIndex--
    modalImg.src = images[currentIndex]
    updateArrows()
  })

  if (images.length <= 1) {
    prevBtn.style.display = 'none'
    nextBtn.style.display = 'none'
  }

  function updateArrows () {
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1'
    nextBtn.style.opacity = currentIndex === images.length - 1 ? '0.3' : '1'

    prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto'
    nextBtn.style.pointerEvents =
      currentIndex === images.length - 1 ? 'none' : 'auto'
  }
}
