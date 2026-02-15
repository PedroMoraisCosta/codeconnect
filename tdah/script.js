document.addEventListener('DOMContentLoaded', () => {
  buildArchitecture(() => {
    let chave = getParametroURL('p4')
    const file = getParametroURL('p5')

    if (file && chave) {
      document.getElementById('pai-box').style.display = 'none'
      document.getElementById('mae-box').style.display = 'none'
      document.getElementById('avo-box').style.display = 'none'
      document.getElementById('avo2-box').style.display = 'none'
      document
        .getElementById('medicacao')
        .style.setProperty('display', 'none', 'important')
      document.getElementById('sangue').style.display = 'none'
      document.getElementById('utente').style.display = 'none'

      carregarContactos(file, chave)
    }
  })
})

function getParametroURL (nome) {
  const params = new URLSearchParams(window.location.search)
  return params.get(nome)
}

function carregarContactos (file, chave) {
  if (!file || !chave) return

  fetch(file + '.json')
    .then(response => response.text())
    .then(data => {
      let key = GetKey(chave)
      const decrypted = CryptoJS.AES.decrypt(data, key).toString(
        CryptoJS.enc.Utf8
      )

      if (decrypted) {
        const ficheiro = JSON.parse(decrypted)

        PreencherPrimeiroNome(ficheiro)

        PreencherUltimoNome(ficheiro)

        PreencherDtNascimento(ficheiro)

        PreencherContactos(ficheiro)

        PreencherMedicacao(ficheiro)

        PreencherSangue(ficheiro)

        PreencherUtente(ficheiro)

        PreencherAnexo(ficheiro, file)
      }
    })
    .catch(error => {
      // console.error("Erro ao carregar o ficheiro: ", error);
      // document.body.innerHTML = "<p>Erro ao carregar o ficheiro!</p>";
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

function PreencherPrimeiroNome (ficheiro) {
  let nome = ficheiro.primeironome

  const ul = document.getElementById('pnome')
  ul.innerHTML = nome
}

function PreencherUltimoNome (ficheiro) {
  let nome = ficheiro.ultimonome

  const ul = document.getElementById('unome')
  ul.innerHTML = '&nbsp' + nome
}

function PreencherDtNascimento (ficheiro) {
  let texto = ficheiro.nascimento

  const ul = document.getElementById('dtnascList')
  ul.innerHTML = texto

  traducao(true, 'dtnascLabel', ficheiro.traduzirdtnascimento)
}

function traducao (addextra, fieldId, name) {
  if (name && name.length > 0) {
    let component = document.getElementById(fieldId)

    component.textContent = name

    if (addextra) {
      component.textContent += ':'
    }
  }
}

function PreencherMedicacao (ficheiro) {
  traducao(true, 'medicacaoLabel', ficheiro.traduzirmedicacao)

  const ul = document.getElementById('medlist')
  ul.innerHTML = ''

  ficheiro.medicacao.forEach(med => {
    if (med) {
      document.getElementById('medicacao').style.display = 'block'
      const li = document.createElement('li')

      const medText = med.trim()
      li.textContent = medText

      const normalized = medText
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

      if (normalized.includes('alergico')) {
        li.classList.add('text-value-bold')
      } else {
        li.classList.add('text-value')
      }

      ul.appendChild(li)
    }
  })
}

function PreencherContactos (ficheiro) {
  ficheiro.telefones.forEach((tel, index) => {
    const el = document.getElementById('tel' + (index + 1))
    if (el && tel) {
      const nome = ficheiro.nomestelefones[index]

      const telformated = Number(tel.replace(/\s+/g, ''))
      switch (index) {
        case 0:
          if (telformated > 0)
            document.getElementById('pai-box').style.display = 'flex'

          break
        case 1:
          if (telformated > 0)
            document.getElementById('mae-box').style.display = 'flex'
          break
        case 2:
          if (telformated > 0)
            document.getElementById('avo-box').style.display = 'flex'
          break
        case 3:
          if (telformated > 0)
            document.getElementById('avo2-box').style.display = 'flex'
          break
      }
      el.textContent = nome + ' ' + tel
    }
  })
}

function PreencherSangue (ficheiro) {
  let texto = ficheiro.sangue

  const ul = document.getElementById('sanguelist')
  ul.innerHTML = texto
  if (texto) {
    document.getElementById('sangue').style.display = 'block'
  }
}

function PreencherUtente (ficheiro) {
  let texto = ficheiro.utente

  const ul = document.getElementById('utentelist')
  ul.innerHTML = texto

  if (texto) {
    document.getElementById('utente').style.display = 'block'
  }
}

function PreencherAnexo (ficheiro, file) {
  let anexo = ficheiro.mostraranexo

  if (anexo) {
    traducao(false, 'abrirAnexos', ficheiro.traduzirbtanexo)
    document.getElementById('anexosRow').style.display = 'flex'
    PreencherModal(file)
  }
}
