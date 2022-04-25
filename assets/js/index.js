class Animals {
  constructor(nombre, edad, img, comentario, sonido) {
    this.nombre = nombre,
      this.edad = edad,
      this.img = img,
      this.comentario = comentario,
      this.sonido = sonido
  }
}

class Leon extends Animals {
  rugir() {
    console.log("roar!!")
  }
}
class Lobo extends Animals {
  aullar() {
    console.log("aullar")
  }
}
class Oso extends Animals {
  gruñir() {
    console.log("gruñir")
  }
}
class Serpiente extends Animals {
  sisear() { console.log("SSSSZZZZZzzzzszzsSSzzz") }
}

class Aguila extends Animals {
  chillar() { console.log("Iiiiiiaiiiii") }
}

// -------------------------------------//

let traerDatos = async () => {
  const response = await fetch("/animales.json")
  return await response.json()
}

async function iniciarPrograma() {
  const animales = await traerDatos();
  const $selectAnimal = document.querySelector('#animal')
  const $displyAnimales = document.querySelector('#Animales')
  const $selectEdad = document.querySelector('#edad')
  const $traerComentarios = document.querySelector('#comentarios')
  const $divPreview = document.querySelector('#preview')
  const $btnRegistrar = document.querySelector('#btnRegistrar')
  const $audioPlayer = document.querySelector('#player')
  const $modalBody = document.querySelector('.modal-body')
  const imgSRC = `./assets/imgs/`
  let animalFilter = (eleccion) => {
    return animales.find((animal) => animal.name === eleccion)
  }

  const createElementFromHTML = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.firstChild;
  }
  window.reproducirSonido = (sonido) => {
    $audioPlayer.setAttribute('src', `assets/sounds/${sonido}`)
    $audioPlayer.load()
    $audioPlayer.play()
  }

  window.showModal = (imagen, titulo, edad, comentario) => {
    console.log(titulo)
    $modalBody.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img  class="card-img-top" src="${imgSRC}${imagen}">
      <div class="card-body">
        <h5 class="card-title">${titulo}</h5>
        <p class="card-text">
          Edad: ${edad}
        </p>
        <p class="card-text">
          ${comentario}
        </p>
      </div>
    </div>

    `

    $('#animalModal').modal('show')
  }

  let pushAnimalCreado = (nuevoAnimal) => {

    $displyAnimales.appendChild(createElementFromHTML(`
    <div class="card" style="width: 180px;">
    <img  class="card-img-top" onClick="showModal('${nuevoAnimal.img}', '${nuevoAnimal.nombre}', '${nuevoAnimal.edad}', '${nuevoAnimal.comentario}')" src="${imgSRC}${nuevoAnimal.img}" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <div class="card-body bg-dark">
      <button type="button" class="btn btn-secondary" data-sonido=${nuevoAnimal.sonido} onClick="reproducirSonido('${nuevoAnimal.sonido}')">
        <img src="/assets/imgs/audio.svg" width="35" height="35"></button>
      </div>
    </div>
    `))
  }
  $selectAnimal.addEventListener("change", (event) => {
    const animalSeleccionado = event.target.value;

    const animalFiltrado = animales.find((animal) => animal.name === animalSeleccionado
    )

    const animalFoto = `./assets/imgs/${animalFiltrado.imagen}`

    $divPreview.style.backgroundImage = `url("${animalFoto}")`
  })
  let animalCreado = []

  $btnRegistrar.addEventListener("click", (event) => {
    const eleccion = animalFilter($selectAnimal.value)
    const animalData = [
      $selectAnimal.value,
      $selectEdad.value,
      `${eleccion.imagen}`,
      $traerComentarios.value,
      `${eleccion.sonido}`
    ]
    console.log(eleccion)
    switch (eleccion.name) {
      case 'Leon':
        animalCreado = new Leon(...animalData)
        console.log(animalCreado)
        pushAnimalCreado(animalCreado)
        break;
      case 'Lobo':
        animalCreado = new Lobo(...animalData)
        console.log(animalCreado)
        pushAnimalCreado(animalCreado)
        break;
      case 'Oso':
        animalCreado = new Oso(...animalData)
        console.log(animalCreado)
        pushAnimalCreado(animalCreado)
        break;
      case 'Serpiente':
        animalCreado = new Serpiente(...animalData)
        console.log(animalCreado)
        pushAnimalCreado(animalCreado)
        break;
      case 'Aguila':
        animalCreado = new Aguila([...animalData])
        console.log(animalCreado)
        pushAnimalCreado()
        break;
    }
  })
}

iniciarPrograma()