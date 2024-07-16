import '../index.css';
        
 function Login() {
            return (
                
                <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                  <div className="flex w-full max-w-4xl">
                    <div className="w-1/2 p-8">
                      <h1 className="text-4xl font-bold mb-4">Login</h1>
                      <p className="text-muted-foreground mb-8">Enter your credentials to access your account</p>
                    </div>
                    <div className="w-1/2 p-8">
                      <form className="space-y-6">
                        <div>
                          <label htmlFor="username" className="block text-sm font-medium">Username</label>
                          <input id="username" name="username" type="text" placeholder="Enter your username" className="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground" />
                        </div>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium">Password</label>
                          <input id="password" name="password" type="password" placeholder="Enter your password" className="mt-1 block w-full rounded-md border border-input bg-background p-2 text-foreground" />
                        </div>
                        <button
  className="align-middle select-none font-sans font-bold uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-60 text-center rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
  type="button">
  Login
</button>
                      </form>
                      <div className="mt-6">
                        <p className="text-muted-foreground">New to Roxana?</p>
                        <button
      className=" font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-24 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
      type="button">
      SignUp
    </button>
                      </div>
                    </div>
                  </div>
                  </div>)
}
export default Login;