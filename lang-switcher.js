function loadLanguage (lang) {
  // Guarda a língua selecionada no armazenamento local
  localStorage.setItem('selectedLanguage', lang)

  fetch(`/lang/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      // Atualiza todos os elementos com data-i18n
      document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n')
        const text = getNestedTranslation(translations, key)
        if (text) element.innerHTML = text
      })
    })
    .catch(err => console.error('Erro ao carregar idioma:', err))
}

function getLanguage () {
  return localStorage.getItem('selectedLanguage') || 'pt'
}

function getTranslationFromLangFile (key) {
  const lang = getLanguage()
  return fetch(`/lang/${lang}.json`)
    .then(res => res.json())
    .then(dict => getNestedTranslation(dict, key) || key)
}

// Função auxiliar para acessar chaves aninhadas (ex: "nav.cards")
function getNestedTranslation (obj, key) {
  return key.split('.').reduce((acc, part) => acc?.[part], obj)
}

// Aplica o idioma salvo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(getLanguage())
})

function closeNavbar () {
  const nav = document.querySelector('.navbar-collapse.show')
  if (nav) {
    const collapse =
      bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav)
    collapse.hide()
  }
}
