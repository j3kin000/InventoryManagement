import {useDispatch} from 'react-redux';
import {TypedDispatch} from '../../store/store';

export const useAppDispatch: () => TypedDispatch = useDispatch;
