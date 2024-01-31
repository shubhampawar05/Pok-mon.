
let searchBtn = document.querySelector('#searchbtn');
let resetBtn = document.querySelector('#resetBtn');
let inputField = document.querySelector('#inputfield');
let pokeContainer = document.querySelector('.pokeContainer')


const pokemonsData = [];
const colorObj = {
    dragon: '#DCAA2B',
    flying: '#475569',
    fire: '#FD842F',
    fire: '#FD842F',
    grass: '#A0CF59',
    ground: '#F7E049',
    rock: '#A8922C',
    water: '#4E98C7',
    ice: '#5AC7E8',
    bug: '#79A449',
    fighting: '#D76F2E',
    poison: '#BD86CC',
    ghost: '#7E789B',
    steel: '#A7A29F',
    electric: '#EFD73F',
    psychic: '#F46EBD',
    dark: '#111827',
    shadow: 'darkorchid',
    fairy: '#FDBDEA',
    normal: '#99692E',
    unknown: '#475569'
};


window.onload = ()=>{
    let select = document.querySelector('#selectField');
    let url = "https://pokeapi.co/api/v2/type/"
    fetch(url)
    .then((response) => response.json())
    .then((parsedResponse) => {
        // console.log(parsedResponse);
      const pokeTypeArray = parsedResponse.results;
    //   console.log(pokeInfoData);
      for (let i = 0; i < pokeTypeArray.length-2; i++) {
        const pokemonTypeName = pokeTypeArray[i].name;
        // console.log(pokemonTypeName);

        const option = document.createElement("option");
        option.setAttribute("value",pokemonTypeName );
        option.innerText = pokemonTypeName;

        select.append(option);
      }

      pokemonDataArray();
    });
};


function pokemonDataArray(){
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=500'
    fetch(url)
    .then(res => res.json())
    .then((parseData)=>{
        // console.log(parseData);
       let pokiArray = parseData.results;
    //    console.log(pokiArray);
       fillingDataIntoArray(pokiArray);
    })
}

function fillingDataIntoArray(pokiArray){
    pokiArray.forEach(( singlepoki) => {
        const url = singlepoki.url;

        fetch(url)
        .then(res => res.json())
        .then((singleparsedata) => {
            pokemonsData.push({
                id:singleparsedata.id,
                imgurl:singleparsedata.sprites.front_default,
                name: singleparsedata.name,
                type: singleparsedata.types[0].type.name,
                abilities: singleparsedata.abilities.map((ability) => {
                    return ability.ability.name;
                })
            })

            if (pokemonsData.length == 499) {
                showcard();
            }
        })


    })
}
function showcard(){
    console.log(pokemonsData);
    console.log(pokemonsData.name)
    pokemonsData.forEach((singlepokiii)=>{
        let card = document.createElement('div');
        card.classList.add('flip-card');

        let pokiOuterDiv = document.createElement('div');
        pokiOuterDiv.classList.add('flip-card-inner')

        let pokiFront = document.createElement('div');
        pokiFront.classList.add('flip-card-front');

        let pokiBack = document.createElement('div');
        pokiBack.classList.add('flip-card-back')

        //for front div elements
        // let count = document.createElement('p');
        // let img = document.createElement('img');
        // let name = document.createElement('p');
        // let type = document.createElement('span')

        // filling front div 
        pokiFront.innerHTML = `
        <p>#${singlepokiii.id}</p>
        <img src='${singlepokiii.imgurl}'>
        <p>${singlepokiii.name}</p>
        <span>${singlepokiii.type}</span>
        `
        

        //back Div create and fill with data 

        pokiBack.innerHTML = `
        <img src='${singlepokiii.imgurl}'>
        <p>${singlepokiii.name}</p>
        <p>Abilities</p>
        <p>${singlepokiii.abilities}</p>
        `
        pokiOuterDiv.appendChild(pokiFront)
        pokiOuterDiv.appendChild(pokiBack)
        card.appendChild(pokiOuterDiv)
        pokeContainer.append(card)

    })
}










