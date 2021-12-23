import axios from 'axios';
import { SAVE_NAMETI_REQUEST, 
        SAVE_NAMETI_SUCCESS, 
        SAVE_NAMETI_FAIL, 
        GET_ALL_NAMETI_REQUEST, 
        GET_ALL_NAMETI_SUCCESS, 
        GET_ALL_NAMETI_FAIL, 
        GET_NAMETI_REQUEST, 
        GET_NAMETI_SUCCESS, 
        GET_NAMETI_FAIL, 
        NAMETI_UPDATE_REQUEST,
        NAMETI_UPDATE_SUCCESS,
        NAMETI_UPDATE_FAIL} from '../constants/nametiConstants';

export const getAllNameti = () => async (dispatch, getState) => {
    try {
        dispatch({type: GET_ALL_NAMETI_REQUEST})

        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            }
          }

        const { data } = await axios.get('/api/nameti', config)

        dispatch({
            type: GET_ALL_NAMETI_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({type: GET_ALL_NAMETI_FAIL})
    }
}

export const getNamete = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: GET_NAMETI_REQUEST})

        const {
            userLogin: { userInfo },
          } = getState()
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            }
          }

        const { data } = await axios.get(`/api/nameti/${id}`, config)

        dispatch({
            type: GET_NAMETI_SUCCESS,
            payload: data[0]
        })
    } catch (err) {
        dispatch({type: GET_NAMETI_FAIL})
    }
}

export const snimiNamete = (nameti, id) => async (dispatch, getState) => {
    const pack = {...nameti, id}
    try {
         dispatch({type: SAVE_NAMETI_REQUEST})

         const {
             userLogin: { userInfo }
         } = getState()

         const config = {
             headers: {
                 Authorization: `Bearer ${userInfo.token}`,
                 'Content-Type': 'application/json'
             }
         }

         const { data } = await axios.post('/api/nameti/new', pack, config)

         dispatch({
             type: SAVE_NAMETI_SUCCESS,
             payload: data
         })
    } catch (err) {
        dispatch({
            type: SAVE_NAMETI_FAIL,
            payload: err
        })
    }
}

export const updateNameti = (nameti, id) => async (dispatch, getState) => {
    

    try {
        dispatch({type: NAMETI_UPDATE_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/nameti/update/podaci', {nameti: nameti, idPret: id}, config)

        dispatch({
            type: NAMETI_UPDATE_SUCCESS,
            payload: data[0]
        })

    } catch (err) {
        dispatch({
            type: NAMETI_UPDATE_FAIL,
            payload: err
        })
    }
}

export const getNametiPoDatumu = (datum) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_NAMETI_REQUEST
        })

        const {
            userLogin: { userInfo },
          } = getState()
      
        //   const config = {
        //     headers: {
        //       Authorization: `Bearer ${userInfo.token}`,
        //     }
        //   }        

        const { data } = await axios.get('/api/nameti/faktura/datum', {params: { datum: datum }, headers: {
            Authorization: `Bearer ${userInfo.token}`,
          }})

        console.log(data)

        dispatch({
            type: GET_NAMETI_SUCCESS,
            payload: data[0]
        })
    } catch (err) {
        dispatch({
            type: GET_NAMETI_FAIL,
            payload: err
        })
    }
}