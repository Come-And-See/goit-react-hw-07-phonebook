import * as css from '../All.styled';
import { useDispatch } from 'react-redux'
import { filters } from '../../redux/contact/contactSlice';



export const Filter = () => {
    const dispatch = useDispatch();

    const changeFilter = (e) => {
        dispatch(filters(e.currentTarget.value))
    }

    return (
        <>
            <h3>Find contacts by name</h3 >
            <css.Input type="text" onChange={changeFilter} />
        </>
    )
}

