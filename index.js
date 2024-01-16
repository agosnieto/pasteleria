    //Vars

    const $cardContent = document.getElementById('products-card'),
    $items = document.getElementById('items'),
    $footer = document.getElementById('footer'),
    $searchInput = document.getElementById('search-input'),
    $noResults = document.getElementById('noResults'),
    $template = document.getElementById('products-template').content,
    $templateCarrito = document.getElementById('carrito-template').content,
    $templateFooter = document.getElementById('footer-template').content,
    $fragment = document.createDocumentFragment();
    
    //let json;
    //Events

    document.addEventListener('DOMContentLoaded', ()=>{
        getData();
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
            printCarrito()
        }
    })

    $cardContent.addEventListener('click', e =>{
            addCarrito(e)
    });

    $items.addEventListener('click', e =>{
            btnAccion(e)
    });
    //Functions

   const getData = async ()=>{
        try {
            let res = await fetch("datos.json");
            json = await res.json();
            if(!res.ok) throw {status: res.status , statusText: res.statusText};
            buildElements(json);      
        } catch (error) {
            let message = error.statusText ||"Ocurrió un error";
            $cardContent.innerHTML = `Error ${error.status}: ${message}`
        
        }finally{
            console.log('Se ejecutó el finally')
        }
    };
    
    const buildElements = (data) => {
        $cardContent.innerHTML = ""; 
    
        if (data.length === 0) {
            $noResults.style.display = "block";
        } else {
            data.forEach((p) => {
                $template.querySelector('.card-title').textContent = p.nombre;
                $template.querySelector('.card-text').textContent = p.descripcion;
                $template.querySelector('.img-product').src = p.imagen;
                $template.querySelector('.card-price').textContent = `$${p.precio}`;
                $template.querySelector('.buy-btn').textContent = "Comprar";
                $template.querySelector('.buy-btn').dataset.id = p.id;
                $template.querySelector('.img-product').setAttribute('style', 'width:150px');
                $template.querySelector('.img-product').classList.add('img-style');
                let $newTemplate = document.importNode($template, true);
                $fragment.appendChild($newTemplate);
            });
    
            $cardContent.appendChild($fragment);

            $noResults.style.display = "none";
        }
    };

    let carrito = {};
    const addCarrito = e =>{
        if(e.target.classList.contains('buy-btn')){
           setCarrito(e.target.parentElement)
        }
        e.stopPropagation()
    };

    const setCarrito = object =>{
        const product = {
            id: object.querySelector('.buy-btn').dataset.id,
            nombre : object.querySelector('.card-title').textContent,
            precio : object.querySelector('.card-price').textContent,
            cantidad : 1
        }
        if(carrito.hasOwnProperty(product.id)){
            product.cantidad = carrito[product.id].cantidad + 1

        }
        carrito[product.id] = {...product}
        printCarrito()
            
    };

    const printCarrito = () =>{
        $items.innerHTML = ''
        Object.values(carrito).forEach(p =>{
            const precioNumerico = parseFloat(p.precio.replace('$', ''));
            $templateCarrito.querySelector('th').textContent =  p.id,
            $templateCarrito.querySelectorAll('td')[0].textContent = p.nombre
            $templateCarrito.querySelectorAll('td')[1].textContent = p.cantidad
            $templateCarrito.querySelector('.btn-info').dataset.id = p.id
            $templateCarrito.querySelector('.btn-danger').dataset.id = p.id
            $templateCarrito.querySelector('span').textContent = precioNumerico * p.cantidad

            const $clone = $templateCarrito.cloneNode(true);
            $fragment.appendChild($clone)

        })
        $items.appendChild($fragment)
        printFooter()

        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const printFooter = ()=>{
        $footer.innerHTML = ''
        if(Object.keys(carrito).length === 0){
            $footer.innerHTML = 
            `<th scope="row" colspan="5">Carrito vacío. Comience a comprar!</th>`
            return
        };
        const cantidadTotal = Object.values(carrito).reduce((acum,{cantidad})=> acum + cantidad, 0);
        const precioTotal = Object.values(carrito).reduce((acum,{cantidad, precio})=> {
            const precioConvertido = parseFloat(precio.replace('$', ''), 10)
            return acum + precioConvertido * cantidad}, 0)

        $templateFooter.querySelectorAll('td')[0].textContent = cantidadTotal,
        $templateFooter.querySelector('span').textContent = precioTotal

        const $footerClone = $templateFooter.cloneNode(true);
        $fragment.appendChild($footerClone);
        $footer.appendChild($fragment);

        const btnEmpty = document.getElementById('empty-car');
        btnEmpty.addEventListener('click', ()=>{
            carrito = {}
            printCarrito()
        })
    };

    const btnAccion = e =>{
        if(e.target.classList.contains('btn-info')){
            const producto = carrito[e.target.dataset.id];
            producto.cantidad++;
            carrito[e.target.dataset.id] = {...producto};
            printCarrito()
        }
        if(e.target.classList.contains('btn-danger')){
            const producto = carrito[e.target.dataset.id];
            producto.cantidad--;
            console.log(producto)
            if (producto.cantidad === 0){
                delete carrito[e.target.dataset.id]
            }
            printCarrito()
        }
        e.stopPropagation()
    };
    
    const handleSearch = async ()=>{
       const searchTerm = $searchInput.value.toLowerCase();
       const filteredProducts = json.filter((element)=> element.nombre.toLowerCase().includes(searchTerm));
       console.log(filteredProducts);
       buildElements(filteredProducts);
    };
   

    $searchInput.addEventListener('input', handleSearch);
