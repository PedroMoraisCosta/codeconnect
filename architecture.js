function buildArchitecture (callback) {
  const tasks = []

  // Header
  tasks.push(
    fetch('header/header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data
      })
      .catch(err => console.error('Erro ao carregar header.html', err))
  )

  // Index section
  const indexSectionEl = document.getElementById('index-section-placeholder')
  if (indexSectionEl) {
    tasks.push(
      fetch('index/index-section.html')
        .then(res => res.text())
        .then(data => {
          indexSectionEl.innerHTML = data

          loadLanguage(getLanguage())
        })
        //Top Logo section
        .then(() =>
          fetch('top-logo/top-logo.html')
            .then(res => res.text())
            .then(data => {
              const topLogoEl = document.getElementById('top-logo-placeholder')
              topLogoEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar top-logo.html', err))
        )

        // Stars section
        .then(() =>
          fetch('stars/stars.html')
            .then(res => res.text())
            .then(data => {
              const starsEl = document.getElementById('stars-placeholder')
              starsEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar stars.html', err))
        )
        .catch(err => console.error('Erro ao carregar index-section.html', err))

        //Google button section
        .then(() =>
          fetch('google-review/google.html')
            .then(res => res.text())
            .then(data => {
              const googleEl = document.getElementById('google-placeholder')
              googleEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar google.html', err))
        )
        //Whatsapp button section
        .then(() =>
          fetch('whatsapp/whatsapp.html')
            .then(res => res.text())
            .then(data => {
              const whatsappEl = document.getElementById('whatsapp-placeholder')
              whatsappEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar whatsapp.html', err))
        )
        //Email button section
        .then(() =>
          fetch('email/email.html')
            .then(res => res.text())
            .then(data => {
              const emailEl = document.getElementById('email-placeholder')
              emailEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar email.html', err))
        )
        //Dashboard Contacts section
        .then(() =>
          fetch('dashboards/contacts.html')
            .then(res => res.text())
            .then(data => {
              const dashboardEl = document.getElementById(
                'contacts-placeholder'
              )
              dashboardEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar dashboard.html', err))
        )
        //Video section
        .then(() =>
          fetch('video/video.html')
            .then(res => res.text())
            .then(data => {
              const videoEl = document.getElementById('video-placeholder')
              videoEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar video.html', err))
        )
        //Cartoes section
        .then(() =>
          fetch('cartoes/cartoes.html')
            .then(res => res.text())
            .then(data => {
              const cartoesEl = document.getElementById('cartoes-placeholder')
              cartoesEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar cartoes.html', err))
        )
        //Placas section
        .then(() =>
          fetch('placas/placas.html')
            .then(res => res.text())
            .then(data => {
              const placasEl = document.getElementById('placas-placeholder')
              placasEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar placas.html', err))
        )
        //Placas Modelos section
        .then(() =>
          fetch('placas/placas-model.html')
            .then(res => res.text())
            .then(data => {
              const placasModeloEl = document.getElementById(
                'placas-modelo-placeholder'
              )
              placasModeloEl.innerHTML = data
            })
            .catch(err =>
              console.error('Erro ao carregar placas-modelo.html', err)
            )
        )
        //Empresa section
        .then(() =>
          fetch('empresa/empresa.html')
            .then(res => res.text())
            .then(data => {
              const empresaEl = document.getElementById('empresa-placeholder')
              empresaEl.innerHTML = data
            })
            .catch(err => console.error('Erro ao carregar empresa.html', err))
        )
    )
  }

  // Contacts section
  const contactsectionEl = document.getElementById(
    'contacts-section-placeholder'
  )
  if (contactsectionEl) {
    tasks.push(
      fetch('contacts-section.html')
        .then(res => res.text())
        .then(data => {
          contactsectionEl.innerHTML = data
          if (typeof setupContactFormValidation === 'function') {
            setupContactFormValidation()
          }
        })
        .catch(err =>
          console.error('Erro ao carregar contacts-section.html', err)
        )
    )
  }

  // Espera por todas as tarefas
  Promise.all(tasks).then(() => {
    // call if available
    if (typeof window.setupScrollBehavior === 'function') {
      window.setupScrollBehavior()
    } else {
      // fallback: dynamically load script then call it when loaded
      const s = document.createElement('script')
      s.src = 'scriptscroll.js'
      s.onload = () => {
        if (typeof window.setupScrollBehavior === 'function')
          window.setupScrollBehavior()
      }
      document.body.appendChild(s)
    }

    if (typeof callback === 'function') callback()
  })
}
