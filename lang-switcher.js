function loadLanguage (lang) {
  // Guarda a língua selecionada no armazenamento local
  localStorage.setItem('selectedLanguage', lang)

  fetch(`./lang/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      // Atualiza as labels com base no idioma
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n')
        if (translations[key]) {
          element.innerHTML = translations[key]
        }
      })

      // Atualiza os links com base no idioma
      // updatelinks(lang)
    })
}

// function updatelinks (lang) {
//   //Footer
//   let component = document.getElementById('airbnb-footer-link')
//   if (component && links[lang]) {
//     component.href = links[lang]
//   }
// }

function getLanguage () {
  return localStorage.getItem('selectedLanguage') || 'pt'
}

// Aplica a língua salva ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(getLanguage())
})

function getTranslationFromLangFile (key) {
  const lang = getLanguage() // pega a língua atual
  return fetch(`./lang/${lang}.json`)
    .then(res => res.json())
    .then(dict => dict[key] || key) // fallback para a própria key se não existir
}
