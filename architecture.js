function buildArchitecture (callback) {
  const depth = window.location.pathname.split('/').filter(Boolean).length - 1
  const basePath = depth > 0 ? '../'.repeat(depth) : '.'

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
        })
        .then(() => fetch(`${basePath}/top-logo/top-logo.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('top-logo-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/stars/stars.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('stars-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/google-review/google.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('google-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/whatsapp/whatsapp.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('whatsapp-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/email/email.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('email-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/dashboards/contacts.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('contacts-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/video/video.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('video-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/cartoes/cartoes.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('cartoes-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/placas/placas.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('placas-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch('placas/circle.html'))
        .then(res => res.text())
        .then(svg => {
          document
            .querySelectorAll('.circle-holder')
            .forEach(el => (el.innerHTML = svg))
        })
        .then(() => fetch('placas/hands.html'))
        .then(res => res.text())
        .then(svg => {
          document
            .querySelectorAll('.hands-holder')
            .forEach(el => (el.innerHTML = svg))
        })
        .then(() => fetch('placas/estrelas.html'))
        .then(res => res.text())
        .then(svg => {
          document
            .querySelectorAll('.star-holder')
            .forEach(el => (el.innerHTML = svg))
        })
        .then(() => fetch('placas/logo.html'))
        .then(res => res.text())
        .then(svg => {
          document
            .querySelectorAll('.logo-holder')
            .forEach(el => (el.innerHTML = svg))
        })
        .then(() => fetch('placas/title.html'))
        .then(res => res.text())
        .then(svg => {
          document
            .querySelectorAll('.title-holder')
            .forEach(el => (el.innerHTML = svg))
        })
        .then(() => fetch(`${basePath}/placas/placas-model.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('placas-modelo-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/empresa/empresa.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('empresa-placeholder')
          if (el) el.innerHTML = data
        })
        .catch(err => console.error('Erro ao carregar seções', err))
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
        })
        .then(() => fetch(`${basePath}/top-logo/top-logo.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('top-logo-placeholder')
          if (el) el.innerHTML = data
        })
        .catch(err =>
          console.error('Erro ao carregar clientes-section.html', err)
        )
    )
  }

  // Funcionamento
  const funcionamentoSectionEl = document.getElementById(
    'funcionamento-section-placeholder'
  )
  if (funcionamentoSectionEl) {
    tasks.push(
      fetch('funcionamento-section.html')
        .then(res => res.text())
        .then(data => {
          funcionamentoSectionEl.innerHTML = data
        })
        .then(() => fetch(`${basePath}/top-logo/top-logo.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('top-logo-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/whatsapp/whatsapp.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('whatsapp-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/email/email.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('email-placeholder')
          if (el) el.innerHTML = data
        })
        .catch(err =>
          console.error('Erro ao carregar funcionamento-section.html', err)
        )
    )
  }

  // Precario
  const precarioSectionEl = document.getElementById(
    'precario-section-placeholder'
  )
  if (precarioSectionEl) {
    tasks.push(
      fetch('precario-section.html')
        .then(res => res.text())
        .then(data => {
          precarioSectionEl.innerHTML = data
        })
        .then(() => fetch(`${basePath}/top-logo/top-logo.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('top-logo-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/whatsapp/whatsapp.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('whatsapp-placeholder')
          if (el) el.innerHTML = data
        })
        .then(() => fetch(`${basePath}/email/email.html`))
        .then(res => res.text())
        .then(data => {
          const el = document.getElementById('email-placeholder')
          if (el) el.innerHTML = data
        })
        .catch(err =>
          console.error('Erro ao carregar precario-section.html', err)
        )
    )
  }

  // Espera todas as tarefas terminarem
  Promise.all(tasks).then(() => {
    // Scroll behavior
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

    // Scroll para âncora se existir
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash)
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 200)
      }
    }

    if (
      typeof loadLanguage === 'function' &&
      typeof getLanguage === 'function'
    ) {
      loadLanguage(getLanguage())
    }

    if (typeof callback === 'function') callback()
  })
}
