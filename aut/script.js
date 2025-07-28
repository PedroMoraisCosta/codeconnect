function getParametroURL (nome) {
  const params = new URLSearchParams(window.location.search)
  return params.get(nome)
}

document.getElementById('anexosRow').style.display = 'none'
document.getElementById('contactoRow1').style.display = 'none'
document.getElementById('contactoRow2').style.display = 'none'
document.getElementById('contactoRow3').style.display = 'none'
document.getElementById('contactoRow4').style.display = 'none'
document.getElementById('medicacao').style.display = 'none'
document.getElementById('sangue').style.display = 'none'
document.getElementById('utente').style.display = 'none'
document.getElementById('dtnasc').style.display = 'none'
document.getElementById('alertaDescricao').style.display = 'none'

let chave = getParametroURL('p4')
const file = getParametroURL('p5')

if (file && chave) {
  if (file == 'f11') {
    //Fix Bug Cartao do Guilherme nao tem encoded
    chave = chave.replace(' ', '+')
  }

  carregarContactos(file, chave)
}

function carregarContactos (file, chave) {
  if (!file || !chave) return

  fetch(file + '.json')
    .then(response => response.text())
    .then(data => {
      const firstLine = data.split('\n')[0]
      let key = GetKey(chave)
      const decrypted = CryptoJS.AES.decrypt(firstLine, key).toString(
        CryptoJS.enc.Utf8
      )

      if (decrypted) {
        const ficheiro = JSON.parse(decrypted)

        PreencherNome(ficheiro)

        PreencherContactos(ficheiro)

        let isLost = VerificarPerdido(ficheiro)

        if (isLost) {
          PreencherAlertaDescricao(ficheiro)
        } else {
          PreencherDataNascimento(ficheiro)

          PreencherDescricao(ficheiro)

          PreencherMedicacao(ficheiro)

          PreencherSangue(ficheiro)

          PreencherUtente(ficheiro)

          PreencherAnexo(ficheiro)
        }
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o ficheiro: ', error)
    })
}

function GetKey (chave) {
  if (!chave) return ''
  try {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456')
    const iv = CryptoJS.enc.Utf8.parse('6543210987654321')
    const ciphertextWordArray = CryptoJS.enc.Base64.parse(chave)

    const decifrado = CryptoJS.AES.decrypt(
      { ciphertext: ciphertextWordArray },
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    )

    if (!decifrado || decifrado.sigBytes <= 0) {
      console.warn('Decrypt falhou: sigBytes inválido')
      return ''
    }

    const textoOriginal = decifrado.toString(CryptoJS.enc.Utf8)

    return textoOriginal
  } catch (erro) {
    console.error('Erro no GetKey:', erro)
    return ''
  }
}

function PreencherAnexo (ficheiro) {
  let anexo = ficheiro.mostraranexo

  if (anexo) {
    document.getElementById('anexosRow').style.display = 'flex'
  }
}

function PreencherNome (ficheiro) {
  let nomeCompleto = ficheiro.primeironome + ' ' + ficheiro.ultimonome
  document.getElementById('name').innerHTML = nomeCompleto
}

function PreencherDataNascimento (ficheiro) {
  let nascimento = ficheiro.nascimento

  const ul = document.getElementById('dtnascimento')
  ul.innerHTML = ''

  if (nascimento && nascimento.length > 0) {
    const li = document.createElement('li')
    li.textContent = nascimento.trim()
    ul.appendChild(li)

    document.getElementById('dtnasc').style.display = 'block'
  }
}

function PreencherMedicacao (ficheiro) {
  const ul = document.getElementById('medlist')

  ul.innerHTML = ''

  ficheiro.medicacao.forEach(med => {
    if (med) {
      document.getElementById('medicacao').style.display = 'block'
      const li = document.createElement('li')
      li.textContent = med.trim()
      ul.appendChild(li)
    }
  })
}

function VerificarPerdido (ficheiro) {
  let perdido = ficheiro.perdido

  if (perdido) {
    return perdido
  }
  return false
}

function PreencherAlertaDescricao (ficheiro) {
  document.getElementById('about').style.display = 'none'

  let value = ficheiro.textoperdido

  const ul = document.getElementById('alertaText')
  ul.innerHTML = ''

  if (value && value.length > 0) {
    const li = document.createElement('li')
    li.textContent = value.trim()
    ul.appendChild(li)
    document.getElementById('alertaDescricao').style.display = 'block'
  }
}

function PreencherContactos (ficheiro) {
  ficheiro.telefones.forEach((tel, index) => {
    const el = document.getElementById('tel' + (index + 1))
    const elnome = document.getElementById('contactonNameRow' + (index + 1))
    const contactLink = document.getElementById('contactNameRow' + (index + 1))

    if (el && tel) {
      switch (index) {
        case 0: //PAI
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[0] || 'Pai'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
            contactLink.href = 'tel:' + tel
            contactLink.title = `Ligar para ${
              elnome.textContent
            } (${formatarTelefone(tel)})`
          }
          break
        case 1: //MAE
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[1] || 'Mãe'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
            contactLink.href = 'tel:' + tel
            contactLink.title = `Ligar para ${
              elnome.textContent
            } (${formatarTelefone(tel)})`
          }
          break
        case 2: //AVO
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[2] || 'Avó'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
            contactLink.href = 'tel:' + tel
            contactLink.title = `Ligar para ${
              elnome.textContent
            } (${formatarTelefone(tel)})`
          }

          break
        case 3: //AVó
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[3] || 'Avô'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
            contactLink.href = 'tel:' + tel
            contactLink.title = `Ligar para ${
              elnome.textContent
            } (${formatarTelefone(tel)})`
          }

          break
      }
      el.textContent = formatarTelefone(tel)
    }
  })
}

function formatarTelefone (tel) {
  // Remove tudo que não for número
  tel = tel.replace(/\D/g, '')

  // Adiciona um espaço a cada 3 dígitos
  return tel.replace(/(\d{3})(?=\d)/g, '$1 ')
}

function PreencherSangue (ficheiro) {
  let sangue = ficheiro.sangue

  const ul = document.getElementById('sanguelist')
  ul.innerHTML = ''

  if (sangue && sangue.length > 0) {
    const li = document.createElement('li')
    li.textContent = sangue.trim()
    ul.appendChild(li)

    document.getElementById('sangue').style.display = 'block'
  }
}

function PreencherUtente (ficheiro) {
  let utente = ficheiro.utente
  const ul = document.getElementById('utentelist')
  ul.innerHTML = ''
  if (utente && utente.length > 0) {
    const li = document.createElement('li')
    li.textContent = utente.trim()
    ul.appendChild(li)

    document.getElementById('utente').style.display = 'block'
  }
}

function PreencherDescricao (ficheiro) {
  document.getElementById('titleDescription').innerHTML = ficheiro.descricao
}

const modalEl = document.getElementById('imageModal')

modalEl.addEventListener('hide.bs.modal', () => {
  const activeEl = document.activeElement
  if (modalEl.contains(activeEl)) {
    activeEl.blur() // remove focus from any focused element inside modal
  }
})
