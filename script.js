var baseUrl = "https://swapi.dev/api/";
var category = "";

async function getObject(category, id = "") {
    try {
      const response = await fetch(`${baseUrl}/${category}/${id}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

document.addEventListener("DOMContentLoaded", ()=>{
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById('categories');
        Object.keys(data).map(dado => {
            const optionElement = document.createElement('option');
            optionElement.value = dado;
            optionElement.textContent = dado;
            selectElement.appendChild(optionElement);
        })
    })
    .catch(error => console.error(error));
})

document.querySelector('#div-categories').addEventListener('change', async (e) => {
    category = e.target.value;
    const selectSpecific = document.getElementById('specific');
    selectSpecific.classList = "";

    document.querySelector('.div-specific').append(selectSpecific);
  
    try {
      const articles = await getObject(category);
  
      const selectElement = document.getElementById('specific');
      const firstOption = document.createElement('option');
      firstOption.textContent = 'Selecione um item';

      selectElement.textContent = "";
      selectElement.append(firstOption);
      
      articles.results.map((article, key) => {
        const optionElement = document.createElement('option');
        optionElement.value = key + 1;
        optionElement.textContent = article.name;
        selectElement.appendChild(optionElement);
      });
    } catch (error) {
      console.error(error);
    }
  });

  async function printCard(selectSpecific){
    let id = selectSpecific.value;
    let resultado = await getObject(category, id);

    document.getElementsByClassName("code")[0].textContent = "";
    document.getElementsByClassName("code")[0].append(JSON.stringify(resultado));
    const resultadoPesquisa = document.getElementsByClassName("resultados-pesquisa")[0];
    resultadoPesquisa.classList.remove("hidden");
    document.querySelector('[data-card="name"]').textContent = resultado.name;
    
    let indices = Object.keys(resultado);
    let valores = Object.values(resultado);

    let ul = document.createElement("ul");
    ul.classList.add("lista-atributos")

    indices.map((indice, chave) => {
        const li = document.createElement("li");
        const bold = document.createElement("b");
        bold.textContent = indice;
        li.append(bold);
        li.append(": "+valores[chave]);

        ul.append(li);
    });

    document.getElementsByClassName("card-right")[0].textContent = "";
    document.getElementsByClassName("card-right")[0].append(ul);
  }

