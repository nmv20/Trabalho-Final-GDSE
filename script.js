
const BASE_PATH = "http://makeup-api.herokuapp.com/api/v1/products.json"


//funcao que busca as informacoes no evento do botao
async function onClickSearch(event) {
    event.preventDefault()
    const filtro = getSearchInputValue()
    const results = await searchResults(filtro)
    generateSearchList(results)
}

// funcao que puxa valor do filtro 
function getSearchInputValue() {
    let dados = []
    dados[0] = document.getElementById("search-brand").value
    dados[1] = document.getElementById("search-product-type").value
    return dados
}

// funcao que busca as infomacoes na api
async function searchResults(text) {
    let dados

    const result = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${text[0]}&product_type=${text[1]}`)
    .then(response => dados = response.json());
    
    return dados
}

// funcao que gera a lista produtos
function generateSearchList(marcas) {
    const html = marcas.reduce((acc, item) => {
        let brand = ""
        if (item.brand) {
            brand = `
                <div class="marcas-brand">
                    <p>Brand</p>
                    <div>${item.brand}</div>
                </div>
            `
        }

        acc += `
            <div class="maquiagem-classe">
                <div class="maquiagem-tipo">${item.name}</div>
                
                    <img class="maquiagem-imagem" src="${item.image_link}">
                    <div>
                        ${brand}
                        <div>
                            <p>Preco: ${item.price}</p>
                            
                        </div>
                    </div>
               
            </div>   
        `
        return acc
    }, "")

    document.getElementById("list").innerHTML = html
}



