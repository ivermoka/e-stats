

import { Disclosure } from '@headlessui/react'

const styles = "bg-slate-700 rounded-md"

export default function App() {

  return (

    <main className="w-screen h-screen flex flex-col justify-center items-center bg-black">

      <div className="flex flex-col gap-10 h-3/4 w-full  justify-center items-center bg-slate-800">

        <h1 className=" text-3xl text-slate-100">Hvordan gikk økten idag?</h1>

    <div className="w-4/5 bg-slate-50 rounded-md flex justify-center items-center flex-col p-1 gap-1">

    <Disclosure>

         {({ open }) => (

          <>

      <Disclosure.Button className="py-2 bg-purple-300 p-4 rounded text-start w-full opacity-85 text-purple-600 text-sm font-bold flex flex-row justify-between items-center ">

        <span>1. hvor fornuftig har jeg spist idag?</span> 

        <svg className={`${

                    open ? 'rotate-180 transform' : ''

                  } `} xmlns="http://www.w3.org/2000/svg" width="10.545" height="6.029" viewBox="0 0 10.545 6.029">

  <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M11.462,15.458l3.987-3.99a.75.75,0,0,1,1.064,0,.76.76,0,0,1,0,1.067L12,17.056a.752.752,0,0,1-1.039.022l-4.549-4.54a.754.754,0,0,1,1.064-1.067Z" transform="translate(-6.188 -11.246)"/>

</svg>



      </Disclosure.Button>

      <Disclosure.Panel className=" mt-4 flex flex-wrap gap-5 justify-center pb-2 text-slate-100">

       <button className={`w-10 h-10 ${styles}`}>1</button>

       <button className={`w-10 h-10 ${styles}`}>2</button>

       <button className={`w-10 h-10 ${styles}`}>3</button>

       <button className={`w-10 h-10 ${styles}`}>4</button>

       <button className={`w-10 h-10 ${styles}`}>5</button>

       <button className={`w-10 h-10 ${styles}`}>6</button>

       <button className={`w-10 h-10 ${styles}`}>7</button>

       <button className={`w-10 h-10 ${styles}`}>8</button>

       <button className={`w-10 h-10 ${styles}`}>9</button>

       <button className={`w-10 h-10 ${styles}`}>10</button>

      </Disclosure.Panel>

      </>

 )}

    </Disclosure>

    {/* End of panel */}

    <Disclosure>

         {({ open }) => (

          <>

      <Disclosure.Button className="py-2 bg-purple-300 p-4 rounded text-start w-full opacity-85 text-purple-600 text-sm font-bold flex flex-row justify-between items-center ">

        <span>2. Hvor godt har du sovet i natt?</span> 

        <svg className={`${

                    open ? 'rotate-180 transform' : ''

                  } `} xmlns="http://www.w3.org/2000/svg" width="10.545" height="6.029" viewBox="0 0 10.545 6.029">

  <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M11.462,15.458l3.987-3.99a.75.75,0,0,1,1.064,0,.76.76,0,0,1,0,1.067L12,17.056a.752.752,0,0,1-1.039.022l-4.549-4.54a.754.754,0,0,1,1.064-1.067Z" transform="translate(-6.188 -11.246)"/>

</svg>

      </Disclosure.Button>

      <Disclosure.Panel className=" mt-4 flex flex-wrap gap-5 justify-center pb-2 text-slate-100">

       <button className={`w-10 h-10 ${styles}`}>1</button>

       <button className={`w-10 h-10 ${styles}`}>2</button>

       <button className={`w-10 h-10 ${styles}`}>3</button>

       <button className={`w-10 h-10 ${styles}`}>4</button>

       <button className={`w-10 h-10 ${styles}`}>5</button>

       <button className={`w-10 h-10 ${styles}`}>6</button>

       <button className={`w-10 h-10 ${styles}`}>7</button>

       <button className={`w-10 h-10 ${styles}`}>8</button>

       <button className={`w-10 h-10 ${styles}`}>9</button>

       <button className={`w-10 h-10 ${styles}`}>10</button>

      </Disclosure.Panel>

      </>

 )}

    </Disclosure>

    {/* End of panel */}

    <Disclosure>

         {({ open }) => (

          <>

      <Disclosure.Button className="py-2 bg-purple-300 p-4 rounded text-start w-full opacity-85 text-purple-600 text-sm font-bold flex flex-row justify-between items-center ">

        <span>3. Hvor motivert var du for å spille idag?</span> 

        <svg className={`${

                    open ? 'rotate-180 transform' : ''

                  } `} xmlns="http://www.w3.org/2000/svg" width="10.545" height="6.029" viewBox="0 0 10.545 6.029">

  <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M11.462,15.458l3.987-3.99a.75.75,0,0,1,1.064,0,.76.76,0,0,1,0,1.067L12,17.056a.752.752,0,0,1-1.039.022l-4.549-4.54a.754.754,0,0,1,1.064-1.067Z" transform="translate(-6.188 -11.246)"/>

</svg>

      </Disclosure.Button>

      <Disclosure.Panel className=" mt-4 flex flex-wrap gap-5 justify-center pb-2 text-slate-100">

       <button className={`w-10 h-10 ${styles}`}>1</button>

       <button className={`w-10 h-10 ${styles}`}>2</button>

       <button className={`w-10 h-10 ${styles}`}>3</button>

       <button className={`w-10 h-10 ${styles}`}>4</button>

       <button className={`w-10 h-10 ${styles}`}>5</button>

       <button className={`w-10 h-10 ${styles}`}>6</button>

       <button className={`w-10 h-10 ${styles}`}>7</button>

       <button className={`w-10 h-10 ${styles}`}>8</button>

       <button className={`w-10 h-10 ${styles}`}>9</button>

       <button className={`w-10 h-10 ${styles}`}>10</button>

      </Disclosure.Panel>

      </>

 )}

    </Disclosure>

    {/*End of panel */}

    <Disclosure>

         {({ open }) => (

          <>

      <Disclosure.Button className="py-2 bg-purple-300 p-4 rounded text-start w-full opacity-85 text-purple-600 text-sm font-bold flex flex-row justify-between items-center ">

        <span>4. Hvordan føler jeg med fysisk?</span> 

        <svg className={`${

                    open ? 'rotate-180 transform' : ''

                  } `} xmlns="http://www.w3.org/2000/svg" width="10.545" height="6.029" viewBox="0 0 10.545 6.029">

  <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M11.462,15.458l3.987-3.99a.75.75,0,0,1,1.064,0,.76.76,0,0,1,0,1.067L12,17.056a.752.752,0,0,1-1.039.022l-4.549-4.54a.754.754,0,0,1,1.064-1.067Z" transform="translate(-6.188 -11.246)"/>

</svg>

      </Disclosure.Button>

      <Disclosure.Panel className=" mt-4 flex flex-wrap gap-5 justify-center pb-2 text-slate-100">

       <button className={`w-10 h-10 ${styles}`}>1</button>

       <button className={`w-10 h-10 ${styles}`}>2</button>

       <button className={`w-10 h-10 ${styles}`}>3</button>

       <button className={`w-10 h-10 ${styles}`}>4</button>

       <button className={`w-10 h-10 ${styles}`}>5</button>

       <button className={`w-10 h-10 ${styles}`}>6</button>

       <button className={`w-10 h-10 ${styles}`}>7</button>

       <button className={`w-10 h-10 ${styles}`}>8</button>

       <button className={`w-10 h-10 ${styles}`}>9</button>

       <button className={`w-10 h-10 ${styles}`}>10</button>

      </Disclosure.Panel>

      </>

 )}

    </Disclosure>

    {/*End of panel*/}

    <Disclosure>

         {({ open }) => (

          <>

      <Disclosure.Button className="py-2 bg-purple-300 p-4 rounded text-start w-full opacity-85 text-purple-600 text-sm font-bold flex flex-row justify-between items-center ">

        <span>5. Hvordan føler jeg meg psykisk?</span> 

        <svg className={`${

                    open ? 'rotate-180 transform' : ''

                  } `} xmlns="http://www.w3.org/2000/svg" width="10.545" height="6.029" viewBox="0 0 10.545 6.029">

  <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M11.462,15.458l3.987-3.99a.75.75,0,0,1,1.064,0,.76.76,0,0,1,0,1.067L12,17.056a.752.752,0,0,1-1.039.022l-4.549-4.54a.754.754,0,0,1,1.064-1.067Z" transform="translate(-6.188 -11.246)"/>

</svg>

      </Disclosure.Button>

      <Disclosure.Panel className=" mt-4 flex flex-wrap gap-5 justify-center pb-2 text-slate-100">

       <button className={`w-10 h-10 ${styles}`}>1</button>

       <button className={`w-10 h-10 ${styles}`}>2</button>

       <button className={`w-10 h-10 ${styles}`}>3</button>

       <button className={`w-10 h-10 ${styles}`}>4</button>

       <button className={`w-10 h-10 ${styles}`}>5</button>

       <button className={`w-10 h-10 ${styles}`}>6</button>

       <button className={`w-10 h-10 ${styles}`}>7</button>

       <button className={`w-10 h-10 ${styles}`}>8</button>

       <button className={`w-10 h-10 ${styles}`}>9</button>

       <button className={`w-10 h-10 ${styles}`}>10</button>

      </Disclosure.Panel>

      </>

 )}

    </Disclosure>

    {/*End of panel*/}

    <button className="w-2/5 H-1/6 bg-yellow-300 opacity-80 text-black font-bold ">Submit</button>

    </div>

    </div>

    </main>

     

  )

}