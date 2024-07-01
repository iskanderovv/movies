import './Navbar.scss';
import SearchMovie from '../search-movie/SearchMovie';

const Navbar = () => {
    

    return (
        <div className="bg-[#141414] py-6">
            <div className="max-w-[1200px] mx-auto flex justify-end items-center">
                <SearchMovie />
            </div>
        </div>
    );
};

export default Navbar;