// let searchBtn = document.querySelector('#SearchOnType');
// let showcard = document.querySelector('.card')
// const Map = {};
// let resetBtn = document.querySelector('#resetbtn');
// let inputValue = document.querySelector('input');
// let NameMap = {};


// const firstPageData = [];

// inputValue.addEventListener('keydown',()=>{
//     inputValue.value
// })

// console.log(resetBtn);

// resetBtn.addEventListener('click',()=>{
//     console.log('abc');
//     showcard.innerHTML = ''    
//     firstPage();
// })

// searchBtn.addEventListener('click',()=>{
//     let selectType = document.querySelector('#selectfield').value;
//     showcard.innerHTML = ''

//     // console.log(selectType);
//     fetch(Map[selectType])
//     .then(responce => responce.json())
//     .then(parsedResponse =>{
//         console.log(parsedResponse);
//         for (let i = 0; i < parsedResponse.pokemon.length; i++) {
//             const apiofType = parsedResponse.pokemon[i].pokemon.url;
//             fetch(apiofType)
//             .then(res => res.json())
//             .then(parsedRes =>{
//                 // console.log(parsedRes,i);
//                 addingSingleCart(parsedRes,i)
//             })
            
//         }
//     })


// });
// function addingSingleCart(parsedRes,i){
//         let data = parsedRes.sprites
//         let link =  parsedRes.sprites.front_default
//         let pokiiiname =  parsedRes.name
//         let pokiiiType =  parsedRes.types[0].type.name

//         // console.log(pokiiiname);

//         let imgDiv = document.createElement('div')
//         let img = document.createElement('img')
//         let name = document.createElement('p')
//         let type = document.createElement('p')
//         let count = document.createElement('p')


       
        
//         count.innerText = i;
//         type.innerText = pokiiiType;
//         name.innerText = pokiiiname;
//         img.setAttribute('src',`${link}`)
//         imgDiv.classList.add('frontside');
//         imgDiv.append(count,img,name, type)
//         showcard.append(imgDiv)




//          //backside
//          let backimgDiv = document.createElement('div')
//          let backimg = document.createElement('img')
//          let backname = document.createElement('p')
//          let backtype = document.createElement('p')
//          let backcount = document.createElement('p')

//          backimgDiv.classList.add('backside')
//          backname.innerText = pokiiiname;
//          backimgDiv.appendChild(backname)
//         showcard.append(backimgDiv);


//         if(pokiiiType=== 'grass'){
//             imgDiv.setAttribute('id','grass');
//         }else if (pokiiiType=='bug'){
//             imgDiv.setAttribute('id','bug');
//         }else if (pokiiiType=='fire'){
//             imgDiv.setAttribute('id','fire');
//         }else if (pokiiiType=='water'){
//             imgDiv.setAttribute('id','water');
//         }else if (pokiiiType=='ice'){
//             imgDiv.setAttribute('id','ice');
//         }else if (pokiiiType=='electric'){
//             imgDiv.setAttribute('id','electric');
//         }else if (pokiiiType=='psychic'){
//             imgDiv.setAttribute('id','psychic');
//         }else if (pokiiiType=='fairy'){
//             imgDiv.setAttribute('id','fairy');
//         }else if (pokiiiType=='ghost'){
//             imgDiv.setAttribute('id','ghost');
//         }else if (pokiiiType=='ground'){
//             imgDiv.setAttribute('id','ground');
//         }else if (pokiiiType=='poison'){
//             imgDiv.setAttribute('id','poison');
//         }else if (pokiiiType=='fairy'){
//             imgDiv.setAttribute('id','fairy');
//         }else if (pokiiiType=='normal'){
//             imgDiv.setAttribute('id','normal');
//         }else if (pokiiiType=='dragon'){
//             imgDiv.setAttribute('id','dragon');
//         }else if (pokiiiType=='fighting'){
//             imgDiv.setAttribute('id','fighting');
//         }else if (pokiiiType=='rock'){
//             imgDiv.setAttribute('id','rock');
//         }


// }



// function updatetype(parsedResponse){
    
//     let select = document.querySelector('#selectfield')

