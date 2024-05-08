import '../assets/scss/Header.scss';
import { HeaderBottom } from './HeaderBottom';
import { HeaderTop } from './HeaderTop';

export const Header = () => {
    return (
        <header>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}
