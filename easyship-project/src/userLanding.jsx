import React from 'react';

function UserLanding() {
  function toggleDropdown(event) {
    const desplegable = event.currentTarget.querySelector(".desplegable");
    desplegable.classList.toggle("hidden");
  }

  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Easy Ship</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100">
        <nav className="bg-orange-500 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-semibold">Easy Ship</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white">User Name</span>
            {/* <i className="fas fa-user-circle text-white text-2xl"></i> */}
          </div>
        </nav>

        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
          <nav>
            <ul className="space-y-2">
              <li className="opcion-con-desplegable" onClick={toggleDropdown}>
                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                  <div className="flex items-center">
                    {/* <i className="fas fa-calendar-alt mr-2"></i> */}
                    <span>Dashboard</span>
                  </div>
                  {/* <i className="fas fa-chevron-down text-xs"></i> */}
                </div>
               
              {/* Add more list items here */}
              </li>
              <li className="opcion-con-desplegable" onClick={toggleDropdown}>
                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                  <div className="flex items-center">
                    {/* <i className="fas fa-calendar-alt mr-2"></i> */}
                    <span>Inventory</span>
                  </div>
                  <i className="fas fa-chevron-down text-xs"></i>
                </div>
                <ul className="desplegable ml-4 hidden">
                  <li>
                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                      <i className="fas fa-chevron-right mr-2 text-xs"></i>
                      Add Product
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                      <i className="fas fa-chevron-right mr-2 text-xs"></i>
                      Delete Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                      <i className="fas fa-chevron-right mr-2 text-xs"></i>
                      Update Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 hover:bg-gray-700 flex items-center">
                      <i className="fas fa-chevron-right mr-2 text-xs"></i>
                      View Products
                    </a>
                  </li>
                </ul>
              </li>
             </ul>
             {/* <ul className="space-y-2"> */}
             
          </nav>
        </aside>
       
        



        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">¡Bienvenido al CRM de Mi Empresa!</h1>
          <p>En esta sección encontrarás todo lo que necesitas para administrar tus clientes y ventas de manera eficiente.</p>
        </main>

        <script>
          {`
            document.addEventListener("DOMContentLoaded", function () {
              const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");
              opcionesConDesplegable.forEach(function (opcion) {
                opcion.addEventListener("click", function () {
                  const desplegable = opcion.querySelector(".desplegable");
                  desplegable.classList.toggle("hidden");
                });
              });
            });
          `}
        </script>
      </body>
    </html>
  );
}

export default  UserLanding;
