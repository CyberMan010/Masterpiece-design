import '../index.css';

function Signup() {
    return (
        <>
        <h1 className='flex justify-center text-cyan-700 font-bold text-4xl m-5'>Roxana</h1>
        <h4 className='flex justify-center text-black font-bold'>Join us and start exploring!</h4>
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
            
          <div className="flex w-full max-w-4xl">
            <div className="w-1/2 p-8">
              <h1 className="text-4xl font-bold mb-4">Create your account</h1>
              <p className="text-muted-foreground mb-8">fill in the blanks to signUp</p>
            </div>
            <div className="w-1/2 p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium">Email</label>
                  <input id="username" name="username" type="text" placeholder="Enter your email" className="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground" />
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium">Username</label>
                  <input id="username" name="username" type="text" placeholder="Enter your username" className="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground" />
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium">Password</label>
                  <input id="username" name="username" type="text" placeholder="Enter your Password" className="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium">Repeat your password</label>
                  <input id="password" name="password" type="password" placeholder="Enter your password again" className="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground" />
                </div>
                
                
                <button
className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-8 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
type="button">
SignUp
</button>
              </form>
             
              
            </div>
          </div>
          </div></>)
}
export default Signup;