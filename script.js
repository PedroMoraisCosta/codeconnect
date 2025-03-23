document
  .getElementById('registerForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault() // Evita envio padrão

    // Limpar mensagens de erro

    // Obter valores
    //const name = document.getElementById('name').value.trim()
    const submitButton = document.querySelector("button[type='submit']")
    let svgString = document.getElementById('svgInput').value.slice(1, -1)
    svgString = svgString
      .replace(/&quot;/g, '"') // Replace encoded quotes
      .replace(/&lt;/g, '<') // Replace encoded <
      .replace(/&gt;/g, '>') // Replace encoded >
      .replace(
        'width=\\"1007\\" height=\\"1007\\" viewBox=\\"0',
        'width=\\"650\\" height=\\"650\\" viewBox=\\"0'
      )
      .replace(/\\"/g, '"')
    //.replace'('width=\\"1007", 'width=\\"800")
    //.replace(/height="1007"/g, 'height="800"')
    //.replace(/viewBox="0 0 1007 1007"/g, 'viewBox="0 0 800 800"')
    document.getElementById('container').innerHTML = svgString
    //let hasError = false

    //submitButton.disabled = true
    //submitButton.innerHTML = 'A gerar qr...'
    //let a = name.slice(1, -1)
    //   .replace(
    //     'width=\\"1007\\" height=\\"1007\\" viewBox=\\"0',
    //     'width=\\"800\\" height=\\"800\\" viewBox=\\"0'
    //   )
    // var container = document.getElementById('container')
    // container.innerHTML = a
    // Envio de dados para API
    // try {
    //   const response = await fetch(
    //     'https://magest2api-3bbfb75c6660.herokuapp.com/lostlabcustomers1',
    //     {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ name, email, phone, birth })
    //     }
    //   )

    //   if (!response.ok) {
    //     throw new Error(
    //       'Serviço ocupado...Tente novamente em alguns segundos (' +
    //         response.statusText +
    //         ')'
    //     )
    //   }

    //   //alert("Registo concluído com sucesso!");
    //   //window.location.href = "codigo.html"; // Redirecionamento
    // } catch (error) {
    //   hasError = true

    //   //alert(error.message);
    //   document.getElementById('error-submit').textContent = error.message
    //   submitButton.disabled = false // Reativa o botão em caso de erro
    //   submitButton.innerHTML = 'Registar' // Restaura o texto original
    // }

    // if (!hasError) {
    //   let codigo = String(Math.floor(100 + Math.random() * 900))

    //   // Salvar no sessionStorage
    //   sessionStorage.setItem('codigo', codigo)
    //   window.location.href = 'codigo.html'
    // }
  })