//     for (let i = 0; i < parsedResponse.results.length; i++) {
//         // const element = parsedResponse.results[i];
//         const typeName =  parsedResponse.results[i].name;
//         const url =  parsedResponse.results[i].url;
//         let option = document.createElement('option');
//         option.setAttribute('value',`${typeName}`)
//         option.setAttribute('url',`${url}`)
//         option.innerText = typeName;
//         Map[typeName]=url;
//         select.append(option);
        
//     }
// }



// // fetching api 
// async function fatchingDatatype(){
//     // function oldWay(){
//     //  // fetch('https://pokeapi.co/api/v2/type/')
//     // // .then(responce => responce.json())
//     // // .then(parsedData =>{
//     // //     console.log(parsedData);
//     //     //write your code here
//     // // })
//     // // .catch((error)=>{
//     // //     console.log(error);
//     // // }
//     // // );
//     // }

//     let responce  = await   fetch('https://pokeapi.co/api/v2/type/');
//     let parsedResponse = await responce.json();
//     // console.log(parsedResponse);
//     updatetype(parsedResponse)
// }


// // for updating front page 
// function firstPage(){
// for (let i = 1; i <= 151; i++) {
//     url  = `https://pokeapi.co/api/v2/pokemon/${i}/`
//     fetch(url)
//     .then(Response => Response.json())
//     .then(parsedData =>{

//         firstPageData = 




//             // console.log(parsedData);
//             let pokiiitype = parsedData.types[0].type.name;
//             let pokiUrl = parsedData.sprites.front_default
//             let pokiName = parsedData.name
//             // console.log(pokiiitype);
//             // let str = ''
//             // let pokiType = parsedData.types.forEach((item) => {
//             //     str += item.type.name +', '
//             // })
//             // console.log(str);
//             // console.log(parsedData.types[0].type.name);
//             let countofCard = document.createElement('p')
//             let imgDiv = document.createElement('div')
//             let img = document.createElement('img')
//             let name = document.createElement('p')
//             let type = document.createElement('p')

//             imgDiv.classList.add('frontside');

//             countofCard.innerText = `#${i}`
//             name.innerText = pokiName;
//             img.setAttribute('src',`${pokiUrl}`)
//             type.innerText = pokiiitype;
//             imgDiv.append(countofCard ,name,img,type)
//             showcard.append(imgDiv)

//             //name Map filling 
//             NameMap[name]=pokiName;

//             //adding colors according to the types of pokiiii
//             if(pokiiitype=== 'grass'){
//                 imgDiv.setAttribute('id','grass');
//             }else if (pokiiitype=='bug'){
//                 imgDiv.setAttribute('id','bug');
//             }else if (pokiiitype=='fire'){
//                 imgDiv.setAttribute('id','fire');
//             }else if (pokiiitype=='water'){
//                 imgDiv.setAttribute('id','water');
//             }else if (pokiiitype=='ice'){
//                 imgDiv.setAttribute('id','ice');
//             }else if (pokiiitype=='electric'){
//                 imgDiv.setAttribute('id','electric');
//             }else if (pokiiitype=='psychic'){
//                 imgDiv.setAttribute('id','psychic');
//             }else if (pokiiitype=='fairy'){
//                 imgDiv.setAttribute('id','fairy');
//             }else if (pokiiitype=='ghost'){
//                 imgDiv.setAttribute('id','ghost');
//             }else if (pokiiitype=='ground'){
//                 imgDiv.setAttribute('id','ground');
//             }else if (pokiiitype=='poison'){
//                 imgDiv.setAttribute('id','poison');
//             }else if (pokiiitype=='fairy'){
//                 imgDiv.setAttribute('id','fairy');
//             }else if (pokiiitype=='normal'){
//                 imgDiv.setAttribute('id','normal');
//             }else if (pokiiitype=='dragon'){
//                 imgDiv.setAttribute('id','dragon');
//             }else if (pokiiitype=='fighting'){
//                 imgDiv.setAttribute('id','fighting');
//             }else if (pokiiitype=='rock'){
//                 imgDiv.setAttribute('id','rock');
//             }
//         }
        
//     )}
// }
    



// window.onload = firstPage;
//     // fatchingDatatype();


