// Determine base path depending on which HTML file is running this script
const basePath = window.location.pathname.includes('/clientes/') ? '..' : '.'

function buildArchitecture (callback) {
  const tasks = []

  // Header
  tasks.push(
    fetch(`${basePath}/header/header.html`)
      .then(res => res.text())
      .then(data => {
        const headerEl = document.getElementById('header-placeholder')
        if (headerEl) headerEl.innerHTML = data
      })
      .catch(err => console.error('Erro ao carregar header.html', err))
  )

  // Index section
  const indexSectionEl = document.getElementById('index-section-placeholder')
  if (indexSectionEl) {
    tasks.push(
      fetch(`${basePath}/index/index-section.html`)
        .then(res => res.text())
        .then(data => {
          indexSectionEl.innerHTML = data
          loadLanguage(getLanguage())
        })
        // Stars section
        .then(() =>
          fetch(`${basePath}/stars/stars.html`)
            .then(res => res.text())
            .then(data => {
              const starsEl = document.getElementById('stars-placeholder')
              if (starsEl) starsEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar stars.html', err))
        )
        // Google review section
        .then(() =>
          fetch(`${basePath}/google-review/google.html`)
            .then(res => res.text())
            .then(data => {
              const googleEl = document.getElementById('google-placeholder')
              if (googleEl) googleEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar google.html', err))
        )
        // Whatsapp section
        .then(() =>
          fetch(`${basePath}/whatsapp/whatsapp.html`)
            .then(res => res.text())
            .then(data => {
              const whatsappEl = document.getElementById('whatsapp-placeholder')
              if (whatsappEl) whatsappEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar whatsapp.html', err))
        )
        // Email section
        .then(() =>
          fetch(`${basePath}/email/email.html`)
            .then(res => res.text())
            .then(data => {
              const emailEl = document.getElementById('email-placeholder')
              if (emailEl) emailEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar email.html', err))
        )
        // Dashboard Contacts section
        .then(() =>
          fetch(`${basePath}/dashboards/contacts.html`)
            .then(res => res.text())
            .then(data => {
              const dashboardEl = document.getElementById(
                'contacts-placeholder'
              )
              if (dashboardEl) dashboardEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar dashboard.html', err))
        )
        // Video section
        .then(() =>
          fetch(`${basePath}/video/video.html`)
            .then(res => res.text())
            .then(data => {
              const videoEl = document.getElementById('video-placeholder')
              if (videoEl) videoEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar video.html', err))
        )
        // Cartoes section
        .then(() =>
          fetch(`${basePath}/cartoes/cartoes.html`)
            .then(res => res.text())
            .then(data => {
              const cartoesEl = document.getElementById('cartoes-placeholder')
              if (cartoesEl) cartoesEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar cartoes.html', err))
        )
        // Placas section
        .then(() =>
          fetch(`${basePath}/placas/placas.html`)
            .then(res => res.text())
            .then(data => {
              const placasEl = document.getElementById('placas-placeholder')
              if (placasEl) placasEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar placas.html', err))
        )
        // Placas Modelos section
        .then(() =>
          fetch(`${basePath}/placas/placas-model.html`)
            .then(res => res.text())
            .then(data => {
              const placasModeloEl = document.getElementById(
                'placas-modelo-placeholder'
              )
              if (placasModeloEl) placasModeloEl.innerHTML = data
            })
            .catch(err =>
              console.error('Erro ao carregar placas-modelo.html', err)
            )
        )
        // Empresa section
        .then(() =>
          fetch(`${basePath}/empresa/empresa.html`)
            .then(res => res.text())
            .then(data => {
              const empresaEl = document.getElementById('empresa-placeholder')
              if (empresaEl) empresaEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar empresa.html', err))
        )
        .catch(err => console.error('Erro ao carregar index-section.html', err))
    )
  }

  // Clientes section
  const clientsSectionEl = document.getElementById(
    'clientes-section-placeholder'
  )
  if (clientsSectionEl) {
    tasks.push(
      fetch('clientes-section.html')
        .then(res => res.text())
        .then(data => {
          clientsSectionEl.innerHTML = data
          loadLanguage(getLanguage())
        })
        .catch(err =>
          console.error('Erro ao carregar clientes-section.html', err)
        )
    )
  }

  tasks.push(
    fetch(`${basePath}/top-logo/top-logo.html`)
      .then(res => res.text())
      .then(data => {
        const topLogoEl = document.getElementById('top-logo-placeholder')
        if (topLogoEl) topLogoEl.innerHTML = data
      })
      .catch(err => console.error('Erro ao carregar top-logo.html', err))
  )

  // Wait for all tasks
  Promise.all(tasks).then(() => {
    if (typeof window.setupScrollBehavior === 'function') {
      window.setupScrollBehavior()
    } else {
      const s = document.createElement('script')
      s.src = `${basePath}/scriptscroll.js`
      s.onload = () => {
        if (typeof window.setupScrollBehavior === 'function')
          window.setupScrollBehavior()
      }
      document.body.appendChild(s)
    }
    // ✅ NEW: handle hash navigation after architecture is fully built
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        // Use a small delay to allow styles/layout to stabilize
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' })
        }, 200)
      } else {
        console.warn('No element found for hash', window.location.hash)
      }
    }

    if (typeof callback === 'function') callback()
  })
}
