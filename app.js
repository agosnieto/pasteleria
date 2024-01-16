/*const frutas = []
const fruta = prompt('Bienvenido. Qué fruta desea comprar?')

frutas.push(fruta)

while (confirm('Desea comprar más fruta?')) {
    const fruta = prompt('Qué fruta desea comprar')
    frutas.push(fruta)
}

console.log('Lista de frutas compradas:')
for (let fruta of frutas) {
    console.log(fruta)
}

const gato ={
    nombre: 'Milka',
    edad: 3,
    actividades : ['dormir', 'comer','jugar']
}

const{nombre, edad ,actividades} = gato;
console.log(`Su Nombre es ${nombre}
            Tiene ${edad} años
            Sus actividades favoritas son ${actividades}`)*/

/*const colorInput = document.getElementById('colorInput');
const btnVisualizar = document.getElementById('btnVisualizar');
const parrafoHexa = document.getElementById('parrafoHexa');
const cajaColor = document.getElementById('cajaColor');

console.log(colorInput.value)

btnVisualizar.addEventListener("click", ()=>{
    console.log(colorInput.value)
    parrafoHexa.textContent = colorInput.value
    cajaColor.style.backgroundColor = colorInput.value
})*/

const listCountry = document.querySelector('.listCountry');

const arrayCountries = ['Argentina','Brasil','Uruguay','Venezuela','Perú'];

const fragment = document.createDocumentFragment();

arrayCountries.forEach((country)=>{
    const li = document.createElement('li');
    li.textContent = country;
    fragment.appendChild(li)

});

listCountry.appendChild(fragment);

function saludar(quien) {
    console.log("Hola " + quien);
    }
saludar("Harry");
console.log("Adios");

