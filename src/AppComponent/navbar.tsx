import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAction } from "../redux/action/login"
import { AppDispatch } from '../redux/store';
import { FaBars } from 'react-icons/fa';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const toggleMenu = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    const handleScroll = () => {
        const navbar = document.querySelector('.navbar') as any;
        const scrolled = window.pageYOffset > 0;
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Check if the access token is in the URL after redirect
        const hash = window.location.hash;
        if (hash.includes('access_token')) {
            const token = new URLSearchParams(hash.substring(1)).get('access_token') as string;
            dispatch(loginAction({ token, navigate }));
            setIsLoggedIn(true);
        }
    }, [dispatch, navigate]);

    const handleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    }

    const signOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/")
    }

    return (
        <div className="flex justify-center items-center mt-12">
            <nav className="navbar h-20">
                <h1 className="text-2xl secondary-color font-extrabold ">
                    <Link
                        to="/"
                        className="cursor-pointer"
                    >
                        BENO
                    </Link>
                </h1>
                <div>
                    <div className="md:hidden">
                        <button
                            className="font-work-sans text-2xl "
                            onClick={toggleMenu}
                            aria-label="Toggle Menu"
                        >
                            <FaBars />
                        </button>
                    </div>

                    <div
                        data-testid="menu"
                        className={`${isMenuOpen ? 'block rounded-lg gradient' : 'hidden'
                            } md:flex items-center gap-3 font-bold cursor-pointer list-none transition-all md:gradient ease-in-out duration-300 xl:space-x-4 xl:ml-3 absolute left-0 w-full md:w-auto md:static xl:h-auto xl:bg-transparent mt-2 xl:mt-0`}
                    >
                        <li className="y-6 xl:my-0 ml-4 mr-4 my-6">
                            <Link
                                to="/"
                                className="my-6 no-underline text-white font-bold xl:my-0 hover:underline "
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="y-6 xl:my-0 ml-4 my-8 ">
                            <Link
                                to="/allProperty"
                                className="my-6 no-underline  text-white font-bold xl:my-0 hover:underline"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Property
                            </Link>
                        </li>
                    </div>
                </div>
                {isLoggedIn ? (
                    <Button onClick={signOut} className='bg-transpalent' >Logout</Button>
                ) : (
                    <Dialog >
                        <DialogTrigger asChild>
                            <Button className='bg-green-700 text-white'>Join</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className='text-center'>Join our Platform</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Button className="w-full" onClick={handleLogin}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Continue with Google
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </nav>
        </div>
    );
};

export default NavBar