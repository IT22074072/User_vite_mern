import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function Header() {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <div className='bg-slate-200'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                {/* Logo/Home link */}
                <Link to='/'>
                    <h1 className='font-bold'>Furniture Store App</h1>
                </Link>
                {/* Navigation links */}
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li> Home</li>    {/* Home link */}
                    </Link>
                    <Link to='/profile'>  {/* Sign In link */}
                        {currentUser ? (
                            <img src={currentUser.profilePicture} alt="profile" className='h-7 w-7 rounded-full object-cover'/>

                        ): (<li> Sign In</li>
                    )}

                </Link>


            </ul>
        </div>
        </div >
    )
}
