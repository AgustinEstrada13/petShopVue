const app = Vue.createApp({
    data(){
        return{
            data: [],
            medicamentos:[],
            juguetes:[],
            comprar:[],
            articuloCompra:[],
            jugueteFiltrado:[],
            carrito:[],

        }

    },
    created(){
        var endpoint = "https://apipetshop.herokuapp.com/api/articulos";
        fetch(endpoint)
            .then(res => res.json())
            .then(data =>{
                this.data = data.response

                this.medicamentos = this.data.filter(articulo => articulo.tipo == "Medicamento")
                this.juguetes = this.data.filter(articulo => articulo.tipo == "Juguete")
                let dataCarrito = localStorage.getItem("carrito")
                if(dataCarrito != null){
                    this.carrito = JSON.parse(dataCarrito)
                }
                
            })
            

        
    },
    methods:{
        alert(){
            return alert("Los datos se enviaron correctamente, en breve nos estaremos contactando")
        },
        prueba(){
            setTimeout(function(){
                localStorage.clear()
                location.reload()
                }, 3000);
                swal("Good job!", "Thanks for the buy", "success");
        },

        pushCarrito(articulo){

                var atriculoIndexCarrito = this.carrito.findIndex(e=> e._id == articulo._id )
                if(atriculoIndexCarrito == -1){
                    this.carrito.push({
                        "_id": articulo._id,
                        "nombre": articulo.nombre,
                        "cantidad": 1,
                        "precio": articulo.precio
                    })
                }else{
                    this.carrito[atriculoIndexCarrito].cantidad += 1
                    this.carrito[atriculoIndexCarrito].precio += this.carrito[atriculoIndexCarrito].precio
                }
                articulo.stock --;
                localStorage.setItem("carrito" , JSON.stringify(this.carrito))
                
                console.log(this.carrito)



        },
        

    },
    computed:{

        precioTotalCarrito() {
            return this.carrito.reduce((acumulador, item) => acumulador + (item.cantidad * item.precio), 0);
        },

        

    }
})

app.mount("#app")
