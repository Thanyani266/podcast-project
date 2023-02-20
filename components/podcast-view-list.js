import {html, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import {store, connect} from '../store.js'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
const gname = [
    "Personal Growth",
    "Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family"
]

class Component extends LitElement {
    static get properties() {
        return {
            previews: {state: true},
            sorting: {state: true},
            search: {state: true},
        }
    }

    constructor() {
        super()

        this.disconnectStore = connect((state) => {
            if(this.previews !== state.previews) {
                this.previews = state.previews
            }

            if(this.sorting !== state.sorting) {
                this.sorting = state.sorting
            }

            if(this.search !== state.search) {
                this.search = state.search
            }
        })
    }
    
   // /** 
     //* @param {import('../types').state} state 
     //*/
    //storeChange = (state) => {
      //  if(this.previews === state.previews) return

        //this.previews = state.previews
    //}
    
    disconnectedCallback() {
        this.disconnectStore()
    }

    render() {
        /**
         * @type {import('../types').preview[]}
         */
        const previews = this.previews

        const filteredPreviews = previews.filter(item => {
            if(!this.search) return true
            return item.title.toLowerCase().includes(this.search.toLowerCase())
        })

        const sortedPreviews = filteredPreviews.sort((a, b) => {
            if(this.sorting === 'a-z') return a.title.localeCompare(b.title)
            if(this.sorting === 'z-a') return b.title.localeCompare(a.title)

            const dateA = new Date(a.updated).getTime()
            const dateB = new Date(b.updated).getTime()

            if(this.sorting === 'oldest-latest') return dateA - dateB
            if(this.sorting === 'latest-oldest') return dateB - dateA
            throw new Error('Invalid sorting')
        })

        const list = sortedPreviews.map(({ title, genres, seasons, id, updated, image }) => {
            const genre = `${gname[genres - 1]}`
            const date = new Date(updated)
            const updatedString = `${date.getDate().toString().padStart(2, '0')} ${MONTHS[date.getMonth() - 1]} ${date.getFullYear()}`
            const clickHandler = () => store.loadSingle(id)
            
            return html`<head>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
                        rel="stylesheet" 
                        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
                        crossorigin="anonymous">
                        </head>
                        <div class='col-md-4 m-auto mt-5 mb-1'>
                                   <div class='card'>
                                    <img src="${image}" class="card-img-top" alt="...">
                                    <div class='card-body'>
                                        <h5 class="card-title"><strong>${title}</strong></h5>
                                        <p class="card-text">Seasons: ${seasons}</p>
                                        <p>Genre: ${genres}</p>
                                        <p>Updated: ${updatedString}</p>
                                        <button class="btn btn-primary" @click="${clickHandler}">
                                              <p>view more...</p>
                                        </button>
                                    </div>
                                  </div>
                                </div>`
            
            
            //<li>
                            
                  //  <div class="card">
                      //  <img src="${image}" alt="Avatar" style="width:30%">
                      //  <div class="container">
                         // <h4><strong>${title}</strong></h4>
                        //  <button @click="${clickHandler}">
                      //      <p>Seasons: ${seasons}</p>
                        //</button>
                       //   <p>Genre: ${genre}</p>
                      //    <p>Updated: ${updatedString}</p>
                      //  </div>
                     // </div>
                     //   </li>
                        //<p><strong>${title}</strong></p>
                        //<button @click="${clickHandler}">
                          //  <p>Seasons: ${seasons}</p>
                        //</button>
                        //<p>Genre: ${genre}</p>
                        //<div>${updatedString}</div>
                        
        })

        return html`<h1>Podcast List</h1>
                    <podcast-controls></podcast-controls>
                    ${list.length > 0 ? html`<ul>${list}</ul>` : html`<div>No matches</div>`}
                    `
    }
}

customElements.define('podcast-view-list', Component)