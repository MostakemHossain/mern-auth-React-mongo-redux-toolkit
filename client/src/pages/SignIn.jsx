
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function SignIn() {

    const [fromData, setFromData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFromData({ ...fromData, [e.target.id]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            setError(false)
            const res = await fetch('/api/auth/signin', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(fromData)
            });

            const data = await res.json();

            if (data.success == false) {
                setError(true);
                setLoading(false)
                return;

            }
            setLoading(false)
            navigate('/')




        } catch (error) {
            setLoading(false);
            setError(true)

        }


    }



    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="font-semibold text-3xl text-center my-7">Sign In</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange} />
                <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange} />
                <button disabled={loading} className="p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 uppercase disabled:opacity-80 ">
                    {loading ? 'Loading' : 'Sign In'}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Dont have an account?</p>
                <Link to='/sign-up'>
                    <span className="text-blue-500">Sign Up</span>
                </Link>


            </div>

            <p className='text-red-700 mt-5'>{error && 'Something Went Wrong!!!'}</p>
        </div>
    )
}
