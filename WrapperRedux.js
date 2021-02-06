const getById = document.getElementById.bind(document)

class WrapperRedux {

    constructor( DEFAULT_STATE = {} )
    {
        const {  createStore, applyMiddleware } = Redux
        this.reducers = {}
        this.debugger = false
        this.store = createStore(
            (state, action) => this.Reducer.call(this, state, action), 
            DEFAULT_STATE,
            applyMiddleware( ({ dispatch, getState }) => next => action => {
                if(this.debugger)
                {                    
                    console.log(`%c action logger: action.type=${action.type} state=${JSON.stringify(getState())}`, 'background: #222; color: #fff;font-size:20px')
                }
                return next(action)
            })
        )
    }

    Reducer(state, action)
    {
        if (this.reducers && this.reducers[action.type]) 
        {
            return this.reducers[action.type](state, action)
        }
        return state
    }

    RegisterReducer(actionType, reducer)
    {
        this.reducers[actionType] = (state, action) => {
            if (action.type == actionType) 
            {
                return reducer(state, action)
            }
        }
    }

    Subscribe( callback )
    {
        this.store.subscribe( () => callback(this.store) )
    }

    Dispatch( payload )
    {
        this.store.dispatch(payload)
    }

    GetStore()
    {
        return this.store
    }

    Debugger()
    {
        this.debugger = true
        window.store = this.store
    }
}
