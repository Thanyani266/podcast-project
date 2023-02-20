import {html, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import {store, connect} from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: {state: true},
        }
    }

    constructor() {
        super()
        
        this.disconnectStore = connect((state) => {
            if(this.single === state.single) return
            this.single = state.single
        })
    }
    
    disconnectedCallback() {
        this.disconnectStore()
    }

    render() {
        /**
         * @type {import('../types').show}
         */
        const show = this.single

        if(!show) {
            return html`<div></div>`
        }

        
        const backHandler = () => store.loadList()

        const seasons = show.seasons.map(({ episodes, title, image }) => {
            return html`<head>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
                        rel="stylesheet" 
                        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
                        crossorigin="anonymous">
                        </head>
                        <div class='col-md-4 mt-5 mb-1'>
                            <div class='card'>
                                <img src="${image}" class="card-img-top" alt="...">
                                <div class='card-body'>
                                    <h5 class="card-title"><strong>${title}</strong></h5>
                                </div>
                            </div>
                        </div> 
                   ${episodes.map(({ file, title: innerTitle}) => {
                 
                   return html`
                       <div>
                            <div>${innerTitle}</div>
                                <audio controls>
                                    <source src="${file}" type="audio/mp3">
                                </audio>
                            </div>
                       </div>
                                       
                                     
                           `
                 })}
           `
       })

        return html`<button @click="${backHandler}">BACK</button>
                    <h1>${show.title || ""}</h1>
                    ${seasons}
                `
    }
}

customElements.define('podcast-view-single', Component)