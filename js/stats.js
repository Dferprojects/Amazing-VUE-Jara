const {createApp} = Vue

createApp({
    data(){ // las variables que puedo usar en el html
      return {

        data: undefined,
        upcomingFiltered: undefined,
        pastFiltered: undefined,
        maxMinPercentage: [],

      }  
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then( response => response.json())
            .then(info => {
                this.data = info
                this.upcomingFiltered = this.data.events.filter(event => event.date > this.data.currentDate)
                this.pastFiltered = this.data.events.filter(event => event.date < this.data.currentDate)
                let listaPorcentaje = this.newPropertyPercentage(this.data)
                console.log(this.newPropertyPercentage(this.data))
                this.maxCapacity(this.data.events)
                this.maxPercentage(listaPorcentaje)
                this.minPercentage(listaPorcentaje)
                console.log(this.maxMinPercentage)
                
                
            })
            .catch(err => console.log(err))
    },
    methods:{
        revenues : function (prices, estimatesOrAssistance){ //reemplazar por data.(price o estimate o assistance)
            let rev = prices * estimatesOrAssistance
            return rev.toLocaleString()
    },
        percentageOfAttendance : function (capacities, estimatesOrAssistance){
        let percentage = (estimatesOrAssistance / (capacities/100)).toFixed(0)
        return percentage
    },
        newPropertyPercentage : function (data){
        let list = []
        let filteredAssistance = data.events.filter( event => event.assistance)
        
            for (let i = 0; i < filteredAssistance.length; i++) {
                    list.push(filteredAssistance[i]);
                    
                
                
                    list[i].percentage = this.percentageOfAttendance(list[i].capacity, list[i].assistance);
                
            }
            
            return [...list.sort((event1, event2) => event2.percentage - event1.percentage)]
        },
        maxPercentage : function (events2){
            let sortedMax = [...events2.sort((event1, event2) => event2.percentage - event1.percentage)]
            this.maxMinPercentage[0] = {name: sortedMax[0].name + " with " , percentage: sortedMax[0].percentage +"%"}
            
            
        },
        
        minPercentage : function (events2){
            let sortedMin = [...events2.sort((event1, event2) => event1.percentage - event2.percentage)]
            this.maxMinPercentage[1] = {name: sortedMin[0].name + " with ", percentage: sortedMin[0].percentage + "%"}
        },
        maxCapacity : function (events){
            let maximCapacity = events.sort((event1, event2) => event2.capacity - event1.capacity)
            this.maxMinPercentage[2] = {name: maximCapacity[0].name + " with ", capacity: (maximCapacity[0].capacity).toLocaleString() + " of capacity."} 
        }

        
    }
}).mount("#app")





/* let stat_1 = document.getElementById("tbody_1")
let stat_2 = document.getElementById("tbody_2")
let stat_3 = document.getElementById("tbody_3")
// Traigo los ID de los containers donde voy a imprimir las cards

let lista;
const url = "https://mindhub-xj03.onrender.com/api/amazing";
fetch(url)
.then(response => response.json())
.then(datos => {
    lista = datos
    creatingPastTR (lista, stat_3)
    creatingUpcomingTR (lista, stat_2)
    mayorCapacity(lista.events)
    let filtro = creatingNewList(lista)
    imprimirMayorPorcentaje(filtro)
    imprimirMenorPorcentaje(filtro)
})
.catch(error => error.message)



// past rows

function creatingPastTR(losDatos, ubicacion){
    let pastEvents = losDatos.events.filter(evento => evento.date < losDatos.currentDate)
    let template2 = ""

    for (let past of pastEvents){
        template2 += 
    `<tr>
        <td>${past.category}</td>
        <td>$ ${multiplicacion(past.assistance, past.price)}</td>
        <td>${porcentaje(past.capacity, past.assistance)}%</td>
    </tr>`
    }


    ubicacion.innerHTML = template2
}

// upcoming rows

function creatingUpcomingTR(losDatos, ubicacion){

        let upcomingEvents = losDatos.events.filter(evento => evento.date > losDatos.currentDate)
        let template1 = ""
        for (let up of upcomingEvents){
            template1 += 
        `<tr>
            <td>${up.category}</td>
            <td>$ ${multiplicacion(up.estimate, up.price)}</td>
            <td>${porcentaje(up.capacity, up.estimate)}%</td>
        </tr>`
        }
    
        ubicacion.innerHTML = template1
}

// multiplicando precio por asistencia o estimado.

function multiplicacion(dato1, dato2){
    return (dato1 * dato2).toLocaleString()
}

// calculando el porcentaje

function porcentaje(dato1, dato2){
    return ( dato2 / (dato1/100) ).toFixed (3)
}

function mayorCapacity (eventos){
    let mayorCapacity = eventos.sort((a,b) => b.capacity - a.capacity)
    document.getElementById ("eventomayor").innerHTML = mayorCapacity[0].name
}

function creatingNewList(datos){
let nuevaLista = []

    for (let i = 0; i < datos.events.length; i++) {
        nuevaLista.push(datos.events[i]);
        
        nuevaLista[i].percentage = porcentaje(nuevaLista[i].capacity, (nuevaLista[i].assistance ?? nuevaLista[i].estimate));
    }
    //console.log(nuevaLista)
    return nuevaLista.sort((a,b) => b.percentage - a.percentage)
}

function imprimirMayorPorcentaje(nuevoEvento){
    document.getElementById("mayorporcentaje").innerHTML = `${nuevoEvento[0].name} ${nuevoEvento[0].percentage}`
}



function imprimirMenorPorcentaje(nuevoEvento){
    document.getElementById("menorporcentaje").innerHTML = `${nuevoEvento[nuevoEvento.length-1].name} ${nuevoEvento[nuevoEvento.length-1].percentage}`
} */