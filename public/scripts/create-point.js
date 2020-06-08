function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then (function(res){
        return res.json()
    })
    .then (function(states){
        for (const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    //toda ver que for chamado ufValue, sumir a opção state na url

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpar campo de cidade e não acumular com pesquisas anteriores
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then (function(res){
        return res.json()
    })
    .then (function(cities){


        for (const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        //deixar falso disable para campo de cidade após ter selecionado estado
        citySelect.disabled = false
    })
}

document //escuta se um evento na tag select "UF" foi alterado)
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//**** atualizar o campo escondido com os dados selecionados
const collectedItems = document.querySelector("input[name=items")
//adiciona valores no array, e esses valores são alterados conforme a seleção da box
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    //adicionar ou remover uma classe com javascript
    // toggle = adiciona ou remove uma classe
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( function(item){
        const itemFound = item == itemId // true or false
        return itemFound
    })

    // Se já estiver selecionado, tirar da seleção
    if( alreadySelected >= 0){
        //tirar da seleção
        const filteredItems =selectedItems.filter(function(item){
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
        
    // Se não estiver selecionado, adicionar à seleção
    }else{
        selectedItems.push(itemId)
    }

    //**** atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems

}

