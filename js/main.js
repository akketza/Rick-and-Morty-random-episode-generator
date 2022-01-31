//Preparando el DOM
$(document).ready(function () {
  let arrayLocalStorage = [];

  //Llamando API de episodios
  getEpisodio = () => {
    const numeroEp = Math.floor(Math.random() * 52);
    let API = "";
    if (numeroEp < 20) {
      API = "https://rickandmortyapi.com/api/episode";
    } else {
      if (numeroEp < 30) {
        API = "https://rickandmortyapi.com/api/episode?page=2";
      } else {
        API = "https://rickandmortyapi.com/api/episode?page=3";
      }
    }
    return API;
  };

  //Consiguiendo info de la API
  const getData = (apiURL) => {
    return fetch(apiURL)
      .then((Response) => Response.json())
      .then((json) => {
        console.log("json --> ", json);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  };

  const episode = getEpisodio();
  getData(episode);

  //Print de la info de los episodios
  $("#button-episodio").click(() => {
    $.ajax({
      method: "GET",
      url: getEpisodio(),
      success: function (respuesta) {
        console.log(respuesta);

        //Array Links de Personajes
        const arrayUrlImage = [];

        //Tamaño del array JSON
        var sizeArray = Object.keys(respuesta.results).length;

        //Generacion de numero aleatorio en el rango del array
        const nroRandom = [Math.floor(Math.random() * sizeArray)];
        console.log(nroRandom);
        var sizeArrayCharacters = Object.keys(
          respuesta.results[nroRandom].characters
        ).length;
        for (let i = 0; i < sizeArrayCharacters; i++) {
          const urlImagen = respuesta.results[nroRandom].characters[i];
          arrayUrlImage.push(urlImagen);
        }
        console.log(arrayUrlImage);

        //Imprimir imagenes
        const sizeArrayUrlImage = Object.keys(arrayUrlImage).length;
        for (let i = 0; i < sizeArrayUrlImage; i++) {
          getData(arrayUrlImage[i]);
          $.ajax({
            method: "GET",
            url: arrayUrlImage[i],
            success: function (personaje) {
              console.log(personaje);
              const urlImagen = personaje.image;
              console.log(urlImagen);
              $("#personajes").append(
                `<img id="imagen" src="${urlImagen}" alt="">`
              );
            },
          });
        }
        console.log(arrayUrlImage);
        $("#contenedorID").append(
          `<div id="animacion"><h2>Episode name</h2>
          <h3 class="title"><span>${respuesta.results[nroRandom].name}</span></h3>
        <p>${respuesta.results[nroRandom].air_date}</p>
        <p>${respuesta.results[nroRandom].episode}</p></div>
        <div id="subTexto"><h3>Characters</h3></div>`
        );

        //Clase de objetos
        class informacionLocal {
          constructor(name, air_date, episode) {
            this.name = name;
            this.air_date = air_date;
            this.episode = episode;
          }
        }
        //Asigancion de atributos a variables
        let nombre = respuesta.results[nroRandom].name;
        let air_date = respuesta.results[nroRandom].air_date;
        let episode = respuesta.results[nroRandom].episode;

        //Uso de la clase para crear objeto
        const nuevoEp = new informacionLocal(nombre, air_date, episode);
        console.log(nuevoEp);

        // append multiple values to the array
        arrayLocalStorage.push(nuevoEp);

        // localStorage

        localStorage.setItem("data", JSON.stringify(arrayLocalStorage));

        //Empty arrays
        arrayUrlImage.length = 0;
        sizeArray = 0;
        sizeArrayCharacters = 0;
        console.log(arrayUrlImage.length);
        console.log(sizeArray);
        console.log(sizeArrayCharacters);
      },
    });
  });
  //Animacion jquery
  $("#button-episodio").click(function () {
    $("#animacion").remove();
    $("#subTexto").remove();
    $("#personajes #imagen").remove();
  });
});
