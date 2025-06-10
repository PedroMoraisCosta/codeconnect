function getParametroURL (nome) {
  const params = new URLSearchParams(window.location.search)
  return params.get(nome)
}

// if(dtnasc)
// {
//   document.getElementById("dtnasc").textContent = dtnasc;
// }
// else{
//   document.getElementById("dtnascimento").style.display = "none";
// }

document.getElementById('contactoRow1').style.display = 'none'
document.getElementById('contactoRow2').style.display = 'none'
document.getElementById('contactoRow3').style.display = 'none'
document.getElementById('contactoRow4').style.display = 'none'
document.getElementById('medicacao').style.display = 'none'
document.getElementById('sangue').style.display = 'none'
document.getElementById('utente').style.display = 'none'

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

        PreencherDescricao(ficheiro)

        PreencherContactos(ficheiro)

        PreencherMedicacao(ficheiro)

        PreencherSangue(ficheiro)

        PreencherUtente(ficheiro)
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o ficheiro: ', error)
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

function PreencherContactos (ficheiro) {
  ficheiro.telefones.forEach((tel, index) => {
    const el = document.getElementById('tel' + (index + 1))
    const elnome = document.getElementById('contactonNameRow' + (index + 1))
    if (el && tel) {
      switch (index) {
        case 0: //PAI
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[0] || 'Pai'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
          }
          break
        case 1: //MAE
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[1] || 'Mãe'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
          }
          break
        case 2: //AVO
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[2] || 'Avó'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
          }

          break
        case 3: //AVó
          if (tel > 0) {
            elnome.textContent = ficheiro.nomestelefones?.[3] || 'Avô'
            document.getElementById('contactoRow' + (index + 1)).style.display =
              'block'
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
  const pnome = getParametroURL('p1')
  const unome = getParametroURL('p2')
  let dtnasc = ficheiro.nascimento // getParametroURL('p3')

  if (pnome) document.getElementById('title').textContent = pnome.toUpperCase()
  if (pnome && unome)
    document.getElementById('title').textContent =
      pnome.toUpperCase() + ' ' + unome.toUpperCase()
  if (pnome && dtnasc)
    document.getElementById('titleDescription').innerHTML =
      'Olá! Sou o ' +
      pnome.toUpperCase() +
      ' nascido a <strong>' +
      dtnasc +
      '</strong> e tenho dificuldade para comunicar.'
  else if (pnome) {
    document.getElementById('titleDescription').innerHTML =
      'Olá! Sou o ' +
      pnome.toUpperCase() +
      ' e tenho dificuldade<br>para comunicar.'
  }
}
