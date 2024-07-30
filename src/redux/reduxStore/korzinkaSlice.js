import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    korzinka: [],
    korzinkaPrice: 0
}

const korzinkaSlice = createSlice({
    name: "korzinkaSlice",
    initialState,
    reducers: {
        setKorzinka : (state) => {
            
            let a = JSON.parse(localStorage.getItem('korzinka'))
            if(a){
                state.korzinka = a
            }else{
                state.korzinka = []
            }
        },
        pushKorzinka: (state, {payload}) => {
            state.korzinka.push(payload)
        },
        plustProduct: (state , {payload}) => {
            state.korzinka.find(item => {
                if(item.id == payload.id){
                    let arr = JSON.parse(localStorage.getItem('korzinka'));
                    arr.map(kor => {
                        if(kor.id == item.id){
                            kor.price = (kor.price / kor.count ) * (kor.count + 1)
                            kor.count ++
                        }
                    })
                    item.price = (item.price / item.count ) * (item.count + 1)
                    item.count ++
                    localStorage.setItem('korzinka' , JSON.stringify(arr))
                }
            })
        },
        minusProduct: (state , {payload}) => {
            state.korzinka.find(item => {
                if(item.id == payload.id){
                    let arr = JSON.parse(localStorage.getItem('korzinka'));
                    if(item.count -1 == 0){
                        const a = window.confirm('Отменить продукт ?')
                        if(a){
                            state.korzinka = state.korzinka.filter(kor => kor.id !== item.id)
                            arr = arr.filter(kor => kor.id !== item.id);
                            return localStorage.setItem('korzinka' , JSON.stringify(arr))
                        }else{
                            return
                        }
                    }
                    arr.map(kor => {
                        if(kor.id == item.id){
                            kor.price = (kor.price / kor.count ) * (kor.count - 1)
                            kor.count --
                        }
                    })
                    item.price = (item.price / item.count ) * (item.count - 1)
                    item.count --;
                    localStorage.setItem('korzinka' , JSON.stringify(arr))
                }
            })
        },
        setPriceKorzinka: (state  ) => {
            let a = 0;
            state.korzinka.forEach(item => {
                a+= Number(item.price)
            })
            state.korzinkaPrice = a;
        }
    }

})

export const {pushKorzinka, plustProduct ,minusProduct , setKorzinka , setPriceKorzinka} = korzinkaSlice.actions;
export default korzinkaSlice.reducer;