function PreencherModal (file) {
  const images = []
  const maxImages = 10
  let checkedCount = 0 // how many images have been checked

  for (let i = 1; i <= maxImages; i++) {
    const imgPath = `attachments/${file}/${i}.jpeg`
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
    currentIndex = (currentIndex + 1) % images.length
    modalImg.src = images[currentIndex]
  })

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length
    modalImg.src = images[currentIndex]
  })

  if (images.length <= 1) {
    prevBtn.style.display = 'none'
    nextBtn.style.display = 'none'
  }
}
