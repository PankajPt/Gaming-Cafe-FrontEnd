import logo from '../assets/logo.webp'

export default function Logo(){
    return <div
    className="flex items-center justify-center bg-black rounded-full p-4"
    style={{ width: '100px', height: '100px' }}
    >
        <img
            src={logo}
            className="h-20 w-20"
            alt="Logo"
        />
    </div>   
}